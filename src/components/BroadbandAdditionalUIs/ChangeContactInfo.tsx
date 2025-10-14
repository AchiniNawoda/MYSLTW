import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { textFieldStyle } from "../../assets/Themes/CommonStyles";
import updateContact from "../../services/profile/updateContact";
import useStore from "../../services/useAppStore";
import { useTranslation } from "react-i18next";

const ChangeContactForm = () => {
  const { t } = useTranslation();
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const WatermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSubmit = async () => {
    if (!serviceID || !fullName || !email || !mobile) {
      setDialogMessage(t("fillAllFields"));
      setDialogOpen(true);
      return;
    }

    try {
      const response = await updateContact(serviceID, email, mobile, fullName);
      if (response) {
        setDialogMessage(t("updateSuccess"));
      } else {
        setDialogMessage(t("updateFailed"));
      }
    } catch (error) {
      setDialogMessage(t("updateError"));
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 2,
        borderRadius: "10px",
        height: "65vh",
        boxShadow: "0px 3px 3px #0000004A",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{ fontSize: "24px", fontWeight: "bold", marginBottom: 4 }}
      >
        {t("changeContactInfo")}
      </Typography>

      <Box
        sx={{
          border: "1px solid #0056A2",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "95%",
          height: "85%",
          position: "relative",
        }}
      >
        <Card
          sx={{
            height: "85%",
            width: "30%",
            border: "1px solid #0056A2",
            padding: "16px",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Full Name */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#0056A2", marginBottom: "8px", textAlign: "left" }}
            >
              {t("fullName")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              sx={textFieldStyle()}
            />
          </Box>

          {/* Email Address */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#0056A2", marginBottom: "8px", textAlign: "left" }}
            >
              {t("emailAddress")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={textFieldStyle()}
            />
          </Box>

          {/* Mobile */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "#0056A2", marginBottom: "8px", textAlign: "left" }}
            >
              {t("mobile")} :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              sx={textFieldStyle()}
            />
          </Box>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
            <Button
              variant="outlined"
              onClick={handleSubmit}
              sx={{
                display: "flex",
                gap: 2,
                backgroundColor: "#FFFFFF",
                color: "#0056A2",
                border: "2px solid #0056A2",
                borderRadius: "40px",
                textTransform: "none",
                padding: "6px 14px",
                minWidth: "50%",
                fontWeight: "bold",
                alignItems: "center",
                fontSize: "12",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "600px", fontSize: "16px" }}>
                {t("submit")}
              </Typography>
            </Button>
          </Box>
        </Card>
      </Box>

      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WatermarkLogo} alt="Watermark Logo" />
      </Box>

      {/* Dialog box */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{t("notification")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            {t("ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangeContactForm;
