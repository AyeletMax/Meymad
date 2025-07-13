import React from 'react';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import {
  Reply as ReplyIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const CommentActions = ({
  canModify,
  hasReplies,
  showReplies,
  setShowReplies,
  setIsEditing,
  onDelete, 
  showReplyForm,
  setShowReplyForm,
  loading
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
      <Button
        startIcon={<ReplyIcon />}
        onClick={() => setShowReplyForm(!showReplyForm)}
        disabled={loading}
        size="small"
      >
        הגב
      </Button>

      {canModify && (
        <>
          <IconButton size="small" onClick={() => setIsEditing(true)} disabled={loading}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setOpenDeleteDialog(true)}
            color="error"
            disabled={loading}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      )}

      {hasReplies && (
        <Button
          startIcon={showReplies ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setShowReplies(!showReplies)}
          size="small"
        >
          {showReplies ? 'הסתר תגובות' : 'הצג תגובות'}
        </Button>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', color: 'error.main' }}>
          מחיקת תגובה
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: 'center', mb: 2 }}>
            האם אתה בטוח שברצונך למחוק את התגובה?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            פעולה זו תמחק גם את כל התגובות המשנה ואינה ניתנת לביטול.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            variant="outlined"
          >
            ביטול
          </Button>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false);
              onDelete();
            }}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'מוחק...' : 'מחק תגובה'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommentActions;
