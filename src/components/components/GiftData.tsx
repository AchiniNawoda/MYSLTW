import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { textFieldStyle } from "../assets/Themes/CommonStyles";
import validateDataGiftSubscriber from "../services/postpaid/ValidateDataGiftResponse";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

const GiftData: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const WaterMarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  const { serviceDetails, setLeftMenuItem, setGiftDataMobileNumber } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;

  useEffect(() => {
    console.log("Service ID:", serviceID);
  }, [serviceID]);

  const handleValidate = async () => {
    if (!username || !serviceID) {
      setErrorMessage(t("Subscriber ID or username is missing. Please provide both."));
      setIsSuccess(false);
      setIsDialogOpen(true);
      return;
    }

    try {
      const response = await validateDataGiftSubscriber(serviceID, username);

      if (response?.isSuccess) {
        setApiResponse(t("Receiver Validate Success"));
        setIsSuccess(true);
        setErrorMessage(null);
        setGiftDataMobileNumber(username);
      } else {
        setApiResponse(null);
        setErrorMessage(t("Subscriber ID you entered is Invalid – Please enter a correct Subscriber ID."));
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Validation API call failed:", error);
      setApiResponse(null);
      setErrorMessage(t("An error occurred during validation."));
      setIsSuccess(false);
    } finally {
      setIsDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    if (!errorMessage) {
      setLeftMenuItem("GetGiftDataPage");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: { xs: 2, sm: 3, md: 4 },
        borderRadius: "10px",
        height: { xs: "auto", sm: "auto", md: "450px" },
        boxShadow: "0px 3px 3px #0000004A",
        width: "100%",
        margin: "0 auto",
        position: "relative",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="body1"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#0056A2",
          mb: { xs: 4, md: 6 },
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "14px", sm: "16px" },
        }}
      >
        {t("Enter the username of the person to whom you wish to Gift Data")}
        <br />
        {t("Select the package by tapping VALIDATE RECEIVER")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: "center",
          mb: 4,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "14px", sm: "16px" },
            color: "#0056A2",
          }}
        >
          {t("Receiver's username :")}
        </Typography>
        <TextField
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth={isXs}
          sx={{
            ...textFieldStyle(40, 250),
            minWidth: { xs: "100%", sm: "250px" },
            alignItems: {xs: "center"},
          }}
        />
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleValidate}
        sx={{
          marginBottom: 2,
          color: "#0056A2",
          backgroundColor: "#FFFFFF",
          border: "2px solid #0056A2",
          height: "50px",
          fontWeight: "bold",
          borderRadius: "8px",
          width: { xs: "100%", sm: "200px" },
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: 600 }}>
          {t("Validate Receiver")}
        </Typography>
      </Button>

      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "#0056A2",
          fontSize: { xs: 12, sm: 13 },
          paddingX: 1,
        }}
      >
        {t("Ensure the username is correct, as this transaction cannot be reversed.")}
      </Typography>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? t("Success") : t("Error")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              gap: 2,
              color: "#0056A2",
              fontWeight: "bold",
              fontSize: "14px",
              width: { xs: "250px", sm: "400px" },
            }}
          >
            {isSuccess ? (
              <>
                {apiResponse}
                <img
                  src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                  alt="Success"
                  style={{ width: "100px", height: "30px", borderRadius: "10px" }}
                />
              </>
            ) : (
              <>
                {errorMessage}
                <img
                  src="https://i.gifer.com/Z16w.gif"
                  alt="Failure"
                  style={{ width: "30px", height: "18px", borderRadius: "10px" }}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {t("Ok")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WaterMarkLogo} alt="Watermark Logo" width="80px" />
      </Box>
    </Box>
  );
};

export default GiftData;
