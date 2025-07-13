import { useEffect, useState } from 'react';
import ApiService from '../../ApiService';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography, Box, CircularProgress, Button
} from '@mui/material';
import {useGlobalMessage} from "../GlobalMessageContext";
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { showMessage } = useGlobalMessage();

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const data = await ApiService.request({
                    endPath: 'users' ,
                     credentials: 'include' 
                });
                setUsers(data);
            } catch (err) {
                console.error('Error:', err);
                showMessage('שגיאה בטעינת המשתמשים: ' + (err.message || 'שגיאה לא ידועה'), 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const deleteUser = async (userId) => {
        if (!window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש?')) return;

        try {
            await ApiService.request({
                endPath: `users/${userId}`,
                method: 'DELETE',
                 credentials: 'include'
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (err) {
            console.error(err);
            showMessage('שגיםה במחיקת המשתמש', 'error');
        }
    };

    const toggleBlockUser = async (userId, currentStatus) => {
        try {
            await ApiService.request({
                endPath: `users/block/${userId}`,
                method: 'PATCH',
                body: { isBlocked: !currentStatus },
           
           credentials: 'include'});
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, isBlocked: !currentStatus } : user
                )
            );
        } catch (err) {
            console.error(err);
            showMessage('שגיםה בעדכון סטטוס המשתמש', 'error');
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3} >
            <Typography variant="h5" gutterBottom>
                ניהול משתמשים
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 500, overflow: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>מספר</TableCell>
                            <TableCell>שם משתמש</TableCell>
                            <TableCell>אימייל</TableCell>
                            <TableCell>טלפון</TableCell>
                            <TableCell>כתובת</TableCell>
                            <TableCell>סטטוס חסימה</TableCell>
                            <TableCell>פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>{user.isBlocked ? 'חסום' : 'לא חסום'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color={user.isBlocked ? 'success' : 'error'}
                                        onClick={() => toggleBlockUser(user.id, user.isBlocked)}
                                        sx={{ ml: 1 }}
                                    >
                                        {user.isBlocked ? 'בטל חסימה' : 'חסום משתמש'}
                                    </Button>
                                    <IconButton
                                        color="error"
                                        onClick={() => deleteUser(user.id)}
                                        sx={{ ml: 1 }}
                                        aria-label="מחק משתמש"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserManagement;
