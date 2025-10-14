import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { keyframes } from "@emotion/react";
//import GetAddOnsImage from "../../assets/Images/GetAddOns.jpeg"; // Make sure this path is correct

// White Theme Color Scheme
const colorScheme = {
  primary: '#FFFFFF',             // White background
  primaryLight: '#F8F9FA',        // Very light gray
  accent: '#1976D2',              // Blue accent
  secondaryAccent: '#757575',     // Gray accent
  highlight: 'rgba(25, 118, 210, 0.1)',
  textPrimary: '#212121',         // Dark text
  textSecondary: '#424242',       // Slightly lighter text
  divider: '#E0E0E0',             // Light divider
  cardBg: '#FFFFFF',              // White card background
  buttonGradient: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
  navbarBg: '#FFFFFF',            // White navbar
  white: '#FFFFFF',
  dark: '#F5F5F5',               // Very light gray
  errorRed: '#D32F2F',
  successGreen: '#388E3C',
  navbarText: '#1976D2',
  navbarHover: 'rgba(25, 118, 210, 0.1)',
  navbarActive: 'rgba(25, 118, 210, 0.2)',
  navbarIndicator: '#1976D2',
  glowEffect: 'rgba(25, 118, 210, 0.2)'
};

interface DataaddonsProps {
  onBack: () => void;
  isMobile?: boolean;
}

interface Addon {
  id: string;
  name: string;
  description: string;
  postprice: string;
  recurring: boolean;
}

interface PostpaidAddOnPackage {
  category: string;
  addons: Addon[];
}

