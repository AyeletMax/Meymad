import dayjs from 'dayjs';

export const createTimeSlotChecker = (busySlots, nextDayBusySlots) => {
  const busySet = new Set(busySlots?.map(slot => slot.time) || []);
  const nextDayBusySet = new Set(nextDayBusySlots?.map(slot => slot.time) || []);

  return {
    isTimeSlotBusy: (hour, minute, isNextDay = false) => {
      const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      return isNextDay ? nextDayBusySet.has(timeStr) : busySet.has(timeStr);
    }
  };
};

export const isTimeRangeAvailable = (startTime, endTime, selectedDate, endTimeIsNextDay, timeSlotChecker, stepMinutes) => {
  if (!startTime || !endTime) return false;

  let current = startTime.clone();
  const end = endTimeIsNextDay ? endTime.add(1, 'day') : endTime;

  while (current.isBefore(end)) {
    const isNextDay = endTimeIsNextDay && current.date() !== selectedDate.date();
    if (timeSlotChecker.isTimeSlotBusy(current.hour(), current.minute(), isNextDay)) {
      return false;
    }
    current = current.add(stepMinutes, 'minute');
  }
  return true;
};

export const isValidStartTime = (startTime, selectedDate, config, timeSlotChecker) => {
  if (!startTime || !selectedDate) return false;

  const fullStartTime = selectedDate.hour(startTime.hour()).minute(startTime.minute()).second(0);
  const minimumEndTime = fullStartTime.add(config.MINIMUM_DURATION, 'hour');
  const endTimeIsNextDay = minimumEndTime.date() !== fullStartTime.date();

  return isTimeRangeAvailable(fullStartTime, minimumEndTime, selectedDate, endTimeIsNextDay, timeSlotChecker, config.STEP_MINUTES);
};

export const isValidEndTime = (endTime, formData, selectedDate, isEndTimeNextDay, config, timeSlotChecker) => {
  if (!endTime || !formData.startTime || !selectedDate) return false;

  const fullStartTime = selectedDate.hour(formData.startTime.hour()).minute(formData.startTime.minute()).second(0);
  let fullEndTime = selectedDate.hour(endTime.hour()).minute(endTime.minute()).second(0);
  if (isEndTimeNextDay) fullEndTime = fullEndTime.add(1, 'day');

  const duration = fullEndTime.diff(fullStartTime, 'minute');
  if (duration < config.MINIMUM_DURATION * 60) return false;

  return isTimeRangeAvailable(fullStartTime, fullEndTime, selectedDate, isEndTimeNextDay, timeSlotChecker, config.STEP_MINUTES);
};

export const shouldDisableTime = (value, viewType, isEndTime, selectedDate, formData, isEndTimeNextDay, config, timeSlotChecker) => {
  if (!value || !dayjs.isDayjs(value) || !value.isValid()) return true;
  if (!selectedDate) return true;

  const hour = value.hour();
  const minute = value.minute();

  if (isEndTime && !formData.startTime) return true;

  if (viewType === 'hours') {
    for (let m = 0; m < 60; m += config.STEP_MINUTES) {
      const testTime = selectedDate.hour(hour).minute(m).second(0);
      const valid = isEndTime
        ? isValidEndTime(testTime, formData, selectedDate, isEndTimeNextDay, config, timeSlotChecker)
        : isValidStartTime(testTime, selectedDate, config, timeSlotChecker);
      if (valid) return false;
    }
    return true;
  }

  if (viewType === 'minutes') {
    const testTime = selectedDate.hour(hour).minute(minute).second(0);
    return isEndTime
      ? !isValidEndTime(testTime, formData, selectedDate, isEndTimeNextDay, config, timeSlotChecker)
      : !isValidStartTime(testTime, selectedDate, config, timeSlotChecker);
  }

  return false;
};
