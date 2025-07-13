import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const InfoRow = ({ icon, label, value, editable = false, onChange }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={2}
    p={0}
    sx={{
      flexDirection: "row-reverse",
    }}
  >
    <Box>{icon}</Box>
    {editable ? (
      <TextField
        variant="standard"
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        fullWidth
        sx={{ direction: "rtl", textAlign: "right" }}
      />
    ) : (
      <Typography variant="body1" fontWeight="bold" sx={{ color: "teal.900" }}>
        {value}
      </Typography>
    )}
  </Box>
);

export default InfoRow;