// Animation definitions
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(25, 118, 210, 0); }
  100% { box-shadow: 0 0 0 0 rgba(25, 118, 210, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// Navbar Component
interface BroadbandNavbarProps {
  navbarItems: {
    label: string;
    used?: string | null;
    limit?: string | null;
  }[];
  type: string;
  onSelected: (item: string) => void;
  selected: string;
  isMobile?: boolean;
}

const BroadbandNavbar = ({ 
  navbarItems, 
  type, 
  selected, 
  onSelected, 
  isMobile = false 
}: BroadbandNavbarProps) => {
  const [selectedItem, setSelectedItem] = useState(selected);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setSelectedItem(selected);
  }, [selected]);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelected(item);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: isMobile ? "auto" : "50px",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        color: colorScheme.navbarText,
        backgroundColor: colorScheme.navbarBg,
        border: `1px solid ${colorScheme.divider}`,
        borderRadius: "12px",
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
        },
        animation: `${fadeIn} 0.5s ease-out`,
        padding: isMobile ? "8px" : "0",
        gap: isMobile ? "8px" : "0",
        position: "relative",
      }}
    >
      {navbarItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => handleItemClick(item.label)}
          onMouseEnter={() => setHoveredItem(item.label)}
          onMouseLeave={() => setHoveredItem(null)}
          sx={{
            height: isMobile ? "42px" : "100%",
            width: isMobile ? "100%" : "19%",
            minWidth: "unset",
            padding: isMobile ? "8px" : "0.25rem 0.2rem",
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            color: selectedItem === item.label ? colorScheme.accent : colorScheme.textPrimary,
            backgroundColor: selectedItem === item.label 
              ? colorScheme.navbarActive 
              : hoveredItem === item.label 
                ? colorScheme.navbarHover 
                : "transparent",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: hoveredItem === item.label ? "translateY(-2px)" : "none",
            animation: `${slideIn} ${0.2 + index * 0.1}s ease-out`,
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: selectedItem === item.label ? "80%" : "0%",
              height: "3px",
              backgroundColor: colorScheme.navbarIndicator,
              transition: "all 0.3s ease",
              borderRadius: "2px 2px 0 0"
            },
            "&:hover": {
              backgroundColor: selectedItem === item.label 
                ? colorScheme.navbarActive 
                : colorScheme.navbarHover,
              "&::after": {
                width: "60%"
              }
            }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: isMobile 
                ? "14px" 
                : item.label === "Home Schooling & WFH" 
                  ? "13px" 
                  : "15px",
              textTransform: "capitalize",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
              transition: "all 0.2s ease",
              transform: hoveredItem === item.label ? "scale(1.05)" : "none",
              letterSpacing: "0.5px"
            }}
          >
            {item.label}
          </Typography>
          {(type === "Summary" || type === "addons") && (
            <Typography
              variant="body2"
              sx={{
                fontSize: isMobile ? "11px" : "10px",
                textTransform: "capitalize",
                fontWeight: 600,
                color: selectedItem === item.label 
                  ? colorScheme.accent 
                  : colorScheme.textSecondary,
                transition: "all 0.2s ease",
                opacity: hoveredItem === item.label || selectedItem === item.label ? 1 : 0.8,
                mt: "2px"
              }}
            >
              {type === "Summary"
                ? item.label === "My Package"
                  ? ""
                  : item.limit || item.used
                  ? `${item.used ?? 0} used from ${item.limit ?? 0} GB`
                  : "N/A"
                : item.limit}
            </Typography>
          )}
          {selectedItem === item.label && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, transparent 100%)`,
                pointerEvents: "none",
                animation: `${pulse} 2s infinite`
              }}
            />
          )}
        </Button>
      ))}
    </Box>
  );
};

// Dummy Data
const dummyPackages: PostpaidAddOnPackage[] = [
  {
    category: "Data",
    addons: [
      {
        id: "data1",
        name: "Extra 5GB",
        description: "Valid for 7 days",
        postprice: "500.00",
        recurring: false
      },
      {
        id: "data2",
        name: "Extra 10GB",
        description: "Valid for 30 days",
        postprice: "1000.00",
        recurring: false
      }
    ]
  },
  {
    category: "Voice",
    addons: [
      {
        id: "voice1",
        name: "100 Minutes",
        description: "Valid for 30 days",
        postprice: "300.00",
        recurring: false
      }
    ]
  },
  {
    category: "LMS",
    addons: [
      {
        id: "lms1",
        name: "LMS Package One-Time",
        description: "Special LMS package",
        postprice: "200.00",
        recurring: false
      },
      {
        id: "lms2",
        name: "LMS Package Recurrent",
        description: "Monthly LMS package",
        postprice: "150.00",
        recurring: true
      }
    ]
  },
  {
    category: "Home Schooling & WFH",
    addons: [
      {
        id: "wfh1",
        name: "WFH Package One-Time",
        description: "Work from home package",
        postprice: "400.00",
        recurring: false
      },
      {
        id: "wfh2",
        name: "WFH Package Recurrent",
        description: "Monthly work from home",
        postprice: "350.00",
        recurring: true
      }
    ]
  }
];

const Dataaddons: React.FC<DataaddonsProps> = ({ onBack, isMobile = false }) => {
  const theme = useTheme();
  const GetAddOnsImage = "https://res.cloudinary.com/dtqcgwrgk/image/upload/v1753936035/GetAddOns_wj4jyx.jpg";
  const mobileView = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [selectedItem, setSelectedItem] = useState<string>("Data");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Addon | null>(null);
  const [activationType, setActivationType] = useState("onetime");
  const [activeIndex, setActiveIndex] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    const itemWidth = 250;
    const currentIndex = Math.round(scrollLeft / itemWidth) + 1;
    setActiveIndex(currentIndex);
  };

  const handleCardButtonClick = (addon: Addon) => {
    setSelectedPackage(addon);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPackage(null);
    setActivationType("onetime");
  };

  const handleActivation = async () => {
    if (!selectedPackage) return;
    console.log(`Activating package: ${selectedPackage.name}`);
    handleDialogClose();
  };

  const navbarItems = dummyPackages.map((pkg) => ({
    label: pkg.category,
    limit: pkg.addons.length > 0 ? `${pkg.addons.length} options` : ""
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: colorScheme.primary,
        color: colorScheme.textPrimary,
        padding: 3,
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        width: "94%",
        border: `1px solid ${colorScheme.divider}`,
        gap: 2,
        position: "relative",
      }}
    >
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
                fontSize: '24px',
                color: colorScheme.accent
              }}
            >
              Data Add-ons
            </Typography>
          </Box>

  {/* Right-side placeholder for symmetry */}
  <Box sx={{ width: '40px' }} />
</Box>


      {/* Enhanced Navigation Bar */}
      <BroadbandNavbar
        navbarItems={navbarItems}
        onSelected={setSelectedItem}
        type="addons"
        selected={selectedItem}
        isMobile={isMobile || mobileView}
      />

      {/* Content Scroll Area */}
      <Box
  ref={scrollRef}
  onScroll={handleScroll}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
  onMouseLeave={() => setIsDragging(false)}
  sx={{
    display: "flex",
    gap: 2,
    width: "100%",
    padding: "16px 8px",
    overflowX: "auto",
    flexDirection: "row",
    cursor: isDragging ? "grabbing" : "grab",
    "&::-webkit-scrollbar": { display: "none" },
    userSelect: "none",
    scrollbarWidth: "none",
    scrollSnapType: "x mandatory",
    "& > *": {
      scrollSnapAlign: "start"
    },
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "1px",
      background: `linear-gradient(90deg, transparent, ${colorScheme.divider}, transparent)`,
      opacity: 0.5
    }
  }}
>
  {dummyPackages
    .find((pkg) => pkg.category === selectedItem)
    ?.addons.map((addon) => (
      <Card
        key={addon.id}
        sx={{
          minWidth: isMobile || mobileView ? "85%" : "320px",
          maxWidth: isMobile || mobileView ? "85%" : "320px",
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          margin: "4px",
          border: `1px solid rgba(255, 255, 255, 0.2)`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          overflow: "hidden",
          position: "relative",
          backdropFilter: "blur(10px)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px rgba(0, 120, 212, 0.2)",
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)`,
            zIndex: -1
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
            borderRadius: 0,
            overflow: "hidden",
            position: "relative",
            height: "220px",
            backgroundImage: `linear-gradient(rgba(0, 120, 212, 0.1), rgba(0, 120, 212, 0.1)), url(${GetAddOnsImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: colorScheme.accent,
              opacity: 0.7
            }
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              padding: '16px',
              borderRadius: '12px',
              textAlign: 'center',
              backdropFilter: 'blur(8px)',
              border: `1px solid rgba(255, 255, 255, 0.3)`,
              width: "90%",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 8px 24px rgba(0, 120, 212, 0.2)"
              }
            }}
          >
            <Typography
              variant="body2"
              sx={{ 
                color: colorScheme.textPrimary, 
                fontSize: isMobile || mobileView ? 18 : 20, 
                fontWeight: 800,
                mb: 1.5,
                letterSpacing: "0.5px"
              }}
            >
              {addon.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                color: colorScheme.textSecondary, 
                fontSize: isMobile || mobileView ? 14 : 16,
                mb: 1.5,
                lineHeight: 1.4
              }}
            >
              {addon.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                color: colorScheme.accent, 
                fontSize: isMobile || mobileView ? 18 : 22, 
                fontWeight: 900,
                letterSpacing: "0.5px",
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {`Rs. ${addon.postprice}`}
            </Typography>
          </Box>
        </Box>
        <CardContent
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(5px)',
            borderTop: `1px solid rgba(255, 255, 255, 0.3)`
          }}
        >
          <Button
            variant="contained"
            sx={{
              mt: 1,
              background: `linear-gradient(135deg, ${colorScheme.accent} 0%, ${colorScheme.secondaryAccent} 100%)`,
              color: "white",
              fontSize: isMobile || mobileView ? 14 : 16,
              padding: "10px 32px",
              borderRadius: "24px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              boxShadow: "0 4px 12px rgba(0, 120, 212, 0.3)",
              transition: "all 0.3s ease",
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.3s ease'
              },
              "&:hover": {
                opacity: 0.9,
                boxShadow: "0 8px 16px rgba(0, 120, 212, 0.4)",
                transform: "translateY(-3px)",
                '&::before': {
                  transform: 'translateX(0)'
                }
              },
              "&:active": {
                transform: "translateY(0)"
              }
            }}
            onClick={() => handleCardButtonClick(addon)}
          >
            <Typography variant="body2" sx={{fontWeight: 700, fontSize: '16px', textTransform:'capitalize'}}>
                         Activate Now
            </Typography>
          </Button>
        </CardContent>
      </Card>
    ))}
</Box>
      
      {/* Confirmation Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            background: colorScheme.primary,
            color: colorScheme.textPrimary,
            borderRadius: '12px',
            border: `1px solid ${colorScheme.divider}`,
            minWidth: isMobile || mobileView ? '90vw' : '400px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            overflow: "hidden",
          }
        }}
      >
        <DialogTitle
          sx={{
            background: colorScheme.primaryLight,
            borderBottom: `1px solid ${colorScheme.divider}`,
            fontWeight: 700,
            letterSpacing: "0.5px",
            color: colorScheme.textPrimary
          }}
        > 
          <Typography variant="body2" sx={{fontWeight: 700, fontSize: '16px', textTransform:'capitalize'}}>
          Confirm Activation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
            Do you want to purchase and activate <strong>{selectedPackage?.name}</strong>?
          </Typography>
          <Typography variant="body2" sx={{ color: colorScheme.accent, mb: 2 }}>
            {selectedPackage?.description}
          </Typography>
          {(selectedItem === "LMS" || selectedItem === "Home Schooling & WFH") && (
            <RadioGroup
              value={activationType}
              onChange={(e) => setActivationType(e.target.value)}
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="onetime"
                control={
                  <Radio 
                    sx={{ 
                      color: colorScheme.accent,
                      "&.Mui-checked": {
                        color: colorScheme.accent
                      }
                    }} 
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: colorScheme.textPrimary }}>
                    One-Time Activation
                  </Typography>
                }
              />
              <FormControlLabel
                value="recurrent"
                control={
                  <Radio 
                    sx={{ 
                      color: colorScheme.accent,
                      "&.Mui-checked": {
                        color: colorScheme.accent
                      }
                    }} 
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: colorScheme.textPrimary }}>
                    Recurrent Monthly
                  </Typography>
                }
              />
            </RadioGroup>
          )}
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: colorScheme.primaryLight,
              borderRadius: "8px",
              border: `1px solid ${colorScheme.divider}`
            }}
          >
            <Typography variant="body2" sx={{ display: "flex", justifyContent: "space-between" }}>
              <span>Package Price:</span>
              <span style={{ fontWeight: 700 }}>Rs. {selectedPackage?.postprice}</span>
            </Typography>
            <Typography variant="body2" sx={{ color: colorScheme.textSecondary, display: "block", mt: 1 }}>
              {activationType === "recurrent" ? 
                "This package will be automatically renewed each month" : 
                "This is a one-time charge"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2,
            background: colorScheme.primaryLight,
            borderTop: `1px solid ${colorScheme.divider}`
          }}
        >
          <Button 
            onClick={handleDialogClose} 
            sx={{ 
              color: colorScheme.textPrimary,
              borderRadius: "6px",
              px: 3,
              border: `1px solid ${colorScheme.divider}`,
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)"
              }
            }}
          >
            <Typography variant="body2" sx={{fontWeight: 700, fontSize: '16px', textTransform:'capitalize'}}>
            Cancel
            </Typography>
          </Button>
          <Button 
            onClick={handleActivation} 
            sx={{ 
              background: colorScheme.buttonGradient,
              color: 'white',
              borderRadius: "6px",
              px: 3,
              fontWeight: 700,
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              '&:hover': { 
                opacity: 0.9,
              }
            }}
          >
            <Typography variant="body2" sx={{fontWeight: 700, fontSize: '16px', textTransform:'capitalize'}}>
            Confirm Activation
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Scroll Indicators */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 1
        }}
      >
        {dummyPackages
          .find((pkg) => pkg.category === selectedItem)
          ?.addons.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: activeIndex === index + 1 ? "24px" : "8px",
                height: "8px",
                backgroundColor: activeIndex === index + 1 ? colorScheme.accent : colorScheme.divider,
                borderRadius: activeIndex === index + 1 ? "4px" : "50%",
                transition: "all 0.3s ease",
                opacity: activeIndex === index + 1 ? 1 : 0.6,
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Dataaddons;