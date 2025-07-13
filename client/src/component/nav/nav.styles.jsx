// navStyles.js - קובץ העיצובים המתוקן עבור קומפוננטת הניווט

export const drawerWidth = 72;
export const mainColor = '#e0f7fa';

export const navStyles = {
  // Container עיקרי
  mainContainer: {
    display: 'flex',
    minHeight: '100vh',
    bgcolor: '#f0fefe'
  },

  // לוגו
  logoContainer: {
    position: 'fixed',
    bottom:470,      // במקום top
    left: 20,        // במקום right
    right: 'auto',   // הוסיפי שורה זו
    top: 'auto',     // הוסיפי שורה זו
    zIndex: (theme) => theme.zIndex.drawer + 10,
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.25s cubic-bezier(.4,2,.6,1)',
    '&:hover': {
      transform: 'scale(1.10)',
    }
  },
  
  logoImage: {
    height: 120,
    width: 'auto',
    display: 'block'
  },

  // AppBar
  appBar: {
    bgcolor: mainColor,
    color: '#007c91',
    borderBottom: '1px solid #b2ebf2',
    zIndex: (theme) => theme.zIndex.drawer + 1,
  },

  // Toolbar
  toolbar: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    pr: { sm: `${drawerWidth + 20}px` } // מוסיף מקום לניתוב הצדדי
  },

  // קבוצת כפתורים שמאלית
  leftButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
    flexGrow: 1
  },

  // קבוצת כפתורים ימנית
  rightButtonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },

  // כפתורים רגילים
  regularButton: {
    color: '#007c91'
  },

  // כפתור הזמנה חדשה
  newOrderButton: {
    bgcolor: '#00acc1',
    color: '#fff',
    '&:hover': { bgcolor: '#00838f' }
  },

  // כפתור משתמש
  userButton: {
    textTransform: 'none',
    fontWeight: 600,
    color: '#007c91'
  },

  // אווטר משתמש
  userAvatar: {
    bgcolor: '#00bcd4'
  },

  // Drawer
  drawer: {
    // width: drawerWidth,
    // flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      bgcolor: mainColor,
      borderLeft: '1px solid #b2ebf2',
      boxShadow: '3px 0 6px rgba(0,0,0,0.05)',
    },
  },

  // רווח תחת ה-Toolbar ב-Drawer
  drawerSpacing: {
    mt: 2
  },

  // כפתורי הניווט בצד
  navButton: {
    justifyContent: 'center',
    py: 2
  },

  // אייקונים בניווט הצדדי
  navIcon: {
    minWidth: 'auto',
    color: '#007c91'
  },

  mainContent: {
    flexGrow: 1,
    marginTop: '64px', // גובה ה-AppBar
    marginRight: `${drawerWidth}px`, // רוחב הניווט הצדדי
    width: `calc(100vw - ${drawerWidth}px)`, // רוחב המסך פחות הניווט
    maxWidth: `calc(100vw - ${drawerWidth}px)`, // מונע חריגה
    overflow: 'hidden', // מונע גלילה אופקית
    bgcolor: '#f7fdff',
    minHeight: `calc(100vh - 64px)`, // גובה מלא פחות ה-AppBar
    position: 'relative'
  }
};