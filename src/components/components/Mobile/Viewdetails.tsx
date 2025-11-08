import { useState, useEffect } from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme, Divider } from "@mui/material";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBack";
import CircularProgressBar from "../CircularProgressBar";
import { keyframes } from '@emotion/react';
import GetExtraGbPage from './GetExtraGB'; 
import Dataaddons from './data_add_ons'; 
import BroadbandPostPaidPackageUpgrader from './packageupgrade'; 


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

// Enhanced Color Scheme
const colorScheme = {
  primaryDark: 'rgb(13, 54, 90)',
  primaryLight: 'rgb(25, 71, 114)',
  accent: 'rgb(0, 168, 232)',
  secondaryAccent: 'rgb(64, 196, 255)',
  highlight: 'rgba(100, 210, 255, 0.3)',
  textPrimary: 'rgba(255, 255, 255, 0.95)',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  divider: 'rgba(255, 255, 255, 0.12)',
  cardBg: 'rgba(18, 63, 102, 0.4)',
  buttonGradient: 'linear-gradient(135deg, rgba(0, 168, 232, 0.9) 0%, rgba(64, 196, 255, 0.9) 100%)',
  navbarBg: 'rgba(13, 54, 90, 0.9)',
  glassEffect: 'rgba(255, 255, 255, 0.05)',
  glowEffect: 'rgba(64, 196, 255, 0.3)'
};

// Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 168, 232, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 168, 232, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 168, 232, 0); }
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
  0% { border-color: rgba(64, 196, 255, 0.3); }
  50% { border-color: rgba(64, 196, 255, 0.7); }
  100% { border-color: rgba(64, 196, 255, 0.3); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Mock data
const dummyServiceData: ServiceData = {
  listofBBService: [{
    serviceID: "BB-123456",
    serviceStatus: "Active",
    packageName: "Premium Internet 200GB"
  }]
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
        percentage: 37.5
      },
      {
        name: "Night Package",
        used: "30",
        limit: "100",
        expiry_date: "2024-12-31",
        percentage: 30
      }
    ]
  },
  extraGBDetails: {
    package_summary: { used: "5", limit: "10" },
    usageDetails: [
      {
        name: "Extra GB Pack",
        used: "5",
        limit: "10",
        expiry_date: "2024-06-30",
        percentage: 50
      }
    ]
  },
  bonusDataDetails: {
    package_summary: { used: "2", limit: "5" },
    usageDetails: [
      {
        name: "Bonus Data",
        used: "2",
        limit: "5",
        expiry_date: "2024-07-15",
        percentage: 40
      }
    ]
  },
  addOnsDetails: {
    package_summary: { used: "0", limit: "0" },
    usageDetails: []
  },
  freeDataDetails: {
    package_summary: { used: "10", limit: "15" },
    usageDetails: [
      {
        name: "Free Data Pack",
        used: "10",
        limit: "15",
        expiry_date: "2024-08-01",
        percentage: 66.67
      }
    ]
  }
};

const navbarItems = [
  { label: "My Package", ...dummyUsageDetails.myPackageDetails.package_summary },
  { label: "Extra GB", ...dummyUsageDetails.extraGBDetails.package_summary },
  { label: "Bonus Data", ...dummyUsageDetails.bonusDataDetails.package_summary },
  { label: "Add-Ons", ...dummyUsageDetails.addOnsDetails.package_summary },
  { label: "Free Data", ...dummyUsageDetails.freeDataDetails.package_summary },
];

// Navigation Bar Component with full width
const BroadbandNavbar = ({ navbarItems, onSelected, selected, isMobile }: { 
  navbarItems: any[], 
  onSelected: (item: string) => void, 
  selected: string,
  isMobile: boolean 
}) => {
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? 0.5 : 0,
      mb: 1.5,
      overflowX: isMobile ? 'auto' : 'visible',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      background: 'rgba(13, 54, 90, 0.7)',
      borderRadius: '4px',
      padding: isMobile ? '4px' : '4px 0',
      justifyContent: 'space-between',
      minHeight: '40px',
      height: 'auto',
      alignItems: 'center'
    }}>
      {navbarItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => onSelected(item.label)}
          sx={{
            flex: 1,
            minWidth: 'auto',
            px: isMobile ? 0.5 : 1.5,
            py: 0.5,
            borderRadius: '3px',
            background: selected === item.label 
              ? 'linear-gradient(135deg, rgba(0, 168, 232, 0.3) 0%, rgba(64, 196, 255, 0.3) 100%)' 
              : 'transparent',
            color: selected === item.label ? colorScheme.textPrimary : colorScheme.textSecondary,
            border: 'none',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: isMobile ? '0.7rem' : '0.8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            minHeight: '36px',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(0, 168, 232, 0.2) 0%, rgba(64, 196, 255, 0.2) 100%)',
              transform: 'translateY(-1px)'
            },
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: selected === item.label ? '70%' : '0',
              height: '2px',
              background: colorScheme.secondaryAccent,
              transition: 'width 0.2s ease',
              borderRadius: '1px'
            }
          }}
        >
          <Typography sx={{ 
            fontSize: isMobile ? '0.7rem' : '0.8rem',
            fontWeight: 600,
            mb: 0.25,
            whiteSpace: 'nowrap',
            lineHeight: 1.2
          }}>
            {item.label}
          </Typography>
          <Typography sx={{ 
            fontSize: isMobile ? '0.6rem' : '0.7rem',
            color: selected === item.label ? colorScheme.secondaryAccent : colorScheme.textSecondary,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            lineHeight: 1.2
          }}>
            {item.used} / {item.limit} GB
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

