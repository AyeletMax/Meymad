import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ApiService from '../../ApiService';
import { useUser } from "../UserContext";
import { useReservationLogic } from './useReservationLogic';
import ReservationDialog from './ReservationDialog';
import { useGlobalMessage } from "../GlobalMessageContext";
import { calendarStyles, getDayStyles } from './Calendar.styles';

dayjs.extend(utc);

export default function NewOrder() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const { currentUser } = useUser();
  const reservationLogic = useReservationLogic();
  const { showMessage } = useGlobalMessage();

  const {
    selectedDate,
    setSelectedDate,
    setBusySlots,
    setNextDayBusySlots,
    setIsEndTimeNextDay,
    formData,
    setFormData,
    fetchBusySlots,
    fetchNextDayBusySlots
  } = reservationLogic;

  const weekDaysHebrew = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
  const today = dayjs();

  useEffect(() => {
    if (openDialog && selectedDate) {
      fetchBusySlots(selectedDate);
      fetchNextDayBusySlots(selectedDate);
    }
  }, [openDialog, selectedDate]);

  const handleDateChange = async (date) => {
  setSelectedDate(date);
  setOpenDialog(true);
  setIsEndTimeNextDay(false);

  setFormData({
    user_id: currentUser.id,
    startTime: null,
    endTime: null,
    num_of_people: '',
    payment: '',
    group_description: ''
  });

  const formatDate = (d) => d.format('YYYY-MM-DD');
  const baseUrl = 'reservations'; 

  try {
    const response1 = await fetch(`${baseUrl}?openTime=${formatDate(date)} 00:00:00&closeTime=${formatDate(date)} 23:59:59`);
    const busyObj = await response1.json();

    const nextDay = date.clone().add(1, 'day');
    const response2 = await fetch(`${baseUrl}?openTime=${formatDate(nextDay)} 00:00:00&closeTime=${formatDate(nextDay)} 23:59:59`);
    const nextDayBusyObj = await response2.json();

    setBusySlots(busyObj || { busySlots: [] });
    setNextDayBusySlots(nextDayBusyObj || { busySlots: [] });
  } catch (error) {
    console.error('Error fetching busy slots:', error);
    setBusySlots({ busySlots: [] });
    setNextDayBusySlots({ busySlots: [] });
  }
};


  const handleTimeChange = (field) => (newValue) => {
    if (!dayjs.isDayjs(newValue) || !selectedDate) return;
    const mergedValue = selectedDate
      .hour(newValue.hour())
      .minute(newValue.minute())
      .second(0);

    if (field === 'startTime') {
      const minimumEndTime = mergedValue.add(reservationLogic.CONFIG.MINIMUM_DURATION, 'hour');
      const shouldSetNextDay = minimumEndTime.date() !== mergedValue.date();

      setIsEndTimeNextDay(shouldSetNextDay);

      let endTimeToSet = minimumEndTime;
      if (shouldSetNextDay) {
        endTimeToSet = selectedDate
          .hour(minimumEndTime.hour())
          .minute(minimumEndTime.minute())
          .second(0);
      }

      setFormData(prev => ({
        ...prev,
        startTime: mergedValue,
        endTime: endTimeToSet
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: mergedValue }));
    }
  };

  const handleEndTimeNextDayChange = (event) => {
    const checked = event.target.checked;
    setIsEndTimeNextDay(checked);

    if (!checked && formData.endTime && formData.startTime) {
      const duration = formData.endTime.diff(formData.startTime, 'minute');
      if (duration < reservationLogic.CONFIG.MINIMUM_DURATION * 60) {
        const minimumEndTime = formData.startTime.add(reservationLogic.CONFIG.MINIMUM_DURATION, 'hour');
        setFormData(prev => ({ ...prev, endTime: minimumEndTime }));
      }
    }
  };

  const handleFieldChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let startDateTime = formData.startTime;
      let endDateTime = formData.endTime;

      if (reservationLogic.isEndTimeNextDay) {
        endDateTime = endDateTime.add(1, 'day');
      }

      await ApiService.request({
        endPath: 'reservations',
        method: 'POST',
        body: {
          user_id: currentUser.id,
          openTime: startDateTime.format('YYYY-MM-DD HH:mm:ss'),
          closeTime: endDateTime.format('YYYY-MM-DD HH:mm:ss'),
          num_of_people: parseInt(formData.num_of_people, 10),
          payment: parseFloat(formData.payment),
          group_description: formData.group_description
        },
        credentials: 'include'
      });

      showMessage("ההזמנה נשלחה בהצלחה!", "success");
      setOpenDialog(false);
      setSelectedDate(null);
    } catch (error) {
      const message = error.status === 409 ? error.message : "אירעה שגיאה בשליחת ההזמנה";
      showMessage(message, "error");
      console.error('Error creating reservation:', error);
    }
  };

  const getDaysInMonth = () => {
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');
    const startDate = startOfMonth.startOf('week');
    const endDate = endOfMonth.endOf('week');
    
    const days = [];
    let currentDate = startDate;
    
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      days.push(currentDate);
      currentDate = currentDate.add(1, 'day');
    }
    
    return days;
  };

  const days = getDaysInMonth();

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <Box dir="rtl" sx={calendarStyles.mainContainer}>
      <Box sx={calendarStyles.calendarBox}>
        <Box sx={calendarStyles.monthHeader}>
          <IconButton
            onClick={() => setCurrentMonth(prev => prev.subtract(1, 'month'))}
            sx={calendarStyles.monthButton}  >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h4" sx={calendarStyles.monthTitle}>
            {currentMonth.format('MMMM YYYY')}
          </Typography> 
          <IconButton
            onClick={() => setCurrentMonth(prev => prev.add(1, 'month'))}
            sx={calendarStyles.monthButton}  >
            <ChevronRight />
          </IconButton>
        </Box>
        <Box sx={calendarStyles.weekDaysHeader}>
          {weekDaysHebrew.map((day, index) => (
            <Typography key={index} sx={calendarStyles.weekDay}>
              {day}
            </Typography>
          ))}
        </Box>

        <Box sx={calendarStyles.daysGrid}>
          {weeks.map((week, weekIndex) => (
            <Box key={weekIndex} sx={calendarStyles.weekRow}>
              {week.map((day, dayIndex) => {
                const isPast = day.isBefore(today, 'day');
                const isShabbat = day.day() === 6;
                return (
                  <Box
                    key={dayIndex}
                    onClick={() => !isPast && !isShabbat && handleDateChange(day)}
                    sx={getDayStyles(day, currentMonth, selectedDate, today)}
                  >
                    <Box sx={calendarStyles.dayNumberBox}>
                      <Typography sx={{ fontWeight: 700 }}>
                        {day.format('D')}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>

      <ReservationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        reservationLogic={reservationLogic}
        onTimeChange={handleTimeChange}
        onEndTimeNextDayChange={handleEndTimeNextDayChange}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}