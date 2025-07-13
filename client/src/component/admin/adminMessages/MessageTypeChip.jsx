import {Chip} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import EditNoteIcon from "@mui/icons-material/EditNote";
export  default function MessageTypeChip({ type }) {
    return (
        <Chip
            icon={type === "cancel" ? <CancelIcon /> : <EditNoteIcon />}
            label={type === "cancel" ? "ביטול" : "עדכון"}
            color={type === "cancel" ? "error" : "info"}
            size="small"
            sx={{ fontWeight: 700, mr: 1 }}
        />
    );
}