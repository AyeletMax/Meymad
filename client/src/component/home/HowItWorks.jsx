import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CalendarToday, LocationOn, Pool } from '@mui/icons-material';

const HowItWorks = () => {
  const [hovered, setHovered] = useState([false, false, false]);

  const handleHover = idx => setHovered(h => h.map((v, i) => i === idx));
  const handleLeave = () => setHovered([false, false, false]);

  return (
    <Box sx={{ py: 8, bgcolor: '#f0fdff' }}>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          fontWeight: 800,
          color: '#006064',
          mb: 8,
          fontSize: { xs: '2rem', md: '2.8rem' }
        }}
      >
        איך זה עובד?
      </Typography>
      <Grid container spacing={6} justifyContent="center" direction="row-reverse">
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '&:hover .circle-img': {
                filter: 'brightness(1.15)',
                transition: 'filter 0.3s',
              },
            }}
            onMouseEnter={() => handleHover(0)}
            onMouseLeave={handleLeave}
          >
            <Box
              className="circle-img"
              sx={{
                width: { xs: '90px', md: '120px' },
                height: { xs: '90px', md: '120px' },
                bgcolor: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(33,150,243,0.18)',
                border: '3px solid #2196f3',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
            >
              <CalendarToday sx={{ fontSize: '2.5rem', color: '#1976d2', zIndex: 1 }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 700, mt: 2 }}>
              מזמינים תור
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                lineHeight: 1.7,
                fontSize: '1rem',
                minHeight: 48, 
                opacity: hovered[0] ? 1 : 0,
                transition: 'opacity 0.4s',
                mt: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              בוחרים תאריך ושעה פנויים<br />
              ומזמינים תור לבריכה דרך האתר
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '&:hover .circle-img': {
                filter: 'brightness(1.15)',
                transition: 'filter 0.3s',
              },
            }}
            onMouseEnter={() => handleHover(1)}
            onMouseLeave={handleLeave}
          >
            <Box
              className="circle-img"
              sx={{
                width: { xs: '90px', md: '120px' },
                height: { xs: '90px', md: '120px' },
                bgcolor: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(76,175,80,0.18)',
                border: '3px solid #4caf50',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
            >
              <LocationOn sx={{ fontSize: '2.5rem', color: '#388e3c', zIndex: 1 }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: 700, mt: 2 }}>
              מגיעים לבריכה
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                lineHeight: 1.7,
                fontSize: '1rem',
                minHeight: 48,
                opacity: hovered[1] ? 1 : 0,
                transition: 'opacity 0.4s',
                mt: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              מגיעים לבריכה בשעה שהזמנתם<br />
              ומציגים את ההזמנה בכניסה
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              '&:hover .circle-img': {
                filter: 'brightness(1.15)',
                transition: 'filter 0.3s',
              },
            }}
            onMouseEnter={() => handleHover(2)}
            onMouseLeave={handleLeave}
          >
            <Box
              className="circle-img"
              sx={{
                width: { xs: '90px', md: '120px' },
                height: { xs: '90px', md: '120px' },
                bgcolor: 'linear-gradient(135deg, #fff3e0, #ffcc02)',
                background: 'linear-gradient(135deg, #fff3e0, #ffcc02)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 18px rgba(255,193,7,0.18)',
                border: '3px solid #ffc107',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
            >
              <Pool sx={{ fontSize: '2.5rem', color: '#f57c00', zIndex: 1 }} />
            </Box>
            <Typography variant="h5" sx={{ color: '#f57c00', fontWeight: 700, mt: 2 }}>
              נהנים מהבריכה!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                lineHeight: 1.7,
                fontSize: '1rem',
                minHeight: 48,
                opacity: hovered[2] ? 1 : 0,
                transition: 'opacity 0.4s',
                mt: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              משלמים במקום ונכנסים לבריכה<br />
              לחוויה פרטית, מרעננת ומהנה
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HowItWorks;