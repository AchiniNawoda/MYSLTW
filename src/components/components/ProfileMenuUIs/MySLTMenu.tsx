import {
  Avatar,
  Box,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStore from "../../services/useAppStore";
import { useState } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import i18n from "../../services/i18n/i18n";
import { useTranslation } from "react-i18next";

interface MySLTMenuProps {
  onMenuClick: () => void;
}

const MySLTMenu = ({ onMenuClick }: MySLTMenuProps) => {
  const { selectedTelephone, setLeftMenuItem } = useStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleMenuClick = (menuItem: string) => {
    setLeftMenuItem(menuItem);
    onMenuClick();
  };

  const handleLanguageChange = (event: any) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "100%",
        maxWidth: isMobile ? "180px" : isTablet ? "220px" : "250px",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        margin: "0 auto",
        position: "relative",
        zIndex: 1300,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "12px" : "16px",
          backgroundColor: "#005792",
          color: "white",
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "lightgray",
            marginRight: "8px",
            width: isMobile ? 32 : 40,
            height: isMobile ? 32 : 40,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant={isMobile ? "caption" : "body2"}
            sx={{ fontWeight: "bold" }}
          >
            {t("menu.mySLT")}
          </Typography>
          <Typography variant={isMobile ? "caption" : "body2"}>
            {selectedTelephone || "N/A"}
          </Typography>
        </Box>
      </Box>

      {/* Language Selector */}
      <Box
        sx={{
          padding: isMobile ? "8px" : "12px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <FormControl fullWidth size={isMobile ? "small" : "medium"}>
          <InputLabel id="language-select-label" sx={{ display: "none" }}>
            {t("languages.language")}
          </InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            onChange={handleLanguageChange}
            startAdornment={
              <LanguageIcon sx={{ color: "action.active", mr: 1 }} />
            }
            sx={{
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                paddingLeft: "8px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #e0e0e0",
              },
            }}
          >
            <MenuItem key="en" value="en">
              <Typography>{t("languages.english")}</Typography>
            </MenuItem>
            <MenuItem key="si" value="si">
              <Typography>{t("languages.sinhala")}</Typography>
            </MenuItem>
            <MenuItem key="ta" value="ta">
              <Typography>{t("languages.tamil")}</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Menu Items */}
      <Box
        sx={{
          padding: isMobile ? "4px" : "8px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <MenuItem
          onClick={() => handleMenuClick("My Profile")}
          sx={{
            padding: isMobile ? "8px 12px" : "12px",
            borderRadius: "4px",
            marginBottom: isMobile ? "4px" : "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <Typography variant={isMobile ? "caption" : "body2"}>
            {t("menu.myProfile")}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuClick("Manage Connections")}
          sx={{
            padding: isMobile ? "8px 12px" : "12px",
            borderRadius: "4px",
            marginBottom: isMobile ? "4px" : "8px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <Typography variant={isMobile ? "caption" : "body2"}>
            {t("menu.manageConnections")}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            padding: isMobile ? "8px 12px" : "12px",
            borderRadius: "4px",
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
        >
          <Typography variant={isMobile ? "caption" : "body2"}>
            {t("commo.logout")}
          </Typography>
        </MenuItem>
      </Box>
    </Box>
  );
};

export default MySLTMenu;
