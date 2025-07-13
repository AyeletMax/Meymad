import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Email, Lock, Person, Home, Phone, Login as LoginIcon, PersonAdd } from "@mui/icons-material";
import { registerStyles } from "./Register.styles";

const Register = () => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useUser();
  const [additionalInfo, setAdditionalInfo] = useState({
    username: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== passwordVerify) {
      setError('הסיסמאות אינן תואמות');
      return;
    }
    try {
      const response = await ApiService.request({
        endPath: `users?email=${email}`,
        credentials: 'include'
      });
      if (response.length > 0) {
        setError("האימייל כבר קיים במערכת");
        return;
      }
      setStep(2);
    } catch (err) {
      console.error('Error checking email:', err);
      setError("נכשל לבדוק אימייל");
    }
  };

  const handleCommit = async (e) => {
    e.preventDefault();
    setError('');

    const newUser = {
      email,
      password,
      ...additionalInfo,
    };

    try {
      const response = await ApiService.request({
        endPath: "auth/register",
        method: "POST",
        body: newUser,
        credentials: 'include'
      });
      if (response.error) {
        setError(response.error);
        return;
      }

      setCurrentUser({
        username: response.user.username,
        id: response.user.id,
        email: response.user.email,
      });
      localStorage.setItem('currentUser',
        JSON.stringify({
          username: response.user.username,
          id: response.user.id, email: response.user.email
        }));

      navigate(`/home`);

    } catch (error) {
      console.error('Error registering user:', error);
      const errMsg = error?.error || 'ההרשמה נכשלה';
      setError(errMsg);
    }
  };

  return (
    <Box sx={registerStyles.container}>
      <Fade in>
        <Box sx={registerStyles.formContainer}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="primary"
            gutterBottom
            sx={registerStyles.title}
          >
            הרשמה
          </Typography>
          {step === 1 ? (
            <Box component="form" onSubmit={handleRegister} sx={registerStyles.form}>
              <TextField
                label="אימייל"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                  sx: registerStyles.inputField
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
                  sx: registerStyles.inputField
                }}
              />
              <TextField
                label="אימות סיסמה"
                type="password"
                value={passwordVerify}
                onChange={(e) => setPasswordVerify(e.target.value)}
                required
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  sx: registerStyles.inputField
                }}
              />
              {error && (
                <Alert severity="error" sx={registerStyles.errorAlert}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                endIcon={<PersonAdd />}
                sx={registerStyles.registerButton}
              >
                המשך
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                startIcon={<LoginIcon />}
                sx={registerStyles.loginButton}
                onClick={() => navigate("/login")}
              >
                מעבר להתחברות
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleCommit} sx={registerStyles.form}>
              <TextField
                label="שם משתמש"
                type="text"
                value={additionalInfo.username}
                onChange={(e) =>
                  setAdditionalInfo({ ...additionalInfo, username: e.target.value })
                }
                required
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                  sx: registerStyles.inputField
                }}
              />
              <TextField
                label="כתובת"
                type="text"
                value={additionalInfo.address}
                onChange={(e) =>
                  setAdditionalInfo({ ...additionalInfo, address: e.target.value })
                }
                required
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="primary" />
                    </InputAdornment>
                  ),
                  sx: registerStyles.inputField
                }}
              />
              <TextField
                label="טלפון"
                type="tel"
                value={additionalInfo.phone}
                onChange={(e) =>
                  setAdditionalInfo({ ...additionalInfo, phone: e.target.value })
                }
                required
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                  sx: registerStyles.inputField
                }}
              />
              {error && (
                <Alert severity="error" sx={registerStyles.errorAlert}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                endIcon={<PersonAdd />}
                sx={registerStyles.registerButton}
              >
                הרשמה
              </Button>
            </Box>
          )}
        </Box>
      </Fade>
    </Box>
  );
};

export default Register;

