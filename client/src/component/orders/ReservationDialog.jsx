import {
  Dialog, DialogTitle, DialogContent, TextField, Box, Button, Typography,
  Grid, FormControlLabel, Checkbox
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers';

const ReservationDialog = ({
  open, onClose, reservationLogic, onTimeChange, onEndTimeNextDayChange, onFieldChange, onSubmit
}) => {
  const {
    selectedDate, formData, isEndTimeNextDay, shouldDisableStartTime, shouldDisableEndTime, isOrderValid, CONFIG
  } = reservationLogic;



  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>בחירת זמן להזמנה</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          <Typography sx={{ mb: 2 }}>
            תאריך: {selectedDate?.format('DD/MM/YYYY')}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TimePicker
                label="שעת התחלה"
                value={formData.startTime}
                onChange={v => { onTimeChange('startTime')(v); if (formData.endTime) onTimeChange('endTime')(null); }}
                minutesStep={CONFIG.STEP_MINUTES}
                ampm={false}
                shouldDisableTime={shouldDisableStartTime}
                disabled={false}
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="שעת סיום"
                value={formData.endTime}
                onChange={onTimeChange('endTime')}
                minutesStep={CONFIG.STEP_MINUTES}
                ampm={false}
                shouldDisableTime={shouldDisableEndTime}
                disabled={!formData.startTime}
                sx={{ width: '100%' }}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isEndTimeNextDay}
                  onChange={onEndTimeNextDayChange}
                  disabled={!formData.startTime || !formData.endTime}
                />
              }
              label={`שעת הסיום ביום למחרת (${selectedDate?.add(1, 'day').format('DD/MM/YYYY')})`}
            />
          </Box>
          <TextField
            label="מספר אנשים"
            fullWidth
            type="number"
            slotProps={{ input: { min: 1 } }}
            value={formData.num_of_people}
            onChange={onFieldChange('num_of_people')}
            sx={{ mt: 2 }}
          />
          <TextField
            label="תשלום (₪)"
            fullWidth
            type="text"
            value={formData.payment}
            slotProps={{ input: { readOnly: true } }}
            sx={{ mt: 2 }}
          />
          <TextField
            label="תיאור הקבוצה"
            fullWidth
            required
            value={formData.group_description || ''}
            onChange={onFieldChange('group_description')}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>ביטול</Button>
            <Button variant="contained" onClick={onSubmit} disabled={!isOrderValid()}>שלח הזמנה</Button>
          </Box>
        </LocalizationProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;