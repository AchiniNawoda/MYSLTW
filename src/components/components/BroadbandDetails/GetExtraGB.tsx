import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Checkbox, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  CircularProgress
} from "@mui/material";
import useStore from "../../services/useAppStore";
import fetchPackageDetails from "../../services/postpaid/fetchPackageDetails";
import activatepackagedetails from "../../services/postpaid/activatepackagedetails";
import { useTranslation } from "react-i18next";

interface DataPlan {
  range: string;
  pricePerGB: number;
}

interface PackageDetail {
  volume: number;
  postPrice: string;
  packageId: string;
}

interface DataPlanProps {
  packageName: string | null;
}

const GetExtraGbPage: React.FC<DataPlanProps> = ({ packageName }) => {
  const { t } = useTranslation();
  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const { selectedTelephone } = useStore();
   const AddToBillImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/GetExtraGBAdd.jpeg";
    const  PayNowImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/GetExtraGBPay.jpeg";
     const WatermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  
  const dataPlans: DataPlan[] = [
    { range: t("extra_gb.range_1_to_3"), pricePerGB: 100 },
    { range: t("extra_gb.range_5_to_19"), pricePerGB: 85 },
    { range: t("extra_gb.range_20_to_49"), pricePerGB: 75 },
    { range: t("extra_gb.range_above_50"), pricePerGB: 60 },
  ];

  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [packageDetails, setPackageDetails] = useState<PackageDetail[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"addToBill" | "payNow" | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storedEmail = localStorage.getItem("username");
  const [openTerms, setOpenTerms] = useState(false);

 
   useEffect(() => {
    console.log("📦 [Update] Package Details:", packageDetails);
  }, [packageDetails]);

  useEffect(() => {
    console.log("🔄 [State] Selection Updated:", { selectedGB, selectedPrice });
  }, [selectedGB, selectedPrice]);

  useEffect(() => {
    console.log("✅ [State] Checkbox:", isCheckboxChecked);
  }, [isCheckboxChecked]);

  useEffect(() => {
    console.log("💳 [State] Payment Method:", paymentMethod);
  }, [paymentMethod]);

  const handleSelect = (gb: number) => {
    console.log("🖱️ [Action] Selected GB:", gb);
    const selectedPlan = packageDetails.find(plan => plan.volume === gb);
    
    if (selectedPlan) {
      console.log("📄 [Data] Selected Plan:", selectedPlan);
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
    } else {
      console.warn("⚠️ [Warning] No plan found for GB:", gb);
    }
  };

  const handleSubmit = async () => {
    console.group("🚀 [Action] Form Submission");
    console.log("⏳ [Status] Validation Started");
  
    if (!isCheckboxChecked || !selectedGB || !paymentMethod || !serviceID) {
      console.log(serviceID);
      console.log(selectedGB);
      console.log(selectedTelephone);
      
      console.warn("⚠️ [Validation] Missing:", {
        checkbox: !isCheckboxChecked,
        GB: !selectedGB,
        method: !paymentMethod,
        serviceID: !serviceID
      });
  
      setErrorMessage(t("extra_gb.validation_error"));
      setOpenDialog(true);
      console.groupEnd();
      return;
    }
  
    console.log("✅ [Validation] All fields valid");
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  
    try {
      const selectedPlan = packageDetails.find(plan => plan.volume === selectedGB);
      if (!selectedPlan) throw new Error("[Error] Selected plan not found");
  
      console.log("📦 [Selected Plan ID]:", selectedPlan.packageId);
  
      if (paymentMethod === "addToBill") {
        console.log("📝 [Action] Adding to bill...");
        const response = await activatepackagedetails(serviceID, selectedPlan.packageId);
        console.log("📄 [Response] Activation:", response);
        
        if (!response?.isSuccess) {
          throw new Error(response?.errorShow || response?.errorMessege || t("extra_gb.bill_add_error"));
        }
  
        setSuccessMessage(response?.message || t("extra_gb.bill_add_success"));
      } else {
        console.log("💳 [Action] Redirecting to payment gateway...");
       
        const paymentData = {
          CustEmail: storedEmail,
          ContactNumber: selectedTelephone,
          subscriberID: serviceID,
          prepaidID: "EGB",
          reciever: serviceID,
          packageId: selectedPlan.packageId,
          channel: "SLTPRE",
          commitUser: "OmniAPP",
          reporterPackage: selectedPlan.packageId,
          activatedBy: serviceID,
          callbackURLSLT: "", 
        };
  
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://billpay.slt.lk/bbtopup/summaryallAPImyslt.php";
        form.target = "_self";

        console.log("📤 [Form Data to be Sent]:", paymentData);
  
        Object.entries(paymentData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value?.toString() ?? "";
          form.appendChild(input);
        });
  
        document.body.appendChild(form);
        form.submit();
  
        return;
      }
    } catch (error: any) {
      console.error("❌ [Error] Transaction Failed:", error);
      setErrorMessage(error.message || t("extra_gb.generic_error"));
    } finally {
      setIsLoading(false);
      setOpenDialog(true);
      console.log("⏳ [Status] Loading Complete");
      console.groupEnd();
    }
  };
  
useEffect(() => {
  const fetchData = async () => {
    console.group("🌐 [API] Fetching Packages");
    if (serviceID && packageName) {
      try {
        console.log("⏳ [Request] Fetching package details...");
        const response = await fetchPackageDetails(serviceID, packageName);
        console.log("✅ [Response] Received:", response);

        if (response && response.length > 0) {
          // Convert packageId to string to match PackageDetail[]
          const mappedResponse: PackageDetail[] = response.map((bundle) => ({
            ...bundle,
            packageId: String(bundle.packageId),
          }));
          setPackageDetails(mappedResponse);
        } else {
          console.warn("⚠️ [Warning] No package details found");
          setErrorMessage(t("extra_gb.no_packages_error"));
          setOpenDialog(true);
        }
      } catch (error) {
        console.error("❌ [Error] Fetch Failed:", error);
        setErrorMessage(t("extra_gb.fetch_error"));
        setOpenDialog(true);
      }
    }
    console.groupEnd();
  };
  fetchData();
}, [serviceID, packageName]);

  const handleDialogClose = () => {
    console.log("📢 [UI] Closing Dialog");
    setOpenDialog(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 2,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.29)",
        minHeight: "500px",
        gap: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left Section - Price Plan */}
      <Box
        sx={{
          flex: 1,
          padding: { xs: 2, md: 4 },
          width: { xs: "100%", md: "50%" },
        }}
      >
        <Typography variant="h6" sx={{ 
          color: "#0056A2", 
          fontWeight: "bold", 
          mb: 2, 
          fontSize: { xs: "20px", md: "25px" } 
        }}>
          {t("extra_gb.price_plan")}
        </Typography>
        
        {dataPlans.map((plan, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
              marginBottom: 1,
              backgroundColor: "rgba(5, 125, 232, 0.1)",
              border: "1px solid #0056A2",
              borderRadius: "10px",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(5, 125, 232, 0.2)",
              }
            }}
          >
            <Typography sx={{ 
              color: "#0056A2", 
              fontSize: { xs: "14px", md: "16px" }, 
              fontWeight: "bold" 
            }}>
              {plan.range}
            </Typography>
            <Typography sx={{ 
              color: "#0056A2", 
              fontSize: { xs: "14px", md: "16px" }, 
              fontWeight: "bold" 
            }}>
              {plan.pricePerGB} {t("extra_gb.currency_per_gb")}
            </Typography>
          </Box>
        ))}

        {/* Data Buttons */}
        <Box sx={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 2, 
          marginTop: 3,
          justifyContent: "center"
        }}>
          {Array.from({ length: 10 }, (_, i) => i + 1)
            .filter(gb => gb !== 4)
            .concat([15, 20, 25])
            .map((gb) => (
              <Button
                key={gb}
                variant={selectedGB === gb ? "contained" : "outlined"}
                sx={{
                  minWidth: { xs: "60px", md: "80px" },
                  height: { xs: "50px", md: "60px" },
                  fontWeight: "bold",
                  border: "2px solid #0056A2",
                  borderRadius: "8px",
                  "&.MuiButton-contained": {
                    backgroundColor: "#0056A2",
                    color: "white",
                  },
                  "&.MuiButton-outlined": {
                    color: "#0056A2",
                    "&:hover": {
                      border: "2px solid #003D7A",
                      color: "#003D7A"
                    }
                  },
                }}
                onClick={() => handleSelect(gb)}
                disabled={isLoading}
              >
                {gb}GB
              </Button>
            ))}
        </Box>
      </Box>

      {/* Right Section - Subscription Details */}
      <Box
        sx={{
          border: "3px dashed #0056A2",
          padding: 3,
          margin: { xs: "10px 0", md: "10px 15px" },
          borderRadius: "8px",
          width: { xs: "90%", md: "35%" },
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(5px)",
        }}
      >
        {/* Package Summary */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(5, 125, 232, 0.1)",
            padding: 2,
            borderRadius: "10px",
            marginBottom: 3,
            border: "1px solid #0056A2",
          }}
        >
          <Typography variant="h4" sx={{ 
            color: "#0056A2", 
            fontWeight: "bold",
            fontSize: { xs: "28px", md: "34px" }
          }}>
            {selectedGB || "0"} GB
          </Typography>
          <Typography variant="h6" sx={{ 
            color: "#0056A2", 
            fontWeight: "bold",
            fontSize: { xs: "18px", md: "22px" }
          }}>
            {t("extra_gb.price_format", { price: selectedPrice ? Math.floor(selectedPrice) : 0 })}
          </Typography>
        </Box>

        {/* Payment Options */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 3, 
          marginTop: 3,
          flexDirection: { xs: "column", sm: "row" }
        }}>
          <Box
            sx={{
              border: paymentMethod === "addToBill" ? "2px solid #0056A2" : "2px solid transparent",
              borderRadius: "10px",
              padding: "4px",
              transition: "all 0.3s ease",
              "&:hover": {
                border: "2px solid #0056A2",
                opacity: 1
              }
            }}
          >
            <img
              src={AddToBillImage}
              alt={t("extra_gb.add_to_bill")}
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
                borderRadius: "8px",
                opacity: paymentMethod === "addToBill" ? 1 : 0.7,
              }}
              onClick={() => !isLoading && setPaymentMethod("addToBill")}
            />
          </Box>
          <Box
            sx={{
              border: paymentMethod === "payNow" ? "2px solid #0056A2" : "2px solid transparent",
              borderRadius: "10px",
              padding: "4px",
              transition: "all 0.3s ease",
              "&:hover": {
                border: "2px solid #0056A2",
                opacity: 1
              }
            }}
          >
            <img
              src={PayNowImage}
              alt={t("extra_gb.pay_now")}
              style={{
                width: "100px",
                height: "auto",
                cursor: "pointer",
                borderRadius: "8px",
                opacity: paymentMethod === "payNow" ? 1 : 0.7,
              }}
              onClick={() => !isLoading && setPaymentMethod("payNow")}
            />
          </Box>
        </Box>

        {/* Terms and Conditions */}
        <Box sx={{ mt: 4, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Checkbox
              checked={isCheckboxChecked}
              onChange={(e) => {
                console.log("✅ [UI] Checkbox Changed:", e.target.checked);
                setIsCheckboxChecked(e.target.checked);
              }}
              disabled={isLoading}
              sx={{
                color: "#0056A2",
                "&.Mui-checked": { color: "#0056A2" },
              }}
            />
            <Typography variant="body2" sx={{ color: "#0056A2" }}>
              {t("extra_gb.terms_agreement")}{" "}
              <span
  onClick={() => setOpenTerms(true)}
  style={{
    fontWeight: "bold",
    textDecoration: "underline",
    cursor: "pointer",
  }}
>
  {t("extra_gb.terms_conditions")}
</span>

            </Typography>

          </Box>

          <Button
            fullWidth
            variant="contained"
            disabled={!isCheckboxChecked || !paymentMethod || !selectedGB || isLoading}
            sx={{
              backgroundColor: "#0056A2",
              color: "white",
              py: 1.5,
              borderRadius: "8px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#003D7A" },
              "&:disabled": { 
                backgroundColor: "#E0E0E0",
                color: "#A0A0A0"
              },
            }}
            onClick={handleSubmit}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : t("extra_gb.submit_button")}
          </Button>
        </Box>

        {/* Watermark Logo */}
        <Box sx={{ 
          position: "absolute", 
          right: 16, 
          bottom: 16,
          opacity: 0.3
        }}>
          <img src={WatermarkLogo} alt="Watermark Logo" width={80} />
        </Box>
      </Box>

      {/* Result Dialog */}
     {/* Terms & Conditions Dialog */}
<Dialog open={openTerms} onClose={() => setOpenTerms(false)}>
  <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
    {t("extra_gb.terms_conditions")}
  </DialogTitle>
  <DialogContent>
    <Typography variant="body2" sx={{ mb: 2 }}>
      By purchasing additional data, you agree to our{" "}
      <span style={{ fontWeight: "bold" }}>Terms and Conditions</span> and{" "}
      <span style={{ fontWeight: "bold" }}>Privacy Policy</span>.
    </Typography>
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center" }}>
    <Button
      variant="outlined"
      onClick={() => setOpenTerms(false)}
      sx={{ borderRadius: "20px", px: 3 }}
    >
      {t("Cancel") }
    </Button>
    <Button
      variant="contained"
      onClick={() => setOpenTerms(false)}
      sx={{ borderRadius: "20px", px: 3 }}
    >
      {t( "Accept") }
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default GetExtraGbPage;