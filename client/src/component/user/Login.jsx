import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import ApiService from "../../ApiService";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Fade,
  Alert
} from "@mui/material";
import { Email, Lock, Login as LoginIcon, PersonAdd } from "@mui/icons-material";
import { loginStyles } from "./login.styles";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.request({
        endPath: "auth/login",
        method: "POST",
        body: { email: currentUser.email, password: password },
        credentials: 'include'
      });
      const existingUser = response.user;
      setCurrentUser({
        username: existingUser.username,
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
      });
      navigate(`/home`);
    } catch (error) {
      setError(error.message || "שגיאה כללית בהתחברות");
      console.error("Error loading users:", error);
    }
  };

  return (
    <Box sx={loginStyles.container}>
      <Fade in>
        <Box sx={loginStyles.formContainer}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
            sx={loginStyles.title}
          >
            התחברות
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={loginStyles.form}>
            <TextField
              label="אימייל"
              type="email"
              value={currentUser.email || ""}
              onChange={(e) =>
                setCurrentUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
                sx: loginStyles.inputField
              }}
            />
            <TextField
              label="סיסמה"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                sx: loginStyles.inputField
              }}
            />
            {error && (
              <Alert severity="error" sx={loginStyles.errorAlert}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              endIcon={<LoginIcon />}
              sx={loginStyles.loginButton}
            >
              התחבר
            </Button>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
            startIcon={<PersonAdd />}
            sx={loginStyles.registerButton}
            onClick={() => navigate("/register")}
          >
            הרשמה
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default Login;