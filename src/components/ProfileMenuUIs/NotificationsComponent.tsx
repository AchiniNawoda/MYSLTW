// import React from "react";

// import { Box, Typography } from "@mui/material";

// const NotificationsComponent = () => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "100%",
//         height: "450px",
//         backgroundColor: "white",
//         borderRadius: 3,
//         fontFamily: "Poppins, sans-serif"
//       }}
//     >
//       <Typography variant="h6" color="textSecondary">
//         Notifications Component is under construction.
//       </Typography>
//     </Box>
//   );
// };

// export default NotificationsComponent;

//import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
//import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import checkOfferAvailability from "../../services/postpaid/checkOfferAvailability";
import PromotionpackageActivation from "../../services/postpaid/PromotionpackageActivation";

interface PromotionData {
  title: string;
  activated: boolean;
  packageid: number;
  refno: number;
  image?: string;
}

interface PromotionProps {
  telephoneNo: string;
}

const NotificationsComponent: React.FC<PromotionProps> = ({ telephoneNo }) => {
  const { t } = useTranslation();
  const [promotions, setPromotions] = useState<PromotionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const offerData: unknown = await checkOfferAvailability(telephoneNo);

        if (offerData && Array.isArray(offerData)) {
          const fetchedPromotions: PromotionData[] = offerData.map((offer: any) => ({
            title: offer.packageName,
            activated: offer.isActive,
            packageid: offer.packageid,
            refno: offer.refno,
            image: offer.imageURL || "",
          }));
          setPromotions(fetchedPromotions);
        } else {
          setPromotions([]);
        }
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
        setError(t("error_fetching_promotions"));
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [telephoneNo, t]);

  const handleActivate = async (packageid: number, refno: number) => {
    try {
      const response = await PromotionpackageActivation(telephoneNo, packageid, refno);
      if (response) {
        setDialogMessage(response.message || "Promotion activated successfully!");
      } else {
        setDialogMessage("Failed to activate promotion.");
      }
    } catch (error) {
      console.error("Error activating promotion:", error);
      setDialogMessage("An error occurred while activating the promotion.");
    } finally {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // const scroll = (offset: number) => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollLeft += offset;
  //   }
  // };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "60vh",
      }}
    >
      <Typography variant="body2" align="center" sx={{ fontSize: "1.2rem", fontWeight: "bold", margin: 2 }}>
        {t("notifications")}
      </Typography>

      {loading && (
        <Typography variant="body1" color="textSecondary">
          {t("loading_promotions")}
        </Typography>
      )}

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      {!loading && !error && promotions.length === 0 && (
        <Typography variant="body2" color="textSecondary" sx={{ fontSize: 24 }}>
          {t("no_promotions")}
        </Typography>
      )}

      {!loading && !error && promotions.length > 0 && (
        <Box
          sx={{
            position: "relative",
            width: "95%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
              //paddingY: 3,
            }}
          >
            {promotions.map((promo, index) => (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  backgroundColor: "#0056A2",
                  color: "white",
                  borderRadius: "10px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    //backgroundColor: "#3076B2",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center",}}>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Box
                      sx={{
                        height: {xs:"60px", md:"80px"},
                        width: {xs:"60px", md:"80px"},
                        borderRadius: "10px",
                        backgroundImage: `url(${promo.image})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        // mt: 1,
                        // mb: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ fontSize: "1rem", }}>
                      {promo.title}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleActivate(promo.packageid, promo.refno)}
                      sx={{
                        backgroundColor: promo.activated ? "white" : "#47c63eff",
                        color: promo.activated ? "white" : "white",
                        "&:hover": {
                          backgroundColor: promo.activated ? "white" : "#4FD745",
                        },
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontSize: {xs: "0.7rem", md: "0.8rem"}, 
                          fontWeight: "bold",
                          letterSpacing: {xs:"1px", md:"2px"},
                          }}
                      >
                        {promo.activated ? t("activated") : t("activate")}
                      </Typography>
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

        </Box>
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{t("promotion_activation")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("close")}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationsComponent;
