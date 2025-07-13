import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Grid, Avatar, Divider, Collapse, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AccessTime, People, Payment, CalendarToday, ExpandMore, ExpandLess, Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import ApiService from '../../ApiService';
import StatusChip from './StatusChip';
import ReservationDetails from './ReservationDetails';
import ReservationMessageDialog from './ReservationMessageDialog';
import { useGlobalMessage } from '../GlobalMessageContext';
import { useNavigate } from "react-router-dom";

const ReservationCard = ({ reservation, isFuture, onReservationUpdate }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageType, setMessageType] = useState('update');
  const [messageContent, setMessageContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showMessage } = useGlobalMessage();

  const formatDateTime = (dt) => dayjs(dt).format('DD/MM/YYYY בשעה HH:mm');
  const formatDuration = (start, end) => {
    const d = dayjs(end).diff(dayjs(start), 'hour', true);
    return d === Math.floor(d) ? `${d} שעות` : `${d.toFixed(1)} שעות`;
  };
  const getDaysUntil = (dateStr) => {
    const days = dayjs(dateStr).diff(dayjs(), 'day');
    return days === 0 ? 'עוד פחות מ24 שעות' : days === 1 ? 'מחר' : days > 1 ? `בעוד ${days} ימים` : null;
  };
  const canSendMessage = () => isFuture && ['approved', 'pending'].includes(reservation.status);

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;
    setIsSubmitting(true);
    try {
      await ApiService.request({
        endPath: 'messages',
        method: 'POST',
        body: {
          reservation_id: reservation.id,
          user_id: reservation.user_id,
          message_type: messageType,
          message_content: messageContent.trim()
        },
         credentials: 'include'
      });
      setMessageDialogOpen(false);
      setMessageContent('');
      setMessageType('update');
      showMessage('ההודעה נשלחה בהצלחה למנהל','success');
    } catch (error) {
      console.error('Error sending message:', error);
      showMessage('שגיאה בשליחת ההודעה', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card sx={{ mb: 2, position: 'relative', transition: '0.3s', background: isFuture ? 'linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%)' : 'linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: isFuture ? 'primary.main' : 'success.main', fontSize: '0.875rem' }}>
                #{reservation.id}
              </Avatar>
              <Box>
                <Typography variant="h6">{formatDateTime(reservation.openTime)}</Typography>
                {isFuture && getDaysUntil(reservation.openTime) && (
                  <Typography variant="caption" color="primary">{getDaysUntil(reservation.openTime)}</Typography>
                )}
              </Box>
            </Box>
            <StatusChip status={reservation.status} />
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><AccessTime fontSize="small" /><Typography variant="body2">משך</Typography></Box><Typography>{formatDuration(reservation.openTime, reservation.closeTime)}</Typography></Grid>
            <Grid item xs={6} sm={3}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><People fontSize="small" /><Typography variant="body2">אנשים</Typography></Box><Typography>{reservation.num_of_people}</Typography></Grid>
            <Grid item xs={6} sm={3}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><Payment fontSize="small" /><Typography variant="body2">תשלום</Typography></Box><Typography color="success.main">₪{parseFloat(reservation.payment || 0).toFixed(2)}</Typography></Grid>
            <Grid item xs={6} sm={3}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}><CalendarToday fontSize="small" /><Typography variant="body2">הוזמן ב</Typography></Box><Typography>{dayjs(reservation.createdAt).format('DD/MM/YY')}</Typography></Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2, justifyContent: 'space-between' }}>
          <Button onClick={() => setExpanded(!expanded)} endIcon={expanded ? <ExpandLess /> : <ExpandMore />} size="small">
            {expanded ? 'פחות פרטים' : 'עוד פרטים'}
          </Button>
          {canSendMessage() && (
            <Button onClick={() => setMessageDialogOpen(true)} variant="outlined" size="small" startIcon={<Edit />}>
              ביטול ועדכון הזמנה
            </Button>
          )}
        </CardActions>

        <Collapse in={expanded}><Divider /><CardContent><ReservationDetails reservation={reservation} /></CardContent></Collapse>
      </Card>

      <Dialog open={messageDialogOpen} onClose={() => setMessageDialogOpen(false)}>
        <DialogTitle>בחר פעולה</DialogTitle>
        <DialogContent>
          {reservation.status === 'pending' ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <Button
                color="error"
                variant="contained"
                onClick={async () => {
                  if (window.confirm('האם אתה בטוח שברצונך לבטל את ההזמנה?')) {
                    await onReservationUpdate(reservation.id, 'cancelled');
                    setMessageDialogOpen(false);
                  }
                }}
              > בטל הזמנה
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                  if (window.confirm('עריכת ההזמנה תבטל את ההזמנה הנוכחית ותאפשר לך להזמין תור חדש. להמשיך?')) {
                    await   onReservationUpdate(reservation.id, 'cancelled');
                    setMessageDialogOpen(false);
                    navigate('/newOrder');
                  }
                }}
              >
                ערוך והזמן תור חדש
              </Button>
            </Box>
          ) : (
            <ReservationMessageDialog
              open={messageDialogOpen}
              onClose={() => setMessageDialogOpen(false)}
              reservation={reservation}
              messageType={messageType}
              setMessageType={setMessageType}
              messageContent={messageContent}
              setMessageContent={setMessageContent}
              onSubmit={handleSendMessage}
              isSubmitting={isSubmitting}
              hideTypeSelect={false}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)}>סגור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationCard;
