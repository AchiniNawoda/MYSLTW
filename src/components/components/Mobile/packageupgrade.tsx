import React, { useEffect, useRef, useState } from "react";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBack from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  SvgIcon,
  keyframes,
  useTheme,
  useMediaQuery
} from "@mui/material";

// Light color scheme with white background
const colorScheme = {
  primaryDark: '#1565C0',
  primaryLight: '#1976D2',
  accent: '#2196F3',
  secondaryAccent: '#42A5F5',
  highlight: 'rgba(66, 165, 245, 0.1)',
  textPrimary: '#212121',
  textSecondary: '#424242',
  divider: 'rgba(0, 0, 0, 0.12)',
  cardBg: '#FFFFFF',
  buttonGradient: 'linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)',
  navbarBg: '#FFFFFF',
  success: '#4CAF50',
  error: '#F44336',
  currentPackageBg: '#FFFFFF',
  packageCardBg: '#FFFFFF',
  activeTabBg: 'linear-gradient(90deg, rgba(33,150,243,0.1) 0%, rgba(66,165,245,0.1) 100%)',
  cardShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
  cardHoverShadow: '0 8px 20px rgba(0, 0, 0, 0.12)'
};

// Enhanced dummy data with more realistic package details
const dummyCurrentPackage = {
  bB_PACKAGE_NAME: "Premium Internet 200GB",
  monthlY_RENTAL: "2990",
  standarD_GB: "200",
  freE_GB: "50",
  speed: "100 Mbps",
  contract: "12 months",
  benefits: ["Free router", "Unlimited calls", "24/7 support"]
};

const dummyPackages = {
  Standard: [
    {
      BB_PACKAGE_NAME: "Standard 100GB",
      STANDARD_GB: "100",
      FREE_GB: "20",
      MONTHLY_RENTAL: "1990",
      DESCRIPTION: "100GB Standard + 20GB Free",
      speed: "50 Mbps",
      contract: "12 months",
      benefits: ["Free installation", "Basic router", "Email support"]
    },
    {
      BB_PACKAGE_NAME: "Standard 200GB",
      STANDARD_GB: "200",
      FREE_GB: "50",
      MONTHLY_RENTAL: "2990",
      DESCRIPTION: "200GB Standard + 50GB Free",
      speed: "100 Mbps",
      contract: "12 months",
      benefits: ["Premium router", "Unlimited calls", "Priority support"]
    },
    {
      BB_PACKAGE_NAME: "Standard 300GB",
      STANDARD_GB: "300",
      FREE_GB: "75",
      MONTHLY_RENTAL: "3990",
      DESCRIPTION: "300GB Standard + 75GB Free",
      speed: "150 Mbps",
      contract: "24 months",
      benefits: ["Premium router", "Unlimited calls", "24/7 VIP support"]
    }
  ],
  AnyTime: [
    {
      BB_PACKAGE_NAME: "AnyTime 50GB",
      STANDARD_GB: "50",
      MONTHLY_RENTAL: "1490",
      DESCRIPTION: "50GB Any Time Data",
      speed: "30 Mbps",
      contract: "No contract",
      benefits: ["Flexible usage", "No commitment", "Basic support"]
    },
    {
      BB_PACKAGE_NAME: "AnyTime 100GB",
      STANDARD_GB: "100",
      MONTHLY_RENTAL: "2490",
      DESCRIPTION: "100GB Any Time Data",
      speed: "50 Mbps",
      contract: "No contract",
      benefits: ["Flexible usage", "No commitment", "Email support"]
    },
    {
      BB_PACKAGE_NAME: "AnyTime 200GB",
      STANDARD_GB: "200",
      MONTHLY_RENTAL: "3490",
      DESCRIPTION: "200GB Any Time Data",
      speed: "80 Mbps",
      contract: "No contract",
      benefits: ["Flexible usage", "No commitment", "Priority support"]
    }
  ],
  Unlimited: [
    {
      BB_PACKAGE_NAME: "Unlimited 10Mbps",
      MONTHLY_RENTAL: "3990",
      DESCRIPTION: "Unlimited 10Mbps",
      speed: "10 Mbps",
      contract: "12 months",
      benefits: ["Truly unlimited", "Basic router", "Email support"]
    },
    {
      BB_PACKAGE_NAME: "Unlimited 20Mbps",
      MONTHLY_RENTAL: "5990",
      DESCRIPTION: "Unlimited 20Mbps",
      speed: "20 Mbps",
      contract: "12 months",
      benefits: ["Truly unlimited", "Premium router", "Priority support"]
    },
    {
      BB_PACKAGE_NAME: "Unlimited 50Mbps",
      MONTHLY_RENTAL: "8990",
      DESCRIPTION: "Unlimited 50Mbps",
      speed: "50 Mbps",
      contract: "24 months",
      benefits: ["Truly unlimited", "Premium router", "24/7 VIP support"]
    }
  ]
};

