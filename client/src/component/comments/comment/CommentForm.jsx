import React from 'react';
import { Box, Button, Rating, Stack, TextField, Typography, Chip } from '@mui/material';

const CommentForm = ({
  isEdit = false,
  replyTo = '',
  editData,
  setEditData,
  replyText,
  setReplyText,
  onCancel,
  onSubmit,
  isMain = false,
  loading
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={2}>
        {isEdit ? (
          <>
            <TextField
              multiline
              rows={3}
              label="תוכן התגובה"
              value={editData.body}
              onChange={(e) => setEditData({ ...editData, body: e.target.value })}
            />
            {isMain && (
              <Box>
                <Typography variant="subtitle2">דירוג:</Typography>
                <Rating
                  value={editData.rating}
                  onChange={(e, newVal) => setEditData({ ...editData, rating: newVal || 0 })}
                  size="large"
                />
                {editData.rating > 0 && (
                  <Chip label={`${editData.rating} כוכבים`} color="primary" variant="outlined" />
                )}
              </Box>
            )}
          </>
        ) : (
          <>
            <Typography variant="subtitle2">תגובה ל: {replyTo}</Typography>
            <TextField
              multiline
              rows={3}
              label="תגובה"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </>
        )}

        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={onSubmit} disabled={loading}>
            {loading ? 'שולח...' : isEdit ? 'שמור' : 'שלח'}
          </Button>
          <Button variant="outlined" onClick={onCancel} disabled={loading}>
            ביטול
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CommentForm;
