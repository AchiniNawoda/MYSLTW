import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import redeemVoucher from "../services/postpaid/redeemVoucher";
import useStore from "../services/useAppStore";
//import { textFieldStyle } from "../assets/Themes/CommonStyles";

const Redeem: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;

  const [voucherId, setVoucherId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const WaterMarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  const CouponIcon = "https://cdn-icons-png.flaticon.com/512/726/726448.png";


  const handleValidate = async () => {
    if (!voucherId) {
      setMessage(t("redeem.enterVoucherId"));
      setIsSuccess(false);
      setIsDialogOpen(true);
      setShowMessage(true);
      return;
    }

    if (!serviceID) {
      setMessage(t("redeem.serviceIdMissing"));
      setIsSuccess(false);
      setIsDialogOpen(true);
      setShowMessage(true);
      return;
    }

    setLoading(true);
    setMessage("");
    setShowMessage(false);
    setIsDialogOpen(true);

    try {
      const response = await redeemVoucher(serviceID, voucherId);

      if (response?.isSuccess) {
        setMessage(response.dataBundle.message || t("redeem.successMessage"));
        setIsSuccess(true);
      } else {
        setMessage(response?.errorShow || t("redeem.failureMessage"));
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("An error occurred while redeeming the voucher:", error);
      setMessage(t("redeem.unexpectedError"));
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setShowMessage(true);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setShowMessage(false);
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
        {t("redeem.enterPromoCode")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          mb: { xs: 4, md: 6 },
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            fontSize: { xs: "14px", sm: "16px" },
            textAlign: { xs: "left", sm: "right" },
            minWidth: { sm: "180px" },
          }}
        >
          {t("redeem.enterVoucherIdLabel")}
        </Typography>

        <TextField
          variant="outlined"
          value={voucherId}
          onChange={(e) => setVoucherId(e.target.value)}
          fullWidth
          sx={{
            //...textFieldStyle(40, 250),
            //maxWidth: { xs: "100%", sm: "250px" },
            width: {xs:"100%", sm:"50%"},
            "& .MuiInputBase-root": {
            height: "40px",
            backgroundColor: "#EAF2FB",
            borderRadius: "10px",
            border: "2px solid #ffffff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              borderColor: "#0056A2",
            },
            transition: "border 0.3s ease",
          },
          "& input": {
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
            color: "#0056A2",
            fontWeight: "medium",
          },
          }}
        />
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleValidate}
        disabled={loading}
        fullWidth={isXs}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#0056A2",
          backgroundColor: "#FFFFFF",
          border: "2px solid #0056A2",
          height: "60px",
          fontWeight: "bold",
          borderRadius: "8px",
          mb: 2,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            borderRight: "3px dashed #0056A270",
            pr: 2,
            mr: 2,
          }}
        >
          <img
            src={CouponIcon}
            style={{ width: "30px", height: "34px" }}
            alt="Coupon Icon"
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: "16px", sm: "20px" },
            fontWeight: "bold",
            color: "#0056A2",
          }}
        >
          {loading ? t("redeem.processing") : t("redeem.redeemVoucher")}
        </Typography>
      </Button>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: isSuccess ? "green" : "red",
            px: 2,
            py: 1,
          }}
        >
          {isSuccess ? t("redeem.success") : t("redeem.error")}
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "250px", sm: "300px" },
            py: 2,
            px: 1,
          }}
        >
          {showMessage && (
            <>
              {isSuccess ? (
                <>
                  <img
                    src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                    alt={t("redeem.successGifAlt")}
                    style={{ width: "100px", borderRadius: "10px", marginBottom: "10px" }}
                  />
                  <Typography variant="body2" align="center" sx={{ fontSize: "14px", color: "#0056A2" }}>
                    {message}
                  </Typography>
                </>
              ) : (
                <>
                  <img
                    src="https://i.gifer.com/Z16w.gif"
                    alt={t("redeem.errorGifAlt")}
                    style={{ width: "30px", height: "20px", marginBottom: "10px" }}
                  />
                  <Typography variant="body2" align="center" sx={{ fontSize: "14px", color: "#0056A2" }}>
                    {message}
                  </Typography>
                </>
              )}
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            {t("redeem.ok")}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ position: "absolute", zIndex: 1, right: "2%", bottom: "2%" }}>
        <img src={WaterMarkLogo} alt={t("redeem.watermarkLogoAlt")} width="70px" />
      </Box>
    </Box>
  );
};

export default Redeem;
