import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
  Box,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

const MenuLeft: React.FC = () => {
  const {
    serviceDetails,
    setLeftMenuItem,
    selectedLeftMenuItem,
    selectedNavbarItem,
    detailReportAvailability,
  } = useStore();

  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isPrepaid: boolean =
    serviceDetails?.promotionType === "Prepaid" ||
    serviceDetails?.promotionType === null;

  const postPaidItems: string[] = [
    "Summary",
    "Daily Usage",
    "Gift Data",
    "History",
    "Redeem Data",
    "Happy Day",
    "More",
  ];
  const prePaidItems: string[] = ["Main Packages", "Data Add-Ons"];
  const broadbandItems: string[] = isPrepaid ? prePaidItems : postPaidItems;
  const peoTVItems: string[] = ["My Package", "VOD", "PEOTVGO", "Packages"];
  const voiceItems: string[] = ["My Package", "Call Forwarding"];

  let items: string[];
  if (selectedNavbarItem === "Broadband") {
    items = broadbandItems;
  } else if (selectedNavbarItem === "PeoTV") {
    items = peoTVItems;
  } else {
    items = voiceItems;
  }

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [mousePosition, setMousePosition] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  useEffect(() => {
    if (isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("");
      setLeftMenuItem("Summary");
    } else if (!isPrepaid && selectedNavbarItem === "Broadband") {
      setSelectedItem("Summary");
      setLeftMenuItem("Summary");
    } else if (
      selectedNavbarItem === "PeoTV" ||
      selectedNavbarItem === "Voice"
    ) {
      setSelectedItem("My Package");
      setLeftMenuItem("My Package");
    }
  }, [isPrepaid]);

  useEffect(() => {
    setSelectedItem(selectedLeftMenuItem);
  }, [selectedLeftMenuItem]);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setMousePosition({ mouseX: event.clientX, mouseY: event.clientY });
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMousePosition(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "more-popover" : undefined;

  const getButtonStyles = (item: string) => ({
    backgroundColor: item === selectedItem ? "#FFFFFF" : "#FFFFFF40",
    border: item === selectedItem ? "3px solid #50B748" : "1px solid #FFFFFFA6",
    borderRadius: "10px",
    padding: "8px 12px",
    width: isMobile ? "auto" : "100%",
    margin: 0,
    flexShrink: 0,
    flexGrow: isMobile ? 0 : 1,
    flex: isMobile ? "1 1 auto" : "0 1 auto",
    minWidth: isMobile ? "120px" : "140px",
    maxWidth: isMobile ? "none" : "100%",
    "&:hover": {
      backgroundColor: item === selectedItem ? "#FFFFFF" : "#FFFFFF80",
      borderColor: "#50B748",
    },
  });

  const getTypographyStyles = (item: string) => ({
    fontSize: isMobile ? "12px" : "16px",
    color: item === selectedItem ? "#50B748" : "#FFFFFF",
    textTransform: "capitalize",
    fontWeight: item === selectedItem ? 700 : 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        flexWrap: isMobile ? "wrap" : "nowrap",
        justifyContent: isMobile ? "space-between" : "flex-start",
        gap: isMobile ? "8px" : "12px",
        color: "#FFFFFF1A",
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        maxHeight: isMobile ? "none" : "500px",
        overflow: "hidden",
        minWidth: isMobile ? "300px" : "auto",
        maxWidth: isMobile ? "100%" : "auto",
        padding: isMobile ? "8px" : "12px",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          sx={getButtonStyles(item)}
          onClick={(event) => {
            if (item === "More") {
              handleMoreClick(event);
            } else {
              setSelectedItem(item);
              setLeftMenuItem(item);
            }
          }}
        >
          <Typography variant="body2" sx={getTypographyStyles(item)}>
            {t(item)}
          </Typography>
        </Button>
      ))}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference={isMobile ? "anchorEl" : "anchorPosition"}
        anchorPosition={
          !isMobile && mousePosition
            ? { top: mousePosition.mouseY + 10, left: mousePosition.mouseX }
            : undefined
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f5f5f5",
            minWidth: "160px",
            maxWidth: `min(200px, calc(100vw - 32px))`,
            padding: 0,
            color: "#333",
            marginTop: isMobile ? 1 : 0,
            marginLeft: isMobile ? "8px" : 0,
            marginRight: isMobile ? "8px" : 0,
          },
        }}
      >
        <List dense={isMobile}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                setLeftMenuItem(
                  detailReportAvailability
                    ? "DisableDetailReport"
                    : "Subscription"
                );
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#00256A",
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 500,
                  }}
                >
                  {t(
                    detailReportAvailability
                      ? "Disable Detailed Report"
                      : "Enable Detailed Report"
                  )}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>

          {/* Uncomment the following block if "Change Contact Information" menu item is needed in the future */}

          {/* <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleClose();
                setLeftMenuItem("ContactInformationChange");
              }}
            >
              <ListItemText>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#00256A",
                    fontSize: isMobile ? 12 : 14,
                    fontWeight: 500,
                  }}
                >
                  {t("Change Contact Information")}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem> */}
        </List>
      </Popover>
    </Box>
  );
};

export default MenuLeft;