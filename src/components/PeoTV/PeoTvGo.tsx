import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

const PeoTvGo = () => {
  const PeoTvGoImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/PeoTVGoImage.png";
  const WaterMarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";

  const handleclick = () => {
    window.open("https://www.peotvgo.com/", "_blank");
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "65vh",
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Box component="img" src={PeoTvGoImage} alt="Peo TV Go" />

      <Button
        onClick={handleclick}
        variant="contained"
        sx={{
          width: "200px",
          backgroundColor: "#ffffff",
          color: "#0056A2",
          marginTop: "40px",
          borderRadius: "10px",
          border: "2px solid #0056A2",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textTransform: "capitalize",
            fontWeight: 600,
            fontSize: "20px",
          }}
        >
          Explore More
        </Typography>
      </Button>

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
  );
};

export default PeoTvGo;