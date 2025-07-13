import { alpha } from '@mui/material';

export const poolColors = {
  primary: '#0284c7',
  secondary: '#0891b2',
  accent: '#06b6d4',
  light: '#e0f2fe',
  dark: '#0369a1',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626'
};

export const tableStyles = {
  mainContainer: {
    width: '100%',
    bgcolor: 'white',
    minHeight: '100vh'
  },

  loadingContainer: (colors) => ({
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: `linear-gradient(135deg, ${colors.light} 0%, ${alpha(colors.primary, 0.1)} 100%)`,
    borderRadius: 2,
    p: 4
  }),

  loadingSpinner: (colors) => ({
    width: 50,
    height: 50,
    borderRadius: '50%',
    border: `3px solid ${colors.primary}`,
    borderTop: `3px solid transparent`,
    animation: 'spin 1s linear infinite',
    mb: 2,
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  }),

  loadingText: (colors) => ({
    color: colors.primary,
    fontWeight: 500
  }),

  filtersContainer: (colors) => ({
    mb: 3,
    p: 2,
    bgcolor: 'white',
    borderRadius: 2,
    boxShadow: `0 2px 8px ${alpha(colors.primary, 0.08)}`,
    border: `1px solid ${alpha(colors.primary, 0.1)}`
  }),

  searchField: (colors) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      fontSize: '0.85rem',
      '&:hover fieldset': {
        borderColor: colors.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary,
      }
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.85rem'
    }
  }),

  sortField: {
    minWidth: 140,
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      fontSize: '0.85rem'
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.85rem'
    }
  },

  sortButton: (colors) => ({
    minWidth: 36,
    height: 36,
    borderRadius: 1.5,
    bgcolor: colors.primary,
    '&:hover': {
      bgcolor: colors.dark,
      transform: 'scale(1.05)'
    },
    transition: 'all 0.2s ease'
  }),

  sortIcon: (sortDirection) => ({
    fontSize: 18,
    transform: sortDirection === 'desc' ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.3s ease'
  }),

  reservationsChip: (colors) => ({
    bgcolor: 'white',
    color: colors.primary,
    fontWeight: 600,
    fontSize: '0.8rem',
    px: 1,
    height: 28
  }),

  tableContainer: (colors) => ({
    bgcolor: 'white',
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: `0 4px 16px ${alpha(colors.primary, 0.12)}`,
    border: `1px solid ${alpha(colors.primary, 0.1)}`
  }),

  tableHeader: (colors) => ({
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  }),

  headerCell: {
    fontWeight: 600,
    color: 'white',
    py: 1.5,
    fontSize: '0.8rem'
  },

  tableRow: (colors) => ({
    cursor: 'pointer',
    '&:hover': {
      bgcolor: alpha(colors.primary, 0.04),
    },
    '&:nth-of-type(even)': {
      bgcolor: alpha(colors.light, 0.3),
    },
    transition: 'all 0.2s ease'
  }),

  tableCell: {
    fontSize: '0.8rem',
    py: 1.5
  },

  idCell: (colors) => ({
    fontWeight: 600,
    color: colors.primary,
    fontSize: '0.8rem',
    py: 1.5
  }),

  dateChip: (colors) => ({
    bgcolor: alpha(colors.primary, 0.1),
    color: colors.primary,
    fontSize: '0.7rem',
    height: 22,
    fontWeight: 500
  }),

  startTimeChip: (colors) => ({
    bgcolor: alpha(colors.success, 0.1),
    color: colors.success,
    fontSize: '0.7rem',
    height: 22,
    fontWeight: 500
  }),

  endTimeChip: (colors) => ({
    bgcolor: alpha(colors.warning, 0.1),
    color: colors.warning,
    fontSize: '0.7rem',
    height: 22,
    fontWeight: 500
  }),

  paymentChip: (colors) => ({
    bgcolor: alpha(colors.secondary, 0.1),
    color: colors.secondary,
    fontSize: '0.7rem',
    height: 22,
    fontWeight: 600
  }),

  approveButton: (colors) => ({
    bgcolor: colors.success,
    fontSize: '0.7rem',
    px: 1,
    py: 0.5,
    minWidth: 'auto',
    borderRadius: 1.5,
    '&:hover': {
      bgcolor: '#047857',
      transform: 'scale(1.05)'
    },
    transition: 'all 0.2s ease'
  }),

  rejectButton: (colors) => ({
    color: colors.error,
    borderColor: colors.error,
    fontSize: '0.7rem',
    px: 1,
    py: 0.5,
    minWidth: 'auto',
    borderRadius: 1.5,
    '&:hover': {
      bgcolor: alpha(colors.error, 0.1),
      borderColor: colors.error,
      transform: 'scale(1.05)'
    },
    transition: 'all 0.2s ease'
  }),

  emptyContainer: (colors) => ({
    py: 6,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2
  }),

  emptyIcon: (colors) => ({
    width: 60,
    height: 60,
    borderRadius: '50%',
    bgcolor: alpha(colors.primary, 0.1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),

  emptyText: {
    fontSize: '0.9rem'
  }
};

export const getTableColors = (customColor) => ({
  ...poolColors,
  primary: customColor || poolColors.primary
});

export const getAnimationStyles = () => ({
  fadeIn: {
    timeout: 800
  },
  slideIn: {
    timeout: 1000
  },
  staggeredSlide: (index) => ({
    timeout: 200 + index * 50
  })
});

export const iconStyles = {
  small: { fontSize: 14 },
  medium: { fontSize: 16 },
  large: { fontSize: 18 },
  extraLarge: { fontSize: 30 }
};

export const dialogButton = (theme) => ({
  borderRadius: 3,
  px: 4,
  py: 1.5,
  fontWeight: 600,
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4]
  },
  transition: 'all 0.2s ease'
});

export const dialogSaveButton = (theme) => ({
  borderRadius: 3,
  px: 4,
  py: 1.5,
  fontWeight: 700,
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
  boxShadow: theme.shadows[8],
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[12]
  },
  transition: 'all 0.2s ease'
});

export const dialogTitle = (theme) => ({
  m: 0,
  p: 3,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  position: 'relative'
});
export const dialogContent = {
  p: 4,
  bgcolor: 'background.default'
};
export const dialogActions = (theme) => ({
  p: 3,
  bgcolor: 'background.paper',
  borderTop: `1px solid ${theme.palette.divider}1A`
});

export const editableCard = {
  mb: 2
};
export const editableCardContent = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};
export const editableTextField = {
  ml: 2,
  width: 180
};