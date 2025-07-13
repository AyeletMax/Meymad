import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Fade, alpha } from '@mui/material';
import AdminPendingList from './AdminPendingList';
import AdminRejectedList from './AdminRejectedList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0284c7',
      light: '#0891b2',
      dark: '#0369a1',
    },
    secondary: {
      main: '#06b6d4',
      light: '#67e8f9',
      dark: '#0891b2',
    },
  },
});

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const reservationsManagement = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Box dir="rtl"
         sx={{ 
          minHeight: '100vh', 
          bgcolor: 'white', 
          py: 4, 
          px: 2 
        }}>
          <Box 
          sx={{ 
            maxWidth: '100%', 
            mx: 'auto',
            bgcolor: 'white',
            borderRadius: 2,
            mb: 3,
            boxShadow: `0 2px 12px ${alpha('#0284c7', 0.1)}`
          }}>
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              textColor="primary"
              variant="fullWidth"
              TabIndicatorProps={{
                sx: {
                  bgcolor: activeTab === 1 ? '#d32f2f' : '#1976d2', 
                  height: 3,
                  borderRadius: 1.5,
                  transition: 'background-color 0.3s',
                }
              }}
              sx={{
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  py: 2,
                },
                '& .MuiTab-root:nth-of-type(2)': {
                  color: '#d32f2f',
                },
                '& .Mui-selected:nth-of-type(2)': {
                  color: '#d32f2f',
                },
              }}
            >
              <Tab label="הזמנות ממתינות לאישור" />
              <Tab label="הזמנות שנדחו" />
            </Tabs>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Fade in={activeTab === 0} timeout={250} unmountOnExit>
              <Box hidden={activeTab !== 0}>
                <AdminPendingList />
              </Box>
            </Fade>

            <Fade in={activeTab === 1} timeout={250} unmountOnExit>
              <Box hidden={activeTab !== 1}>
                <AdminRejectedList />
              </Box>
            </Fade>
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default reservationsManagement;