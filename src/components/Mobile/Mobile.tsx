import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBack";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import SettingsIcon from "@mui/icons-material/Settings";
import CircularProgressBar from "../CircularProgressBar";
import { keyframes } from "@emotion/react";
import GetExtraGbPage from "./GetExtraGB";
import Dataaddons from "./data_add_ons";
import BroadbandPostPaidPackageUpgrader from "./packageupgrade";
import BuyDataBundle from "./BuyDataBundle";
import AddMinutes from "./AddMinutes";
import SmsPackages from "./SmsPackages";
import Reload from "./Reload";
import Payment from "./Payment";

// Define interfaces
interface PostpaidUsageDetails {
  package_summary: {
    used: string;
    limit: string;
  };
  usageDetails: Array<{
    name: string;
    used: string;
    limit: string;
    expiry_date: string;
    percentage: number;
  }>;
}

interface ServiceData {
  listofBBService: Array<{
    serviceID: string;
    serviceStatus: string;
    packageName: string;
  }>;
}

// White Color Scheme
const colorScheme = {
  primary: "rgb(255, 255, 255)",
  primaryLight: "rgb(250, 250, 250)",
  primaryDark: "rgb(245, 245, 245)",
  accent: "rgb(0, 120, 212)",
  secondaryAccent: "rgb(0, 95, 184)",
  highlight: "rgba(0, 120, 212, 0.1)",
  textPrimary: "rgba(0, 0, 0, 0.87)",
  textSecondary: "rgba(0, 0, 0, 0.6)",
  divider: "rgba(0, 0, 0, 0.12)",
  cardBg: "rgba(255, 255, 255, 0.9)",
  buttonGradient:
    "linear-gradient(135deg, rgba(0, 120, 212, 0.9) 0%, rgba(0, 95, 184, 0.9) 100%)",
  navbarBg: "rgba(255, 255, 255, 0.95)",
  glassEffect: "rgba(255, 255, 255, 0.7)",
  glowEffect: "rgba(0, 120, 212, 0.2)",
  shadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
};

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 120, 212, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 120, 212, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 120, 212, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const borderGlow = keyframes`
  0% { border-color: rgba(0, 120, 212, 0.3); }
  50% { border-color: rgba(0, 120, 212, 0.7); }
  100% { border-color: rgba(0, 120, 212, 0.3); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Mock data
const dummyServiceData: ServiceData = {
  listofBBService: [
    {
      serviceID: "BB-123456",
      serviceStatus: "Active",
      packageName: "Premium Internet",
    },
  ],
};

const dummyUsageDetails = {
  myPackageDetails: {
    package_summary: { used: "75", limit: "200" },
    usageDetails: [
      {
        name: "Main Package",
        used: "75",
        limit: "200",
        expiry_date: "2024-12-31",
        percentage: 37.5,
      },
      {
        name: "Night Package",
        used: "30",
        limit: "100",
        expiry_date: "2024-12-31",
        percentage: 30,
      },
    ],
  },
  extraGBDetails: {
    package_summary: { used: "5", limit: "10" },
    usageDetails: [
      {
        name: "Extra GB Pack",
        used: "5",
        limit: "10",
        expiry_date: "2024-06-30",
        percentage: 50,
      },
    ],
  },
  bonusDataDetails: {
    package_summary: { used: "2", limit: "5" },
    usageDetails: [
      {
        name: "Bonus Data",
        used: "2",
        limit: "5",
        expiry_date: "2024-07-15",
        percentage: 40,
      },
    ],
  },
  addOnsDetails: {
    package_summary: { used: "0", limit: "0" },
    usageDetails: [],
  },
  freeDataDetails: {
    package_summary: { used: "10", limit: "15" },
    usageDetails: [
      {
        name: "Free Data Pack",
        used: "10",
        limit: "15",
        expiry_date: "2024-08-01",
        percentage: 66.67,
      },
    ],
  },
};

const navbarItems = [
  {
    label: "My Package",
    ...dummyUsageDetails.myPackageDetails.package_summary,
  },
  { label: "Extra GB", ...dummyUsageDetails.extraGBDetails.package_summary },
  {
    label: "Bonus Data",
    ...dummyUsageDetails.bonusDataDetails.package_summary,
  },
  { label: "Add-Ons", ...dummyUsageDetails.addOnsDetails.package_summary },
  { label: "Free Data", ...dummyUsageDetails.freeDataDetails.package_summary },
];

const sidebarItems = [
  { label: "Usage History", icon: <DashboardIcon />, active: true },
  { label: "Reload", icon: <DataUsageIcon />, active: false },
  { label: "Buy Data Bundle", icon: <AddBoxIcon />, active: false },
  { label: "Add Minutes", icon: <UpgradeIcon />, active: false },
  { label: "SMS Packages", icon: <AddBoxIcon />, active: false },
  { label: "Payment", icon: <AddBoxIcon />, active: false },
];

// Navigation Bar Component with white theme
const BroadbandNavbar = ({
  navbarItems,
  onSelected,
  selected,
  isMobile,
}: {
  navbarItems: any[];
  onSelected: (item: string) => void;
  selected: string;
  isMobile: boolean;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 0.5 : 0,
        mb: 1.5,
        overflowX: isMobile ? "auto" : "visible",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        background: colorScheme.navbarBg,
        borderRadius: "8px",
        padding: isMobile ? "4px" : "4px 0",
        justifyContent: "space-between",
        minHeight: "40px",
        height: "auto",
        alignItems: "center",
        boxShadow: colorScheme.shadow,
      }}
    >
      {navbarItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => onSelected(item.label)}
          sx={{
            flex: 1,
            minWidth: "auto",
            px: isMobile ? 0.5 : 1.5,
            py: 0.5,
            borderRadius: "6px",
            background:
              selected === item.label
                ? "rgba(0, 120, 212, 0.1)"
                : "transparent",
            color:
              selected === item.label
                ? colorScheme.accent
                : colorScheme.textSecondary,
            border: "none",
            textTransform: "none",
            fontWeight: 600,
            fontSize: isMobile ? "0.7rem" : "0.8rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s ease",
            minHeight: "36px",
            "&:hover": {
              background: "rgba(0, 120, 212, 0.05)",
              color: colorScheme.accent,
            },
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: selected === item.label ? "70%" : "0",
              height: "2px",
              background: colorScheme.accent,
              transition: "width 0.2s ease",
              borderRadius: "1px",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: isMobile ? "0.7rem" : "0.8rem",
              fontWeight: 700,
              mb: 0.25,
              whiteSpace: "nowrap",
              lineHeight: 1.2,
              color:
                selected === item.label
                  ? colorScheme.accent
                  : colorScheme.textSecondary,
            }}
          >
            {item.label}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: isMobile ? "0.6rem" : "0.7rem",
              color:
                selected === item.label
                  ? colorScheme.accent
                  : colorScheme.textSecondary,
              fontWeight: 500,
              whiteSpace: "nowrap",
              lineHeight: 1.2,
            }}
          >
            {item.used} / {item.limit} GB
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

const DataUsageDetails = ({ onBack }: { onBack: () => void }) => {
  const [selectedItem, setSelectedItem] = useState("My Package");
  const [selectedPackage, setSelectedPackage] =
    useState<PostpaidUsageDetails | null>(dummyUsageDetails.myPackageDetails);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showGetExtraGB, setShowGetExtraGB] = useState(false);
  const [showAddons, setShowAddons] = useState(false);
  const [showpackageupgrade, setpackageupgrade] = useState(false);
  const [showBuyDataBundle, setShowBuyDataBundle] = useState(false);
  const [showAddMinutes, setShowAddMinutes] = useState(false);
  const [showSmsPackages, setShowSmsPackages] = useState(false);
  const [showReload, setShowReload] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePackageChange = (item: string) => {
    setIsLoading(true);
    setSelectedItem(item);

    setTimeout(() => {
      switch (item) {
        case "My Package":
          setSelectedPackage(dummyUsageDetails.myPackageDetails);
          break;
        case "Extra GB":
          setSelectedPackage(dummyUsageDetails.extraGBDetails);
          break;
        case "Bonus Data":
          setSelectedPackage(dummyUsageDetails.bonusDataDetails);
          break;
        case "Add-Ons":
          setSelectedPackage(dummyUsageDetails.addOnsDetails);
          break;
        case "Free Data":
          setSelectedPackage(dummyUsageDetails.freeDataDetails);
          break;
        default:
          setSelectedPackage(dummyUsageDetails.myPackageDetails);
      }
      setSelectedIndex(0);
      setIsLoading(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate sizes based on device
  const getSizeValues = () => {
    if (isMobile)
      return {
        containerWidth: "95%",
        mainContentPadding: 2,
        progressBarSize: 120,
        iconSize: "1.25rem",
        rightPanelWidth: "100%",
        buttonPadding: "8px 16px",
        panelHeight: "240px",
        sidebarWidth: "72px",
      };
    if (isTablet)
      return {
        containerWidth: "90%",
        mainContentPadding: 3,
        progressBarSize: 150,
        iconSize: "1.5rem",
        rightPanelWidth: "40%",
        buttonPadding: "10px 20px",
        panelHeight: "280px",
        sidebarWidth: "200px",
      };
    return {
      containerWidth: "100%",
      mainContentPadding: 3,
      progressBarSize: 180,
      iconSize: "1.75rem",
      rightPanelWidth: "35%",
      buttonPadding: "12px 24px",
      panelHeight: "380px",
      sidebarWidth: "240px",
    };
  };

  const sizes = getSizeValues();

  // Render different screens based on state
  if (showGetExtraGB) {
    return (
      <GetExtraGbPage
        packageName={dummyServiceData.listofBBService[0].packageName}
        onBack={() => setShowGetExtraGB(false)}
      />
    );
  }

  if (showAddons) {
    return <Dataaddons onBack={() => setShowAddons(false)} />;
  }

  if (showpackageupgrade) {
    return (
      <BroadbandPostPaidPackageUpgrader
        onBack={() => setpackageupgrade(false)}
      />
    );
  }

  if (showBuyDataBundle) {
    return <BuyDataBundle onBack={() => setShowBuyDataBundle(false)} />;
  }

  if (showAddMinutes) {
    return <AddMinutes onBack={() => setShowAddMinutes(false)} />;
  }

  if (showSmsPackages) {
    return <SmsPackages onBack={() => setShowSmsPackages(false)} />;
  }

  if (showReload) {
    return <Reload onBack={() => setShowReload(false)} />;
  }

  if (showPayment) {
    return <Payment onBack={() => setShowPayment(false)} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "80vh",
        height: "100%",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: sizes.sidebarWidth,
          backgroundColor: colorScheme.primaryLight,
          borderRight: `1px solid ${colorScheme.divider}`,
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          transition: "width 0.3s ease",
          boxShadow: colorScheme.shadow,
          zIndex: 1,
          borderRadius: "10px",
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: isTablet ? "center" : "flex-start",
            borderBottom: `1px solid ${colorScheme.divider}`,
          }}
        >
          {!isTablet && (
            <Typography
              variant="body2"
              sx={{
                color: colorScheme.accent,
                fontWeight: 700,
                fontSize: "1rem",
                whiteSpace: "nowrap",
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Mobile Portal
            </Typography>
          )}
          {isTablet && (
            <DataUsageIcon
              sx={{
                color: colorScheme.accent,
                fontSize: "1.8rem",
              }}
            />
          )}
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, p: 1 }}>
          {sidebarItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (item.label === "Buy Data Bundle") {
                    setShowBuyDataBundle(true);
                  }

                  if (item.label === "Add Minutes") {
                    setShowAddMinutes(true);
                  }

                  if (item.label === "SMS Packages") {
                    setShowSmsPackages(true);
                  }

                  if (item.label === "Reload") {
                    setShowReload(true);
                  }

                  if (item.label === "Payment") {
                    setShowPayment(true);
                  }
                }}
                sx={{
                  borderRadius: "6px",
                  p: isTablet ? "12px 8px" : "12px 16px",
                  justifyContent: isTablet ? "center" : "flex-start",
                  mb: 0.5,
                  backgroundColor: item.active
                    ? colorScheme.highlight
                    : "transparent",
                  "&:hover": {
                    backgroundColor: colorScheme.highlight,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "auto",
                    mr: isTablet ? 0 : 2,
                    justifyContent: "center",
                    color: item.active
                      ? colorScheme.accent
                      : colorScheme.textSecondary,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isTablet && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontSize: "0.9rem",
                      fontWeight: item.active ? 700 : 500,
                      color: item.active
                        ? colorScheme.accent
                        : colorScheme.textPrimary,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          paddingLeft: isMobile ? 0 : 1,
          display: "flex",
          justifyContent: "center",
          //backgroundColor: colorScheme.primaryDark,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1300px",
            backgroundColor: colorScheme.primary,
            borderRadius: "12px",
            boxShadow: colorScheme.shadow,
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${colorScheme.accent} 0%, ${colorScheme.secondaryAccent} 100%)`,
              animation: `${gradientFlow} 3s ease infinite`,
              backgroundSize: "120% 120%",
            },
          }}
        >
          {/* Mobile back button */}
          {isMobile && (
            <Button
              startIcon={<ArrowBack />}
              onClick={onBack}
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 2,
                color: colorScheme.accent,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(4px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Back
              </Typography>
            </Button>
          )}

          {/* Main Content Container */}
          <Box
            sx={{
              width: "95%",
              height: "110%",
              background: colorScheme.cardBg,
              p: sizes.mainContentPadding,
              position: "relative",
              zIndex: 1,
              animation: `${fadeIn} 0.5s ease-out`,
            }}
          >
            {/* Full-width Navigation Bar */}
            <BroadbandNavbar
              navbarItems={navbarItems}
              onSelected={handlePackageChange}
              selected={selectedItem}
              isMobile={isMobile}
            />

            {/* Content Area */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 1,
                mt: 1,
              }}
            >
              {/* Left Panel - Usage Visualization */}
              <Paper
                sx={{
                  flex: 1,
                  width: "10%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  p: isMobile ? 1.5 : 2,
                  background: colorScheme.cardBg,
                  borderRadius: "12px",
                  border: `1px solid ${colorScheme.highlight}`,
                  minHeight: sizes.panelHeight,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 0 20px ${colorScheme.glowEffect}`,
                  },
                }}
              >
                {isLoading ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: sizes.progressBarSize,
                        height: sizes.progressBarSize,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(90deg, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 75%)",
                        backgroundSize: "200% 100%",
                        animation: `${shimmer} 1.5s infinite linear`,
                      }}
                    />
                  </Box>
                ) : selectedPackage?.usageDetails.length > 0 ? (
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        textAlign: "center",
                        color: colorScheme.accent,
                        fontSize: isMobile ? "1rem" : "1.1rem",
                        px: 2,
                        py: 1,
                        borderRadius: "8px",
                        background: "rgba(0, 120, 212, 0.05)",
                      }}
                    >
                      {selectedPackage?.usageDetails[selectedIndex]?.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <ArrowBackIos
                        sx={{
                          color:
                            selectedIndex === 0
                              ? "rgba(0,0,0,0.2)"
                              : colorScheme.textSecondary,
                          cursor:
                            selectedIndex === 0 ? "not-allowed" : "pointer",
                          fontSize: sizes.iconSize,
                          "&:hover": {
                            color:
                              selectedIndex === 0
                                ? "rgba(0,0,0,0.2)"
                                : colorScheme.accent,
                          },
                        }}
                        onClick={() =>
                          selectedIndex > 0 &&
                          setSelectedIndex((prev) => prev - 1)
                        }
                      />

                      <Box
                        sx={{
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: "-10px",
                            left: "-10px",
                            right: "-10px",
                            bottom: "-10px",
                            borderRadius: "50%",
                            //border: "2px solid rgba(0, 120, 212, 0.1)",
                            //animation: `${pulseAnimation} 2s infinite`,
                            pointerEvents: "none",
                          },
                        }}
                      >
                        <CircularProgressBar
                          percentage={
                            selectedPackage.usageDetails[selectedIndex]
                              .percentage
                          }
                          size={sizes.progressBarSize}
                          accentColor={colorScheme.accent}
                          darkMode={false}
                        />
                      </Box>

                      <ArrowForwardIos
                        sx={{
                          color:
                            selectedIndex ===
                            selectedPackage.usageDetails.length - 1
                              ? "rgba(0,0,0,0.2)"
                              : colorScheme.textSecondary,
                          cursor:
                            selectedIndex ===
                            selectedPackage.usageDetails.length - 1
                              ? "not-allowed"
                              : "pointer",
                          fontSize: sizes.iconSize,
                          "&:hover": {
                            color:
                              selectedIndex ===
                              selectedPackage.usageDetails.length - 1
                                ? "rgba(0,0,0,0.2)"
                                : colorScheme.accent,
                          },
                        }}
                        onClick={() =>
                          selectedIndex <
                            selectedPackage.usageDetails.length - 1 &&
                          setSelectedIndex((prev) => prev + 1)
                        }
                      />
                    </Box>

                    <Box
                      sx={{
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: colorScheme.textPrimary,
                          fontSize: isMobile ? "1.25rem" : "1.5rem",
                        }}
                      >
                        {`${selectedPackage.usageDetails[selectedIndex].used} GB`}
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            color: colorScheme.textSecondary,
                            fontSize: "0.6em",
                            ml: 1,
                            fontWeight: 400,
                          }}
                        >
                          {`/ ${selectedPackage.usageDetails[selectedIndex].limit} GB`}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: colorScheme.textPrimary,
                          px: 2,
                          py: 1,
                          borderRadius: "8px",
                          background: `linear-gradient(90deg, rgba(0, 120, 212, 0.1) 0%, rgba(0, 95, 184, 0.1) 100%)`,
                          fontSize: isMobile ? "0.75rem" : "0.875rem",
                          display: "inline-block",
                          border: `1px solid ${colorScheme.highlight}`,
                          animation: `${borderGlow} 3s infinite ease-in-out`,
                        }}
                      >
                        {`Valid until ${formatDate(
                          selectedPackage.usageDetails[selectedIndex]
                            .expiry_date
                        )}`}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      textAlign: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "rgba(0, 0, 0, 0.03)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px dashed rgba(0, 0, 0, 0.1)",
                        animation: `${pulseAnimation} 2s infinite`,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.3,
                          fontSize: "2rem",
                          animation: `${floatAnimation} 3s ease-in-out infinite`,
                        }}
                      >
                        ∅
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        fontSize: "1rem",
                        color: colorScheme.textSecondary,
                        mt: 1,
                      }}
                    >
                      No usage data available
                    </Typography>
                  </Box>
                )}
              </Paper>

              {/* Right Panel - Account Details */}
              <Paper
                sx={{
                  width: sizes.rightPanelWidth,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  p: isMobile ? 1.5 : 2,
                  background: colorScheme.cardBg,
                  borderRadius: "12px",
                  border: `1px solid ${colorScheme.highlight}`,
                  minHeight: sizes.panelHeight,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: colorScheme.textPrimary,
                    fontSize: isMobile ? "1rem" : "1.1rem",
                    display: "flex",
                    alignItems: "left",
                    "&::before": {
                      content: '""',
                      display: "inline-block",
                      width: "4px",
                      height: "16px",
                      background: colorScheme.accent,
                      borderRadius: "2px",
                      marginRight: "8px",
                    },
                  }}
                >
                  Account Details
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  {[
                    {
                      label: "Package",
                      value: dummyServiceData.listofBBService[0].packageName,
                    },
                    {
                      label: "Status",
                      value: dummyServiceData.listofBBService[0].serviceStatus,
                      highlight: true,
                    },
                    {
                      label: "Service ID",
                      value: dummyServiceData.listofBBService[0].serviceID,
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 1.5,
                        borderRadius: "8px",
                        background: "rgba(0, 0, 0, 0.02)",
                        "&:hover": {
                          background: "rgba(0, 120, 212, 0.03)",
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "3px",
                          height: "100%",
                          background: item.highlight
                            ? colorScheme.accent
                            : "rgba(0, 0, 0, 0.05)",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: colorScheme.textSecondary,
                          fontSize: isMobile ? "0.75rem" : "0.875rem",
                          pl: 1,
                        }}
                      >
                        {item.label}:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: item.highlight
                            ? colorScheme.accent
                            : colorScheme.textPrimary,
                          fontSize: isMobile ? "0.75rem" : "0.875rem",
                          textAlign: "right",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => setpackageupgrade(true)}
                    sx={{
                      background: colorScheme.buttonGradient,
                      color: "white",
                      py: 1,
                      borderRadius: "8px",
                      fontWeight: 600,
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      "&:hover": {
                        boxShadow: `0 5px 15px ${colorScheme.glowEffect}`,
                      },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      Package Upgrade
                    </Typography>
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setShowGetExtraGB(true)}
                    sx={{
                      color: colorScheme.accent,
                      py: 1,
                      borderRadius: "8px",
                      border: `1px solid ${colorScheme.accent}`,
                      fontWeight: 600,
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      background: "rgba(0, 120, 212, 0.03)",
                      "&:hover": {
                        background: "rgba(0, 120, 212, 0.08)",
                        borderColor: colorScheme.secondaryAccent,
                      },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      Get Extra GB
                    </Typography>
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setShowAddons(true)}
                    sx={{
                      color: colorScheme.textPrimary,
                      py: 1,
                      borderRadius: "8px",
                      border: "1px solid rgba(0, 0, 0, 0.2)",
                      fontWeight: 600,
                      fontSize: isMobile ? "0.75rem" : "0.875rem",
                      background: "rgba(0, 0, 0, 0.01)",
                      "&:hover": {
                        background: "rgba(0, 0, 0, 0.03)",
                        borderColor: "rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      Data Add-ons
                    </Typography>
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
      
    </Box>
  );
};

export default DataUsageDetails;
