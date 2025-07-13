const reservationService = require('../service/reservations.service');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

const calculateBusySlots = (reservations) => {
    if (!reservations || reservations.length === 0) {
        return {
            busySlots: []
        };
    }

    const busyTimes = new Set();
    const STEP_MINUTES = 5;
    const BREAK_TIME = 10;
    const dailySlots = new Map();

    reservations.forEach(reservation => {
        const start = dayjs(reservation.openTime);
        const end = dayjs(reservation.closeTime);
        const currentDate = start.format('YYYY-MM-DD');

        if (!dailySlots.has(currentDate)) {
            dailySlots.set(currentDate, new Set());
        }

        let current = start.subtract(BREAK_TIME, 'minute');
        while (current.isBefore(start)) {
            const timeStr = current.format('HH:mm');
            busyTimes.add(timeStr);
            dailySlots.get(currentDate).add(timeStr);
            current = current.add(STEP_MINUTES, 'minute');
        }

        current = start;
        while (current.isBefore(end)) {
            const timeStr = current.format('HH:mm');
            busyTimes.add(timeStr);
            dailySlots.get(currentDate).add(timeStr);
            current = current.add(STEP_MINUTES, 'minute');
        }
        current = end;
        const endBreak = end.add(BREAK_TIME, 'minute');
        while (current.isBefore(endBreak)) {
            const timeStr = current.format('HH:mm');
            busyTimes.add(timeStr);
            dailySlots.get(currentDate).add(timeStr);
            current = current.add(STEP_MINUTES, 'minute');
        }
    });

    const results = Array.from(busyTimes).map(time => ({
        time,
    }));

    const response = {
        busySlots: results.sort((a, b) => a.time.localeCompare(b.time)),
    };

    return response;
};

const validateReservationData = (data) => {
    const { user_id, openTime, closeTime, num_of_people } = data;

    if (!user_id || !openTime || !closeTime || !num_of_people) {
        throw new Error('חסרים נתונים נדרשים');
    }

    const start = dayjs(openTime);
    const end = dayjs(closeTime);

    if (!start.isValid() || !end.isValid()) {
        throw new Error('פורמט תאריך לא תקין');
    }

    if (start.isAfter(end) || start.isSame(end)) {
        throw new Error('שעת סיום חייבת להיות אחרי שעת התחלה');
    }

    if (num_of_people <= 0) {
        throw new Error('מספר האנשים חייב להיות חיובי');
    }

    const maxDuration = 48 * 60;
    const durationMinutes = end.diff(start, 'minute');
    if (durationMinutes > maxDuration) {
        throw new Error('משך ההזמנה לא יכול לחרוג מ-48 שעות');
    }

    return true;
};

exports.getReservations = async (req, res) => {
    try {
        if (req.query.openTime && req.query.closeTime) {
            const reservations = await reservationService.getActiveReservationsExtended(
                req.query.openTime,
                req.query.closeTime
            );
            const { busySlots } = calculateBusySlots(reservations);
            return res.status(200).json({ busySlots });
        }

        if (Object.keys(req.query).length > 0) {
            const reservations = await reservationService.getReservationsByQuery(req.query);
            return res.status(200).json(reservations);
        }

        reservations = await reservationService.getAllReservations();

        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ error: 'לא מצאנו הזמנות' });
        }

        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error in getSchedules:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.createReservation = async (req, res) => {
    try {
        validateReservationData(req.body);

        const hasReservation = await reservationService.hasUserReservationInRange(
            req.body.user_id,
            req.body.openTime,
            req.body.closeTime
        );
        if (hasReservation) {
            return res.status(409).json({ error: 'יש לך כבר הזמנה קיימת בטווח השעות הזה.' });
        }

        const canReserve = await reservationService.checkReservationInTwoWeeks(
            req.body.user_id,
            req.body.openTime
        );

        if (!canReserve) {
            return res.status(409).json({ error: 'לא ניתן להזמין יותר מ-3 פעמים במצב ממתין לאישור בתוך טווח של שבועיים.' });
        }

        const { user_id, openTime, closeTime, num_of_people, payment, group_description } = req.body;

        if (!group_description || group_description.trim() === '') {
            return res.status(400).json({ error: 'יש למלא תיאור קבוצה' });
        }

        const reservationData = {
            user_id,
            openTime,
            closeTime,
            num_of_people,
            payment,
            group_description,
            status: 'pending'
        };

        const newReservation = await reservationService.insertReservation(reservationData);

        const response = {
            ...newReservation,
            message: 'ההזמנה נוצרה בהצלחה וממתינה לאישור מנהל',
        };

        const io = req.app.get('io');
        io.to('admin').emit('newReservation', reservationData);

        res.status(201).json(response);

    } catch (error) {
        console.error('Error in createReservation:', error);

        if (error.message.includes('חסרים נתונים') ||
            error.message.includes('פורמט תאריך') ||
            error.message.includes('שעת סיום') ||
            error.message.includes('מספר האנשים') ||
            error.message.includes('משך ההזמנה')) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'שגיאה ביצירת הזמנה' });
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const {status, num_of_people, manager_comment, openTime, closeTime,payment,activityDate} = req.body;
        if (!id) {
            return res.status(400).json({ error: 'חסר מזהה הזמנה' });
        }

        const updateData = {};

        if (status) {
            const validStatuses = ['approved', 'rejected', 'cancelled'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ error: 'סטטוס לא תקין' });
            }
            updateData.status = status;
        }

        const fieldsToUpdate = {
            num_of_people,
            manager_comment,
            openTime,
            closeTime,
            payment,
            activityDate
        };

        for (const [key, value] of Object.entries(fieldsToUpdate)) {
            if (typeof value !== 'undefined') {
                updateData[key] = value;
            }
        }


        const updatedReservation = await reservationService.updateReservationFields(id, updateData);

        if (updatedReservation.status === 'approved') {
            await reservationService.rejectOverlappingReservations(updatedReservation);
        }

        if (!updatedReservation) {
            return res.status(404).json({ error: 'ההזמנה לא נמצאה' });
        }


        res.status(200).json({
            message: 'ההזמנה עודכנה',
            updatedAt: new Date().toISOString(),
            ...updatedReservation
        });

    } catch (error) {
        console.error('שגיאה בעדכון ההזמנה:', error);
        res.status(500).json({ error: 'שגיאה בעדכון ההזמנה' });
    }
};

