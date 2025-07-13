import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, TextField, Typography, Stack, Chip, Fade, Slide, Tooltip, Badge
} from '@mui/material';
import {
  Assignment as AssignmentIcon, AccountCircle as AccountCircleIcon, Event as EventIcon,
  AccessTime as AccessTimeIcon, People as PeopleIcon, Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon, Cancel as CancelIcon, FilterList as FilterListIcon,
  Sort as SortIcon, Search as SearchIcon
} from '@mui/icons-material';
import dayjs from 'dayjs';
import ReservationDetailsDialog from './ReservationDetailsDialog';
import ApiService from '../../../ApiService';
import socket from "../../../socket";
import { useGlobalMessage } from "../../GlobalMessageContext";
import { 
  poolColors, 
  tableStyles, 
  getTableColors, 
  getAnimationStyles, 
  iconStyles 
} from './AdminReservation.styles';

export default function AdminReservationTable({ 
  fetchReservations,
  tableColor, 
  approveButtonLabel,
  approveButtonTooltip,
  showReject, 
  emptyMessage, 
  approveAlertMessage
}) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  const [originalPayment, setOriginalPayment] = useState(null);
  
  const { showMessage, showConfirm } = useGlobalMessage();
  const colors = getTableColors(tableColor);
  const animationStyles = getAnimationStyles();

  const updateReservation = async (id, body) => {
    try {
      await ApiService.request({
        endPath: `reservations/${id}`,
        method: "PATCH",
        body,
        credentials: 'include'
      });
      fetchList();
      if (approveAlertMessage) showMessage(approveAlertMessage, 'success');
    } catch (err) {
      showMessage(err.message || 'שגיאה באישור ההזמנה', 'error');
    }
  };

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchReservations();
      const sortedData = data.sort((a, b) =>
        dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
      );
      setReservations(sortedData);
    } catch (error) {
      setReservations([]);
    }
    setLoading(false);
  }, [fetchReservations]);

  const handleReject = async (id) => {
    try {
      await updateReservation(id, { status: 'rejected' });
      fetchList();
      showMessage('ההזמנה נדחתה', 'success');
    } catch (err) {
      console.error('Error rejecting reservation:', err);
      showMessage(err.message || 'שגיאה בדחיית ההזמנה', 'error');
    }
  };

  const handleRowClick = (reservation) => {
    setSelectedReservation(reservation);
    setOpenDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const openDateTime = dayjs(`${editData.activityDate} ${editData.openTime}`).format('YYYY-MM-DD HH:mm:ss');
      const closeDateTime = dayjs(`${editData.activityDate} ${editData.closeTime}`).format('YYYY-MM-DD HH:mm:ss');

      const isOtherFieldChanged =
        editData.openTime !== dayjs(selectedReservation.openTime).format('HH:mm') ||
        editData.closeTime !== dayjs(selectedReservation.closeTime).format('HH:mm') ||
        Number(editData.num_of_people) !== Number(selectedReservation.num_of_people) ||
        (editData.manager_comment || '') !== (selectedReservation.manager_comment || '');

      if (isOtherFieldChanged && Number(editData.payment) === Number(originalPayment)) {
        const ok = await showConfirm('שינית שדה, יש לעדכן גם את התשלום');
        if (ok) return; 
      }

      let body = {
        manager_comment: editData.manager_comment,
        openTime: openDateTime,
        closeTime: closeDateTime,
        num_of_people: editData.num_of_people,
        payment: editData.payment,
        group_description: editData.group_description
      };
      
      await updateReservation(selectedReservation.id, body);
      showMessage('ההזמנה עודכנה', 'success');
      fetchList();
      setOpenDialog(false);
    } catch (err) {
      console.error('Error updating reservation:', err);
      showMessage(err.message || 'שגיאה בעדכון ההזמנה', 'error');
    }
  };

  const filteredAndSorted = useMemo(() => {
    let data = reservations;

    if (filterText.trim()) {
      data = data.filter(r =>
        (r.username || '').toLowerCase().includes(filterText.toLowerCase()) ||
        (r.email || '').toLowerCase().includes(filterText.toLowerCase()) ||
        (r.phone || '').toLowerCase().includes(filterText.toLowerCase()) ||
        (r.group_description || '').toLowerCase().includes(filterText.toLowerCase())
      );
    }

    data = [...data].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'createdAt' || sortField === 'openTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [reservations, filterText, sortField, sortDirection]);

  const tableColumns = [
    { label: 'מזהה', icon: <AssignmentIcon />, key: 'id' },
    { label: 'שם משתמש', icon: <AccountCircleIcon />, key: 'username' },
    { label: 'תאריך יצירה', icon: <EventIcon />, key: 'createdAt' },
    { label: 'תאריך פעילות', icon: <EventIcon />, key: 'activityDate' },
    { label: 'שעת התחלה', icon: <AccessTimeIcon />, key: 'openTime' },
    { label: 'שעת סיום', icon: <AccessTimeIcon />, key: 'closeTime' },
    { label: 'מספר אנשים', icon: <PeopleIcon />, key: 'num_of_people' },
    { label: 'תשלום', icon: <PaymentIcon />, key: 'payment' },
    { label: 'פעולות', icon: null, key: 'actions' }
  ];

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  useEffect(() => {
    if (selectedReservation) {
      setEditData({
        manager_comment: selectedReservation.manager_comment || '',
        openTime: dayjs(selectedReservation.openTime).format('HH:mm'),
        closeTime: dayjs(selectedReservation.closeTime).format('HH:mm'),
        activityDate: dayjs(selectedReservation.openTime).format('YYYY-MM-DD'),
        num_of_people: selectedReservation.num_of_people,
        payment: selectedReservation.payment,
        group_description: selectedReservation.group_description || '',
        _editPeople: false,
        _editPayment: false,
        _editDate: false,
        _editStart: false,
        _editEnd: false,
        _editComment: false,
        _editGroupDescription: false
      });
      setOriginalPayment(selectedReservation.payment);
    }
  }, [selectedReservation]);

  useEffect(() => {
    socket.emit('join', 'admin');
    socket.on('newReservation', fetchList);
    return () => {
      socket.off('newReservation', fetchList);
    };
  }, [fetchList]);

  if (loading) {
    return (
      <Box sx={tableStyles.loadingContainer(colors)}>
        <Box sx={tableStyles.loadingSpinner(colors)} />
        <Typography variant="body1" sx={tableStyles.loadingText(colors)}>
          טוען הזמנות...
        </Typography>
      </Box>
    );
  }

  const renderTableCell = (row, column) => {
    const { key } = column;
    
    switch (key) {
      case 'id':
        return (
          <TableCell sx={tableStyles.idCell(colors)}>
            #{row.id}
          </TableCell>
        );
      
      case 'username':
        return (
          <TableCell sx={tableStyles.tableCell}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountCircleIcon sx={{ color: colors.primary, ...iconStyles.small }} />
              <Typography fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                {row.username}
              </Typography>
            </Box>
          </TableCell>
        );
      
      case 'createdAt':
        return (
          <TableCell sx={tableStyles.tableCell}>
            {dayjs(row.createdAt).format('DD/MM/YYYY HH:mm')}
          </TableCell>
        );
      
      case 'activityDate':
        return (
          <TableCell sx={{ py: 1.5 }}>
            <Chip 
              label={dayjs(row.openTime).format('DD/MM/YYYY')}
              sx={tableStyles.dateChip(colors)}
              size="small"
            />
          </TableCell>
        );
      
      case 'openTime':
        return (
          <TableCell sx={{ py: 1.5 }}>
            <Chip 
              label={dayjs(row.openTime).format('HH:mm')}
              sx={tableStyles.startTimeChip(colors)}
              size="small"
            />
          </TableCell>
        );
      
      case 'closeTime':
        return (
          <TableCell sx={{ py: 1.5 }}>
            <Chip 
              label={dayjs(row.closeTime).format('HH:mm')}
              sx={tableStyles.endTimeChip(colors)}
              size="small"
            />
          </TableCell>
        );
      
      case 'num_of_people':
        return (
          <TableCell sx={tableStyles.tableCell}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PeopleIcon sx={{ ...iconStyles.small, color: colors.primary }} />
              <Typography fontWeight={500} sx={{ fontSize: '0.8rem' }}>
                {row.num_of_people}
              </Typography>
            </Box>
          </TableCell>
        );
      
      case 'payment':
        return (
          <TableCell sx={{ py: 1.5 }}>
            <Chip 
              label={`${row.payment} ₪`}
              sx={tableStyles.paymentChip(colors)}
            />
          </TableCell>
        );
      
      case 'actions':
        return (
          <TableCell align="center" sx={{ py: 1.5 }}>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Tooltip title={approveButtonTooltip}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation();
                    updateReservation(row.id, {status: 'approved'});
                  }}
                  startIcon={<CheckCircleIcon sx={iconStyles.small} />}
                  sx={tableStyles.approveButton(colors)}
                >
                  {approveButtonLabel}
                </Button>
              </Tooltip>
              {showReject && (
                <Tooltip title="דחה הזמנה">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReject(row.id);
                    }}
                    startIcon={<CancelIcon sx={iconStyles.small} />}
                    sx={tableStyles.rejectButton(colors)}
                  >
                    דחה
                  </Button>
                </Tooltip>
              )}
            </Stack>
          </TableCell>
        );
      
      default:
        return <TableCell sx={tableStyles.tableCell}>{row[key]}</TableCell>;
    }
  };

  return (
    <Box sx={tableStyles.mainContainer}>
      <Fade in timeout={animationStyles.fadeIn.timeout}>
        <Box sx={tableStyles.filtersContainer(colors)}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ md: 'center' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
              <SearchIcon sx={{ color: colors.primary, ...iconStyles.large }} />
              <TextField
                label="חיפוש"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                size="small"
                variant="outlined"
                fullWidth
                sx={tableStyles.searchField(colors)}
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterListIcon sx={{ color: colors.primary, ...iconStyles.large }} />
              <TextField
                select
                label="מיון"
                value={sortField}
                onChange={e => setSortField(e.target.value)}
                size="small"
                variant="outlined"
                slotProps={{ select: { native: true } }}
                sx={tableStyles.sortField}
              >
                <option value="createdAt">תאריך יצירה</option>
                <option value="num_of_people">מספר אנשים</option>
                <option value="openTime">שעת התחלה</option>
              </TextField>
            </Box>
            
            <Tooltip title="החלף כיוון מיון">
              <Button
                variant="contained"
                onClick={() => setSortDirection(d => d === 'asc' ? 'desc' : 'asc')}
                sx={tableStyles.sortButton(colors)}
              >
                <SortIcon sx={tableStyles.sortIcon(sortDirection)} />
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      </Fade>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Badge badgeContent={reservations.length} color="secondary" max={999}>
          <Chip 
            label={`מס' הזמנות: ${reservations.length}`}
            sx={tableStyles.reservationsChip(colors)}
          />
        </Badge>
      </Box>

      <Fade in timeout={animationStyles.slideIn.timeout}>
        <Box sx={tableStyles.tableContainer(colors)}>
          <TableContainer sx={{ overflowX: 'visible' }}>
            <Table sx={{ minWidth: 0 }}>
              <TableHead>
                <TableRow sx={tableStyles.tableHeader(colors)}>
                  {tableColumns.map(({ label, icon }) => (
                    <TableCell
                      key={label}
                      sx={{
                        ...tableStyles.headerCell,
                        textAlign: label === 'פעולות' ? 'center' : 'right',
                        minWidth: label === 'פעולות' ? 180 : 'auto'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5, 
                        justifyContent: label === 'פעולות' ? 'center' : 'flex-start' 
                      }}>
                        {icon && React.cloneElement(icon, { sx: iconStyles.medium })}
                        {label}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAndSorted.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} align="center">
                      <Box sx={tableStyles.emptyContainer(colors)}>
                        <Box sx={tableStyles.emptyIcon(colors)}>
                          <AssignmentIcon sx={{ ...iconStyles.extraLarge, color: colors.primary, opacity: 0.5 }} />
                        </Box>
                        <Typography variant="body1" color="text.secondary" sx={tableStyles.emptyText}>
                          {emptyMessage}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
                {filteredAndSorted.map((row, index) => (
                  <Slide 
                    key={row.id} 
                    direction="up" 
                    in 
                    timeout={animationStyles.staggeredSlide(index).timeout}
                  >
                    <TableRow
                      hover
                      sx={tableStyles.tableRow(colors)}
                      onClick={() => handleRowClick(row)}
                    >
                      {tableColumns.map((column) => (
                        <React.Fragment key={`${row.id}-${column.key}`}>
                          {renderTableCell(row, column)}
                        </React.Fragment>
                      ))}
                    </TableRow>
                  </Slide>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Fade>

      <ReservationDetailsDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        selectedReservation={selectedReservation}
        editData={editData}
        setEditData={setEditData}
        handleUpdate={handleUpdate}
      />
    </Box>
  );
}