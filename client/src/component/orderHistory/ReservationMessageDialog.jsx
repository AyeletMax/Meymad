import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Typography,
  Box, TextField, Button, FormControl, FormLabel, RadioGroup,
  FormControlLabel, Radio, Alert, CircularProgress
} from '@mui/material';
import { Message } from '@mui/icons-material';
import dayjs from 'dayjs';

const ReservationMessageDialog = ({
  open, onClose, reservation, messageType, setMessageType,
  messageContent, setMessageContent, onSubmit, isSubmitting
}) => {
  const formatDateTime = (dateTimeStr) => dayjs(dateTimeStr).format('DD/MM/YYYY בשעה HH:mm');
  const formatDuration = (start, end) => {
    const d = dayjs(end).diff(dayjs(start), 'hour', true);
    return d === Math.floor(d) ? `${d} שעות` : `${d.toFixed(1)} שעות`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Message color="primary" />
          <Typography variant="h6">פנייה למנהל - הזמנה #{reservation.id}</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            פרטי ההזמנה:
          </Typography>
          <Typography variant="body2"><strong>תאריך וזמן:</strong> {formatDateTime(reservation.openTime)}</Typography>
          <Typography variant="body2"><strong>משך:</strong> {formatDuration(reservation.openTime, reservation.closeTime)}</Typography>
          <Typography variant="body2"><strong>מספר אנשים:</strong> {reservation.num_of_people}</Typography>
        </Box>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>סוג הפנייה:</FormLabel>
          <RadioGroup row value={messageType} onChange={(e) => setMessageType(e.target.value)}>
            <FormControlLabel value="update" control={<Radio />} label="עדכון הזמנה" />
            <FormControlLabel value="cancel" control={<Radio />} label="ביטול הזמנה" />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth multiline rows={4} variant="outlined"
          label={messageType === 'cancel' ? "סיבת הביטול ופרטים נוספים" : "פרטי העדכון הרצוי"}
          value={messageContent} onChange={(e) => setMessageContent(e.target.value)}
          placeholder={
            messageType === 'cancel'
              ? "אנא פרטו את הסיבה לביטול ההזמנה..."
              : "אנא פרטו מה תרצו לעדכן בהזמנה (שעות, מספר אנשים וכו')..."
          }
          helperText="ההודעה תישלח למנהל לטיפול"
          sx={{ mb: 2 }}
        />

        {messageType === 'cancel' && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            בקשת הביטול תישלח למנהל לעיון ואישור. עד לקבלת תשובה, ההזמנה תישאר בתוקף.
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={isSubmitting}>ביטול</Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!messageContent.trim() || isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} /> : <Message />}
        >
          {isSubmitting ? 'שולח...' : 'שלח למנהל'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationMessageDialog;
