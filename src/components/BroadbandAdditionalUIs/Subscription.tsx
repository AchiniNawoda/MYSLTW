import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import axios from "axios";


// Import images
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import fetchAdvancedReportEnableDetails from "../../services/postpaid/enableDetailedReport/fetchAdvancedReportEnableDetails";
import { EnableAdvancedReportDetails } from "../../types/types";
import activateDetailedReport from "../../services/postpaid/enableDetailedReport/activateDetailedReport";
import useStore from "../../services/useAppStore";


const SubscriptionPage = () => {
  const { serviceDetails } = useStore();
  const WatermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  const AddToBillImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/GetExtraGBAdd.jpeg";
  const  PayNowImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/GetExtraGBPay.jpeg";
  const {   selectedTelephone } = useStore();
  const storedEmail = localStorage.getItem("username");
  const userName = serviceDetails?.listofBBService[0].serviceID || "";
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] = useState(0);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(-1);
  const [subscriptionDetails, setSubscriptionDetails] = useState<
    EnableAdvancedReportDetails[] | null
  >(null);

  const getSubscriptionDetails = async () => {
    setPageLoading(true);
    console.log("Fetching subscription details...");
    try {
      const response = await fetchAdvancedReportEnableDetails();
      console.log("Subscription details response:", response);
      if (response) {
        setSubscriptionDetails(response);
        console.log("Subscription details set in state:", response);
      }
    } catch (error) {
      console.error("Error fetching subscription details:", error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptionDetails();
  }, []);

  const handleSubmit = async () => {
  console.group("========== handleSubmit Execution ==========");
  
  // Log initial state
  console.log("📋 Initial State Values:");
  console.log("🔹 isCheckboxChecked:", isCheckboxChecked);
  console.log("🔹 selectedPaymentOption:", selectedPaymentOption);
  console.log("🔹 selectedSubscriptionIndex:", selectedSubscriptionIndex);
  console.log("🔹 userName:", userName);
  console.log("🔹 subscriptionDetails:", subscriptionDetails);

  // Validate checkbox
  if (!isCheckboxChecked) {
    console.warn("⚠️ Validation Failed: User didn't agree to terms");
    alert("Please agree to the general terms and conditions.");
    console.groupEnd();
    return;
  }

  // Validate payment option
  if (selectedPaymentOption === -1) {
    console.warn("⚠️ Validation Failed: No payment option selected");
    alert("Please select a payment option");
    console.groupEnd();
    return;
  }

  // Validate subscription details
  if (!subscriptionDetails || !subscriptionDetails[selectedSubscriptionIndex]) {
    console.error("❌ Critical Error: Invalid subscription details");
    alert("Error: Subscription details not available");
    console.groupEnd();
    return;
  }

  const selectedPackage = subscriptionDetails[selectedSubscriptionIndex];
  console.log("📦 Selected Package Details:", selectedPackage);

 // Handle Add to Bill
if (selectedPaymentOption === 0) {
  console.group("💳 Add to Bill Flow");
  try {
    console.log("📡 Calling activateDetailedReport API...");
    console.log("🔹 Parameters:", {
      subscriberID: userName,
      packageNumber: selectedPackage.packageid.toString()
    });

    const activationResponse = await activateDetailedReport(
      userName,
      selectedPackage.packageid.toString() // Ensure string type
    );

    if (activationResponse) {
      console.log("✅ API Response:", activationResponse);
      console.log("🎉 Activation successful!");
      alert("Detailed report activated successfully!");
    } else {
      console.warn("⚠️ Empty response received from activation API");
      alert("Activation completed but no confirmation received. Please verify your subscription.");
    }
  } catch (error: unknown) {
    console.error("❌ Activation failed:", error);
    
    // Type-safe error handling
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;
      
      console.error("🔹 API Error Details:", {
        status,
        data: errorData
      });
      
      if (status === 401) {
        alert("Session expired. Please login again.");
      } else if (status === 400) {
        const message = typeof errorData === 'object' && errorData !== null && 'message' in errorData
          ? String((errorData as { message: unknown }).message)
          : "Invalid request. Please check your details and try again.";
        alert(message);
      } else if (status && status >= 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("Failed to activate detailed report. Please try again.");
      }
    } else if (error instanceof Error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("An unexpected error occurred. Please contact support.");
    }
  }
  console.groupEnd();
}
  // Handle Pay Now
  else if (selectedPaymentOption === 1) {
    console.group("💵 Pay Now Flow");
    const paymentData = {
      CustEmail: storedEmail,
      ContactNumber: selectedTelephone,
      subscriberID: userName,
      prepaidID: "PAR",
      reciever: userName,
      packageId: selectedPackage.packageid,
      channel: "SLTPRE",
      commitUser: "OmniAPP",
      reporterPackage: selectedPackage.packageid,
      activatedBy: userName,
      callbackURLSLT: "", 
    };

    console.log("📤 [Form Data to be Sent]:", paymentData);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://billpay.slt.lk/bbtopup/summaryallAPImyslt.php";
    form.target = "_self";

    Object.entries(paymentData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value?.toString() ?? "";
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    console.groupEnd();
    return;
  }

  console.log("🏁 handleSubmit execution completed");
  console.groupEnd();
};
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
        backgroundColor: "white",
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "85%",
          height: "85%",
          border: "2px solid #0056A2",
          borderRadius: 3,
          padding: 3,
        }}
      >
        {pageLoading ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Title */}
            <Typography
              variant="body2"
              sx={{
                fontSize: "22px",
                color: "#0056A2",
                fontWeight: "bold",
                marginBottom: 3,
                textAlign: "center",
              }}
            >
              Subscribe for detailed report
            </Typography>

            {/* Subscription Options */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 3,
              }}
            >
              {subscriptionDetails?.map((option, index) => (
                <Box
                  onClick={() => {
                    console.log("Selected subscription index:", index);
                    setSelectedSubscriptionIndex(index);
                  }}
                  key={index}
                  sx={{
                    width: "48%",
                    height: "125px",
                    border:
                      selectedSubscriptionIndex === index
                        ? "2px solid #0056A2"
                        : "1px solid #0056A2",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0056A2",
                    fontWeight: "bold",
                    fontSize: "18px",
                    backgroundColor: "white",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {index === 0 ? (
                    <AccessTimeIcon sx={{ fontSize: 32, color: "#0056A2" }} />
                  ) : (
                    <EventIcon sx={{ fontSize: 32, color: "#0056A2" }} />
                  )}
                  <Typography variant="body2">{option.packagename}</Typography>
                </Box>
              ))}
            </Box>

            {/* Details Section */}
            <Box
              sx={{
                border: "1px solid #F5F9FF",
                borderRadius: "8px",
                padding: 2,
                marginBottom: 3,
                background: "#057DE81A",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  color: "#0056A2",
                }}
              >
                {subscriptionDetails &&
                  `Enabling the detailed report will charge Rs.${
                    subscriptionDetails[selectedSubscriptionIndex].postprice
                  } (+Tax) Per ${
                    subscriptionDetails[selectedSubscriptionIndex].packageid == "1"
                      ? "Month"
                      : "Year"
                  }.`}
              </Typography>

              {/* Payment Options */}
              <Box sx={{ display: "flex", gap: 2, zIndex: 2 }}>
                {/* Add to Bill Image */}
                <img
                  src={AddToBillImage}
                  alt="Add to Bill"
                  style={{
                    border: selectedPaymentOption === 0 ? "2px solid #0056A2" : "",
                    borderRadius: "12px",
                    width: "100px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Add to Bill option selected");
                    setSelectedPaymentOption(0);
                  }}
                />
                {/* Pay Now Image */}
                <img
                  src={PayNowImage}
                  alt="Pay Now"
                  style={{
                    border: selectedPaymentOption === 1 ? "2px solid #0056A2" : "",
                    borderRadius: "12px",
                    width: "100px",
                    height: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    console.log("Pay Now option selected");
                    setSelectedPaymentOption(1);
                  }}
                />
              </Box>
            </Box>

            {/* Terms and Conditions */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    required
                    checked={isCheckboxChecked}
                    onChange={(e) => {
                      console.log("Checkbox changed:", e.target.checked);
                      setIsCheckboxChecked(e.target.checked);
                    }}
                    sx={{
                      color: "#0056A2",
                      "&.Mui-checked": {
                        color: "#0056A2",
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      color: "#0056A2",
                    }}
                  >
                    I agree to the{" "}
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      general terms and conditions
                    </span>
                  </Typography>
                </Box>
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    zIndex: 2,
                    backgroundColor: "white",
                    border: "2px solid #0056A2",
                    color: "#0056A2",
                    textTransform: "none",
                    fontSize: "16px",
                    padding: "6px 30px",
                    borderRadius: "18px",
                    "&:hover": {
                      backgroundColor: "#0056A2",
                      color: "white",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 16,
                    }}
                  >
                    Submit
                  </Typography>
                </Button>
              </Box>
            </form>

            {/* Watermark Logo */}
            <Box
              sx={{
                position: "absolute",
                zIndex: 1,
                right: "2%",
                bottom: "2%",
              }}
            >
              <img src={WatermarkLogo} alt="Watermark Logo" />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SubscriptionPage;