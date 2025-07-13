import React from 'react';
import {
  Collapse, Paper, Typography, Stack, TextField,
  Rating, Box, Button, Chip
} from '@mui/material';

const AddCommentForm = ({ show, comment, setComment, handleAdd, loading, toggle }) => (
  <Collapse in={show}>
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        הוסף תגובה חדשה
      </Typography>
      <Stack spacing={3}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="תוכן התגובה"
          value={comment.body}
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
          error={!comment.body.trim() && comment.body !== ''}
          helperText={!comment.body.trim() && comment.body !== '' ? 'שדה חובה' : ''}
        />

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            דירוג:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Rating
              name="comment-rating"
              value={comment.rating}
              onChange={(event, newValue) => {
                setComment({ ...comment, rating: newValue || 0 });
              }}
              size="large"
              precision={1}
            />
            {comment.rating > 0 && (
              <Chip label={`${comment.rating} כוכבים`} size="small" color="primary" variant="outlined" />
            )}
          </Box>
          {comment.rating === 0 && (
            <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5 }}>
              יש לבחור דירוג
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={handleAdd}
            disabled={!comment.body.trim() || comment.rating === 0 || loading}
          >
            {loading ? 'מפרסם...' : 'פרסם תגובה'}
          </Button>
          <Button
            variant="outlined"
            onClick={toggle}
            disabled={loading}
          >
            ביטול
          </Button>
        </Stack>
      </Stack>
    </Paper>
  </Collapse>
);

export default AddCommentForm;
