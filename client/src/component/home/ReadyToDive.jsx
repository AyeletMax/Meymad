import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const ReadyToDive = () => (
  <Box
    sx={{
      py: 15,
      background: 'linear-gradient(135deg,rgb(36, 234, 234) 0%, #00838f 50%, #00acc1 100%)',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        `,
        animation: 'ctaGlow 6s ease-in-out infinite alternate',
      },
      '@keyframes ctaGlow': {
        '0%': { opacity: 0.3 },
        '100%': { opacity: 0.8 },
      },
    }}
  >
    <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          mb: 4,
          fontSize: { xs: '2.5rem', md: '5rem' },
          textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        מוכנים לצלילה מרעננת?
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 6,
          opacity: 0.95,
          lineHeight: 1.6,
          fontSize: { xs: '1.3rem', md: '1.8rem' }
        }}
      >
        הזמינו עכשיו תור לבריכה הפרטית שלנו
        <br />
        ותיהנו מחוויה מושלמת של מים, פרטיות וניקיון!
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          component={Link}
          to="/newOrder"
          size="large"
          sx={{
            bgcolor: '#66bb6a',
            color: 'white',
            px: 8,
            py: 3.5,
            fontSize: '1.5rem',
            fontWeight: 700,
            borderRadius: '50px',
            boxShadow: '0 8px 30px rgba(102,187,106,0.5)',
            transition: 'all 0.4s ease',
            '&:hover': {
              bgcolor: '#43a047',
              transform: 'translateY(-5px) scale(1.05)',
              boxShadow: '0 15px 50px rgba(67,160,71,0.7)',
            },
          }}
        >
          🏊‍♀️ הזמן תור לבריכה
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/pricing"
          size="large"
          sx={{
            borderColor: 'white',
            color: 'white',
            px: 8,
            py: 3.5,
            fontSize: '1.5rem',
            fontWeight: 700,
            borderRadius: '50px',
            borderWidth: '3px',
            transition: 'all 0.4s ease',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.15)',
              borderColor: 'white',
              borderWidth: '3px',
              transform: 'translateY(-5px)',
            },
          }}
        >
          💰 צפה במחירים
        </Button>
      </Box>
    </Container>
  </Box>
);

export default ReadyToDive;