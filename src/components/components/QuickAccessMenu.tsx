import { useEffect, useState } from "react";
import { Box, Button, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import useStore from "../services/useAppStore";

const QuickAccessMenu = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState("");
  const [hover, setHover] = useState(-1);
  const theme = useTheme();
  //const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMediumDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  //const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const Promotion = "https://mysltimages.s3.eu-north-1.amazonaws.com/Promotion.png";
  const PromotionSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/PromotionSelected.png";
  const PromotionHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/PromotionHover.png";
  const NewServices = "https://mysltimages.s3.eu-north-1.amazonaws.com/New+Services.png";
  const NewServicesSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/NewServicesSelected.png";
  const NewServicesHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/NewServicesHover.png";
  const DigitalLife = "https://mysltimages.s3.eu-north-1.amazonaws.com/Digital+Life.png";
  const DigitalLifeSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/DigitalLifeSelected.png";
  const DigitalLifeHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/DigitalLifeHover.png";
  const Bill = "https://mysltimages.s3.eu-north-1.amazonaws.com/Bill.png";
  const BillSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/BillSelected.png";
  const BillDisabled = "https://mysltimages.s3.eu-north-1.amazonaws.com/BillDisabled.png";
  const BillHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/BillHover.png";
  const HotDevices = "https://mysltimages.s3.eu-north-1.amazonaws.com/Hot+Devices.png";
  const HotDevicesSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/HotDevicesSelected.png";
  const HotDevicesHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/HotDevicesHover.png";
  const Complaints = "https://mysltimages.s3.eu-north-1.amazonaws.com/Complaints.png";
  const ComplaintsSelected = "https://mysltimages.s3.eu-north-1.amazonaws.com/ComplaintsSelected.png";
  const ComplaintsDisabled = "https://mysltimages.s3.eu-north-1.amazonaws.com/ComplaintsDisabled.png";
  const ComplaintsHover = "https://mysltimages.s3.eu-north-1.amazonaws.com/ComplaintsHover.png";

  const {
    selectedTelephone,
    serviceDetails,
    setLeftMenuItem,
    setSelectedNavbarItem,
    setSelectedQuickAccessItem,
    selectedQuickAccessItem,
  } = useStore();

  const isPrepaid = serviceDetails?.promotionType === "Prepaid";

  const disabledItems = ["Reload", "Complaints"];

  //Image size based on screen size
  const getImageSize = () => {
    if (isMobile) return { width: "24px", height: "24px" };
    if (isTablet) return { width: "28px", height: "28px" };
    if (isMediumDesktop) return { width: "22px", height: "22px" };
    return { width: "32px", height: "32px" };
  };

  const tileData = [
    {
      key: "Promotion",
      img: Promotion,
      selectedImg: PromotionSelected,
      hoverImg: PromotionHover,
      //customStyles: { width: isSmallScreen ? "24px" : "32px", height: isSmallScreen ? "24px" : "32px" },
      customStyles: getImageSize(),
    },
    {
      key: "New Services",
      img: NewServices,
      selectedImg: NewServicesSelected,
      hoverImg: NewServicesHover,
      //customStyles: { width: isSmallScreen ? "22px" : "30px", height: isSmallScreen ? "22px" : "30px" },
      customStyles: getImageSize(),
    },
    {
      key: "Digital Life",
      img: DigitalLife,
      selectedImg: DigitalLifeSelected,
      hoverImg: DigitalLifeHover,
      //customStyles: { width: isSmallScreen ? "20px" : "28px", height: isSmallScreen ? "22px" : "30px" },
      customStyles: getImageSize(),
    },
    {
      key: isPrepaid ? "Reload" : "Bill",
      img: Bill,
      selectedImg: BillSelected,
      hoverImg: BillHover,
      disabledImg: BillDisabled,
      //customStyles: { width: isSmallScreen ? "22px" : "30px", height: isSmallScreen ? "22px" : "30px" },
      customStyles: getImageSize(),
    },
    {
      key: "LifeStore",
      img: HotDevices,
      selectedImg: HotDevicesSelected,
      hoverImg: HotDevicesHover,
      //customStyles: { width: isSmallScreen ? "22px" : "30px", height: isSmallScreen ? "22px" : "30px" },
      customStyles: getImageSize(),
    },
    {
      key: "Complaints",
      img: Complaints,
      selectedImg: ComplaintsSelected,
      hoverImg: ComplaintsHover,
      disabledImg: ComplaintsDisabled,
      //customStyles: { width: isSmallScreen ? "22px" : "30px", height: isSmallScreen ? "20px" : "28px" },
      customStyles: getImageSize(),
    },
  ];

  const handleRedirect = () => {
    window.open("https://eteleshop.slt.lk/", "_blank");
  };

  useEffect(() => {
    setSelectedItem(selectedQuickAccessItem);
  }, [selectedQuickAccessItem]);

  useEffect(() => {
    setSelectedQuickAccessItem("");
  }, [selectedTelephone]);


  // Button height based on screen size
  const getButtonHeight = () => {
    if (isMobile) return "85px";
    if (isTablet) return "90px";
    if (isMediumDesktop) return "90px";
    return "64px"; // Desktop
  };

  // Font size based on screen size
  const getFontSize = () => {
    if (isMobile) return "11px";
    if (isTablet) return "12px";
    return "14px"; // Desktop
  };

  return (
    <Box sx={{ 
      width: "100%", 
      overflow: "hidden", 
      margin: "0 auto",
      backgroundColor: "#FFFFFF80",
      borderRadius: "10px",
      border: "1px solid #FFFFFF",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}>
      <Box
        sx={{
          // backgroundColor: "#F0F4F8",
          borderRadius: "10px",
          //boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: isMobile ? "8px" : isTablet ? "12px" : "14px",
          paddingBottom: "0px",
          // marginBottom: isMobile ? "8px" : isTablet ? "12px" : "16px",
        }}>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            //marginBottom: isMobile ? "8px" : "12px",
            color: "primary.main",
            fontSize: isMobile ? "16px" : isTablet ? "18px" : "20px",
          }}
        >
          {t("Top Picks")}
        </Typography>
      </Box>

      <Grid 
        container 
        spacing={isMobile ? 1.2 : isTablet ? 1.5 : 1}
        padding={"8px"}>
        {tileData.map((tile, index) => {
          const disabled = disabledItems.includes(tile.key) && isPrepaid;

          return (
            <Grid 
            item 
            xs={6} // 2 items per row on mobile
            sm={4} // 3 items per row on tablet
            md={6} // 2 items per row on medium desktop
            lg={6} // 2 items per row on large desktop (3 rows total)
            key={index}
              sx={{ padding: isMobile ? "2px" : isTablet ? "6px" : "0px" }}
            >
              <Button
                onClick={() => {
                  if (tile.key === "LifeStore") {
                    handleRedirect();
                  } else {
                    setSelectedQuickAccessItem(tile.key);
                    setLeftMenuItem(tile.key);
                    setSelectedNavbarItem("");
                  }
                }}
                onMouseEnter={() => {
                  if (!disabled && selectedItem !== tile.key) setHover(index);
                }}
                onMouseLeave={() => setHover(-1)}
                disabled={disabled}
                variant="contained"
                sx={{
                  width: "100%",
                  //height: isSmallScreen ? "100px" : "60px", // Square shape on small screens
                  height: getButtonHeight(),
                  //aspectRatio: isSmallScreen ? "1/1" : "unset", // Force square on small screens
                  aspectRatio: isMobile ? "1/1" : "unset", // Keep square shape
                  //fontSize: isSmallScreen ? "12px" : "16px",
                  fontWeight: "bold",
                  backgroundColor:
                    selectedItem === tile.key ? "#0056A2" : "#FFFFFF",
                  color: selectedItem === tile.key ? "#FFFFFF" : "#0056A2",
                  display: "flex",
                  //flexDirection: isSmallScreen ? "column" : "row", // Stack icon and text vertically on small screens
                  flexDirection: isMobile || isMediumDesktop ? "column" : "row", // Stack icon and text vertically
                  //gap: isSmallScreen ? 0.5 : 1,
                  gap: isMobile ? "4px" : "8px",
                  //justifyContent: isSmallScreen ? "center" : "flex-start" ,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  //padding: isSmallScreen ? "8px" : "16px",
                  padding: isMobile ? "8px" : "12px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      selectedItem !== tile.key ? "rgba(0, 100, 180, 0.75)" : "#0056A2",
                    color: selectedItem !== tile.key ? "#DFF0FF" : "#FFFFFF",
                  },
                  "&:disabled": {
                    backgroundColor: "#CCCCCC",
                    color: "#999999",
                  },
                }}
              >
                <Box
                  sx={{
                    //width: isSmallScreen ? "24px" : "30px",
                    width: tile.customStyles.width,
                    //height: isSmallScreen ? "24px" : "30px",
                    height: tile.customStyles.height,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {disabled ? (
                    <img
                      src={tile.disabledImg}
                      alt={`${t(tile.key)}-disabled`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        //...tile.customStyles,
                      }}
                    />
                  ) : (
                    <>
                      <img
                        src={tile.img}
                        alt={`${t(tile.key)}-default`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          position: "absolute",
                          opacity:
                            hover === index || selectedItem === tile.key
                              ? 0
                              : 1,
                          transition: "opacity 0.3s ease",
                          //...tile.customStyles,
                          // position: "absolute",
                          // opacity:
                          //   hover === index || selectedItem === tile.key
                          //     ? 0
                          //     : 1,
                          // transition: "opacity 0.3s ease",
                        }}
                      />
                      <img
                        src={
                          hover === index
                            ? tile.hoverImg
                            : selectedItem === tile.key
                            ? tile.selectedImg
                            : tile.img
                        }
                        alt={`${t(tile.key)}-hover`}
                        style={{
                          //...tile.customStyles,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          position: "absolute",
                          opacity:
                            hover === index || selectedItem === tile.key
                              ? 1
                              : 0,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    </>
                  )}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 600,
                    //fontSize: isSmallScreen ? "11px" : "14px",
                    fontSize: getFontSize(),
                    textAlign: "center",
                    lineHeight: 1.2,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {t(tile.key)}
                </Typography>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default QuickAccessMenu;