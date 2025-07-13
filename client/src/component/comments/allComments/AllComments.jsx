import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { useUser } from "../../UserContext";
import ApiService from '../../../ApiService';
import CommentsHeader from './CommentsHeader';
import AddCommentForm from './AddCommentForm';
import CommentsList from './CommentsList';
import { useGlobalMessage } from "../../GlobalMessageContext";

const AllComments = () => {
  const { currentUser } = useUser();
  const { showMessage } = useGlobalMessage();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComment, setNewComment] = useState({ body: '', rating: 0 });

  useEffect(() => { fetchAllComments(); }, []);

  const fetchAllComments = async () => {
    setLoading(true);
    try {
      const data = await ApiService.request({ endPath: 'comments' });
      setComments(data || []);
    } catch (err) {
      const msg = 'שגיאה בטעינת התגובות: ' + (err.message || err.error || 'שגיאה לא ידועה');
      showMessage(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (commentData) => {
    setLoading(true);
    try {
      await ApiService.request({
        endPath: 'comments',
        method: 'POST',
        body: commentData,
         credentials: 'include'
      });
      await fetchAllComments();
      showMessage('התגובה נוספה בהצלחה!', "success");
      return true;
    } catch (err) {
      const msg = 'שגיאה בהוספת התגובה: ' + (err.message || err.error || 'שגיאה לא ידועה');
      showMessage(msg, "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const validateUser = () => {
    if (!currentUser?.email || !currentUser?.id) {
      showMessage('יש להתחבר כדי להגיב', "error");
      return false;
    }
    return true;
  };

  const validateComment = (commentData) => {
    if (!commentData.body?.trim()) {
      showMessage('יש למלא את תוכן התגובה', "error");
      return false;
    }
    if (commentData.rating === 0) {
      showMessage('יש לבחור דירוג', "error");
      return false;
    }
    return true;
  };

  const handleAddComment = async () => {
    if (!validateUser() || !validateComment(newComment)) return;

    const commentData = {
      user_id: currentUser.id,
      name: currentUser.username,
      email: currentUser.email,
      body: newComment.body,
      rating: newComment.rating
    };

    const success = await createComment(commentData);
    if (success) {
      setNewComment({ body: '', rating: 0 });
      setShowAddForm(false);
    }
  };

  const stats = (() => {
    const main = comments.filter(comment => comment.rating > 0);
    if (!main.length) return null;
    const total = main.length;
    const totalScore = main.reduce((sum, c) => sum + c.rating, 0);
    const average = (totalScore / total).toFixed(1);
    return { total, average, totalScore };
  })();

  const renderContent = () => {
    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <CircularProgress />
    </Box>;
    if (comments.length === 0) return <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary">
        עדיין אין תגובות
      </Typography>
      <Typography variant="body2" color="text.secondary">
        היה הראשון להגיב!
      </Typography>
    </Paper>;
    return (
      <CommentsList
        comments={comments}
        stats={stats}
        currentUser={currentUser}
        onRefresh={fetchAllComments}
        setLoading={setLoading}
      />
    );
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto',
      p: { xs: 2, md: 3 },
      pb: 4
    }}>
      <CommentsHeader stats={stats} />
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => setShowAddForm(!showAddForm)}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          {showAddForm ? 'ביטול' : 'הוסף תגובה חדשה'}
        </Button>
      </Box>
      <AddCommentForm
        show={showAddForm}
        comment={newComment}
        setComment={setNewComment}
        handleAdd={handleAddComment}
        loading={loading}
        toggle={() => setShowAddForm(false)}
      />
      {renderContent()}
    </Box>
  );
};

export default AllComments;
