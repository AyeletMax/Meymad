import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { Pool, Star, Phone, CalendarToday, CheckCircle, LocationOn } from '@mui/icons-material';
import PoolHero from './PoolHero';
import HowItWorks from './HowItWorks';
import WhyUs from './WhyUs';
import ReadyToDive from './ReadyToDive';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: '100vh', 
      overflowX: 'hidden', 
      position: 'relative',
      margin: 0,
      padding: 0
    }}>
      <PoolHero />
      <HowItWorks />
      <WhyUs />
      <ReadyToDive />
    </Box>
  );
};

export default Home;