const DataUsageDetails = ({ onBack }: { onBack: () => void }) => {
  const [selectedItem, setSelectedItem] = useState("My Package");
  const [selectedPackage, setSelectedPackage] = useState<PostpaidUsageDetails | null>(
    dummyUsageDetails.myPackageDetails
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showGetExtraGB, setShowGetExtraGB] = useState(false);
  const [showAddons, setShowAddons] = useState(false);
  const [showpackageupgrade, setpackageupgrade] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

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
      switch(item) {
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
      }
      setSelectedIndex(0);
      setIsLoading(false);
    }, 500);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate sizes based on device
  const getSizeValues = () => {
    if (isMobile) return {
      containerWidth: '95%',
      mainContentPadding: 2,
      progressBarSize: 120,
      iconSize: '1.25rem',
      rightPanelWidth: '100%',
      buttonPadding: '8px 16px',
      panelHeight: '240px'
    };
    if (isTablet) return {
      containerWidth: '90%',
      mainContentPadding: 3,
      progressBarSize: 150,
      iconSize: '1.5rem',
      rightPanelWidth: '40%',
      buttonPadding: '10px 20px',
      panelHeight: '280px'
    };
    return {
      containerWidth: '85%',
      mainContentPadding: 3,
      progressBarSize: 180,
      iconSize: '1.75rem',
      rightPanelWidth: '35%',
      buttonPadding: '12px 24px',
      panelHeight: '320px'
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
    return (
      <Dataaddons
        onBack={() => setShowAddons(false)}
      />
    );
  }


  if ( showpackageupgrade) {
    return (
      <BroadbandPostPaidPackageUpgrader
        onBack={() => setpackageupgrade(false)}
      />
    );
  }


  return (
    <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    color: "#0056A2",
    padding: 0.3,
    borderRadius: "5px",
    boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.29)",
    minHeight: "290px", // Reduced from 430px to 360px
    height: "auto", // Added to ensure content fits
    gap: 2,
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maxWidth: "1200px",
    background: `linear-gradient(135deg, ${colorScheme.primaryDark} 0%, ${colorScheme.primaryLight} 100%)`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: `linear-gradient(90deg, ${colorScheme.accent} 0%, ${colorScheme.secondaryAccent} 100%)`,
      zIndex: 1,
      animation: `${gradientFlow} 3s ease infinite`,
      backgroundSize: '120% 120%'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '-100px',
      width: '200px',
      height: '150px', // Reduced from 180px to 150px
      background: 'radial-gradient(circle, rgba(64, 196, 255, 0.15) 0%, rgba(64, 196, 255, 0) 70%)',
      borderRadius: '50%',
      filter: 'blur(20px)',
      animation: `${floatAnimation} 8s ease-in-out infinite`,
      zIndex: 0
    }
  }}
>
      {/* Back Button with enhanced styling */}
      <Button
  startIcon={<ArrowBack />}
  onClick={onBack}
  sx={{
    alignSelf: 'flex-start',
    color: colorScheme.textPrimary,
    zIndex: 2,
    transition: 'all 0.3s ease',
    px: 2, // Same horizontal padding
    py: 1, // Same vertical padding
    borderRadius: '10px', // Same border radius
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontSize: '1rem', // Same font size
    fontWeight: 700, // Same font weight
    minWidth: 'auto', // Remove minimum width
    '&:hover': {
      backgroundColor: 'rgba(0, 168, 232, 0.1)',
      transform: 'translateX(-5px)', // Same hover movement
      boxShadow: `0 0 12px ${colorScheme.glowEffect}` // Same glow effect
    },
    '& .MuiSvgIcon-root': {
      transition: 'all 0.3s ease',
      fontSize: '1.25rem' // Matching icon size
    },
    '&:hover .MuiSvgIcon-root': {
      transform: 'translateX(-3px)' // Same icon movement
    }
  }}
>
  Dashboard