// Animation keyframes
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66, 165, 245, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(66, 165, 245, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(66, 165, 245, 0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
  50% { box-shadow: 0 0 20px rgba(66, 165, 245, 0.8); }
  100% { box-shadow: 0 0 5px rgba(66, 165, 245, 0.5); }
`;

const CustomArrowIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 24 24" sx={{ fontSize: 16 }}>
    <circle cx="12" cy="12" r="11" stroke={colorScheme.secondaryAccent} strokeWidth="2" fill="none" />
    <path d="M10 8l4 4-4 4" stroke={colorScheme.secondaryAccent} strokeWidth="2" fill="none" />
  </SvgIcon>
);

interface BroadbandPostPaidPackageUpgraderProps {
  onBack: () => void;
}

const BroadbandPostPaidPackageUpgrader: React.FC<BroadbandPostPaidPackageUpgraderProps> = ({ onBack }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [currentPackage, setCurrentPackage] = useState(dummyCurrentPackage);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tabs = ["Standard", "AnyTime", "Unlimited"];
  const [selectedTab, setSelectedTab] = useState("Standard");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = isMobile ? 280 : isTablet ? 320 : 360;
    const currentIndex = Math.round(scrollLeft / itemWidth);
    setActiveIndex(currentIndex);
  };

  const getPackages = () => {
    switch(selectedTab) {
      case "Standard": return dummyPackages.Standard;
      case "AnyTime": return dummyPackages.AnyTime;
      case "Unlimited": return dummyPackages.Unlimited;
      default: return dummyPackages.Standard;
    }
  };

  const packages = getPackages();

  const handleActivation = (item: any) => {
    console.log("Upgrading to package:", item);
    // In a real app, you would call your upgrade API here
    // Show confirmation dialog/modal
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = isMobile ? 280 : isTablet ? 320 : 360;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to active index when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
      setActiveIndex(0);
    }
  }, [selectedTab]);

  return (
    <Box sx={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '1rem' : '2rem',
      position: 'relative',
      background: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      overflowY: 'auto',
      maxHeight: '100vh',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#BDBDBD',
        borderRadius: '4px',
        '&:hover': {
          background: '#9E9E9E',
        }
      }
    }}>
      {/* Back Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, position: 'relative' }}>
          <Button
            onClick={onBack}
            sx={{
              minWidth: 'auto',
              p: 0.5,
              mr: 2,
              color: colorScheme.accent,
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
          >
            <ArrowBack fontSize="medium" />
          </Button>

          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontSize: '26px',
                color: colorScheme.accent
              }}
            >
              Packages
            </Typography>
          </Box>

          {/* Right-side placeholder for symmetry */}
          <Box sx={{ width: '40px' }} />
        </Box>

    
      {/* Current Package Card */}
      <Box
  sx={{
    display: "flex",
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: "space-between",
    alignItems: "center",
    background: 'rgba(225, 240, 255, 0.6)', // Lighter glass effect
    backdropFilter: 'blur(6px)',
    color: colorScheme.textPrimary,
    padding: isMobile ? '1rem' : '1.25rem', // Slimmer padding
    borderRadius: "10px", // Tighter radius
    boxShadow: '0 2px 12px rgba(33, 150, 243, 0.1)',
    marginBottom: "1.5rem",
    border: '1px solid rgba(33, 150, 243, 0.15)',
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 16px rgba(33, 150, 243, 0.15)'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px', // Thinner top border
      background: colorScheme.buttonGradient,
      animation: `${glow} 3s infinite ease-in-out`
    }
  }}
>
  {/* Left Section - Compact */}
  <Box sx={{ 
    mb: isMobile ? '0.75rem' : 0,
    flex: isMobile ? 1 : 0.4,
    zIndex: 1
  }}>
    <Box display="flex" alignItems="center" sx={{ mb: '0.5rem' }}>
      <CustomArrowIcon sx={{ 
        color: colorScheme.secondaryAccent,
        fontSize: '0.8rem' // Smaller icon
      }} />
      <Typography
        variant="body2"
        sx={{ 
          color: colorScheme.secondaryAccent, 
          fontSize: "0.7rem", // Smaller text
          ml: "0.375rem",
          fontWeight: 600,
          letterSpacing: '0.3px'
        }}
      >
        YOUR CURRENT PACKAGE
      </Typography>
    </Box>

    <Typography
      variant="body2"
      fontWeight="bold"
      sx={{
        color: colorScheme.primaryDark,
        display: 'inline-block',
        padding: '0.3rem 0.6rem',
        borderRadius: '4px',
        border: '1px solid rgba(33, 150, 243, 0.15)',
        fontSize: isMobile ? '1rem' : '1.1rem',
        mb: '0.3rem',
        background: 'rgba(255, 255, 255, 0.5)'
      }}
    >
      {currentPackage?.bB_PACKAGE_NAME}
    </Typography>
    
    <Typography variant="body2" sx={{ 
      color: colorScheme.textSecondary, 
      fontSize: '0.75rem'
    }}>
      {currentPackage.speed} • {currentPackage.contract}
    </Typography>
    
    <Box sx={{ mt: '0.5rem' }}>
      {currentPackage.benefits.map((benefit, index) => (
        <Box key={index} display="flex" alignItems="center" sx={{ mb: '0.25rem' }}>
          <Box sx={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: colorScheme.secondaryAccent,
            mr: '0.3rem'
          }} />
          <Typography variant="body2" sx={{ 
            color: colorScheme.textSecondary, 
            fontSize: '0.75rem'
          }}>
            {benefit}
          </Typography>
        </Box>
      ))}
    </Box>
  </Box>
  
  {/* Middle Section - Price - Compact */}
  <Box display="flex" flexDirection="column" alignItems="center" sx={{ 
    mb: isMobile ? '0.75rem' : 0,
    flex: isMobile ? 1 : 0.3,
    position: 'relative',
    zIndex: 1,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      height: '40%',
      width: '1px',
      background: 'rgba(33, 150, 243, 0.15)',
      top: '30%',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    '&::before': {
      left: isMobile ? 0 : '-12px'
    },
    '&::after': {
      right: isMobile ? 0 : '-12px'
    }
  }}>
    <Typography
      variant="body2"
      sx={{
        fontSize: isMobile ? "1.5rem" : "1.75rem",
        fontWeight: 700,
        color: colorScheme.primaryDark,
        mb: '0.25rem',
        background: 'linear-gradient(90deg, #1565C0, #1976D2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
    >
      Rs. {currentPackage?.monthlY_RENTAL}
    </Typography>
    <Typography
      variant="body2"
      sx={{ 
        fontWeight: 500, 
        color: colorScheme.textSecondary,
        fontSize: '0.75rem'
      }}
    >
      + Tax / Month
    </Typography>
    
    <Box sx={{
      mt: '0.75rem',
      padding: '0.3rem 0.6rem',
      background: 'rgba(33, 150, 243, 0.08)',
      borderRadius: '12px',
      border: '1px solid rgba(33, 150, 243, 0.15)'
    }}>
      <Typography variant="body2" sx={{ 
        color: colorScheme.secondaryAccent,
        fontWeight: 600,
        fontSize: '0.7rem'
      }}>
        Active until: 12/12/2024
      </Typography>
    </Box>
  </Box>

  {/* Right Section - Data - Compact */}
  <Box display="flex" flexDirection={isMobile ? 'row' : 'column'} alignItems="center" sx={{
    flex: isMobile ? 1 : 0.3,
    gap: isMobile ? '0.5rem' : '0.75rem',
    zIndex: 1
  }}>
    <Box
      textAlign="center"
      sx={{
        width: isMobile ? '100%' : '100px',
        background: 'rgba(255, 255, 255, 0.5)',
        padding: '0.5rem',
        borderRadius: "8px",
        border: '1px solid rgba(33, 150, 243, 0.15)',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 1px 6px rgba(33, 150, 243, 0.1)'
        }
      }}
    >
      <Typography variant="body2" fontWeight="bold" color={colorScheme.secondaryAccent} sx={{ fontSize: '0.7rem' }}>
        STANDARD DATA
      </Typography>
      <Typography variant="body2" fontWeight="bold" color={colorScheme.primaryDark} sx={{ fontSize: '1.1rem' }}>
        {currentPackage?.standarD_GB}GB
      </Typography>
    </Box>

    <Box
      textAlign="center"
      sx={{
        width: isMobile ? '100%' : '100px',
        background: 'rgba(33, 150, 243, 0.08)',
        padding: '0.5rem',
        borderRadius: "8px",
        border: '1px solid rgba(33, 150, 243, 0.15)',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 1px 6px rgba(33, 150, 243, 0.1)'
        }
      }}
    >
      <Typography variant="body2" fontWeight="bold" color={colorScheme.secondaryAccent} sx={{ fontSize: '0.7rem' }}>
        BONUS DATA
      </Typography>
      <Typography variant="body2" fontWeight="bold" color={colorScheme.primaryDark} sx={{ fontSize: '1.1rem' }}>
        {currentPackage?.freE_GB}GB
      </Typography>
    </Box>
  </Box>

  {/* Subtle glass overlay */}
  <Box sx={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(225, 240, 255, 0.7) 0%, rgba(210, 230, 255, 0.5) 100%)',
    zIndex: 0
  }} />
</Box>
    
      {/* Packages Section */}
      <Box
  sx={{
    background: 'rgba(225, 240, 255, 0.7)', // Light blue glass effect
    backdropFilter: 'blur(10px)',
    color: colorScheme.textPrimary,
    padding: isMobile ? '1.25rem' : '1.75rem',
    borderRadius: "14px",
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(33, 150, 243, 0.15)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: colorScheme.buttonGradient,
      animation: `${glow} 3s infinite ease-in-out`
    }
  }}
>
  {/* Title with subtle divider */}
  <Typography variant="body2" sx={{
    textAlign: 'center',
    mb: '1.5rem',
    fontWeight: 700,
    color: colorScheme.primaryDark,
    fontSize: isMobile ? '1.2rem' : '1.35rem',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: '50px',
      height: '2px',
      background: colorScheme.secondaryAccent,
      margin: '0.5rem auto 0',
      borderRadius: '3px'
    }
  }}>
    Upgrade Your Package
  </Typography>
  
  {/* Compact Tab Navigation */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.5rem",
      flexWrap: 'wrap',
      gap: '0.5rem'
    }}
  >
    {tabs.map((tab) => (
      <Button
        key={tab}
        onClick={() => setSelectedTab(tab)}
        sx={{
          padding: isMobile ? '0.5rem 0.8rem' : '0.6rem 1.2rem',
          background: selectedTab === tab ? 
            'rgba(33, 150, 243, 0.15)' : 
            'rgba(33, 150, 243, 0.05)',
          color: selectedTab === tab ? colorScheme.primaryDark : colorScheme.textSecondary,
          fontWeight: selectedTab === tab ? 700 : 500,
          borderRadius: "6px",
          transition: 'all 0.2s ease',
          minWidth: isMobile ? '90px' : '100px',
          fontSize: isMobile ? '0.75rem' : '0.8rem',
          border: selectedTab === tab ? '1px solid rgba(33, 150, 243, 0.25)' : '1px solid rgba(33, 150, 243, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.15)',
            background: selectedTab === tab ? 
              'rgba(33, 150, 243, 0.2)' : 
              'rgba(33, 150, 243, 0.1)'
          }
        }}
      > 
       <Typography variant="body2" sx={{fontWeight: 700, fontSize: '16px', textTransform:'capitalize'}}>
          {tab}
       </Typography>
      </Button>
    ))}
  </Box>
  
  {/* Navigation Arrows - Desktop Only */}
  {!isMobile && packages.length > 1 && (
    <>
      <Button
        onClick={() => scrollToIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        sx={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          minWidth: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          color: colorScheme.primaryDark,
          border: '1px solid rgba(33, 150, 243, 0.2)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            background: 'rgba(33, 150, 243, 0.1)'
          },
          '&.Mui-disabled': {
            opacity: 0.3
          }
        }}
      >
        <ArrowBackIos sx={{ fontSize: '0.9rem' }} />
      </Button>
      
      <Button
        onClick={() => scrollToIndex(activeIndex + 1)}
        disabled={activeIndex === packages.length - 1}
        sx={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          minWidth: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.9)',
          color: colorScheme.primaryDark,
          border: '1px solid rgba(33, 150, 243, 0.2)',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            background: 'rgba(33, 150, 243, 0.1)'
          },
          '&.Mui-disabled': {
            opacity: 0.3
          }
        }}
      >
        <ArrowForwardIos sx={{ fontSize: '0.9rem' }} />
      </Button>
    </>
  )}
  
  {/* Compact Packages Carousel with Glass Effect */}
  <Box
    ref={scrollRef}
    onScroll={handleScroll}
    sx={{
      display: "flex",
      gap: isMobile ? "0.75rem" : "1.25rem",
      overflowX: "auto",
      padding: "0.75rem",
      scrollSnapType: 'x mandatory',
      scrollPadding: '0 1rem',
      '&::-webkit-scrollbar': {
        height: '3px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(33, 150, 243, 0.05)',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(33, 150, 243, 0.2)',
        borderRadius: '3px',
        '&:hover': {
          background: 'rgba(33, 150, 243, 0.3)',
        }
      },
      pb: '0.5rem'
    }}
  >
    {packages.map((item, index) => (
      <Card
        key={index}
        sx={{
          minWidth: isMobile ? '220px' : isTablet ? '260px' : '280px',
          scrollSnapAlign: 'center',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          color: colorScheme.textPrimary,
          borderRadius: "12px",
          boxShadow: '0 2px 12px rgba(33, 150, 243, 0.1)',
          border: '1px solid rgba(33, 150, 243, 0.15)',
          transition: 'all 0.25s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 16px rgba(33, 150, 243, 0.15)'
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, rgba(66, 165, 245, 0.8), rgba(33, 150, 243, 0.8))',
            transition: 'opacity 0.25s ease'
          }
        }}
      >
        <CardContent sx={{ 
          textAlign: "center",
          padding: isMobile ? '1rem' : '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%'
        }}>
          {/* Popular Tag */}
          {index === 1 && (
            <Box sx={{
              position: 'absolute',
              top: '10px',
              right: '-25px',
              background: 'linear-gradient(90deg, #FF8A00, #FF5E00)',
              color: '#fff',
              padding: '0.15rem 1.5rem',
              transform: 'rotate(45deg)',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              width: '100px',
              textAlign: 'center',
              zIndex: 1
            }}>
              POPULAR
            </Box>
          )}
          
          <Typography
            variant="body2"
            sx={{
              mb: "0.75rem",
              fontWeight: 700,
              fontSize: isMobile ? "1.1rem" : "1.2rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: colorScheme.primaryDark,
              width: '100%'
            }}
          >
            {item.BB_PACKAGE_NAME}
          </Typography>

          <Box
            sx={{
              width: "100%",
              background: 'rgba(33, 150, 243, 0.05)',
              padding: "0.75rem",
              borderRadius: "8px",
              mb: "0.75rem",
              border: '1px solid rgba(33, 150, 243, 0.1)',
              minHeight: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              sx={{ 
                fontSize: isMobile ? "0.85rem" : "0.9rem",
                fontWeight: 600,
                lineHeight: 1.3,
                color: colorScheme.textPrimary
              }}
              variant="body2"
            >
              {item.DESCRIPTION || `${item.STANDARD_GB}GB Standard + ${item.FREE_GB}GB Free`}
            </Typography>
          </Box>
          
          {/* Compact Details Row */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            mb: '0.75rem',
            gap: '0.5rem'
          }}>
            <Box sx={{
              flex: 1,
              background: 'rgba(33, 150, 243, 0.05)',
              padding: '0.3rem',
              borderRadius: '6px',
              border: '1px solid rgba(33, 150, 243, 0.1)'
            }}>
              <Typography variant="body2" sx={{ 
                color: colorScheme.secondaryAccent, 
                fontWeight: 600,
                display: 'block',
                mb: '0.1rem'
              }}>
                Speed
              </Typography>
              <Typography variant="body2" sx={{ 
                color: colorScheme.textPrimary, 
                fontWeight: 500,
                fontSize: '0.8rem'
              }}>
                {item.speed}
              </Typography>
            </Box>
            
            <Box sx={{
              flex: 1,
              background: 'rgba(33, 150, 243, 0.05)',
              padding: '0.3rem',
              borderRadius: '6px',
              border: '1px solid rgba(33, 150, 243, 0.1)'
            }}>
              <Typography variant="body2" sx={{ 
                color: colorScheme.secondaryAccent, 
                fontWeight: 600,
                display: 'block',
                mb: '0.1rem'
              }}>
                Contract
              </Typography>
              <Typography variant="body2" sx={{ 
                color: colorScheme.textPrimary, 
                fontWeight: 500,
                fontSize: '0.8rem'
              }}>
                {item.contract}
              </Typography>
            </Box>
          </Box>
          
          {/* Compact Benefits List */}
          <Box sx={{ 
            width: '100%',
            textAlign: 'left',
            mb: '0.75rem'
          }}>
            <Typography variant="body2" sx={{ 
              color: colorScheme.secondaryAccent,
              fontWeight: 600,
              mb: '0.2rem',
              display: 'block'
            }}>
              Benefits:
            </Typography>
            {item.benefits.slice(0, 3).map((benefit, idx) => (
              <Box key={idx} display="flex" alignItems="flex-start" sx={{ mb: '0.15rem' }}>
                <Box sx={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: colorScheme.secondaryAccent,
                  mr: '0.4rem',
                  mt: '0.35rem'
                }} />
                <Typography variant="body2" sx={{ 
                  color: colorScheme.textSecondary,
                  fontSize: '0.8rem',
                  lineHeight: 1.3
                }}>
                  {benefit}
                </Typography>
              </Box>
            ))}
          </Box>
          
          {/* Price Section */}
          <Box sx={{ 
            mb: '0.5rem',
            width: '100%'
          }}>
            <Typography
              variant="body2"
              sx={{ 
                fontSize: isMobile ? "1.5rem" : "1.75rem", 
                fontWeight: 800,
                color: colorScheme.primaryDark,
                mb: '0.1rem',
                lineHeight: 1
              }}
            >
              Rs.{item.MONTHLY_RENTAL}
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                fontWeight: 500, 
                color: colorScheme.textSecondary,
                fontSize: '0.75rem'
              }}
            >
              + Tax / Month
            </Typography>
          </Box>

          {/* Compact Upgrade Button */}
          <Button
            variant="contained"
            sx={{
              mt: '0.25rem',
              background: colorScheme.buttonGradient,
              color: '#ffffff',
              borderRadius: "6px",
              width: "100%",
              padding: isMobile ? "0.5rem" : "0.6rem",
              fontSize: isMobile ? "0.8rem" : "0.85rem",
              fontWeight: 700,
              textTransform: 'none',
              letterSpacing: '0.5px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(33, 150, 243, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 3px 10px rgba(33, 150, 243, 0.3)',
                background: 'linear-gradient(90deg, rgba(33,150,243,1), rgba(66,165,245,1))'
              }
            }}
            onClick={() => handleActivation(item)}
          >
            <Typography variant="body2" sx={{fontWeight: 700, fontSize: '18px'}}>
            UPGRADE NOW
            </Typography>
          </Button>
        </CardContent>
      </Card>
    ))}
  </Box>
  
  {/* Compact Pagination Indicators */}
  {packages.length > 1 && (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "0.4rem",
        marginTop: "1.5rem"
      }}
    >
      {packages.map((_, index) => (
        <Box
          key={index}
          sx={{
            width: activeIndex === index ? '20px' : '6px',
            height: '6px',
            background: activeIndex === index ? 
              colorScheme.secondaryAccent : 
              'rgba(33, 150, 243, 0.2)',
            borderRadius: '3px',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              background: colorScheme.secondaryAccent
            }
          }}
          onClick={() => scrollToIndex(index)}
        />
      ))}
    </Box>
  )}
</Box>
      
      {/* Upgrade Info */}
      <Box sx={{
        mt: '3rem',
        background: 'rgba(33, 150, 243, 0.05)',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(33, 150, 243, 0.2)',
        boxShadow: colorScheme.cardShadow
      }}>
        <Typography variant="body2" sx={{ 
          color: colorScheme.secondaryAccent,
          mb: '1rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center'
        }}>
          <Box component="span" sx={{
            display: 'inline-block',
            width: '24px',
            height: '24px',
            background: colorScheme.secondaryAccent,
            borderRadius: '50%',
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: '24px',
            fontWeight: 'bold',
            mr: '0.75rem'
          }}>i</Box>
          Package Upgrade Information
        </Typography>
        
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1.5rem' : '2rem'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • Upgrades take effect from your next billing cycle
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • No downtime during the upgrade process
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              fontWeight: 500
            }}>
              • Early termination fees may apply for contract changes
            </Typography>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • Pro-rated charges may apply for mid-cycle upgrades
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              mb: '0.5rem',
              fontWeight: 500
            }}>
              • New equipment may be required for some packages
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textSecondary,
              fontWeight: 500
            }}>
              • 24/7 customer support available for any questions
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BroadbandPostPaidPackageUpgrader;