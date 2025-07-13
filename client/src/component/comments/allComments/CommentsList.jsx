import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import Comment from "../comment/Comment";

const CommentsList = ({ comments, stats, currentUser, onRefresh, setLoading }) => (
  <Box sx={{ mb: 2 }}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 3,
      p: 2,
      backgroundColor: '#f8f9fa',
      borderRadius: 2
    }}>
      <Typography variant="h6" sx={{ color: '#1976d2' }}>
        כל התגובות ({comments.length})
      </Typography>

      {stats && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={parseFloat(stats.average)} readOnly size="small" precision={0.1} />
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {stats.average}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            ({stats.total} דירוגים)
          </Typography>
        </Box>
      )}
    </Box>

    {comments.map(comment => (
      <Comment
        key={comment.id}
        comment={comment}
        currentUser={currentUser}
        onRefresh={onRefresh}
        setLoading={setLoading}
      />
    ))}
  </Box>
);

export default CommentsList;
