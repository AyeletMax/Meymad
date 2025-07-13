import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, Button, Drawer,
  List, ListItemButton, ListItemIcon, Tooltip, Avatar,
  Menu, MenuItem
} from '@mui/material';
import {
  AccountCircle, CalendarToday, MonetizationOn,
  MenuBook, Phone, Update, ChatBubbleOutline
} from "@mui/icons-material";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';
import AdminMessages from '../admin/adminMessages/AdminMessages';
import ApiService from '../../ApiService';
import { useGlobalMessage } from "../GlobalMessageContext";
import ProtectedRoute from '../ProtectedRoute';
import { navStyles } from './nav.styles';

const Nav = () => {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const { showMessage } = useGlobalMessage();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleLogin = () => navigate('/login');

  const handleLogout = async () => {
    try {
      await ApiService.request({
        endPath: "auth/logout",
        method: "POST",
        credentials: "include"
      });
    } catch (e) {
      console.error("Logout error:", e);
      showMessage("הייתה שגיאה בעת ההתנתקות. אנא נסה שוב מאוחר יותר.", "error");
      return;
    }

    setCurrentUser({ username: "", id: "", email: "", role: "" });
    setAnchorEl(null);
    navigate('/login', { replace: true });

    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('popstate', handlePopState);
    });
  };

  const navigationItems = [
    { icon: <AccountCircle />, to: '/info', label: 'אזור אישי' },
    { icon: <MonetizationOn />, to: '/pricing', label: 'מחירים' },
    { icon: <MenuBook />, to: '/guide', label: 'מדריך' },
    { icon: <Phone />, to: '/contact', label: 'צור קשר' },
    { icon: <Update />, to: '/updates', label: 'עדכונים' },
    { icon: <ChatBubbleOutline />, to: '/comments', label: 'תגובות' },
    { icon: <CalendarToday />, to: '/orderHistory', label: 'היסטוריית הזמנות' },
  ];

const pathsToHideLogo = [
  "/admin/userManagement",
  "/admin/orderManagement",
  "/admin/day-reservations",
  "/login",
  "/register",
  "/info",
  "/pricing"
];

const hideLogo = pathsToHideLogo.includes(location.pathname);

  return (
    <Box sx={navStyles.mainContainer}>
      {/* {!hideLogo && (
        <Box
          component={Link}
          to="/"
          sx={navStyles.logoContainer}
        >
          <Box
            component="img"
            src="/img/logo.png"
            alt="לוגו מימד"
            sx={navStyles.logoImage}
          />
        </Box>
      )} */}

      <AppBar
        position="fixed"
        elevation={1}
        sx={navStyles.appBar}
      >
        <Toolbar sx={navStyles.toolbar}>
          <Box sx={navStyles.leftButtonGroup}>
            <Button component={Link} to="/register" sx={navStyles.regularButton}>
              הרשמה
            </Button>
            <Button
              component={Link}
              to="/newOrder"
              sx={navStyles.newOrderButton}
            >
              הזמנה חדשה
            </Button>
            
            {currentUser.role === 'admin' && (
              <>
                <ProtectedRoute adminOnly={true}>
                  <AdminMessages />
                </ProtectedRoute>
                <Button component={Link} to="/admin/userManagement" sx={navStyles.regularButton}>
                  ניהול משתמשים
                </Button>
                <Button component={Link} to="/admin/orderManagement" sx={navStyles.regularButton}>
                  ניהול הזמנות
                </Button>
                <Button component={Link} to="/admin/day-reservations" sx={navStyles.regularButton}>
                  הזמנות לפי יום
                </Button>
              </>
            )}
            
            <Button sx={navStyles.regularButton}>050-4103390</Button>
          </Box>

          <Box sx={navStyles.rightButtonGroup}>
            {currentUser.username !== "" ? (
              <>
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  startIcon={
                    <Avatar sx={navStyles.userAvatar}>
                      {currentUser.username?.charAt(0) || ''}
                    </Avatar>
                  }
                  sx={navStyles.userButton}
                >
                  {currentUser.username}
                </Button>
                <Menu 
                  anchorEl={anchorEl} 
                  open={Boolean(anchorEl)} 
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout}>התנתק</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                onClick={handleLogin} 
                startIcon={<AccountCircle />} 
                sx={navStyles.regularButton}
              >
                התחברות
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        anchor="right"
        sx={navStyles.drawer}
      >
        <Toolbar />
        <Box sx={navStyles.drawerSpacing} />
        <List>
          {navigationItems.map((item) => (
            <Tooltip key={item.label} title={item.label} placement="left">
              <ListItemButton 
                component={Link} 
                to={item.to} 
                sx={navStyles.navButton}
              >
                <ListItemIcon sx={navStyles.navIcon}>
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={navStyles.mainContent}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Nav;