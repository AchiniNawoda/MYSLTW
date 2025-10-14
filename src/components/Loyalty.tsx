import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Grid,
  Button,
  Tabs,
  Tab
} from "@mui/material";
import { useTranslation } from "react-i18next";
//import LoyaltyIcon from "../assets/Images/LoyaltyImages/LoyaltyIcon.png";
//import LoyaltyCover from "../assets/Images/LoyaltyImages/LoyaltyCover.png";
//import VoucherImage from "../assets/Images/LoyaltyImages/VoucherImage.png";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Loyalty = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  const LoyaltyCover = "https://res.cloudinary.com/dtqcgwrgk/image/upload/v1753122150/LoyaltyCover_zy4djo.png";
  const LoyaltyIcon = "https://res.cloudinary.com/dtqcgwrgk/image/upload/v1753633474/LoyaltyIcon_ndgqaw.png";
  const VoucherImage = "https://res.cloudinary.com/dtqcgwrgk/image/upload/v1753122479/VoucherImage_eo3czc.png";

  return (
    <>
      {/* Loyalty Card */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 2,
          border: "2px solid #FFFFFF",
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          minHeight: "65px",
          width: { xs: "auto", lg: "60%" },
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          '&:hover': { transform: "scale(1.02)" }
        }}
        onClick={handleDialogOpen}
      >
        {/* Golden text */}
        <Box sx={{ marginRight: 2 }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 700,
              color: "#B68B30",
              lineHeight: 1.2,
            }}
          >
            {t("Rewards &")}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              fontWeight: 700,
              color: "#B68B30",
              lineHeight: 1.2,
            }}
          >
            {t("Loyalty Points")}
          </Typography>
        </Box>

        {/* Club Connect image */}
          <Box
            component="img"
            src={LoyaltyIcon}
            alt="Club Connect"
            sx={{ height: 60, width: "auto", borderRadius: "12px" }}
          />
      </Box>

      {/* Loyalty Popup Dialog */}
      <Dialog
        open={open}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        scroll="body"
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: "hidden"
          }
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            overflow: "visible"
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleDialogClose}
            sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 10,
                color: "#fff",                          
                backgroundColor: "rgba(0,0,0,0.4)",     
                borderRadius: "50%",
                width: 36,
                height: 36,
                "&:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",   
                transform: "scale(1.1)"
                },
                transition: "all 0.2s ease-in-out"
            }}
            >
            <CloseIcon fontSize="small" />
            </IconButton>

          {/* Banner with overlapping icon and gradient bar */}
            <Box sx={{ position: "relative" }}>
            {/* Banner image */}
            <Box>
                <img
                src={LoyaltyCover}
                alt="Banner"
                style={{ width: "100%", height: "auto", display: "block" }}
                />
            </Box>

            {/* Overlapping Loyalty Icon */}
            <Box
                component="img"
                src={LoyaltyIcon}
                alt="Club Connect"
                sx={{
                position: "absolute",
                left: { xs: 12, sm: 16, md: 24 },
                bottom: { xs: 95, sm: 20, md: 8 },
                height: { xs: 60, sm: 70, md: 80, lg: 90, xl: 100 },
                width: "auto",
                zIndex: 3,
                }}
            />

            {/* Blue Gradient Bar */}
            <Box
                sx={{
                background: "linear-gradient(90deg, #50BCE8 0%, #103881 100%)",
                px: 10,
                py: 2,
                mt: "0px", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                position: "relative",
                }}
            >
                <Typography
                variant="body2"
                sx={{
                    color: "#fff",
                    fontWeight: 400,
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                }}
                >
                Exclusively for <span style={{ fontWeight: 900 }}>GOLD</span> members
                </Typography>
            </Box>
            </Box>

          {/* Tabs */}
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              backgroundColor: "#f5f5f5",
              px: 3,
              mt: 1,
              '& .Mui-selected': { color: "#0056A2 !important", fontWeight: 700 },
              '& .MuiTab-root': {
                fontSize: "0.9rem",
                fontWeight: 500,
                textTransform: "none",
              }
            }}
            TabIndicatorProps={{ style: { backgroundColor: "#0056A2" } }}
          >
            <Tab
                label={
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Redeem Points
                    </Typography>
                }
                />
                <Tab
                label={
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Earn Points
                    </Typography>
                }
                />

          </Tabs>

          {/* Scrollable Tab Content */}
          <Box
            sx={{
              px: 3,
              pb: 3,
              pt: 2,
              maxHeight: "400px",
              overflowY: "auto",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#0056A2",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            {/* Redeem Points Tab */}
            {tab === 0 && (
              <Grid container spacing={2}>
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Grid item xs={12} sm={4} key={i}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                        backgroundColor: "#fff"
                      }}
                    >
                      <img
                        src={VoucherImage}
                        alt="Voucher"
                        style={{ width: "100%", height: "auto" }}
                      />
                      <Box p={2}>
                        <Typography fontWeight={600} gutterBottom variant="body2">
                          10% discount voucher
                        </Typography>
                        <Typography color="#FFA500" fontWeight={700} mb={1} variant="body2">
                          1,000 Points
                        </Typography>
                        <Button variant="outlined" fullWidth sx={{borderRadius:"100px", border: "2px solid #0056A2"}}>
                          <Typography variant="body2" sx={{textTransform:"capitalize", fontWeight: 700}}>Redeem</Typography> 
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Earn Points Tab */}
            {tab === 1 && (
              <Box textAlign="center">
                <Typography fontWeight={600} mt={2} variant="body2">
                  Earn points by engaging with services like:
                </Typography>
                <ul style={{ textAlign: "left", marginTop: 16, paddingLeft: 20 }}>
                  <li><Typography variant="body2">Paying your bills on time</Typography></li>
                  <li><Typography variant="body2">Referring friends and family</Typography></li>
                  <li><Typography variant="body2">Using SLT Mobitel services actively</Typography></li>
                </ul>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Loyalty;
