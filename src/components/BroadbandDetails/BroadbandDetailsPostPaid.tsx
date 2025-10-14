import { CircularProgress, Typography, useTheme, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import fetchServiceDetailByTelephone from "../../services/fetchServiceDetails";
import useStore from "../../services/useAppStore";
import {
  PostpaidUsageDetails,
  ServiceDetailsAPIResponse,
} from "../../types/types";
import CircularProgressBar from "../CircularProgressBar";
import fetchMyPackageUsage from "../../services/postpaid/fetchMyPackageUsage";
import fetchOtherPackageUsage from "../../services/postpaid/fetchOtherUsage";
import BroadbandNavbar from "./BroadbandNavbar";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { useTranslation } from 'react-i18next';


const BroadbandDetailsPostPaid = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const watermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  const { selectedTelephone, setLeftMenuItem, serviceDetails } = useStore();
  const [serviceData, setServiceData] =
    useState<ServiceDetailsAPIResponse | null>(null);
  const [usageDetails, setUsageDetails] = useState<{
    myPackageDetails?: PostpaidUsageDetails | null;
    extraGBDetails?: PostpaidUsageDetails | null;
    bonusDataDetails?: PostpaidUsageDetails | null;
    freeDataDetails?: PostpaidUsageDetails | null;
    addOnsDetails?: PostpaidUsageDetails | null;
  }>({});
  const [selectedItem, setSelectedItem] = useState(t("My Package"));
  const [selectedPackage, setSelectedPackage] =
    useState<PostpaidUsageDetails | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Responsive styles
  const getCommonTextStyle = () => ({
    fontSize: isMobile ? "12px" : "14px",
    fontWeight: 700,
    color: "#0056A2",
  });

  const getCommonButtonStyle = () => ({
    borderRadius: "10px",
    width: isMobile ? "80%" : "90%",
    fontSize: isMobile ? "14px" : "16px",
  });

  const CustomSection = ({ label, value }: { label: string; value: string | null }) => {
    return (
      <Typography variant="body2" sx={getCommonTextStyle()}>
        {t(label)}:
        <Typography
          component="span"
          variant="body2"
          sx={{
            fontSize: isMobile ? "10px" : "12px",
            fontWeight: 500,
            color: "#0056A2"
          }}
        >
          {value ? ` ${value}` : ` ${t("Loading...")}`}
        </Typography>
      </Typography>
    );
  };

  const ActionButton = ({
    text,
    variant = "outlined",
    onClick,
  }: {
    text: string;
    variant?: "outlined" | "contained";
    onClick: () => void;
  }) => {
    return (
      <Button
        variant={variant}
        sx={{
          ...getCommonButtonStyle(),
          zIndex: 10,
          border: variant === "outlined" ? "3px solid #0056A2" : "none",
          backgroundColor: variant === "contained" ? "#0056A2" : "transparent",
          color: variant === "contained" ? "#ffffff" : "#0056A2",
          marginY: variant === "contained" ? 0 : isMobile ? 1 : 3,
          padding: variant === "contained" ? isMobile ? "6px" : "8px" : isMobile ? "8px" : "12px",
          "&:hover": {
            backgroundColor: variant === "contained" ? "#004b8c" : "#e0f7fa",
            border: variant === "outlined" ? "3px solid #004b8c" : "none",
            color: variant === "contained" ? "#ffffff" : "#004b8c",
          },
        }}
        onClick={onClick}
      >
        <Typography
          variant="body2"
          textTransform="capitalize"
          sx={{
            fontWeight: "bold",
            fontSize: isMobile ? "14px" : "16px"
          }}
        >
          {t(text)}
        </Typography>
      </Button>
    );
  };

  const serviceID = serviceData?.listofBBService[0]?.serviceID || null;
  const serviceStatus =
    serviceData?.listofBBService[0]?.serviceStatus || t("Loading...");
  const packageName =
    serviceData?.listofBBService[0]?.packageName || t("Loading...");
  const isPrepaid = serviceDetails?.promotionType === "Prepaid" || serviceDetails?.promotionType === null;

  useEffect(() => {
    const fetchData = async () => {
      if (selectedTelephone) {
        const data = await fetchServiceDetailByTelephone(selectedTelephone);
        setServiceData(data);
      }
    };
    fetchData();
  }, [selectedTelephone]);

  useEffect(() => {
    if (serviceID) {
      const fetchUsageData = async () => {
        setLoading(true);
        const myPackageDetails = await fetchMyPackageUsage(serviceID);
        const extraGBDetails = await fetchOtherPackageUsage(
          serviceID,
          "ExtraGB"
        );
        const bonusDataDetails = await fetchOtherPackageUsage(
          serviceID,
          "BonusData"
        );
        const freeDataDetails = await fetchOtherPackageUsage(
          serviceID,
          "FreeData"
        );
        const addOnsDetails = await fetchOtherPackageUsage(
          serviceID,
          "GetDashboardVASBundles"
        );
        setUsageDetails({
          myPackageDetails,
          extraGBDetails,
          bonusDataDetails,
          freeDataDetails,
          addOnsDetails,
        });
        setLoading(false);
      };

      fetchUsageData();
    }
  }, [serviceID, selectedTelephone]);

  const navbarItems = [
    {
      label: t("My Package"),
      used: usageDetails?.myPackageDetails?.package_summary?.used || null,
      limit: usageDetails?.myPackageDetails?.package_summary?.limit || null,
    },
    {
      label: t("Extra GB"),
      used: usageDetails?.extraGBDetails?.package_summary?.used || null,
      limit: usageDetails?.extraGBDetails?.package_summary?.limit || null,
    },
    {
      label: t("Bonus Data"),
      used: usageDetails?.bonusDataDetails?.package_summary?.used || null,
      limit: usageDetails?.bonusDataDetails?.package_summary?.limit || null,
    },
    {
      label: t("Add-Ons"),
      used: usageDetails?.addOnsDetails?.package_summary?.used || null,
      limit: usageDetails?.addOnsDetails?.package_summary?.limit || null,
    },
    {
      label: t("Free Data"),
      used: usageDetails?.freeDataDetails?.package_summary?.used || null,
      limit: usageDetails?.freeDataDetails?.package_summary?.limit || null,
    },
  ];

  useEffect(() => {
    setSelectedIndex(0); // Reset index when selectedItem changes
    if (selectedItem === t("My Package")) {
      setSelectedPackage(usageDetails?.myPackageDetails || null);
    } else if (selectedItem === t("Extra GB")) {
      setSelectedPackage(usageDetails?.extraGBDetails || null);
    } else if (selectedItem === t("Bonus Data")) {
      setSelectedPackage(usageDetails?.bonusDataDetails || null);
    } else if (selectedItem === t("Add-Ons")) {
      setSelectedPackage(usageDetails?.addOnsDetails || null);
    } else if (selectedItem === t("Free Data")) {
      setSelectedPackage(usageDetails?.freeDataDetails || null);
    }
  }, [selectedItem, usageDetails, t]);

  const currentUsageDetail = selectedPackage?.usageDetails[selectedIndex];

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        gap: 2,
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        color: "#FFFFFF1A",
        padding: isMobile ? 0.5 : 2,
        width: "100%",
        boxSizing: "border-box",
        justifyContent: "center",
        borderRadius: "10px",
        marginY: "auto",
        height: "100%",
        overflow: "hidden",
        boxShadow: "0px 3px 3px #0000004A",
        zIndex: 2,
        mx: 'auto',
        paddingBottom: "20px",
        paddingTop:"20px",
      }}
    >
      <BroadbandNavbar
        navbarItems={navbarItems}
        onSelected={setSelectedItem}
        type="Summary"
        selected={t("My Package")}
      />

      <Box sx={{
        height: "100%",
        display: "flex",
        flexDirection: isMobile || isTablet ? "column" : "row",
        justifyContent: "end",
        alignItems: isMobile || isTablet ? "center" : "flex-start",
        gap: isMobile ? 2 : 0,
        boxSizing: "border-box"
      }}>
        {loading ? (
          <Box
            sx={{
              width: "90%",
              maxWidth: isMobile? "260px": "400px",
              height: isMobile ? "auto" : "50vh",
              minHeight: isMobile ? "200px" : "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              padding: 2,
              border: "1px solid #0056A252",
              borderRadius: "10px",
              margin: isMobile ? "0 auto" : "0",
              overflowX: "hidden", // Prevent internal scroll
              wordWrap: "break-word",
              boxSizing: "border-box"
            }}
          >
            <CircularProgress />
            <Typography>{t("Loading...")}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "90%",
              maxWidth: isMobile? "280px": "400px",
              height: isMobile || isTablet ? "auto" : "50vh",
              minHeight: isMobile ? "200px" : "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              gap: 1,
              padding: isMobile ? 0.5 : 2,
              border: "1px solid #0056A252",
              borderRadius: "10px",
              margin: isMobile ? "0 auto" : "0",
              overflow: "hidden", // Ensure content within this box is clipped
            }}
          >
            {selectedPackage && selectedPackage?.usageDetails.length > 0 && !loading ? (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: isMobile ? "16px" : "20px",
                    fontWeight: 700,
                    color: "#0F3B7A",
                    textAlign: "center"
                  }}
                >
                  {selectedItem === t("My Package")
                    ? t("Your speed is {{status}} right now", { status: selectedPackage?.status })
                    : currentUsageDetail?.name || t("Loading...")}
                </Typography>
                <Box
                  sx={{
                    width: "95%", // Adjusted to 100% to contain the single item
                    display: "flex",
                    gap: 2,
                    justifyContent: "center",
                    alignItems: "Center",
                    position: "relative",
                    //overflow: "hidden", // Crucial for preventing overflow
                    boxSizing: "border-box",
                  }}
                >
                  <ArrowBackIos
                    sx={{
                      marginRight: -1,
                      color: selectedIndex === 0 ? "gray" : "#0056A2",
                      zIndex: 100,
                      fontSize: isMobile ? "16px" : "24px",
                      cursor: selectedIndex === 0 ? "not-allowed" : "pointer"
                    }}
                    onClick={() => {
                      if (selectedIndex > 0) {
                        setSelectedIndex(selectedIndex - 1);
                      }
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center", // Center the single item
                      alignItems: "center",
                      width: "80%", // Adjusted to control the width of the display area
                      maxWidth: "300px",
                      // Removed transform for simplicity, as we're only showing one item
                    }}
                  >
                    {/* Only render the currently selected item */}
                    {currentUsageDetail && (
                      <CircularProgressBar
                        percentage={currentUsageDetail.percentage}
                        size={isMobile ? 120 : 150}
                      />
                    )}
                  </Box>
                  <ArrowForwardIos
                    sx={{
                      color:
                        selectedIndex ===
                        selectedPackage.usageDetails.length - 1
                          ? "gray"
                          : "#0056A2",
                      zIndex: 100,
                      fontSize: isMobile ? "16px" : "24px",
                      cursor: selectedIndex === selectedPackage.usageDetails.length - 1 ? "not-allowed" : "pointer"
                    }}
                    onClick={() => {
                      if (
                        selectedIndex <
                        selectedPackage.usageDetails.length - 1
                      ) {
                        setSelectedIndex(selectedIndex + 1);
                      }
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: isMobile ? "16px" : "20px",
                    fontWeight: 700,
                    color: "#0F3B7A",
                    textAlign: "center"
                  }}
                >
                  {t("{{used}} GB USED OF {{limit}} GB", {
                    used: currentUsageDetail?.used,
                    limit: currentUsageDetail?.limit
                  })}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: isMobile ? "14px" : "16px",
                    fontWeight: 500,
                    color: "#0F3B7A",
                    textAlign: "center"
                  }}
                >
                  {t("Valid Till : {{date}}", {
                    date: currentUsageDetail?.expiry_date
                  })}
                </Typography>
              </>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  fontSize: isMobile ? "16px" : "20px",
                  fontWeight: 700,
                  color: "#0F3B7A",
                  textAlign: "center"
                }}
              >
                {t("No data available for this package")}
              </Typography>
            )}
          </Box>
        )}

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: isMobile ? "100%" : isTablet ? "100%" : "40%",
            gap: isMobile ? 1 : isTablet ? 1 : 2,
            paddingX: isMobile ? 1 : isTablet ? 1 : 2,
            marginTop: isMobile ? 0 : isTablet ? 2 : 0,
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "start",
              backgroundColor: "#B3EDFF8A",
              borderRadius: "10px",
              padding: isMobile ? "8px" : "12px",
              gap: isMobile ? 0.5 : 1,
              // marginTop: isTablet ? "8px" : "none",
              // ml: isMobile ? 5 : isTablet ? 5 : 2,
              // mr: isMobile ? 5 : isTablet ? 5 : 2,
              boxSizing: "border-box",
            }}
          >
            <CustomSection label={t("Package")} value={packageName} />
            <CustomSection label={t("Status")} value={serviceStatus} />
            <CustomSection label={t("Username")} value={serviceID} />
          </Box>

          {isPrepaid ? (
            <>
              <ActionButton
                text="Get Main Package"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetBroadbandMainPackage");
                }}
              />
              <ActionButton
                text="Get Data Add-ons"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetBroadbandAddOnPackage");
                }}
              />
            </>
          ) : (
            <>
              <ActionButton
                text="Package Upgrade"
                variant="outlined"
                onClick={() => {
                  setLeftMenuItem("PostPaidPackageUpgrade");
                }}
              />
              <ActionButton
                text="Get Extra GB"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetExtraGB");
                }}
              />
              <ActionButton
                text="Get Data Add-ons"
                variant="contained"
                onClick={() => {
                  setLeftMenuItem("GetPostpaidAddOnPackages");
                }}
              />
            </>
          )}

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              zIndex: 1,
            }}
          >
            <img
              src={watermarkLogo}
              alt={t("Watermark Logo")}
              style={{
                width: "clamp(60px, 8vw, 100px)",
                height: "auto",
              }}
            />
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default BroadbandDetailsPostPaid;