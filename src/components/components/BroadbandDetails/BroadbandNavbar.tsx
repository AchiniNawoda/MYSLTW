import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";

interface BroadbandNavbarProps {
  navbarItems: {
    label: string;
    used?: string | null;
    limit?: string | null;
  }[];
  type: string;
  onSelected: (item: string) => void;
  selected: string;
}

const BroadbandNavbar = ({ navbarItems, type, selected, onSelected }: BroadbandNavbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedItem, setSelectedItem] = useState(selected);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelected(item);
  };

  // Responsive font sizes
  const getMainLabelStyle = () => ({
    fontSize: isMobile ? "10.4px" : "15px",
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    textTransform: "capitalize"
  });

  const getSubLabelStyle = () => ({
    fontSize: isMobile ? "8.8px" : "10px",
    fontWeight: 700,
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: "capitalize"
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: isMobile ? "40px" : "45px",
        justifyContent: isMobile ? "flex-start" : "space-between",
        alignItems: "center",
        width: "100%",
        color: "#0056A2",
        backgroundColor: "#ffffff",
        border: "1px solid #0056A252",
        borderRadius: "10px",
        overflowX:  'auto', 
        overflowY: 'hidden',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      {navbarItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => handleItemClick(item.label)}
          sx={{
            height: "90%",
            minWidth: isMobile ? "24%" : "18%", // Wider buttons on mobile for better touch
            padding: isMobile ? "4px 8px" : "6px 4px", // More horizontal padding on mobile
            display: "flex",
            flexDirection: "column",
            borderRadius: "8px",
            color: selectedItem === item.label ? "#ffffff" : "#0056A2",
            backgroundColor: selectedItem === item.label ? "#0056A2" : "transparent",
            transition: "all 0.2s ease",
            '&:hover': {
              backgroundColor: selectedItem === item.label ? "#004494" : "#f0f8ff"
            },
            marginX: 0.5,
            flexShrink: 0 // Prevent buttons from shrinking on mobile
          }}
        >
          <Typography
            variant="body2"
            sx={getMainLabelStyle()}
          >
            {item.label}
          </Typography>
          {type === "Summary" && (
            <Typography
              variant="body2"
              sx={getSubLabelStyle()}
            >
              {item.label === "My Package"
                ? ""
                : item.limit || item.used
                ? `${item.used ?? 0}/${item.limit ?? 0}GB`
                : "N/A"}
            </Typography>
          )}
        </Button>
      ))}
    </Box>
  );
};

export default BroadbandNavbar;