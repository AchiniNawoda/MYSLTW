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
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import fetchLTEPostpaidAddOnPackages from "../../services/postpaid/fetchLTEPostpaidAddOnPackages";
import useStore from "../../services/useAppStore";
import { Addon, PostpaidAddOnPackage } from "../../types/types";
import BroadbandNavbar from "./BroadbandNavbar";
import purchaseAddons from "../../services/postpaid/purchaseAddons";
import { useTranslation } from "react-i18next";

const BroadbandPostPaidGetAddOns = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<string>("Home Schooling & WFH");
  const [packages, setPackages] = useState<PostpaidAddOnPackage[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Addon | null>(null);
  const [activationType, setActivationType] = useState("onetime");
  const { serviceDetails, selectedTelephone } = useStore();
  const packageName = serviceDetails?.listofBBService[0]?.packageName;
  const subscriberID:string = serviceDetails?.listofBBService[0]?.serviceID || "";
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

 useEffect(() => {
  const fetchPackages = async () => {
    if (!packageName || !subscriberID) return;
    
    try {
      const response = await fetchLTEPostpaidAddOnPackages(packageName, subscriberID);
      if (response) {
        setPackages(response);
        if (response.length > 0) setSelectedItem(response[0].category);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };
  fetchPackages();
}, [selectedTelephone, packageName, subscriberID]);

  const handleCardButtonClick = (addon: Addon) => {
    console.log("Selected Package: ", addon);
    setSelectedPackage(addon);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedPackage(null);
    setActivationType("onetime");
  };

  const handleActivation = async () => {
    if (!selectedPackage) {
      console.log("No package selected.");
      return;
    }

    const packageCategory = packages.find((category) =>
      category.addons.some((addon) => addon.id === selectedPackage.id)
    );

    if (!packageCategory) {
      console.log("Selected package category not found.");
      return;
    }

  type SpecialCategory = "LMS" | "Home Schooling & WFH";

const requiresCorrection = 
  (packageCategory.category as SpecialCategory) === "LMS" ||
  (packageCategory.category as SpecialCategory) === "Home Schooling & WFH";

    if (!requiresCorrection) {
      console.log(
        `No correction needed for category: ${packageCategory.category}`
      );
      console.log(
        `Selected package is already correct: ${selectedPackage.name}`
      );
      return;
    }
    const basePackageName = selectedPackage.name
      .split(" ")
      .slice(0, -2)
      .join(" ");
    console.log("Base Package Name:", basePackageName);

    let correctedPackage = null;
    for (const addon of packageCategory.addons) {
      const isMatchingName = addon.name.startsWith(basePackageName);
      const isMatchingType =
        activationType === "recurrent" ? addon.recurring : !addon.recurring;

      if (isMatchingName && isMatchingType) {
        correctedPackage = addon;
        break;
      }
    }

    if (correctedPackage) {
      try {
        const result = await purchaseAddons(correctedPackage.id,subscriberID,correctedPackage.name);
        console.log("Package fetched successfully:", result);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    } else {
      console.log("No matching package found.");
    }
    handleDialogClose();
  };

  const navbarItems = packages.map((pkg) => ({
    label: pkg.category,
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          color: "#FFFFFF1A",
          padding: 1,
          borderRadius: "10px",
          height: "100%",
          boxShadow: "0px 3px 3px #0000004A",
          overflow: "hidden",
          width: "97%",
        }}
      >
        <BroadbandNavbar
          navbarItems={navbarItems}
          onSelected={setSelectedItem}
          type={"addons"}
          selected={selectedItem}
        />
        
        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => setIsDragging(false)}
          sx={{
            display: "flex",
            gap: 1.5,
            width: "100%",
            padding: 1,
            overflowX: "auto",
            flexDirection: "row",
            cursor: isDragging ? "grabbing" : "grab",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            userSelect: "none",
            scrollbarWidth: "none",
          }}
        >
          {selectedItem.trim() === "LMS" ||
          selectedItem.trim() === "Home Schooling & WFH" ? (
            <>
              {packages
                .find((pkg) => pkg.category == selectedItem)
                ?.addons.slice(0, 2)
                .map((addon) => (
                  <Card
                    key={addon.id}
                    sx={{
                      minWidth: "45%",
                      backgroundColor: "#0056A2",
                      borderRadius: 2,
                      boxShadow: 3,
                      textAlign: "center",
                      margin: 0.4,
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
                        boxShadow: "0px 3px 3px #0000004A",
                        position: "relative",
                        height: "180px",
                        backgroundImage: `url(${addon.icon_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      
                    </Box>
                    <CardContent
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 20px",
                        backgroundColor: "#0056A2",
                      }}
                    >
                      <Box sx={{ 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        color: "white",
                      }}>
                        <Typography variant="body2" sx={{ fontSize: 16, fontWeight: "bold" }}>
                          {addon.name.split(" ").slice(0, 2).join(" ")}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                          {addon.description}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 16, fontWeight: "bold" }}>
                          {t("addons.price_format", { price: addon.postprice })}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#50B748",
                          color: "white",
                          fontSize: 14,
                          padding: "6px 10px",
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "#388e3c",
                          },
                        }}
                        onClick={() => handleCardButtonClick(addon)}
                      >
                        {t("addons.activate_button")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </>
          ) : (
            <>
              {packages
                .find((pkg) => pkg.category === selectedItem)
                ?.addons.map((addon) => (
                  <Card
                    key={addon.id}
                    sx={{
                      minWidth: "45%",
                      backgroundColor: "#0056A2",
                      borderRadius: 2,
                      boxShadow: 3,
                      textAlign: "center",
                      margin: 0.4,
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
                        boxShadow: "0px 3px 3px #0000004A",
                        position: "relative",
                        height: "180px",
                        backgroundImage: `url(${addon.icon_url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      
                    </Box>
                    <CardContent
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 20px",
                        backgroundColor: "#0056A2",
                      }}
                    >
                      <Box sx={{ 
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        color: "white",
                      }}>
                        <Typography variant="body2" sx={{ fontSize: 16, fontWeight: "bold" }}>
                          {addon.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 14 }}>
                          {addon.description}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: 16, fontWeight: "bold" }}>
                          {t("addons.price_format", { price: addon.postprice })}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#50B748",
                          color: "white",
                          fontSize: 14,
                          padding: "6px 10px",
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "#388e3c",
                          },
                        }}
                        onClick={() => handleCardButtonClick(addon)}
                      >
                        {t("addons.activate_button")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </>
          )}
        </Box>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          PaperProps={{
            sx: {
              borderRadius: 3,
              padding: 2,
              minWidth: 350,
              backgroundColor: "#f5faff",
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            },
          }}
        >

          <DialogTitle
            sx={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              color: "#0056A2",
              borderBottom: "1px solid #ccc",
              pb: 1,
            }}
          >
            {t("addons.confirm_title")}
          </DialogTitle>

          <DialogContent
            sx={{
              color: "#333",
              fontSize: "1rem",
              pt: 2,
            }}
          >
            <Typography sx={{ mb: 2 }}>
              {t("addons.confirm_message", { packageName: selectedPackage?.name })}
            </Typography>
            {(selectedItem.trim() === "LMS" ||
              selectedItem.trim() === "Home Schooling & WFH") && (
              <RadioGroup
                value={activationType}
                onChange={(e) => setActivationType(e.target.value)}
              >
                <FormControlLabel
                  value="onetime"
                  control={<Radio />}
                  label={t("addons.one_time_option")}
                />
                <FormControlLabel
                  value="recurrent"
                  control={<Radio />}
                  label={t("addons.recurrent_option")}
                />
              </RadioGroup>
            )}
          </DialogContent>

          <DialogActions
            sx={{
              borderTop: "1px solid #ccc",
              justifyContent: "flex-end",
              pt: 1,
            }}
          >
            <Button onClick={handleDialogClose} color="error">
              {t("addons.no_button")}
            </Button>
            <Button onClick={handleActivation} color="primary">
              {t("addons.yes_button")}
            </Button>
          </DialogActions>

        </Dialog>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {packages.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: activeIndex === index ? 60 : 8,
                height: 8,
                backgroundColor: activeIndex === index ? "#0056A2" : "#70A0CB",
                borderRadius: activeIndex === index ? 4 : "50%",
                transition: "width 0.3s, background-color 0.3s",
                mb: 1,
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default BroadbandPostPaidGetAddOns;