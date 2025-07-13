import React, { useState } from 'react';
import { Box, TextField, Button, Card, CardContent, Typography, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import dayjs from 'dayjs';
import ApiService from '../../ApiService';
import { useGlobalMessage } from "../GlobalMessageContext";
export default function AdminDayReservations() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showMessage } = useGlobalMessage();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const start = dayjs(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      const end = dayjs(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      const data = await ApiService.request({
        endPath: `reservations?status=approved&start=${start}&end=${end}`, credentials: 'include'
      });
      setReservations(data);
    } catch (e) {
      setReservations([]);
      showMessage('שגיאה בטעינת ההזמנות', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Card sx={{ my: 4 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={3}>
            <Typography variant="h6">הצג הזמנות לפי יום:</Typography>
            <TextField
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={handleSearch} disabled={loading}>
              חפש
            </Button>
          </Stack>
          {reservations.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>מזהה</TableCell>
                  <TableCell>שם משתמש</TableCell>
                  <TableCell>שעת התחלה</TableCell>
                  <TableCell>שעת סיום</TableCell>
                  <TableCell>תאור קבוצה</TableCell>
                  <TableCell>מספר אנשים</TableCell>
                  <TableCell>תשלום</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations.map(res => (
                  <TableRow key={res.id}>
                    <TableCell>{res.id}</TableCell>
                    <TableCell>{res.username}</TableCell>
                    <TableCell>{dayjs(res.openTime).format('HH:mm')}</TableCell>
                    <TableCell>{dayjs(res.closeTime).format('HH:mm')}</TableCell>
                    <TableCell>{res.group_description}</TableCell>
                    <TableCell>{res.num_of_people}</TableCell>
                    <TableCell>{res.payment} ש"ח</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography color="text.secondary" align="center">
              {loading ? 'טוען...' : 'אין הזמנות ליום זה'}
            </Typography>
          )}
        </CardContent>
      </Card>
  );
}