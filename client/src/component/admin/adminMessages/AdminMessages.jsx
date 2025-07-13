import React, { useEffect, useState } from "react";
import {
    Badge, Box, Drawer, IconButton, Tooltip, Divider, CircularProgress, List, Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import CloseIcon from "@mui/icons-material/Close";
import ApiService from "../../../ApiService";
import { useUser } from "../../UserContext";
import MessageListItem from "./MessageListItem";
import MessageDialog from "./MessageDialog";
import socket from "../../../socket";



export default function AdminMessages() {
    const { currentUser } = useUser();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState(null);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const data = await ApiService.request({ endPath: "messages", credentials: 'include' });
            setMessages(data || []);
        } catch {
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleMessageProcessed = (messageId) => {
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
    };

    const handleCloseDialog = () => {
        setSelectedMsg(null);
    };

    useEffect(() => {
        if (open && currentUser?.role === "admin") {
            fetchMessages();
        }
    }, [open, currentUser]);

    useEffect(() => {
        socket.emit('join', 'admin');
        socket.on('newAdminMessage', (msg) => {
            setMessages(prev => [msg, ...prev]);
        });

        return () => {
            socket.off('newAdminMessage');
        };
    }, []);


    return (
        <>
            {messages.length > 0 && (
                <Tooltip title="הודעות חדשות מהמזמינים">
                    <IconButton
                        color="primary"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{ position: "fixed", top: 32, left: 32, zIndex: 2000, bgcolor: "#fff", boxShadow: 3 }}
                    >
                        <Badge badgeContent={messages.length} color="error">
                            <NotificationsIcon fontSize="large" />
                        </Badge>
                    </IconButton>
                </Tooltip>
            )}
            
            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{Paper:{ sx: { width: { xs: "100vw", sm: 420 }, p: 0, bgcolor: "#f9f9f9" } }}}
            >
                <Box sx={{ display: "flex", alignItems: "center", p: 2, bgcolor: "#1976d2", color: "#fff" }}>
                    <MessageIcon sx={{ mr: 1 }} />
                    <Box sx={{ flexGrow: 1, fontWeight: "bold" }}>הודעות חדשות</Box>
                    <IconButton onClick={() => setOpen(false)} sx={{ color: "#fff" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : messages.length === 0 ? (
                    <Box sx={{ textAlign: "center", mt: 6, color: "text.secondary" }}>
                        <MessageIcon sx={{ fontSize: 60, opacity: 0.2 }} />
                        <Typography variant="h6" sx={{ mt: 2 }}>אין הודעות חדשות</Typography>
                    </Box>
                ) : (
                    <List sx={{ p: 0 }}>
                        {messages.map((msg) => (
                            <MessageListItem key={msg.id} msg={msg} onClick={setSelectedMsg} />
                        ))}
                    </List>
                )}
            </Drawer>

            <MessageDialog
                selectedMsg={selectedMsg}
                onClose={handleCloseDialog}
                onMessageProcessed={handleMessageProcessed}
            />
        </>
    );
}