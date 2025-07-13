
export const calendarStyles = {
  mainContainer: {
    width: '100vw',
    height: 'calc(100vh - 64px)',
    position: 'fixed',
    top: '64px',
    left: 0,
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
    padding: '20px',
    boxSizing: 'border-box',
  },

  calendarBox: {
    width: { xs: '98vw', sm: '90vw', md: '80vw', lg: '70vw' },
    maxWidth: '1400px',
    height: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },

  monthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15px',
    marginBottom: '15px',
    borderBottom: '2px solid #b3e5fc',
    flexShrink: 0,
  },

  monthButton: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: '12px',
    width: '45px',
    height: '45px',
    '&:hover': {
      backgroundColor: '#29b6f6',
      color: 'white',
      transform: 'scale(1.1)',
    },
  },

  monthTitle: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#29b6f6',
    fontFamily: 'Arial, sans-serif',
  },

  weekDaysHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    flexShrink: 0,
  },

  weekDay: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#29b6f6',
    textAlign: 'center',
    width: 'calc(100% / 7)',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  daysGrid: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  weekRow: {
    flex: 1,
    display: 'flex',
    gap: '8px',
    justifyContent: 'space-between',
  },

  dayNumberBox: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: '8px 12px 0 0',
    boxSizing: 'border-box',
  },
};

export const getDayStyles = (day, currentMonth, selectedDate, today) => {
  const isToday = day.isSame(today, 'day');
  const isSelected = selectedDate && day.isSame(selectedDate, 'day');
  const isCurrentMonth = day.isSame(currentMonth, 'month');
  const isPast = day.isBefore(today, 'day');
  const isShabbat = day.day() === 6;

  return {
    flex: 1,
    height: '100%',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.8rem',
    fontWeight: 700,
    borderRadius: '16px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: isShabbat || isPast ? 'not-allowed' : 'pointer',
    opacity: isShabbat ? 0.4 : 1,
    pointerEvents: isShabbat ? 'none' : 'auto',
    
    color: isShabbat || isPast ? '#bdbdbd' 
         : !isCurrentMonth ? '#ccc'
         : isSelected ? 'white'
         : isToday ? '#0288d1' : '#01579b',
    
    backgroundColor: isShabbat ? '#e0e0e0'
                   : isPast ? 'rgba(189, 189, 189, 0.2)'
                   : isSelected ? '#4fc3f7'
                   : isToday ? 'rgba(2, 136, 209, 0.1)'
                   : 'rgba(255, 255, 255, 0.8)',
    
    border: isPast ? '2px solid rgba(189, 189, 189, 0.3)'
          : isSelected ? '3px solid #29b6f6'
          : isToday ? '3px solid #0288d1'
          : '3px solid transparent',
    
    boxShadow: isSelected ? '0 20px 40px rgba(33, 150, 243, 0.2)' : 'none',
    
    '&:hover': !isPast && !isShabbat ? {
      backgroundColor: isSelected ? '#29b6f6' : 'rgba(33, 150, 243, 0.1)',
      color: isSelected ? 'white' : '#29b6f6',
      transform: 'translateY(-8px) scale(1.05)',
      boxShadow: '0 15px 35px rgba(33, 150, 243, 0.2)',
      border: '3px solid #4fc3f7',
    } : {},
  };
};