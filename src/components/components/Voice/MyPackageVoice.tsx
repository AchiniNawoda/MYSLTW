import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import useStore from "../../services/useAppStore";
import { useTranslation } from "react-i18next";

const MyPackageVoice = () => {
  const { t } = useTranslation();
  const { serviceDetails } = useStore();
  const watermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF1A",
        padding: 1,
        borderRadius: "10px",
        height: "65vh",
        boxShadow: "0px 3px 3px #0000004A",
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
        <Typography
          variant="body2"
          sx={{ color: "#0056A2", fontSize: "20px", fontWeight: 600, mb: 2 }}
        >
          {`${t("service_id")} : ${serviceDetails?.listofVoiceService[0].serviceID}`}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#0056A2", fontSize: "36px", fontWeight: 600, mb: 2 }}
        >
          {serviceDetails?.listofVoiceService[0].packageName}
        </Typography>
        <Typography variant="body2" sx={{ color: "#0056A2", fontSize: "36px" }}>
          {`${t("status")} : `}
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "#4FD745", fontSize: "36px", fontWeight: 600 }}
          >
            {serviceDetails?.listofVoiceService[0].serviceStatus}
          </Typography>
        </Typography>
      </Box>
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
    </Box>
  );
};

export default MyPackageVoice;
