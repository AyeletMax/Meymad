import { useState } from 'react';
import ApiService from '../../../ApiService';

export const useBusySlotFetching = () => {
  const [busySlots, setBusySlots] = useState({ busySlots: [] });
  const [nextDayBusySlots, setNextDayBusySlots] = useState({ busySlots: [] });

  const fetchBusySlots = async (date) => {
    try {
      const response = await ApiService.request({
        endPath: `reservations/?openTime=${date.startOf('day').format('YYYY-MM-DD HH:mm:ss')}&closeTime=${date.endOf('day').format('YYYY-MM-DD HH:mm:ss')}`,
      });
      setBusySlots(response || { busySlots: [] });
      return response?.busySlots || [];
    } catch (err) {
      console.error('Error fetching busy slots:', err);
      setBusySlots({ busySlots: []});
      return [];
    }
  };

  const fetchNextDayBusySlots = async (date) => {
    try {
      const nextDay = date.add(1, 'day');
      const response = await ApiService.request({
        endPath: `reservations/?openTime=${nextDay.startOf('day').format('YYYY-MM-DD HH:mm:ss')}&closeTime=${nextDay.endOf('day').format('YYYY-MM-DD HH:mm:ss')}`,
      });
      setNextDayBusySlots(response || { busySlots: [] });
      return response?.busySlots || [];
    } catch (err) {
      console.error('Error fetching next day busy slots:', err);
      setNextDayBusySlots({ busySlots: []});
      return [];
    }
  };

  return {
    busySlots,
    setBusySlots,
    nextDayBusySlots,
    setNextDayBusySlots,
    fetchBusySlots,
    fetchNextDayBusySlots
  };
};

