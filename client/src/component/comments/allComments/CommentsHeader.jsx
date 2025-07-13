import React from 'react';
import { Box, Paper, Typography, Divider } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

const CommentsHeader = ({ stats }) => (
  <Paper elevation={3} sx={{ p: 3, mb: 3, backgroundColor: 'white' }}>
    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#1976d2' }}>
      💬 מערכת תגובות
    </Typography>
    <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
      שתף את דעתך והגב על תגובות אחרות
    </Typography>

    {stats && (
      <Box sx={{  display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mt: 2,
        p: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarIcon sx={{ color: '#ffc107' }} />
          <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            {stats.average}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ממוצע דירוגים
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2" color="text.secondary">
          {stats.total} דירוגים
        </Typography>
      </Box>
    )}
  </Paper>
);

export default CommentsHeader;
