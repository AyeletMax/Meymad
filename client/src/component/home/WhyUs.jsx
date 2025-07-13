import { Box, Typography, Grid, Card } from '@mui/material';
import { Star, Phone } from '@mui/icons-material';

const WhyUs = () => (
  <Box sx={{ py: 8, bgcolor: 'white' }}>
    <Typography
      variant="h2"
      sx={{
        textAlign: 'center',
        fontWeight: 800,
        color: '#006064',
        mb: 8,
        fontSize: { xs: '2.5rem', md: '3.5rem' }
      }}
    >
      ?למה לבחור בנו
    </Typography>
    <Grid
      container
      spacing={4}
      direction="row-reverse"
      alignItems="stretch"
      justifyContent="center"
    >
    <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{
            p: 2,
            minHeight: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            bgcolor: 'linear-gradient(135deg, #e1f5fe, #f0fdff)',
            background: 'linear-gradient(135deg, #e1f5fe, #f0fdff)',
            boxShadow: '0 8px 32px rgba(0,188,212,0.15)',
            borderRadius: '20px',
            border: '2px solid rgba(0,188,212,0.1)',
            transition: 'all 0.4s ease',
            '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 16px 48px rgba(0,188,212,0.25)',
                borderColor: '#00bcd4',
            }
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontSize: '2rem', mr: 1.5 }}>🏊‍♂️</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#006064' }}>
                    פרטיות, ניקיון ושקט
                </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.5 }}>
                הבריכה זמינה רק למזמינים – כל תור הוא פרטי,<br />
                הבריכה נקייה ומטופלת, והאווירה שקטה ונעימה.
            </Typography>
        </Card>
    </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{
          p: 2,
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          bgcolor: 'linear-gradient(135deg, #f3e5f5, #fce4ec)',
          background: 'linear-gradient(135deg, #f3e5f5, #fce4ec)',
          boxShadow: '0 8px 32px rgba(156,39,176,0.15)',
          borderRadius: '20px',
          border: '2px solid rgba(156,39,176,0.1)',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.03)',
            boxShadow: '0 16px 48px rgba(156,39,176,0.25)',
            borderColor: '#9c27b0',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Star sx={{ fontSize: '2rem', mr: 1.5, color: '#66bb6a' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#7b1fa2' }}>
              הזמנה פשוטה ומהירה
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.5 }}>
            מערכת הזמנות נוחה – מזמינים תור בקלות, מקבלים אישור, ומגיעים לבריכה בשעה שנקבעה.
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{
          p: 2,
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          bgcolor: 'linear-gradient(135deg, #e8f5e8, #f1f8e9)',
          background: 'linear-gradient(135deg, #e8f5e8, #f1f8e9)',
          boxShadow: '0 8px 32px rgba(76,175,80,0.15)',
          borderRadius: '20px',
          border: '2px solid rgba(76,175,80,0.1)',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.03)',
            boxShadow: '0 16px 48px rgba(76,175,80,0.25)',
            borderColor: '#4caf50',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography sx={{ fontSize: '2rem', mr: 1.5 }}>💳</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
              תשלום במקום
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.5 }}>
            משלמים בכניסה לבריכה – ללא צורך בתשלום מראש, פשוט מגיעים ומשלמים במקום.
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{
          p: 2,
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          bgcolor: 'linear-gradient(135deg, #fff3e0, #ffcc02)',
          background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
          boxShadow: '0 8px 32px rgba(255,152,0,0.15)',
          borderRadius: '20px',
          border: '2px solid rgba(255,152,0,0.1)',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.03)',
            boxShadow: '0 16px 48px rgba(255,152,0,0.25)',
            borderColor: '#ff9800',
          }
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Phone sx={{ fontSize: '2rem', mr: 1.5, color: '#66bb6a' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#e65100' }}>
              שירות לקוחות זמין
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#444', lineHeight: 1.5 }}>
            צוות שירות זמין לכל שאלה – נשמח לעזור לכם בכל שלב בתהליך ההזמנה וההגעה.
          </Typography>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

export default WhyUs;