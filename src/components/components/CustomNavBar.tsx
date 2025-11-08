import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

const CustomNavBar = () => {
  const {
    serviceDetails,
    setSelectedNavbarItem,
    selectedNavbarItem,
    selectedTelephone,
    setLeftMenuItem,
    setSelectedQuickAccessItem,
  } = useStore();

   
  const { t } = useTranslation();

  const isPrepaid =
    serviceDetails?.promotionType === "Prepaid" ||
    serviceDetails?.promotionType === null;

  const [selectedItem, setSelectedItem] = useState("Broadband");

  const items = [
    { label: t("navbar.broadband"), key: "Broadband" },
    { label: t("navbar.peoTV"), key: "PeoTV" },
    { label: t("navbar.voice"), key: "Voice" },
    { label: t("navbar.mobile"), key: "Mobile" },
  ];

  const handleItemClick = (item: string) => {
    setSelectedQuickAccessItem("");
    setSelectedItem(item);
    setSelectedNavbarItem(item);
    if (item === "Broadband") setLeftMenuItem("Summary");
    if (item === "PeoTV") setLeftMenuItem("My Package");
    if (item === "Voice") setLeftMenuItem("My Package");
  };

  const disabledItems = ["PeoTV", "Mobile", "Voice"];

  useEffect(() => {
    setSelectedItem(selectedNavbarItem);
  }, [selectedNavbarItem]);

  useEffect(() => {
    setSelectedNavbarItem("Broadband");
    setSelectedItem("Broadband");
  }, [selectedTelephone]);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        //width: "100%",
        //width: { xs: "auto", lg: "100%" },
        //height: { xs: "auto", sm: "5vh" },
        minHeight: { xs: "36px", sm: "38px" },
        //minHeight: { xs: "48px", sm: "40px" },
        borderRadius: "10px",
        display: "flex",
        flexDirection: "row",
        //justifyContent: "space-around",
        justifyContent: "space-between",
        //alignItems: "stretch",
        alignItems: "center",
        padding: { xs: "4px", sm: "4px 6px" },
        //gap: { xs: "4px", sm: 0 },
        gap: { xs: "4px", sm: "8px" },
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {items.map((item, index) => {
        const disabled = disabledItems.includes(item.key) && isPrepaid;
        return (
          <Button
            key={index}
            disabled={disabled}
            onClick={() => handleItemClick(item.key)}
            sx={{
              flexGrow: 1,
              minWidth: 0,
              //minHeight: { xs: "36px", sm: "auto" },
              minHeight: { xs: "34px", sm: "36px" },
              //padding: { xs: "4px 8px", sm: "6px 12px" },
              padding: { xs: "6px 8px", sm: "8px 12px" },
              //marginX: { xs: 0, sm: 1 },
              color: selectedItem === item.key ? "white" : "#0056A2",
              backgroundColor:
                selectedItem === item.key ? "#0056A2" : "transparent",
              //borderRadius: { xs: "4px", sm: "8px" },
              borderRadius: "6px",
              textTransform: "capitalize",
              //textTransform: "none",
              transition: "all 0.2s ease",
              "&:hover": {
                //transition: "all 0.2s ease",
                backgroundColor:
                  selectedItem === item.key ? "#0056A2" : "rgba(0, 86, 162, 0.08)",
                transform: selectedItem !== item.key ? "scale(1.02)" : "none",
              },
              "&.Mui-disabled": {
                opacity: 0.6,
                color: "#0056A2",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                //fontSize: { xs: 14, sm: 16 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                fontWeight: selectedItem === item.key ? 600 : 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                //lineHeight: 1.2,
              }}
            >
              {item.label}
            </Typography>
          </Button>
        );
      })}
    </Box>
  );
};

export default CustomNavBar;
