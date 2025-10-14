import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const DisableDetailedReport = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        justifyContent: "start",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 2,
        borderRadius: "10px",
        height: "400px",
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#0056A2",
          marginBottom: 1,
        }}
      >
        {t("unsubscribeTitle")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 4,
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "20px", color: "#0056A2" }}>
          {t("unsubscribeText")}
        </Typography>
        <Button
          sx={{
            backgroundColor: "#0056A2",
            color: "#FFFFFF",
            width: "100px",
            borderRadius: "10px",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
            {t("submit")}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DisableDetailedReport;
