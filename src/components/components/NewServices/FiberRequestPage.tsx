import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import OrderAnimation from "../OrderComponent/Order";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FiberRequestPage = () => {
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(false);
  const watermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  const fiberCharacter = "https://mysltimages.s3.eu-north-1.amazonaws.com/fiberCableCharacter.png";

  const handleRequestClick = () => {
    // Open the URL in a new tab
    window.open("https://myslt.slt.lk/applyonline", "_blank");
  };

  const handleClick = () => {
    setIsDisabled(true);
    setTimeout(() => {
      handleRequestClick();
      setIsDisabled(false);
    }, 9000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        minWidth: "65vw",
        minHeight: "45vh",
      }}
    >
      {/* Centered Title */}
      <Typography
        align="center"
        variant="body2"
        sx={{ padding: "10vh", fontSize: 24, fontWeight: "bold" }}
      >
        {t("fiberRequest.title")}
      </Typography>

      {/* Request Button */}
      <Button
        disableRipple
        onClick={handleClick}
        disabled={isDisabled}
        sx={{
          backgroundColor: "#fff",
          "&:disabled": {
            backgroundColor: "#fff",
            color: "inherit",
            pointerEvents: "none",
           
          },
        }}
      >
        <OrderAnimation />
      </Button>

      {/* Watermark Logo - Bottom Left */}
      <Box
        component="img"
        src={watermarkLogo}
        alt="Watermark Logo"
        sx={{
          zIndex: 1,
          position: "absolute",
          bottom: 20,
          left: 20,
          width: "200px",
          opacity: 1,
        }}
      />

      {/* Character Image - Right Center */}
      <Box
        component="img"
        src={fiberCharacter}
        alt="Fiber Character"
        sx={{
          zIndex: 1,
          position: "absolute",
          left: "65%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "45vh",
        }}
      />
    </Box>
  );
};

export default FiberRequestPage;
