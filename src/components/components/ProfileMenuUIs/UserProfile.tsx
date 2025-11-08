import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import terminateUserProfile from "../../services/profile/terminateUserProfile";
import updateUserInfo from "../../services/profile/updateUserInfo";

const UserProfile = () => {
  const { t } = useTranslation();
  const storedEmail = localStorage.getItem("username");
  const [altrContact, setAltrContact] = useState("");
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  // Corrected variable name (camelCase)
  const watermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  const handleUpdate = async () => {
    if (!storedEmail) {
      console.error("User email not found");
      return;
    }
    const response = await updateUserInfo(storedEmail, altrContact, name);
    if (response) {
      setResponseMessage(response.message);
    }
  };

  const handleDelete = async () => {
    const response = await terminateUserProfile();
    if (response) {
      setResponseMessage(t("Profile successfully terminated."));
    } else {
      setResponseMessage(t("Failed to terminate the profile."));
    }
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        //alignItems: "center",
        width: "100%",
        minHeight: "450px",
        backgroundColor: "white",
        borderRadius: 3,
        //padding: {xs: "20px 0", sm: "30px 0"},
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Profile Header */}
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "20px",
            fontSize: "24px",
          }}
        >
          {t("My Profile")}
        </Typography>

        {/* User Info Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#0056A2",
            color: "white",
            borderRadius: "8px",
            padding: {xs: "5px 10px",sm: "10px 15px"},
            marginBottom: "40px",
            width: "90%",
            height: "60px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                backgroundColor: "#F5F9FF",
                color: "#0056A2",
                marginRight: "10px",
              }}
            >
              U
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {storedEmail}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {t("You are logged in as a EasyLogin")}
              </Typography>
            </Box>
          </Box>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setOpenDialog(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>

        {/* Profile Form */}
        <Box sx={{ 
          width: "90%", 
          marginBottom: "20px",
          display: "flex", 
          flexDirection: {xs: "column", sm: "row"}, 
          gap: 2,
          alignItems: {xs: "stretch", sm: "stretch"},
        }}>

          {/* Left Side - Inputs */}
          <Box sx={{ flex: 1, width: {xs: "100%", sm: "50%"}, }}>
            <Typography
              variant="body2"
              sx={{
                color: "#0056A2",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {t("Enter Your Mobile")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={altrContact}
              onChange={(e) => setAltrContact(e.target.value)}
              sx={{
                marginBottom: "20px",
                //maxWidth: "50%",
                "& .MuiInputBase-root": {
                  backgroundColor: "#EAF3FF",
                  height: "45px",
                  borderRadius: "10px",
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{
                color: "#0056A2",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {t("Name")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                marginBottom: {xs: "20px", sm: 0},
                //maxWidth: "50%",
                "& .MuiInputBase-root": {
                  backgroundColor: "#EAF3FF",
                  height: "45px",
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          {/* Right Side - Inputs and Button */}
          <Box sx ={{ 
            alignSelf: {xs: "auto", sm: "stretch"},
            display: "flex",
            width: {xs: "100%", sm: "50%"},
            flexDirection: "column",
            justifyContent: {xs: "center", sm: "flex-end"}, 
            alignItems: {xs: "center", sm: "flex-start"},
            minWidth: { sm: 120 }, // optional: keeps a nice fixed column width
          }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#0056A2",
                width: "100px",
                border: "2px solid #0056A2",
                textTransform: "none",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "#0056A2",
                  color: "white",
                },
              }}
              onClick={handleUpdate}
            >
              {t("Update")}
            </Button>
          </Box>
          
        </Box>

        {/* Response Message */}
        {responseMessage && (
          <Typography variant="body2" sx={{ color: "#0056A2", marginTop: "20px" }}>
            {responseMessage}
          </Typography>
        )}
      </Box>

      {/* Watermark Logo */}
      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img 
          src={watermarkLogo} 
          alt="Watermark Logo" 
          style={{ height: "auto", width: "200px" }} 
        />
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{t("Confirm Deletion")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to delete your profile? This action cannot be undone.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{t("No")}</Button>
          <Button onClick={handleDelete} sx={{ color: "red" }}>
            {t("Yes")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;