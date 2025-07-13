import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const GlobalMessageContext = createContext();

export const GlobalMessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const confirmResolver = useRef(null);

  const showMessage = useCallback((msg, sev = "info") => {
    setMessage(msg);
    setSeverity(sev);
  }, []);

  const clearMessage = () => setMessage("");

  const showConfirm = (msg) => {
    setConfirmMessage(msg);
    setConfirmOpen(true);
    return new Promise((resolve) => {
      confirmResolver.current = resolve;
    });
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    if (confirmResolver.current) confirmResolver.current(true);
  };
  const handleCancel = () => {
    setConfirmOpen(false);
    if (confirmResolver.current) confirmResolver.current(false);
  };

  return (
    <GlobalMessageContext.Provider value={{ showMessage, showConfirm }}>
      {children}
      <Snackbar open={!!message} autoHideDuration={4000} onClose={clearMessage}>
        <Alert severity={severity} onClose={clearMessage}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog open={confirmOpen} onClose={handleCancel}>
        <DialogTitle>אישור</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>התעלם</Button>
          <Button onClick={handleConfirm} autoFocus>
            חזור לעדכון
          </Button>
        </DialogActions>
      </Dialog>
    </GlobalMessageContext.Provider>
  );
};

export const useGlobalMessage = () => useContext(GlobalMessageContext);