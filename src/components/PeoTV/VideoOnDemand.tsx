import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const VideoOnDemand = () => {
  // Define image URL as a variable instead of importing
  const WaterMarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  const serviceDetails = {
    listofVODService: [
      {
        serviceID: "VOD12345",
        movieTitle: "The Great Adventure",
        serviceStatus: "Active",
      },
    ],
  };

  const [showAlert, setShowAlert] = useState(false); 
  const { t } = useTranslation();

  return (
    <>
      {/* Alert Dialog */}
      <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
        <DialogTitle>
          <Typography variant="body2" sx={{ fontSize: 24, color: "#00256A" }}>
            {t("vod.noServiceTitle")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ fontSize: 16, color: "#0056A2" }}>
            {t("vod.noServiceMessage")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={buttonStyle} onClick={() => setShowAlert(false)} color="primary">
            {t("c.close")}
          </Button>
          <Button
            sx={buttonStyle}
            onClick={() => {
              setShowAlert(false);
              window.open("https://www.slt.lk/en/personal/peo-tv/vod", "_blank");
            }}
            color="primary"
            autoFocus
          >
            {t("vod.subscribeNow")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Main Content Box */}
      <Box sx={containerStyle}>
        <Box sx={contentBoxStyle}>
          {serviceDetails?.listofVODService?.length ? (
            <>
              <Typography variant="body2" sx={textStyle}>
                {`${t("vod.serviceID")} : ${serviceDetails.listofVODService[0].serviceID}`}
              </Typography>
              <Typography variant="body2" sx={{ ...textStyle, fontSize: 36 }}>
                {serviceDetails.listofVODService[0].movieTitle}
              </Typography>
              <Typography variant="body2" sx={{ ...textStyle, fontSize: 36 }}>
                {`${t("vod.status")} : `}
                <Box
                  component="span"
                  sx={{ color: "#4FD745", fontSize: 36, fontWeight: 600 }}
                >
                  {serviceDetails.listofVODService[0].serviceStatus}
                </Box>
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ ...textStyle, fontSize: 24 }}>
              {t("vod.noVideos")}
            </Typography>
          )}
        </Box>

        {/* Watermark Logo */}
        <Box
          component="img"
          src={WaterMarkLogo}
          alt="Watermark Logo"
          sx={watermarkStyle}
        />
      </Box>
    </>
  );
};

// Styles
const buttonStyle = {
  backgroundColor: "#fff",
  color: "#00256A",
  "&:hover": {
    backgroundColor: "#00256A",
    color: "#ffffff",
  },
};

const containerStyle = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "65vh",
  backgroundColor: "white",
  borderRadius: 3,
};

const contentBoxStyle = {
  margin: "auto",
  border: "3px dashed #0056A2",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  width: "85%",
  height: "80%",
};

const textStyle = {
  color: "#0056A2",
  fontSize: 20,
  fontWeight: 600,
  mb: 2,
};

const watermarkStyle = {
  zIndex: 1,
  position: "absolute",
  bottom: 20,
  right: 20,
  width: 200,
  opacity: 1,
};

export default VideoOnDemand;