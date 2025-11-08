import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import FiberRequestPage from "./FiberRequestPage";
import OtherRequestPage from "./OtherRequestPage";
import { useTranslation } from "react-i18next";

// Define props for the NewServicesPage component
interface NewServicesPageProps {
  telephoneNo: string;
  // You might want to add selectedItem prop here too if needed in OtherRequestPage
}

const NewServicesPage: React.FC<NewServicesPageProps> = ({ telephoneNo }) => {
  const { t } = useTranslation();

  const [selectedItem, setSelectedItem] = useState("Fibre");

  console.log("Telephone Number:", telephoneNo); // Log the telephone number

  // Use translated labels for items
  const items = [
    { label: t("newServices.fibre"), key: "Fibre" },
    { label: t("newServices.megaline"), key: "Megaline" },
    { label: t("newServices.4glte"), key: "4G LTE" },
  ];

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    console.log("Selected Item in Parent Component:", item); // Log selected item in the parent component
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        borderRadius: 3,
        padding: 1,
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{ fontSize: 24, fontWeight: "bold" }}
      >
         {t("newServices.title")} 
      </Typography>
      <Box
        sx={{
          marginTop: 1,
          backgroundColor: "#ffffff",
          width: "80%",
          height: "5vh",
          minHeight: "40px",
          border: "2px solid #0056A2",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "space-around",
          paddingY: 0.5,
          paddingX: 0,
        }}
      >
        {items.map((item, index) => {
          return (
            <Button
              key={index}
              onClick={() => handleItemClick(item.key)}
              sx={{
                marginX: 1,
                flexGrow: 1,
                width: "auto",
                color: selectedItem === item.key ? "white" : "#0056A2",
                backgroundColor:
                  selectedItem === item.key ? "#0056A2" : "transparent",
                borderRadius: 2,
                textTransform: "capitalize",
                "&:hover": {
                  scale: selectedItem !== item.key ? 1.1 : 1,
                  transition: "all 0.3s ease",
                },
              }}
            >
              <Typography variant="body2" sx={{ fontSize: 16 }}>
                {item.label}
              </Typography>
            </Button>
          );
        })}
      </Box>
      <Box>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          {selectedItem === "Fibre" && <FiberRequestPage />}
          {(selectedItem === "Megaline" || selectedItem === "4G LTE") && (
            <OtherRequestPage telephoneNo={telephoneNo} selectedItem={selectedItem} />
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewServicesPage;
