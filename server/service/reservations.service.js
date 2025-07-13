const db = require('../../database/db');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

exports.getAllReservations = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM reservations');
        return rows;
    } catch (error) {
        console.error('Error in getAllReservations:', error);
        throw error;
    }
};

exports.getReservationsByQuery = async (query) => {
    try {
        let sql = `SELECT r.*, u.username, u.email, u.phone, u.address
                   FROM reservations r
                   JOIN users u ON r.user_id = u.id WHERE 1=1`;
        const values = [];

        if (query.user_id) {
            sql += ' AND user_id = ?';
            values.push(query.user_id);
        }
        if (query.status) {
            sql += ' AND status = ?';
            values.push(query.status);
        }
        if (query.start) {
            sql += ' AND openTime >= ?';
            values.push(query.start);
        }
        if (query.end) {
            sql += ' AND openTime <= ?';
            values.push(query.end);
        }

        const [rows] = await db.query(sql, values);
        return rows;
    } catch (error) {
        console.error('Error in getReservationsByQuery:', error);
        throw error;
    }
};

exports.getActiveReservationsExtended = async (openTime, closeTime) => {
    try {
        const sql = `
            SELECT * FROM reservations 
            WHERE status = 'approved'  
            AND (
                (openTime <= ? AND closeTime >= ?) 
                OR 
                (openTime >= ? AND openTime <= ?)
                OR
                (closeTime >= ? AND closeTime <= ?)
            )
        `;

        const [rows] = await db.query(sql, [
            closeTime, openTime,
            openTime, closeTime,
            openTime, closeTime
        ]);

        return rows;
    } catch (error) {
        console.error('Error in getActiveReservationsExtended:', error);
        throw error;
    }
};

exports.insertReservation = async (reservationData) => {
    try {
        const { user_id, openTime, closeTime, num_of_people, payment, status, group_description } = reservationData;
        const sql = `
            INSERT INTO reservations (user_id, openTime, closeTime, num_of_people, payment, group_description, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(sql, [user_id, openTime, closeTime, num_of_people, payment, group_description, status]);
        return { id: result.insertId, createAt: result.createAt, ...reservationData };
    } catch (error) {
        console.error('Error in insertReservation:', error);
        throw error;
    }
};

exports.checkReservationInTwoWeeks = async (user_id, newDate) => {
    try {
        const sql = `
            SELECT openTime 
            FROM reservations 
            WHERE user_id = ? 
            AND status = 'pending'
            AND openTime BETWEEN ? AND ?
        `;
        const startRange = dayjs(newDate).subtract(14, 'days').toISOString();
        const endRange = dayjs(newDate).toISOString();

        const [reservations] = await db.query(sql, [user_id, startRange, endRange]);
        return reservations.length < 3;
    } catch (error) {
        console.error('Error in checkReservationInTwoWeeks:', error);
        throw error;
    }
};

exports.getReservationById = async (id) => {
    try {
        const query = 'SELECT * FROM reservations WHERE id = ?';
        const [results] = await db.query(query, [id]);
        return results[0];
    } catch (error) {
        console.error('Error in getReservationById:', error);
        throw error;
    }
};

exports.hasUserReservationInRange = async (user_id, openTime, closeTime) => {
    try {
        const sql = `
            SELECT * FROM reservations
            WHERE user_id = ?
            AND status IN ( 'pending')
            AND NOT (closeTime <= ? OR openTime >= ?)
        `;
        const [rows] = await db.query(sql, [user_id, openTime, closeTime]);
        return rows.length > 0;
    } catch (error) {
        console.error('Error in hasUserReservationInRange:', error);
        throw error;
    }
};

exports.getNextUserReservation = async (user_id, fromTime) => {
    try {
        const sql = `
            SELECT * FROM reservations
            WHERE user_id = ?
            AND status IN ('approved', 'pending')
            AND openTime > ?
            ORDER BY openTime ASC
            LIMIT 1
        `;
        const [rows] = await db.query(sql, [user_id, fromTime]);
        return rows[0] || null;
    } catch (error) {
        console.error('Error in getNextUserReservation:', error);
        throw error;
    }
};

exports.updateReservationFields = async (id, updateData) => {
    if (!id || !updateData || Object.keys(updateData).length === 0) {
        return null;
    }

    const fields = Object.keys(updateData);
    const values = Object.values(updateData);

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const sql = `UPDATE reservations SET ${setClause} WHERE id = ?`;

    try {
        await db.query(sql, [...values, id]);

        const [rows] = await db.query('SELECT * FROM reservations WHERE id = ?', [id]);
        return rows[0];
    } catch (err) {
        console.error('Error in updateReservationFields:', err);
        throw err;
    }
};

exports.rejectOverlappingReservations = async (currentReservation) => {
    try {
        const { id: reservationId, openTime, closeTime } = currentReservation;
        const sql = `
            UPDATE reservations
            SET status = 'rejected'
            WHERE id != ?
            AND status = 'pending'
            AND (
                (openTime < ? AND closeTime > ?) 
                OR (openTime >= ? AND openTime < ?) 
                OR (closeTime > ? AND closeTime <= ?) 
            )
        `;

        await db.query(sql, [
            reservationId,
            closeTime, openTime,
            openTime, closeTime,
            openTime, closeTime
        ]);
    } catch (error) {
        console.error('Error in rejectOverlappingReservations:', error);
        throw error;
    }
};
