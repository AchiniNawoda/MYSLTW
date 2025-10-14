import Box from "@mui/material/Box";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useStore from "../../services/useAppStore";

const MyPackagePeotv = () => {
  const { t } = useTranslation();
  const { serviceDetails, setLeftMenuItem, selectedNavbarItem } = useStore();
  const [showAlert, setShowAlert] = useState(false);
  
  // Define image URL as a variable instead of importing
  const WaterMarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  useEffect(() => {
    if (serviceDetails?.listofPEOService && serviceDetails.listofPEOService.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [serviceDetails, selectedNavbarItem]);

  return (
    <>
      <Dialog open={showAlert} onClose={() => setShowAlert(false)}>
        <DialogTitle>
          <Typography variant="body2" sx={{ fontSize: "24px", color: "#00256A" }}>
            {t("no_peo_tv_connection")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ fontSize: "16px", color: "#0056A2" }}>
            {t("no_peo_tv_message")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#00256A",
              "&:hover": {
                backgroundColor: "#00256A",
                color: "#ffffff",
              },
            }}
            onClick={() => setShowAlert(false)}
          >
            {t("close")}
          </Button>
          <Button
            sx={{
              backgroundColor: "#fff",
              color: "#00256A",
              "&:hover": {
                backgroundColor: "#00256A",
                color: "#ffffff",
              },
            }}
            onClick={() => {
              setShowAlert(false);
              setLeftMenuItem("New Services");
            }}
            autoFocus
          >
            {t("request_now")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "65vh",
          backgroundColor: "white",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            margin: "auto",
            border: "3px dashed #0056A2",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            width: "85%",
            height: "80%",
          }}
        >
          {serviceDetails?.listofPEOService && serviceDetails.listofPEOService.length > 0 ? (
            <>
              <Typography
                variant="body2"
                sx={{ color: "#0056A2", fontSize: "20px", fontWeight: 600, mb: 2 }}
              >
                {`${t("service_id")} : ${serviceDetails.listofPEOService[0].serviceID}`}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#0056A2", fontSize: "36px", fontWeight: 600, mb: 2 }}
              >
                {serviceDetails.listofPEOService[0].packageName}
              </Typography>
              <Typography variant="body2" sx={{ color: "#0056A2", fontSize: "36px" }}>
                {`${t("status")} : `}
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ color: "#4FD745", fontSize: "36px", fontWeight: 600 }}
                >
                  {serviceDetails.listofPEOService[0].serviceStatus}
                </Typography>
              </Typography>
            </>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: "#0056A2", fontSize: "24px", fontWeight: 600 }}
            >
              {t("no_data")}
            </Typography>
          )}
        </Box>
        <Box
          component="img"
          src={WaterMarkLogo}
          alt="Watermark Logo"
          sx={{
            zIndex: 1,
            position: "absolute",
            bottom: 20,
            right: 20,
            width: "200px",
            opacity: 1,
          }}
        />
      </Box>
    </>
  );
};

export default MyPackagePeotv;