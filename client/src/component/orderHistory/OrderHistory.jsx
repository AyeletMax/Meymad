import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Container, Paper, CircularProgress } from '@mui/material';
import { EventAvailable, History } from '@mui/icons-material';
import dayjs from 'dayjs';
import 'dayjs/locale/he';
import ReservationCard from './ReservationCard';
import ApiService from '../../ApiService';
import { useUser } from '../UserContext';
import { useGlobalMessage } from '../GlobalMessageContext';
const OrderHistory = () => {
  const [tabValue, setTabValue] = useState(0);
  const [futureReservations, setFutureReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showMessage } = useGlobalMessage();
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const now = new Date().toISOString();
        const futureData = await ApiService.request({
          endPath: `reservations?user_id=${currentUser.id}&start=${encodeURIComponent(now)}`, credentials: 'include'
        });
        setFutureReservations(futureData || []);
        const pastData = await ApiService.request({
          endPath: `reservations?user_id=${currentUser.id}&end=${encodeURIComponent(now)}`, credentials: 'include'
        });
        setPastReservations(pastData || []);
        showMessage('היסטוריית ההזמנות נטענה בהצלחה', 'success');
      } catch (error) {
        console.error('Error fetching reservations:', error);
        showMessage('אירעה שגיאה בטעינת היסטוריית ההזמנות', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentUser]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReservationUpdate = async (reservationId, newStatus) => {
    try {
        await ApiService.request({
          endPath: `reservations/${reservationId}`,
          method: 'PATCH',
          body: { status: newStatus }
          , credentials: 'include'
        });
      setFutureReservations(prev => prev.map(res => res.id === reservationId ? { ...res, status: newStatus } : res));
      setPastReservations(prev => prev.map(res => res.id === reservationId ? { ...res, status: newStatus } : res));
      showMessage('ההזמנה עודכנה בהצלחה', 'success');
    } catch (error) {
      console.error('Error updating reservation:', error);
      showMessage('אירעה שגיאה בעדכון ההזמנה', 'error');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, flexDirection: 'column', gap: 2 }}>
          <CircularProgress size={48} />
          <Typography variant="h6" color="text.secondary">טוען הזמנות...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          היסטוריית הזמנות
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          צפו בכל ההזמנות שלכם - עתידיות ועבר
        </Typography>
      </Box>
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': { minHeight: 64, fontSize: '1rem', fontWeight: 600 },
            '& .Mui-selected': { background: 'linear-gradient(45deg, rgba(33,150,243,0.1) 30%, rgba(33,203,243,0.1) 90%)' }
          }}
        >
          <Tab icon={<EventAvailable />} label={`הזמנות עתידיות (${futureReservations.length})`} iconPosition="start" />
          <Tab icon={<History />} label={`היסטוריית הזמנות (${pastReservations.length})`} iconPosition="start" />
        </Tabs>
      </Paper>
      <Box sx={{ minHeight: 400 }}>
        {tabValue === 0 ? (
          futureReservations.length === 0 ? (
            <Paper sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: 'grey.50',
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%)'
            }}>
              <EventAvailable sx={{ fontSize: 64, color: 'primary.main', mb: 2, opacity: 0.7 }} />
              <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
                אין הזמנות עתידיות
              </Typography>
              <Typography variant="body1" color="text.secondary">
                כל ההזמנות העתידיות שלכם יופיעו כאן
              </Typography>
            </Paper>
          ) : (
            futureReservations
              .sort((a, b) => dayjs(a.openTime) - dayjs(b.openTime))
              .map(reservation => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  isFuture={true}
                  onReservationUpdate={handleReservationUpdate}
                 
                />
              ))
          )
        ) : (
          pastReservations.length === 0 ? (
            <Paper sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: 'grey.50',
              borderRadius: 2,
              background: 'linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%)'
            }}>
              <History sx={{ fontSize: 64, color: 'success.main', mb: 2, opacity: 0.7 }} />
              <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
                אין היסטוריית הזמנות
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ההיסטוריה של ההזמנות שלכם תופיע כאן
              </Typography>
            </Paper>
          ) : (
            pastReservations
              .sort((a, b) => dayjs(b.openTime) - dayjs(a.openTime))
              .map(reservation => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  isFuture={false}
                  onReservationUpdate={handleReservationUpdate}
                  />)))
        )}
      </Box>
    </Container>
  );
};

export default OrderHistory;