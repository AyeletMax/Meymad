export const registerStyles = {
  container: {
    minHeight: "100vh",
    bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  title: {
    letterSpacing: 1,
    mb: 2,
  },
  form: {
    width: "100%",
  },
  inputField: {
    borderRadius: 3,
  },
  errorAlert: {
    mt: 1,
    mb: 1,
  },
  registerButton: {
    mt: 2,
    borderRadius: 3,
    fontWeight: 700,
    fontSize: "1.1rem",
    py: 1.5,
    boxShadow: "0 4px 16px rgba(33,150,243,0.12)",
    letterSpacing: 1,
    transition: "all 0.2s",
    "&:hover": {
      bgcolor: "primary.dark",
      transform: "translateY(-2px) scale(1.03)",
    },
  },
  loginButton: {
    mt: 1,
    borderRadius: 3,
    fontWeight: 600,
    py: 1.2,
    letterSpacing: 1,
    borderWidth: 2,
    "&:hover": {
      bgcolor: "#e3f2fd",
      borderColor: "primary.main",
    },
  },
};