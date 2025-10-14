import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface NavProps {
  onTabChange: (tab: string) => void;
}

const Navbar: React.FC<NavProps> = ({ onTabChange }) => {
  const { t } = useTranslation();

  
  const tabs = [
    { label: "Total Payable", key: "total_payable" },
    { label: "Bill History", key: "bill_history" },
    { label: "Bill Methods", key: "bill_methods" },
  ];

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].label);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    onTabChange(tab);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: 2,
        px: 2,
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {tabs.map(({ label, key }) => (
        <Button
          key={label}
          onClick={() => handleTabClick(label)}
          sx={{
            flex: "1 1 30%",
            minWidth: "30%",
            maxWidth: "32%",
            backgroundColor: selectedTab === label ? "#0056A2" : "#FFFFFF",
            color: selectedTab === label ? "#FFFFFF" : "#0056A2",
            fontWeight: selectedTab === label ? 700 : 500,
            borderRadius: 2,
            height: "6vh",
            minHeight: "50px",
            textTransform: "capitalize",
            boxShadow: selectedTab === label ? 2 : 1,
            "&:hover": {
              backgroundColor: "#0056A2",
              color: "#FFFFFF",
            },
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            {t(key)}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default Navbar;
