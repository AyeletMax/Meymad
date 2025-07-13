import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Paper,
    Typography, Box, TextField, IconButton, CircularProgress, Snackbar, Alert
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import dayjs from "dayjs";
import ApiService from "../../../ApiService";
import MessageTypeChip from "./MessageTypeChip";
import { useGlobalMessage } from "../../GlobalMessageContext";
const formatDateTime = (str) => dayjs(str).format("DD/MM/YYYY HH:mm");

export default function MessageDialog({ selectedMsg, onClose, onMessageProcessed }) {
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({});
    const [actionLoading, setActionLoading] = useState(false);
    const { showMessage } = useGlobalMessage();

    const handleUpdateReservation = async (reservationId, messageId, body) => {
        setActionLoading(true);
        try {
            await ApiService.request({
                endPath: `reservations/${reservationId}`,
                method: 'PATCH',
                body: body,
                credentials: 'include'
            });

            await ApiService.request({
                endPath: `messages/${messageId}`,
                method: 'DELETE',
                credentials: 'include'
            });
            onMessageProcessed(messageId);
            showMessage('ההזמנה עודכנה בהצלחה', 'success');
        } catch (error) {
            console.error('Error updating reservation:', error);
            showMessage('שגיאה בעדכון ההזמנה', 'error');
        } finally {
            handleCloseDialog();
            setActionLoading(false);
        }
    };

    const handleEditClick = () => {
        setEditData({
            openTime: dayjs(selectedMsg.openTime).format('YYYY-MM-DDTHH:mm'),
            closeTime: dayjs(selectedMsg.closeTime).format('YYYY-MM-DDTHH:mm'),
            num_of_people: selectedMsg.num_of_people,
            payment: selectedMsg.payment
        });
        setEditMode(true);
    };

    const handleCloseDialog = () => {
        setEditMode(false);
        setEditData({});
        onClose();
    };
    if (!selectedMsg) return null;

    return (
        <>
            <Dialog open={!!selectedMsg} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <MessageTypeChip type={selectedMsg.message_type} />
                    <Box sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        {selectedMsg.message_type === "cancel" ? "בקשת ביטול" : "בקשת עדכון"}
                    </Box>
                    <IconButton onClick={handleCloseDialog}><CloseIcon /></IconButton>
                </DialogTitle>

                <DialogContent>
                    <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: "#f5faff", border: "1px solid #e3f2fd", borderRadius: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            פרטי ההזמנה:
                        </Typography>

                        {editMode ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography variant="body2"><strong>מספר הזמנה:</strong> #{selectedMsg.reservation_id}</Typography>
                                <Typography variant="body2"><strong>שם המזמין:</strong> {selectedMsg.username || "משתמש"}</Typography>
                                <Typography variant="body2"><strong>אימייל:</strong> {selectedMsg.email}</Typography>
                                <Typography variant="body2"><strong>טלפון:</strong> {selectedMsg.phone}</Typography>

                                <TextField
                                    label="תאריך ושעת התחלה"
                                    type="datetime-local"
                                    value={editData.openTime}
                                    onChange={(e) => setEditData({ ...editData, openTime: e.target.value })}
                                    fullWidth
                                   slotProps={ {InputLabel:{ shrink: true }}}
                                />

                                <TextField
                                    label="תאריך ושעת סיום"
                                    type="datetime-local"
                                    value={editData.closeTime}
                                    onChange={(e) => setEditData({ ...editData, closeTime: e.target.value })}
                                    fullWidth
                                    slotProps={ {InputLabel:{ shrink: true }}}
                                />

                                <TextField
                                    label="מספר אנשים"
                                    type="number"
                                    value={editData.num_of_people}
                                    onChange={(e) => setEditData({ ...editData, num_of_people: parseInt(e.target.value) })}
                                    fullWidth
                                />

                                <TextField
                                    label="תשלום (₪)"
                                    type="number"
                                    value={editData.payment}
                                    onChange={(e) => setEditData({ ...editData, payment: parseFloat(e.target.value) })}
                                    fullWidth
                                />

                                <Typography variant="body2"><strong>סטטוס הזמנה:</strong> {selectedMsg.reservation_status}</Typography>
                            </Box>
                        ) : (
                            <>
                                <Typography variant="body2"><strong>מספר הזמנה:</strong> #{selectedMsg.reservation_id}</Typography>
                                <Typography variant="body2"><strong>שם המזמין:</strong> {selectedMsg.username || "משתמש"}</Typography>
                                <Typography variant="body2"><strong>אימייל:</strong> {selectedMsg.email}</Typography>
                                <Typography variant="body2"><strong>טלפון:</strong> {selectedMsg.phone}</Typography>
                                <Typography variant="body2"><strong>תאריך ושעה:</strong> {formatDateTime(selectedMsg.openTime)} - {formatDateTime(selectedMsg.closeTime)}</Typography>
                                <Typography variant="body2"><strong>מספר אנשים:</strong> {selectedMsg.num_of_people}</Typography>
                                <Typography variant="body2"><strong>תשלום:</strong> ₪{selectedMsg.payment}</Typography>
                                <Typography variant="body2"><strong>סטטוס הזמנה:</strong> {selectedMsg.reservation_status}</Typography>
                            </>
                        )}
                    </Paper>

                    <Paper elevation={1} sx={{ p: 2, bgcolor: "#fff", border: "1px solid #e0e0e0", borderRadius: 2 }}>
                        <Typography variant="subtitle2" color="primary" gutterBottom>תוכן ההודעה:</Typography>
                        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>{selectedMsg.message_content}</Typography>
                    </Paper>
                </DialogContent>

                <DialogActions>
                    {editMode ? (
                        <>
                            <Button
                                onClick={() => setEditMode(false)}
                                color="secondary"
                                disabled={actionLoading}
                            >
                                ביטול
                            </Button>
                            <Button
                                onClick={() => handleUpdateReservation(selectedMsg.reservation_id, selectedMsg.id, {
                                    openTime: editData.openTime,
                                    closeTime: editData.closeTime,
                                    num_of_people: editData.num_of_people,
                                    payment: editData.payment
                                })}
                                color="primary"
                                variant="contained"
                                startIcon={<SaveIcon />}
                                disabled={actionLoading}
                            >
                                {actionLoading ? <CircularProgress size={20} /> : 'שמור עדכונים'}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={handleCloseDialog} color="secondary">סגור</Button>
                            {selectedMsg.message_type === "cancel" ? (
                                <Button
                                    onClick={() => handleUpdateReservation(selectedMsg.reservation_id, selectedMsg.id, { status: 'cancelled' },)}
                                    color="error"
                                    variant="contained"
                                    startIcon={<CancelIcon />}
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? <CircularProgress size={20} /> : 'אשר ביטול'}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleEditClick}
                                    color="primary"
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                >
                                    ערוך הזמנה
                                </Button>
                            )}
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}