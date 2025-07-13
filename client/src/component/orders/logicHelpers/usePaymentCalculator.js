export const usePaymentCalculator = (config) => {
  const calculatePayment = (start, end, numPeople, selectedDate, isEndTimeNextDay) => {
    if (!start || !end || !numPeople || !selectedDate) return 0;

    let endDateTime = selectedDate.hour(end.hour()).minute(end.minute()).second(0);
    if (isEndTimeNextDay) {
      endDateTime = endDateTime.add(1, 'day');
    }

    const startDateTime = selectedDate.hour(start.hour()).minute(start.minute()).second(0);
    const durationHours = endDateTime.diff(startDateTime, 'minute') / 60;
    const ratio = durationHours / config.MINIMUM_DURATION;

    let basePrice;
    if (numPeople <= 2) {
      basePrice = config.PRICING.BASE_UP_TO_2;
    } else if (numPeople <= 5) {
      basePrice = config.PRICING.BASE_UP_TO_5;
    } else {
      const additionalGroups = Math.ceil((numPeople - 5) / 5);
      basePrice = config.PRICING.BASE_UP_TO_5 + additionalGroups * config.PRICING.ADDITIONAL_PER_5;
    }

    return Math.round(basePrice * ratio);
  };

  return { calculatePayment };
};
