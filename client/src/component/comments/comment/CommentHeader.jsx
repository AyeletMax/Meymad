import React from 'react';
import { Avatar, Box, Chip, Typography, Rating } from '@mui/material';
import { Person as PersonIcon, AccessTime as TimeIcon, Star as StarIcon } from '@mui/icons-material';

const CommentHeader = ({ comment, canModify, isMain }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
          <PersonIcon />
        </Avatar>
        <Box>
          <Typography fontWeight="bold">{comment.name}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
            {canModify && <Chip label="אתה" size="small" color="success" variant="outlined" />}
            {isMain && <Chip label="תגובה ראשית" size="small" color="primary" variant="outlined" />}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <TimeIcon fontSize="small" color="disabled" />
            <Typography variant="caption">{formatDate(comment.created_at)}</Typography>
          </Box>
        </Box>
      </Box>
      {isMain && comment.rating && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption">דירוג</Typography>
          <Rating value={comment.rating} readOnly size="small" precision={1} />
          <Typography variant="body2">{comment.rating} כוכבים</Typography>
          <StarIcon fontSize="small" color="warning" />
        </Box>
      )}
    </Box>
  );
};

export default CommentHeader;
