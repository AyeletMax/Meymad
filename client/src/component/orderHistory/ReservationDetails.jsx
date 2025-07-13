import React from 'react';
import { Grid, Paper, Typography, Alert } from '@mui/material';
import { CalendarToday, People } from '@mui/icons-material';
import dayjs from 'dayjs';

const formatDateTime = (dt) => dayjs(dt).format('DD/MM/YYYY בשעה HH:mm');

const ReservationDetails = ({ reservation }) => (
  <>
    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CalendarToday sx={{ fontSize: 20 }} />
      פרטי ההזמנה
    </Typography>

    <Grid container spacing={2}>
      {[
        { label: 'שעת התחלה', value: reservation.openTime },
        { label: 'שעת סיום', value: reservation.closeTime },
      ].map(({ label, value }, i) => (
        <Grid key={i} item xs={12} sm={6}>
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {label.includes('שעת') ? formatDateTime(value) : value}
              
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>

    {reservation.manager_comment && (
      <Alert severity="info" sx={{ mt: 2 }} icon={<People />}>
        <Typography variant="subtitle2" gutterBottom>
          הערת מנהל
        </Typography>
        <Typography variant="body2">
          {reservation.manager_comment}
        </Typography>
      </Alert>
    )}
  </>
);

export default ReservationDetails;
