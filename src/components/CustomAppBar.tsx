import {
  AppBar,
  Avatar,
  Box,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
} from "@mui/material";
import { useEffect, useState } from "react";
import fetchAccountDetails from "../services/fetchAccountDetails";
import useStore from "../services/useAppStore";
import { AccountDetails } from "../types/types";
import MySLTMenu from "./ProfileMenuUIs/MySLTMenu";
import { MdNotifications } from 'react-icons/md';
import { useTranslation } from "react-i18next";
import checkOfferAvailability from "../services/postpaid/checkOfferAvailability";
import { use } from "i18next";


const CustomAppBar = () => {
  const { fetchServiceDetails, setSelectedTelephone, setLeftMenuItem, setSelectedNavbarItem } = useStore();
  const userImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/profile.jpg";

  const { t } = useTranslation();

  const [account, setAccount] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [accounts, setAccounts] = useState<AccountDetails[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userName, setUserName] = useState("User");

  const [promotionCount, setPromotionCount] = useState(0); // State for promotion count

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value);
    fetchServiceDetails(event.target.value);
    setSelectedTelephone(event.target.value);
    setOpenDropdown(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const accountData = await fetchAccountDetails();
      if (accountData && accountData.length > 0) {
        setAccounts(accountData);
        setSelectedTelephone(accountData[0].telephoneno);
        setAccount(accountData[0].telephoneno);
        fetchServiceDetails(accountData[0].telephoneno);

        // Set username if available
        if (accountData[0].username) {
          setUserName(accountData[0].username);
        }
      }
    };
    fetchData();
  }, []);
  
  // Notification count fetch

  const selectedTelephone = useStore((state) => state.selectedTelephone);

  useEffect(() => {
    const fetchPromotionCount = async () => {
      if (!selectedTelephone) return;

      try {
        const offerData = await checkOfferAvailability(selectedTelephone);

        if (Array.isArray(offerData)) {
          setPromotionCount(offerData.length);
        } else {
          setPromotionCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch promotion count:", error);
        setPromotionCount(0);
      }
    };
    fetchPromotionCount();
  }, [selectedTelephone]);

  const open = Boolean(anchorEl);

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greeting.morning");
    if (hour < 18) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  // Notification count
  const notificationCount = promotionCount;

  // Debug logs remove after verification
  console.log("Promotion Count:", promotionCount);        // Debug log for promotion count
  console.log("Selected Telephone:", selectedTelephone);  // Debug log for selected telephone

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        paddingY: 0.5,
        borderBottomLeftRadius: "15px",
        borderBottomRightRadius: "15px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            gap: 1,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img
              src="https://mysltimages.s3.eu-north-1.amazonaws.com/SLTMobitel_Logo.svg+2.png"
              alt="Logo"
              style={{
                height: isMobile ? "30px" : isTablet ? "40px" : "50px",
                width: "auto",
              }}
            />
          </Box>

          {/* Right-side (Greeting + Dropdown + Avatar) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 1 : 2,
              flexShrink: 1,
              ml: "auto",
            }}
          >
            {/* Greeting */}
            {!isMobile && (
              <Typography
              variant="body2"
                sx={{
                  color: "#00256A",
                  fontWeight: 500,
                  fontSize: isTablet ? "14px" : "16px",
                  fontFamily: "Poppins",
                }}
              >
                {getGreeting()} !
              </Typography> // Add userName if needed: , {userName} after {getGreeting()}
            )}

            {/* Dropdown */}
            <FormControl
              sx={{
                minWidth: isMobile ? 120 : isTablet ? 160 : 200,
                maxWidth: 220,
                flexShrink: 1,
                "& .MuiOutlinedInput-root": {
                  height: isMobile ? 35 : 40,
                  borderRadius: "8px",
                  "& fieldset": {
                    border: "2px solid #00256A",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00256A",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00256A",
                    borderWidth: 2,
                  },
                },
              }}
            >
              <Select
                value={account}
                onChange={handleChange}
                open={openDropdown}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                displayEmpty
                renderValue={(selected) =>
                  selected ? selected : "Select Account"
                }
                sx={{
                  color: "#00256A",
                  fontWeight: 600,
                  fontSize: isMobile ? "12px" : "14px",
                  fontFamily: "Poppins",
                }}
              >
                {accounts.length > 0 ? (
                  accounts.map((acc, index) => (
                    <MenuItem key={index} value={acc.telephoneno}>
                      {acc.telephoneno}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="">No Accounts Available</MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Avatar */}
            <IconButton sx={{ p: 0 }} onClick={handleProfileClick}>
              <Avatar
                sx={{
                  height: isMobile ? 35 : 45,
                  width: isMobile ? 35 : 45,
                }}
                alt="User Avatar"
                src={userImage}
              />
            </IconButton>


            {/* Notification Icon */}
            <IconButton 
              onClick={() => {
                setLeftMenuItem("Notifications");
                setSelectedNavbarItem("");
                }
              }
              sx={{ 
                p: 0, 
                border: "2px solid #00256A", 
                borderRadius: "50%",
                width: {xs: 35, sm: 45},
                height: {xs: 35, sm: 45},
                //marginLeft: 1,
                '&:hover': {
                  backgroundColor: "rgba(0, 37, 106, 0.08)",
                }
                }}>
              <Badge 
                badgeContent={notificationCount} 
                color="error"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: { xs: "0.6rem", sm: "0.7rem" },
                    height: { xs: 16, sm: 18 },
                    minWidth: { xs: 16, sm: 18 },
                    overflow: "hidden",
                  },
                  
                }}>
                <MdNotifications 
                  size={isMobile ? 24 : 32} 
                  color="#00256A"/>
              </Badge>
            </IconButton>



            {/* Popover */}
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseProfileMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MySLTMenu onMenuClick={handleCloseProfileMenu} />
            </Popover>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
