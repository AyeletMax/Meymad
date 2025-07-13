import React from 'react';
import { Chip } from '@mui/material';
import { CheckCircle, Schedule, EventAvailable, Cancel, Pending } from '@mui/icons-material';

const StatusIcon = ({ status }) => {
  const iconProps = { sx: { fontSize: 20 } };

  switch (status) {
    case 'approved':
      return <CheckCircle {...iconProps} sx={{ ...iconProps.sx, color: 'success.main' }} />;
    case 'pending':
      return <Schedule {...iconProps} sx={{ ...iconProps.sx, color: 'warning.main' }} />;
    case 'completed':
      return <EventAvailable {...iconProps} sx={{ ...iconProps.sx, color: 'info.main' }} />;
    case 'cancelled':
    case 'rejected':
      return <Cancel {...iconProps} sx={{ ...iconProps.sx, color: 'error.main' }} />;
    default:
      return <Pending {...iconProps} />;
  }
};

const StatusChip = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved':
        return { label: 'אושר', color: 'success' };
      case 'pending':
        return { label: 'ממתין לאישור', color: 'warning' };
      case 'completed':
        return { label: 'הושלם', color: 'info' };
      case 'cancelled':
        return { label: 'בוטל', color: 'error' };
      case 'rejected':
        return { label: 'נדחה', color: 'error' };
      default:
        return { label: 'לא ידוע', color: 'default' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Chip
      icon={<StatusIcon status={status} />}
      label={config.label}
      color={config.color}
      variant="filled"
      size="small"
    />
  );
};

export default StatusChip;
