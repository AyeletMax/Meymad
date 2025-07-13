import React from 'react';
import {
  Dialog, Stack, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, 
  Card, CardContent, TextField, IconButton, Tooltip, useTheme, Divider, Grid, Chip, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import dayjs from 'dayjs';
import { alpha } from '@mui/material/styles';
import { dialogButton, dialogSaveButton, dialogTitle, dialogContent, dialogActions } from './AdminReservation.styles';

export default function ReservationDetailsDialog({
  open,
  onClose,
  selectedReservation,
  editData,
  setEditData,
  handleUpdate
}) {
  const theme = useTheme();

  if (!selectedReservation || !editData) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={dialogTitle(theme)}>
        <Box display="flex" alignItems="center" gap={2}>
          <AssignmentIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={700}>
            פרטי הזמנה מלאים
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{  
            position: 'absolute', 
            right: 16, 
            top: 16,
            color: 'white', 
            bgcolor: alpha('#fff', 0.1), 
            '&:hover': {
              bgcolor: alpha('#fff', 0.2),
              transform: 'scale(1.1)' 
            },
            transition: 'all 0.2s ease'  
          }} 
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={dialogContent}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box>
            <Card sx={{ 
              mb: 4, 
              p: 2, 
              bgcolor: alpha(theme.palette.info.main, 0.05),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
              borderRadius: 3
            }}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: 'info.main' }}>
                  <PersonIcon />
                </Avatar>
                <Typography variant="h6" fontWeight={600} color="info.main">
                  פרטי לקוח
                </Typography>
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">אימייל:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedReservation.email || 'לא צוין'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">טלפון:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedReservation.phone || 'לא צוין'}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">כתובת:</Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {selectedReservation.address || 'לא צוין'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight={700} gutterBottom color="primary.main" sx={{ mb: 3 }}>
              פרטי הזמנה
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  p: 3, 
                  bgcolor: editData._editDate ? alpha(theme.palette.warning.main, 0.1) : alpha(theme.palette.grey[100], 0.5), 
                  border: editData._editDate ? `2px solid ${theme.palette.warning.main}` : '1px solid transparent', 
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] }
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <TextField
                      label="תאריך הפעילות"
                      type="date"
                      value={editData.activityDate}
                      onChange={e => setEditData({ ...editData, activityDate: e.target.value })}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      disabled={!editData._editDate}
                      sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: 2 }
                      }}
                    />
                    <Tooltip title={editData._editDate ? "נעל עריכה" : "פתח לעריכה"}>
                      <IconButton
                        onClick={() => setEditData(prev => ({ ...prev, _editDate: !prev._editDate }))}
                        sx={{
                          bgcolor: editData._editDate ? 'warning.main' : 'primary.main',
                          color: 'white',
                          minWidth: 48,
                          minHeight: 48,
                          '&:hover': {
                            bgcolor: editData._editDate ? 'warning.dark' : 'primary.dark',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ 
                  p: 3, 
                  bgcolor: editData._editStart ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.grey[100], 0.5), 
                  border: editData._editStart ? `2px solid ${theme.palette.success.main}` : '1px solid transparent', 
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] }
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <TimePicker
                      label="שעת התחלה"
                      ampm={false}
                      value={dayjs(`${editData.activityDate}T${editData.openTime}`)}
                      onChange={(value) => {
                        if (value) {
                          setEditData(prev => ({ ...prev, openTime: value.format('HH:mm') }));
                        }
                      }}
                      disabled={!editData._editStart}
                      slotProps={{ 
                        textField: { 
                          fullWidth: true, 
                          sx: { '& .MuiOutlinedInput-root': { borderRadius: 2 } } 
                        } 
                      }}
                    />
                    <Tooltip title={editData._editStart ? "נעל עריכה" : "פתח לעריכה"}>
                      <IconButton
                        onClick={() => setEditData(prev => ({ ...prev, _editStart: !prev._editStart }))}
                        sx={{
                          bgcolor: editData._editStart ? 'success.main' : 'primary.main',
                          color: 'white',
                          minWidth: 48,
                          minHeight: 48,
                          '&:hover': {
                            bgcolor: editData._editStart ? 'success.dark' : 'primary.dark',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card sx={{ 
                  p: 3, 
                  bgcolor: editData._editEnd ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.grey[100], 0.5), 
                  border: editData._editEnd ? `2px solid ${theme.palette.error.main}` : '1px solid transparent', 
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] }
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <TimePicker
                      label="שעת סיום"
                      ampm={false}
                      value={dayjs(`${editData.activityDate}T${editData.closeTime}`)}
                      onChange={(value) => {
                        if (value) {
                          setEditData(prev => ({ ...prev, closeTime: value.format('HH:mm') }));
                        }
                      }}
                      disabled={!editData._editEnd}
                      slotProps={{ 
                        textField: { 
                          fullWidth: true, 
                          sx: { '& .MuiOutlinedInput-root': { borderRadius: 2 } } 
                        } 
                      }}
                    />
                    <Tooltip title={editData._editEnd ? "נעל עריכה" : "פתח לעריכה"}>
                      <IconButton
                        onClick={() => setEditData(prev => ({ ...prev, _editEnd: !prev._editEnd }))}
                        sx={{
                          bgcolor: editData._editEnd ? 'error.main' : 'primary.main',
                          color: 'white',
                          minWidth: 48,
                          minHeight: 48,
                          '&:hover': {
                            bgcolor: editData._editEnd ? 'error.dark' : 'primary.dark',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  p: 3, 
                  bgcolor: editData._editPeople ? alpha(theme.palette.info.main, 0.1) : alpha(theme.palette.grey[100], 0.5), 
                  border: editData._editPeople ? `2px solid ${theme.palette.info.main}` : '1px solid transparent', 
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] }
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PeopleIcon color="info" sx={{ fontSize: 28 }} />
                    <TextField
                      label="מספר אנשים"
                      type="number"
                      value={editData.num_of_people}
                      onChange={e => setEditData({ ...editData, num_of_people: Number(e.target.value) })}
                      fullWidth
                      inputProps={{ min: 1, step: 1 }}
                      disabled={!editData._editPeople}
                      sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: 2 }
                      }}
                    />
                    <Tooltip title={editData._editPeople ? "נעל עריכה" : "פתח לעריכה"}>
                      <IconButton
                        onClick={() => setEditData(prev => ({ ...prev, _editPeople: !prev._editPeople }))}
                        sx={{
                          bgcolor: editData._editPeople ? 'info.main' : 'primary.main',
                          color: 'white',
                          minWidth: 48,
                          minHeight: 48,
                          '&:hover': {
                            bgcolor: editData._editPeople ? 'info.dark' : 'primary.dark',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ 
                  p: 3, 
                  bgcolor: editData._editPayment ? alpha(theme.palette.secondary.main, 0.1) : alpha(theme.palette.grey[100], 0.5), 
                  border: editData._editPayment ? `2px solid ${theme.palette.secondary.main}` : '1px solid transparent', 
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] }
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PaymentIcon color="secondary" sx={{ fontSize: 28 }} />
                    <TextField
                      label="תשלום"
                      type="number"
                      value={editData.payment}
                      onChange={e => setEditData({ ...editData, payment: Number(e.target.value) })}
                      fullWidth
                      slotProps={{ input: { min: 0, step: 1 } }}
                      disabled={!editData._editPayment}
                      sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: 2 }
                      }}
                    />
                    <Typography variant="h6" fontWeight={700} color="secondary.main">₪</Typography>
                    <Tooltip title={editData._editPayment ? "נעל עריכה" : "פתח לעריכה"}>
                      <IconButton
                        onClick={() => setEditData(prev => ({ ...prev, _editPayment: !prev._editPayment }))}
                        sx={{
                          bgcolor: editData._editPayment ? 'secondary.main' : 'primary.main',
                          color: 'white',
                          minWidth: 48,
                          minHeight: 48,
                          '&:hover': {
                            bgcolor: editData._editPayment ? 'secondary.dark' : 'primary.dark',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ 
                  p: 3, 
                  bgcolor: editData._editComment ? alpha(theme.palette.warning.main, 0.1) : alpha(theme.palette.grey[100], 0.5), 
                  border: editData._editComment ? `2px solid ${theme.palette.warning.main}` : '1px solid transparent', 
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: theme.shadows[8] }
                }}>
                  <Stack direction="row" alignItems="flex-start" spacing={2}>
                    <TextField
                      label="הערת מנהל"
                      value={editData.manager_comment}
                      onChange={e => setEditData({ ...editData, manager_comment: e.target.value })}
                      fullWidth
                      multiline
                      minRows={3}
                      disabled={!editData._editComment}
                      sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: 2 }
                      }}
                    />
                    <Tooltip title={editData._editComment ? "נעל עריכה" : "פתח לעריכה"}>
                      <IconButton
                        onClick={() => setEditData(prev => ({ ...prev, _editComment: !prev._editComment }))}
                        sx={{
                          bgcolor: editData._editComment ? 'warning.main' : 'primary.main',
                          color: 'white',
                          mt: 1,
                          minWidth: 48,
                          minHeight: 48,
                          '&:hover': {
                            bgcolor: editData._editComment ? 'warning.dark' : 'primary.dark',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ 
                  p: 3, 
                  bgcolor: alpha(theme.palette.grey[100], 0.3),
                  border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                  borderRadius: 3
                }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
                    תיאור קבוצה
                  </Typography>
                  <TextField
                    value={editData.group_description}
                    fullWidth
                    multiline
                    minRows={2}
                    disabled 
                    sx={{
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: 2,
                        bgcolor: alpha(theme.palette.grey[50], 0.5)
                      }
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </LocalizationProvider>
      </DialogContent>

      <DialogActions sx={dialogActions(theme)}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={dialogButton(theme)}
        >
          סגור
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdate}
          size="large"
          startIcon={<SaveIcon />}
          sx={dialogSaveButton(theme)}
        >
          שמור שינויים
        </Button>
      </DialogActions>
    </Dialog>
  );
}