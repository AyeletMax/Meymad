import { useState, useEffect, useMemo } from 'react';import dayjs from 'dayjs';
import { useUser } from '../UserContext';
import { useBusySlotFetching } from './logicHelpers/useBusySlotFetching';
import { usePaymentCalculator } from './logicHelpers/usePaymentCalculator';
import {
  createTimeSlotChecker,
  isValidStartTime,
  isValidEndTime,
  shouldDisableTime
} from './logicHelpers/useTimeValidation';

const CONFIG = {
  MINIMUM_DURATION: 2,
  BREAK_TIME: 10,
  STEP_MINUTES: 5,
  PRICING: {
    BASE_UP_TO_2: 200,
    BASE_UP_TO_5: 250,
    ADDITIONAL_PER_5: 50
  }
};
export const useReservationLogic = () => {
  const { currentUser } = useUser();

  const [selectedDate, setSelectedDate] = useState(null);
  const [isEndTimeNextDay, setIsEndTimeNextDay] = useState(false);
  const [formData, setFormData] = useState({
    user_id: currentUser.id,
    startTime: null,
    endTime: null,
    num_of_people: '',
    payment: '',
    group_description: ''
  });

  const {
    busySlots,
    setBusySlots,
    nextDayBusySlots,
    setNextDayBusySlots,
    fetchBusySlots,
    fetchNextDayBusySlots
  } = useBusySlotFetching();

  const { calculatePayment } = usePaymentCalculator(CONFIG);

  const timeSlotChecker = useMemo(() =>
    createTimeSlotChecker(busySlots.busySlots, nextDayBusySlots.busySlots),
    [busySlots, nextDayBusySlots]
  );

  const isOrderValid = () => {
    const { startTime, endTime, num_of_people, group_description } = formData;
    if (!startTime || !endTime || !num_of_people) return false;

    const numPeople = parseInt(num_of_people, 10);
    if (!numPeople || numPeople <= 0) return false;

    if (!group_description || group_description.trim() === '') return false;

    const duration = isEndTimeNextDay
      ? endTime.add(1, 'day').diff(startTime, 'minute')
      : endTime.diff(startTime, 'minute');

    if (duration < CONFIG.MINIMUM_DURATION * 60) return false;

    return isValidEndTime(endTime, formData, selectedDate, isEndTimeNextDay, CONFIG, timeSlotChecker);
  };

  useEffect(() => {
    if (selectedDate) {
      fetchBusySlots(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    const { startTime, endTime, num_of_people } = formData;
    const numPeople = parseInt(num_of_people, 10);

    if (!numPeople || !startTime || !endTime) {
      setFormData(prev => ({ ...prev, payment: '' }));
      return;
    }

    const payment = calculatePayment(startTime, endTime, numPeople, selectedDate, isEndTimeNextDay);
    setFormData(prev => ({ ...prev, payment: payment.toString() }));
  }, [formData.startTime, formData.endTime, formData.num_of_people, isEndTimeNextDay]);

  return {
    CONFIG,
    selectedDate,
    setSelectedDate,
    busySlots: busySlots.busySlots || [],
    setBusySlots,
    nextDayBusySlots: nextDayBusySlots.busySlots || [],
    setNextDayBusySlots,
    isEndTimeNextDay,
    setIsEndTimeNextDay,
    formData,
    setFormData,
    isValidStartTime: (startTime) => isValidStartTime(startTime, selectedDate, CONFIG, timeSlotChecker),
    isValidEndTime: (endTime) => isValidEndTime(endTime, formData, selectedDate, isEndTimeNextDay, CONFIG, timeSlotChecker),
    shouldDisableStartTime: (value, viewType) => shouldDisableTime(value, viewType, false, selectedDate, formData, isEndTimeNextDay, CONFIG, timeSlotChecker),
    shouldDisableEndTime: (value, viewType) => shouldDisableTime(value, viewType, true, selectedDate, formData, isEndTimeNextDay, CONFIG, timeSlotChecker),
    fetchBusySlots,
    fetchNextDayBusySlots,
    isOrderValid,
    calculatePayment
  };
};
