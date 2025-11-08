import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { textFieldStyle } from "../../assets/Themes/CommonStyles";
import callForwardingRequest from "../../services/postpaid/Voice/callForwardingRequest";
import checkCallForwardingStatus from "../../services/postpaid/Voice/checkCallForwardingStatus";

const CallForwarding: React.FC<{ telephoneNo: string }> = ({ telephoneNo }) => {
  const { t } = useTranslation();
  const [statusMessage, setStatusMessage] = useState<string>("");
  const watermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [forwardingNumber, setForwardingNumber] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");

  useEffect(() => {
    const fetchStatus = async () => {
      const statusResponse = await checkCallForwardingStatus(telephoneNo);
      if (statusResponse) {
        const status = statusResponse.status;
        setCurrentStatus(status);

        if (status === "N") {
          setStatusMessage(t("callForwarding.statusFailed"));
        } else if (status === "Y") {
          setStatusMessage(t("callForwarding.statusSuccess"));
        } else {
          setStatusMessage(t("callForwarding.unknownStatus"));
        }

        if (statusResponse.errorShow) {
          setErrorMessage(statusResponse.errorShow);
          setDialogOpen(true);
        }
      } else {
        setErrorMessage(t("callForwarding.apiUnavailable"));
        setDialogOpen(true);
      }
    };

    fetchStatus();
  }, [telephoneNo, t]);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubscribeClick = async () => {
    if (!forwardingNumber) {
      setStatusMessage(t("callForwarding.enterNumber"));
      return;
    }

    const requestType = currentStatus === "Y" ? "N" : "Y";
    const response = await callForwardingRequest(telephoneNo, forwardingNumber, requestType);

    if (response) {
      if (requestType === "Y") {
        setStatusMessage(t("callForwarding.activated"));
      } else {
        setStatusMessage(t("callForwarding.cancelled"));
      }
    } else {
      setStatusMessage(t("callForwarding.failedRequest"));
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        justifyContent: "start",
        alignContent: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        height: "65vh",
        boxShadow: "0px 3px 3px #0000004A",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          padding: 3,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: 24, fontWeight: "bold", marginBottom: "32px" }}>
          {t("callForwarding.title")}
        </Typography>

        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body2" sx={{ fontWeight: "bold", color: "#0056A2", marginBottom: "8px" }}>
            {t("callForwarding.yourNumber")}
            <Typography component="sup" sx={{ color: "red", fontWeight: "bold", fontSize: "1rem", marginLeft: "2px" }}>
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={telephoneNo}
            disabled
            sx={{ ...textFieldStyle() }}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body2" sx={{ fontWeight: "bold", color: "#0056A2", marginBottom: "8px" }}>
            {t("callForwarding.forwardingNumber")}
            <Typography component="sup" sx={{ color: "red", fontWeight: "bold", fontSize: "1rem", marginLeft: "2px" }}>
              *
            </Typography>
          </Typography>

          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder={t("callForwarding.enterPlaceholder")}
            value={forwardingNumber}
            onChange={(e) => setForwardingNumber(e.target.value)}
            sx={{ ...textFieldStyle() }}
          />
        </Box>

        <FormControlLabel
          control={<Checkbox sx={{ color: "#0056A2", "&.Mui-checked": { color: "#0056A2" } }} />}
          label={
            <Typography variant="body2" sx={{ color: "#0056A2" }}>
              <Box component="span" sx={{ color: "#0056A2", padding: "4px 8px", borderRadius: "4px" }}>
                {t("callForwarding.terms")}
              </Box>
            </Typography>
          }
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          variant="contained"
          onClick={handleSubscribeClick}
          sx={{
            width: "200px",
            backgroundColor: "#ffffff",
            color: "#0056A2",
            borderRadius: "10px",
            border: "2px solid #0056A2",
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ textTransform: "capitalize", fontWeight: 600, fontSize: "20px" }}>
            {t("callForwarding.subscribe")}
          </Typography>
        </Button>
      </Box>

      {statusMessage && (
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            color: statusMessage.includes("failed") ? "red" : "green",
            fontWeight: "bold",
          }}
        >
          {statusMessage}
        </Typography>
      )}

      <Box
        component="img"
        src={watermarkLogo}
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

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "400px",
              height: "50px",
              gap: -10,
              color: "#0056A2",
              fontWeight: "bold",
              fontSize: "10px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            {errorMessage ? (
              <>
                {errorMessage}
                <img
                  src="https://i.gifer.com/Z16w.gif"
                  alt="Failure"
                  style={{ width: "30px", height: "18px", borderRadius: "10px" }}
                />
              </>
            ) : (
              <>
                {t("callForwarding.serviceFine")}
                <img
                  src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                  alt="Success"
                  style={{ width: "100px", height: "30px", borderRadius: "10px" }}
                />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {t("callForwarding.ok")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallForwarding;
