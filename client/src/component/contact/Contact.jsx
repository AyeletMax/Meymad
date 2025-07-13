import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Email, Chat, Person, Message, Send, Phone } from "@mui/icons-material";
import { useGlobalMessage } from "../GlobalMessageContext";
import { contactStyles } from "./ContactWithChat.styles";

const contactMethods = {
  email: { icon: Email, title: "שלח לנו מייל", tooltip: "שלח מייל" },
  phone: { icon: Phone, title: "התקשר אלינו", tooltip: "התקשר אלינו" },
  chat: { icon: Chat, title: "צ'אט עם נציג", tooltip: "שוחח עם נציג" }
};

export default function ContactWithChat() {
  const [mode, setMode] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { showMessage } = useGlobalMessage();

  const openDialog = (selectedMode) => {
    setMode(selectedMode);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setMode(null);
  };

  useEffect(() => {
    if (mode === "chat" && !window.Tawk_API) {
      const script = document.createElement("script");
      Object.assign(script, {
        async: true,
        src: "https://embed.tawk.to/683eb5e538f349190a13cd3c/1isqfd2u4",
        charset: "UTF-8",
        crossorigin: "*"
      });
      document.body.appendChild(script);
    }
  }, [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://formspree.io/f/xvgrodvj", {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        showMessage("ההודעה נשלחה בהצלחה!", "success");
        e.target.reset();
        closeDialog();
      } else {
        showMessage("אירעה שגיאה בשליחת ההודעה", "error");
      }
    } catch (error) {
      showMessage("אירעה שגיאה בשליחת ההודעה", "error");
    }
  };

  const renderDialogContent = () => {
    if (!mode || !contactMethods[mode]) return null; 
    const { icon: Icon, title } = contactMethods[mode];
    
    const dialogProps = {
      title: (
        <DialogTitle sx={mode === 'email' ? contactStyles.dialogTitle : contactStyles.dialogTitlePhone}>
          <Icon sx={mode === 'email' ? contactStyles.dialogIcon : contactStyles.dialogIconLarge} />
          <Typography component="span" variant="h6" sx={{ verticalAlign: "middle", ml: 1 }}>
            {title}
          </Typography>
        </DialogTitle>
      )
    };

    switch (mode) {
      case "email":
        return (
          <>
            {dialogProps.title}
            <DialogContent>
              <Box component="form" onSubmit={handleSubmit} sx={contactStyles.form}>
                {[
                  { name: "name", label: "שם מלא", icon: Person, type: "text" },
                  { name: "email", label: "אימייל", icon: Email, type: "email" },
                  { name: "message", label: "הודעה", icon: Message, multiline: true, rows: 4 }
                ].map(({ name, label, icon: FieldIcon, type = "text", multiline, rows }) => (
                  <TextField
                    key={name}
                    label={label}
                    name={name}
                    type={type}
                    required
                    fullWidth
                    multiline={multiline}
                    rows={rows}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FieldIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                  />
                ))}
                <DialogActions sx={contactStyles.dialogActions}>
                  <Button onClick={closeDialog} color="grey">ביטול</Button>
                  <Button type="submit" variant="contained" endIcon={<Send />} sx={contactStyles.submitButton}>
                    שלח
                  </Button>
                </DialogActions>
              </Box>
            </DialogContent>
          </>
        );

      case "phone":
        return (
          <>
            {dialogProps.title}
            <DialogContent sx={contactStyles.phoneContent}>
              <Typography variant="body1" gutterBottom sx={contactStyles.chatDescription}>
                ניתן להתקשר אלינו בטלפון:
              </Typography>
              <Typography variant="h3" color="primary" sx={contactStyles.phoneNumber}>
                050-4103390
              </Typography>
              <Typography variant="body2" color="text.secondary">
                זמני פעילות: א'-ה' 9:00-23:00
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} variant="contained" fullWidth>סגור</Button>
            </DialogActions>
          </>
        );

      case "chat":
        return (
          <>
            {dialogProps.title}
            <DialogContent sx={contactStyles.chatContent}>
              <Typography variant="body1" sx={contactStyles.chatDescription}>
                חלון הצ'אט יופיע בפינה הימנית-תחתונה של המסך.
              </Typography>
              <Typography variant="body1">
                ניתן לשוחח עם נציג ישירות ולקבל מענה מיידי.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} variant="contained" fullWidth>בסדר</Button>
            </DialogActions>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={contactStyles.container}>
      <Typography variant="h4" align="center" gutterBottom sx={contactStyles.title}>
        צור קשר
      </Typography>

      <Box sx={contactStyles.buttonsContainer}>
        {Object.entries(contactMethods).map(([key, { icon: Icon, tooltip }]) => (
          <Tooltip key={key} title={tooltip} TransitionComponent={Zoom}>
            <IconButton onClick={() => openDialog(key)} sx={contactStyles.contactButton}>
              <Icon sx={contactStyles.iconSize} />
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Dialog 
        open={dialogOpen} 
        onClose={closeDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{ sx: contactStyles.dialog }}
      >
        {renderDialogContent()}
      </Dialog>
    </Box>
  );
}