import React from 'react';
import ApiService from '../../../ApiService';
import AdminReservationTable from './AdminReservationTable';

export default function AdminRejectedList() {
  const today = new Date().toISOString().slice(0, 10);
  return (
    <AdminReservationTable
      fetchReservations={async () => {
        return await ApiService.request({ endPath: `reservations?status=rejected&start=${today}` , credentials: 'include'});
      }}
      tableTitle="הזמנות שנדחו"
      tableColor="#d32f2f"
      badgeColor="secondary"
      badgeLabel="ניהול והזמנה מחדש של הזמנות שנדחו"
      approveButtonLabel="אשר מחדש"
      approveButtonTooltip="אשר הזמנה מחדש"
      showReject={false}
      emptyMessage="אין הזמנות שנדחו"
      approveAlertMessage="ההזמנה אושרה מחדש וההזמנות המתנגשות בוטלו"
    />
  );
}