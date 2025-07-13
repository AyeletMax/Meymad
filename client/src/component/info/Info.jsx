import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import ApiService from "../../ApiService";
import {
  Typography,
  Box,
  Avatar,
  Stack,
  Button,
  Fade
} from "@mui/material";
import {
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  EmojiEvents as CrownIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGlobalMessage } from "../GlobalMessageContext";
import InfoRow from "./InfoRow";
import { infoStyles } from "./Info.styles";

const Info = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [editData, setEditData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { currentUser, setCurrentUser } = useUser();
  const { showMessage } = useGlobalMessage();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.id == "") {
      navigate("/login");
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const data = await ApiService.request({
          endPath: `users/${currentUser.id}`,
          credentials: "include"
        });
        setUserInfo(data);
        setEditData(data);
      } catch (err) {
        console.error("Error fetching user info:", err);
        showMessage(err.message, "error");
      }
    };
    fetchUserInfo();
  }, [currentUser, navigate]);

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updated = await ApiService.request({
        method: "PUT",
        endPath: `users/${currentUser.id}`,
        body: editData,
        credentials: "include"
      });

      setUserInfo({ ...editData });
      setCurrentUser(prev => ({
        ...prev,
        username: updated.username,
        email: updated.email
      }));
      setEditMode(false);
    } catch (err) {
      console.error("Error saving user info:", err);
      showMessage("שגיאה בשמירת פרטי החשבון", "error");
    }
  };

  if (!userInfo) {
    return null;
  }

  const firstLetter =
    (editMode ? editData.username : userInfo.username)?.charAt(0)?.toUpperCase() || "";

  return (
    <Box sx={infoStyles.root}>
      <Fade in>
        <Box sx={infoStyles.container}>
          <Typography
            variant="h4"
            sx={infoStyles.title}
          >
            פרטי משתמש
          </Typography>
          <Box sx={infoStyles.rowArea}>
            <Box sx={infoStyles.details}>
              <Stack spacing={2} mt={2} width="100%">
                <InfoRow
                  icon={<PersonIcon sx={{ color: "#00bcd4" }} />}
                  label="שם משתמש"
                  value={editData.username}
                  editable={editMode}
                  onChange={val => handleEditChange("username", val)}
                />
                <InfoRow
                  icon={<EmailIcon sx={{ color: "#4dd0e1" }} />}
                  label="אימייל"
                  value={editData.email}
                  editable={editMode}
                  onChange={val => handleEditChange("email", val)}
                />
                <InfoRow
                  icon={<LocationIcon sx={{ color: "#26c6da" }} />}
                  label="כתובת"
                  value={editData.address}
                  editable={editMode}
                  onChange={val => handleEditChange("address", val)}
                />
                <InfoRow
                  icon={<PhoneIcon sx={{ color: "#00bcd4" }} />}
                  label="טלפון"
                  value={editData.phone}
                  editable={editMode}
                  onChange={val => handleEditChange("phone", val)}
                />
                {userInfo.role === "admin" && (
                  <InfoRow
                    icon={<CrownIcon sx={{ color: "#ffd600" }} />}
                    label="הרשאה"
                    value="יש לך הרשאת מנהל"
                  />
                )}
              </Stack>
              <Box sx={infoStyles.editButtons}>
                {editMode ? (
                  <>
                    <Button
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      sx={infoStyles.saveBtn}
                      variant="contained"
                    >
                      שמור
                    </Button>
                    <Button
                      startIcon={<CancelIcon />}
                      color="error"
                      onClick={() => {
                        setEditMode(false);
                        setEditData(userInfo);
                      }}
                      sx={infoStyles.cancelBtn}
                      variant="outlined"
                    >
                      ביטול
                    </Button>
                  </>
                ) : (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                    sx={infoStyles.editBtn}
                    variant="outlined"
                  >
                    ערוך
                  </Button>
                )}
              </Box>
            </Box>
            <Box sx={infoStyles.profile}>
              <Avatar sx={infoStyles.avatar}>
                {firstLetter}
              </Avatar>
              <Typography
                variant="h5"
                sx={infoStyles.profileName}
              >
                {editData.username}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Info;
