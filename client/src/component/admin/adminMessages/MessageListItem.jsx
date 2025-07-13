import React from "react";
import ListItem from "@mui/material/ListItem";
import { ListItemAvatar, Avatar, ListItemText, Typography, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import dayjs from "dayjs";

const formatDateTime = (str) => dayjs(str).format("DD/MM/YYYY HH:mm");

export default function MessageListItem({ msg, onClick }) {
  return (
    <ListItem
      button="true"
      alignItems="flex-start"
      onClick={() => onClick(msg)}
      sx={{ "&:hover": { bgcolor: "#e3f2fd" }, borderBottom: "1px solid #eee", py: 2 }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: msg.message_type === "cancel" ? "error.main" : "info.main" }}>
          {msg.message_type === "cancel" ? <CancelIcon /> : <EditNoteIcon />}
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {msg.username || "משתמש"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {formatDateTime(msg.created_at)}
            </Typography>
          </Box>
        }
        secondary={
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 240,
            }}
          >
            {msg.message_content}
          </Typography>
        }
      />
    </ListItem>
  );
}
