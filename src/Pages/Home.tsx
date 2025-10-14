import Box from "@mui/material/Box";
import AccountBalance from "../components/AccountBalance";
import Banner from "../components/Banner";
import ContentSection from "../components/ContentSection";
import CustomAppBar from "../components/CustomAppBar";
import CustomNavBar from "../components/CustomNavBar";
import QuickAccessMenu from "../components/QuickAccessMenu";
import ValueAddedServicesMenu from "../components/ValueAddedServicesMenu";
import useStore from "../services/useAppStore";
import Mobile from "../components/Mobile/Mobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Loyalty from "../components/Loyalty";

const Home = () => {
  const { selectedNavbarItem } = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const homebackgroundImage =
    "https://res.cloudinary.com/dtqcgwrgk/image/upload/v1753257146/HomeBackground_qjrvxb.png";

  const renderContentSection = () => {
    switch (selectedNavbarItem) {
      case "":
      case "Broadband":
      case "PeoTV":
      case "Voice":
        return <ContentSection />;
      case "Mobile":
        return <Mobile onBack={() => console.log("Back clicked")}/>;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        minHeight: "100vh",
        //paddingBottom: "20px",
        backgroundImage: `url(${homebackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //gap: 1,
        gap: { xs: 1, sm: 2 },
        overflow: "hidden",
        paddingBottom: { xs: 2, sm: 3 }
      }}
    >
      <CustomAppBar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "90vw",
          //maxWidth: { xs: "100%", sm: "95vw", lg: "1400px" },
          //gap: 2,
          gap: { xs: 1, sm: 1.5 },
          //paddingX: { xs: 2, sm: 3 },
          //marginTop: { xs: 1, sm: 2 }
        }}
      >
        
        {/*  MOBILE LAYOUT: preserve current nav placement */}
        {isMobile && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Banner />
            <AccountBalance />
            {/* <Loyalty /> */}
            <CustomNavBar /> {/*  NAV BAR REMAINS HERE for mobile */}
            {renderContentSection()}
            <ValueAddedServicesMenu />
            <QuickAccessMenu />
          </Box>
        )}

        {/*  TABLET LAYOUT: new stacking layout with nav bar at the top */}
        {isTablet && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CustomNavBar /> {/*  On tablets, place nav bar at the top */}
            <Banner />
            <AccountBalance />
            <ValueAddedServicesMenu />
            {/* <Loyalty /> */}
            {renderContentSection()}
            <QuickAccessMenu />
          </Box>
        )}

        {/*  DESKTOP LAYOUT */}
        {isDesktop && (
          <>
            <CustomNavBar /> {/*  NavBar at top for desktop as well */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                width: "100%",
              }}
            >
              {/* <Loyalty /> */}
              <ValueAddedServicesMenu />
              <AccountBalance />
              
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box sx={{ width: "75%" }}>{renderContentSection()}</Box>
              <Box
                sx={{
                  width: "25%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <QuickAccessMenu />
                <Banner />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