</Button>

      {/* Main Content Container with glass morphism effect */}
      <Box sx={{
        width: sizes.containerWidth,
        background: 'rgba(18, 63, 102, 0.3)',
        borderRadius: '16px',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        p: sizes.mainContentPadding,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        position: 'relative',
        zIndex: 1,
        overflow: 'hidden',
        animation: `${fadeIn} 0.5s ease-out`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 168, 232, 0.05) 0%, rgba(64, 196, 255, 0.05) 100%)',
          zIndex: -1
        }
      }}>
        {/* Full-width Navigation Bar */}
        <BroadbandNavbar
          navbarItems={navbarItems}
          onSelected={handlePackageChange}
          selected={selectedItem}
          isMobile={isMobile}
        />

        {/* Content Area */}
        <Box sx={{ 
          display: "flex", 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 2,
          mt: 2
        }}>
          {/* Left Panel - Usage Visualization with enhanced effects */}
          <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: isMobile ? 1.5 : 2,
            background: 'rgba(18, 63, 102, 0.3)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minHeight: sizes.panelHeight,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(64, 196, 255, 0.4)',
              boxShadow: '0 0 20px rgba(64, 196, 255, 0.1)'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'linear-gradient(45deg, transparent 45%, rgba(64, 196, 255, 0.05) 50%, transparent 55%)',
              animation: `${shimmer} 3s infinite linear`,
              zIndex: 0
            }
          }}>
            {isLoading ? (
              <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                position: 'relative',
                zIndex: 1
              }}>
                <Box sx={{
                  width: sizes.progressBarSize,
                  height: sizes.progressBarSize,
                  borderRadius: '50%',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)',
                  backgroundSize: '200% 100%',
                  animation: `${shimmer} 1.5s infinite linear`,
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                }} />
              </Box>
            ) : selectedPackage?.usageDetails.length > 0 ? (
              <>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  textAlign: 'center',
                  color: colorScheme.secondaryAccent,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  position: 'relative',
                  zIndex: 1,
                  textShadow: '0 0 10px rgba(64, 196, 255, 0.3)',
                  px: 2,
                  py: 1,
                  borderRadius: '8px',
                  background: 'rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}>
                  {selectedPackage?.usageDetails[selectedIndex]?.name}
                </Typography>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  position: 'relative',
                  zIndex: 1
                }}>
                  <ArrowBackIos
                    sx={{
                      color: selectedIndex === 0 ? 'rgba(255,255,255,0.3)' : colorScheme.secondaryAccent,
                      cursor: selectedIndex === 0 ? 'not-allowed' : 'pointer',
                      fontSize: sizes.iconSize,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: selectedIndex === 0 ? 'rgba(255,255,255,0.3)' : colorScheme.accent,
                        transform: 'translateX(-3px)'
                      }
                    }}
                    onClick={() => selectedIndex > 0 && setSelectedIndex(prev => prev - 1)}
                  />
                  
                  <Box sx={{
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '-10px',
                      left: '-10px',
                      right: '-10px',
                      bottom: '-10px',
                      borderRadius: '50%',
                      border: '2px solid rgba(64, 196, 255, 0.2)',
                      animation: `${pulseAnimation} 2s infinite`,
                      pointerEvents: 'none'
                    }
                  }}>
                    <CircularProgressBar
                      percentage={selectedPackage.usageDetails[selectedIndex].percentage}
                      size={sizes.progressBarSize}
                      accentColor={colorScheme.accent}
                      darkMode
                    />
                  </Box>

                  <ArrowForwardIos
                    sx={{
                      color: selectedIndex === selectedPackage.usageDetails.length - 1 
                        ? 'rgba(255,255,255,0.3)' : colorScheme.secondaryAccent,
                      cursor: selectedIndex === selectedPackage.usageDetails.length - 1 ? 'not-allowed' : 'pointer',
                      fontSize: sizes.iconSize,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: selectedIndex === selectedPackage.usageDetails.length - 1 
                          ? 'rgba(255,255,255,0.3)' : colorScheme.accent,
                        transform: 'translateX(3px)'
                      }
                    }}
                    onClick={() => selectedIndex < selectedPackage.usageDetails.length - 1 && 
                      setSelectedIndex(prev => prev + 1)}
                  />
                </Box>

                <Box sx={{ 
                  textAlign: 'center',
                  width: '100%',
                  position: 'relative',
                  zIndex: 1
                }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700,
                    mb: 1,
                    color: colorScheme.textPrimary,
                    fontSize: isMobile ? '1.25rem' : '1.5rem',
                    textShadow: '0 0 8px rgba(64, 196, 255, 0.3)',
                    letterSpacing: '0.5px'
                  }}>
                    {`${selectedPackage.usageDetails[selectedIndex].used} GB`}
                    <Typography component="span" sx={{ 
                      color: colorScheme.textSecondary,
                      fontSize: '0.6em',
                      ml: 1,
                      fontWeight: 400
                    }}>
                      {`/ ${selectedPackage.usageDetails[selectedIndex].limit} GB`}
                    </Typography>
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: colorScheme.textPrimary,
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      background: `linear-gradient(90deg, rgba(0, 168, 232, 0.2) 0%, rgba(64, 196, 255, 0.2) 100%)`,
                      fontSize: isMobile ? '0.75rem' : '0.875rem',
                      display: 'inline-block',
                      border: '1px solid rgba(64, 196, 255, 0.3)',
                      animation: `${borderGlow} 3s infinite ease-in-out`,
                      backdropFilter: 'blur(5px)'
                    }}
                  >
                    {`Valid until ${formatDate(selectedPackage.usageDetails[selectedIndex].expiry_date)}`}
                  </Typography>
                </Box>
              </>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: 1,
                position: 'relative',
                zIndex: 1
              }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed rgba(255, 255, 255, 0.2)',
                  animation: `${pulseAnimation} 2s infinite`,
                  backdropFilter: 'blur(5px)'
                }}>
                  <Typography variant="h4" sx={{ 
                    opacity: 0.5, 
                    fontSize: '2rem',
                    animation: `${floatAnimation} 3s ease-in-out infinite`
                  }}>∅</Typography>
                </Box>
                <Typography variant="h6" sx={{ 
                  fontWeight: 500, 
                  fontSize: '1rem',
                  color: colorScheme.textSecondary,
                  mt: 1
                }}>
                  No usage data available
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Panel - Account Details with enhanced styling */}
          <Box sx={{
            width: sizes.rightPanelWidth,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            p: isMobile ? 1.5 : 2,
            background: 'rgba(18, 63, 102, 0.3)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minHeight: sizes.panelHeight,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'rgba(64, 196, 255, 0.4)',
              boxShadow: '0 0 20px rgba(64, 196, 255, 0.1)'
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${colorScheme.accent} 0%, ${colorScheme.secondaryAccent} 100%)`,
              animation: `${gradientFlow} 3s ease infinite`,
              backgroundSize: '200% 200%'
            }
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 1,
              color: colorScheme.textPrimary,
              fontSize: isMobile ? '1rem' : '1.1rem',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: '4px',
                height: '16px',
                background: colorScheme.secondaryAccent,
                borderRadius: '2px',
                marginRight: '8px'
              }
            }}>
              Account Details
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5,
              mb: 1,
              position: 'relative',
              zIndex: 1
            }}>
              {[
                { label: "Package", value: dummyServiceData.listofBBService[0].packageName },
                { label: "Status", value: dummyServiceData.listofBBService[0].serviceStatus, highlight: true },
                { label: "Service ID", value: dummyServiceData.listofBBService[0].serviceID },
              ].map((item, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: '8px',
                    background: 'rgba(246, 242, 242, 0.03)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: 'rgba(64, 196, 255, 0.05)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '3px',
                      height: '100%',
                      background: item.highlight ? colorScheme.secondaryAccent : 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  <Typography variant="body1" sx={{ 
                    color: colorScheme.textSecondary,
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    pl: 1
                  }}>
                    {item.label}:
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    fontWeight: 500,
                    color: item.highlight ? colorScheme.secondaryAccent : colorScheme.textPrimary,
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    textAlign: 'right',
                    textShadow: item.highlight ? '0 0 8px rgba(64, 196, 255, 0.3)' : 'none'
                  }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ 
              mt: 'auto',
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1.5,
              position: 'relative',
              zIndex: 1
            }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setpackageupgrade(true)}
                sx={{
                  background: colorScheme.buttonGradient,
                  color: 'white',
                  py: 1,
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 5px 15px ${colorScheme.glowEffect}`,
                    '&::before': {
                      opacity: 1
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.2) 50%, transparent 55%)',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    animation: `${shimmer} 2s infinite`
                  }
                }}
              >
                Package Upgrade
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setShowGetExtraGB(true)}
                sx={{
                  color: colorScheme.secondaryAccent,
                  py: 1,
                  borderRadius: '8px',
                  border: `1px solid ${colorScheme.secondaryAccent}`,
                  fontWeight: 600,
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(64, 196, 255, 0.05)',
                  '&:hover': {
                    background: 'rgba(64, 196, 255, 0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: `0 5px 15px ${colorScheme.glowEffect}`,
                    borderColor: colorScheme.accent
                  }
                }}
              >
                Get Extra GB
              </Button>
              
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setShowAddons(true)}
                sx={{
                  color: colorScheme.textPrimary,
                  py: 1,
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontWeight: 600,
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.03)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.08)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  }
                }}
              >
                Data Add-ons
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DataUsageDetails;