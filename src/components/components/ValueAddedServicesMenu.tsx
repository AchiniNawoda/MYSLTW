import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import VasIcon from "./VasIcon";
import { useTranslation } from "react-i18next";

const ValueAddedServicesMenu = () => {
  const { t } = useTranslation();

  const items = [
    { image: "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39680.png", url: "https://duthaya.lk/" },
    { image: "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39681.png", url: "https://kaspersky-dp.slt.lk/customerProductList" },
    { image: "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39682.png", url: "https://www.slt.lk/en/peotv-go" },
    { image: "https://res.cloudinary.com/dtqcgwrgk/image/upload/v1753463890/PlayStreet_yinaat.png", url: "https://playstreet.slt.lk/" },
    //{ image: "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39683.png", url: "https://play.google.com/store/apps/details?id=com.arimac.slt&hl=en&gl=US" },
    { image: "https://mysltimages.s3.eu-north-1.amazonaws.com/Group+39684.png", url: "https://storage.slt.lk/portal/new-registration/" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: { xs: 1, sm: 2 },
        paddingY: { xs: 1, sm: 1 },
        //width: { xs: "auto", lg: "40%" },
        width: { sm: "auto", lg: "50%" }, // Without Loyalty Points Section
        minHeight: "65px",
        border: "2px solid #FFFFFF",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF80",
        flexWrap: "nowrap",
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: 16, sm: 20 },
          color: "#0056A2",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "flex-start" },
          lineHeight: 1.2,
          mr: { xs: 0, sm: 2 }, // spacing between text and icons
          textAlign: { xs: "center", sm: "left" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        {t("Services")}
      </Typography>


      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          justifyContent: { xs: "flex-start", sm: "flex-end" },
          alignItems: "center",
          flexGrow: 1,
          //gap: { xs: 1, sm: 1.5 },
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              flex: { xs: "0 0 33.33%", sm: "0 0 auto" }, // 3 per row on mobile
              display: "flex",
              justifyContent: "center",
            }}
          >
            <VasIcon imagePath={item.image} url={item.url} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ValueAddedServicesMenu;
