import React from "react";
import { Card, CardContent, Box, Typography, TextField, Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { editableCard, editableCardContent, editableTextField } from './AdminReservation.styles';

export default function EditableField({ label, value, onChange, editing, onEdit, onSave }) {
  return (
    <Card sx={editableCard}>
      <CardContent sx={editableCardContent}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle2">{label}</Typography>
          {editing ? (
            <TextField
              value={value}
              onChange={onChange}
              size="small"
              sx={editableTextField}
            />
          ) : (
            <Typography variant="body2">{value}</Typography>
          )}
          <Tooltip title={editing ? "שמור" : "ערוך"}>
            <IconButton onClick={editing ? onSave : onEdit} size="small">
              {editing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}