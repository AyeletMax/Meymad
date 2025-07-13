// ContactWithChat.styles.js
// קובץ עיצובים מופרד לקומפוננטת ContactWithChat

export const contactStyles = {
  // מיכל ראשי
  container: {
    maxWidth: 800,
    mx: "auto",
    mt: 5,
    p: 4,
    direction: "rtl",
  },

  // כותרת ראשית
  title: {
    mb: 5,
    fontWeight: 'bold',
    color: "#0097a7"
  },

  // מיכל כפתורי הקשר
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    mt: 5,
    mb: 8,
    minHeight: "300px"
  },

  // עיצוב כפתורי הקשר (אימייל, טלפון, צ'אט)
  contactButton: {
    bgcolor: "#e0f7fa",
    color: "#0097a7",
    width: 220,
    height: 220,
    border: 3,
    borderColor: "#00bcd4",
    transition: "all 0.4s ease",
    "&:hover": {
      bgcolor: "#0097a7",
      color: "#fff",
      borderColor: "#0097a7",
      transform: "scale(1.15)",
      boxShadow: 8,
    },
  },

  // גודל אייקונים בכפתורים
  iconSize: {
    fontSize: 60,
    color: "#00bcd4"
  },

  // עיצוב דיאלוג כללי
  dialog: {
    borderRadius: 3,
    direction: "rtl"
  },

  // כותרת דיאלוג רגילה
  dialogTitle: {
    textAlign: "center",
    pb: 1,
    color: "#0097a7"
  },

  // כותרת דיאלוג לטלפון וצ'אט
  dialogTitlePhone: {
    textAlign: "center",
    color: "#0097a7"
  },

  // אייקון קטן בדיאלוג (אימייל)
  dialogIcon: {
    fontSize: 40,
    color: "#00bcd4",
    mb: 1
  },

  // אייקון גדול בדיאלוג (טלפון, צ'אט)
  dialogIconLarge: {
    fontSize: 60,
    color: "#00bcd4",
    mb: 2
  },

  // עיצוב טופס
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    pt: 2
  },

  // פעולות דיאלוג
  dialogActions: {
    px: 0,
    pt: 2
  },

  // כפתור שליחה
  submitButton: {
    borderRadius: 2,
    bgcolor: "#00bcd4",
    color: "#fff",
    "&:hover": {
      bgcolor: "#0097a7"
    }
  },

  // תוכן דיאלוג טלפון
  phoneContent: {
    textAlign: "center",
    pb: 3
  },

  // מספר טלפון
  phoneNumber: {
    fontWeight: 'bold',
    mb: 3,
    color: "#0097a7"
  },

  // תוכן דיאלוג צ'אט
  chatContent: {
    textAlign: "center",
    pb: 3
  },

  // תיאור צ'אט
  chatDescription: {
    mb: 3
  }
};

export default contactStyles;