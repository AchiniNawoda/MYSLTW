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
  CircularProgress,
  useMediaQuery,
  useTheme,
  Divider
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import useStore from "../../services/useAppStore";

// White theme color scheme
const colorScheme = {
  primary: '#FFFFFF',             // White background
  primaryLight: '#F8F9FA',        // Very light gray
  accent: '#1976D2',              // Blue accent
  secondaryAccent: '#757575',     // Gray accent
  highlight: 'rgba(25, 118, 210, 0.1)',
  textPrimary: '#212121',         // Dark text
  textSecondary: '#424242',       // Slightly lighter text
  divider: '#E0E0E0',             // Light divider
  cardBg: '#FFFFFF',              // White card background
  buttonGradient: 'linear-gradient(135deg, #1976D2 0%, #2196F3 100%)',
  navbarBg: '#FFFFFF',            // White navbar
  white: '#FFFFFF',
  dark: '#F5F5F5',               // Very light gray
  errorRed: '#D32F2F',
  successGreen: '#388E3C'
};

interface DataPlan {
  range: string;
  pricePerGB: number;
}

interface PackageDetail {
  volume: number;
  postPrice: string;
  packageId: string;
}

const dataPlans: DataPlan[] = [
  { range: "1GB to 3GB", pricePerGB: 100 },
  { range: "5GB to 19GB", pricePerGB: 85 },
  { range: "20GB to 49GB", pricePerGB: 75 },
  { range: "Above 50GB", pricePerGB: 60 },
];

interface DataPlanProps {
  packageName: string | null;
  onBack: () => void;
}

const GetExtraGbPage: React.FC<DataPlanProps> = ({ packageName, onBack }) => {
  const { serviceDetails, selectedTelephone } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const storedEmail = localStorage.getItem("username");
  
  const [selectedGB, setSelectedGB] = useState<number | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"addToBill" | "payNow" | null>(null);
  const [packageDetails, setPackageDetails] = useState<PackageDetail[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const mockPackageDetails: PackageDetail[] = [
          { volume: 1, postPrice: "100.00", packageId: "EXTRA1GB" },
          { volume: 2, postPrice: "200.00", packageId: "EXTRA2GB" },
          { volume: 3, postPrice: "300.00", packageId: "EXTRA3GB" },
          { volume: 5, postPrice: "425.00", packageId: "EXTRA5GB" },
          { volume: 10, postPrice: "850.00", packageId: "EXTRA10GB" },
          { volume: 15, postPrice: "1275.00", packageId: "EXTRA15GB" },
          { volume: 20, postPrice: "1500.00", packageId: "EXTRA20GB" },
          { volume: 25, postPrice: "1875.00", packageId: "EXTRA25GB" },
        ];
        setPackageDetails(mockPackageDetails);
      } catch (error) {
        setErrorMessage("Failed to load package options");
        setOpenDialog(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (serviceID && packageName) {
      fetchData();
    }
  }, [serviceID, packageName]);

  const handleSelect = (gb: number) => {
    const selectedPlan = packageDetails.find(plan => plan.volume === gb);
    if (selectedPlan) {
      setSelectedGB(gb);
      setSelectedPrice(parseFloat(selectedPlan.postPrice));
    }
  };

  const handleSubmit = async () => {
    if (!isCheckboxChecked || !selectedGB || !paymentMethod || !serviceID) {
      setErrorMessage("Please select all required options");
      setOpenDialog(true);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const selectedPlan = packageDetails.find(plan => plan.volume === selectedGB);
      if (!selectedPlan) throw new Error("Selected plan not found");

      if (paymentMethod === "addToBill") {
        const mockResponse = {
          isSuccess: true,
          message: "Package added to your bill successfully"
        };
        
        if (!mockResponse.isSuccess) {
          throw new Error("Failed to add to bill");
        }

        setSuccessMessage(mockResponse.message);
      } else {
        const paymentData = {
          CustEmail: storedEmail,
          ContactNumber: selectedTelephone,
          subscriberID: serviceID,
          prepaidID: serviceID,
          reciever: serviceID,
          packageId: selectedPlan.packageId,
          channel: "SLTPRE",
          commitUser: "OmniAPP",
          reporterPackage: selectedPlan.packageId,
          activatedBy: serviceID,
          callbackURLSLT: "", 
        };

        console.log("Payment data:", paymentData);
        setSuccessMessage("Redirecting to payment gateway...");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred");
    } finally {
      setOpenDialog(true);
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        color: colorScheme.textPrimary,
        padding: 2,
        borderRadius: "10px",
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
        minHeight: "500px",
        position: "relative",
        border: "1px solid #E0E0E0"
      }}
    >
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, position: 'relative' }}>
          <Button
            onClick={onBack}
            sx={{
              minWidth: 'auto',
              p: 0.5,
              mr: 2,
              color: colorScheme.accent,
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none'
              }
            }}
          >
            <ArrowBack fontSize="medium" />
          </Button>

          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                color: colorScheme.accent
              }}
            >
              Get Extra GB
            </Typography>
          </Box>

  {/* Right-side placeholder for symmetry */}
  <Box sx={{ width: '40px' }} />
</Box>


      {/* Main Content */}
      <Box
        sx={{
          width: '100%',
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          padding: 1,
        }}
      >
        {/* Left Section - Price Plan */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            background: '#FFFFFF',
            borderRadius: '8px',
            border: `1px solid ${colorScheme.divider}`,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography variant="body2" sx={{ 
            fontWeight: 600, 
            fontSize: '20px',
            mb: 2,
            color: colorScheme.textPrimary,
            borderBottom: `1px solid ${colorScheme.divider}`,
            pb: 1,
          }}>
            Price Plans
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
                backgroundColor: colorScheme.primaryLight,
                borderRadius: "6px",
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)',
              }}
            >
              <Typography sx={{ 
                color: colorScheme.textPrimary, 
                fontSize: "14px", 
                fontWeight: 500 
              }}>
                {plan.range}
              </Typography>
              <Typography sx={{ 
                color: colorScheme.textPrimary, 
                fontSize: "14px", 
                fontWeight: 600 
              }}>
                {plan.pricePerGB} LKR/GB
              </Typography>
            </Box>
          ))}

          {/* Data Buttons */}
          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: 1, 
            marginTop: 2,
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
                    minWidth: "60px",
                    height: "40px",
                    fontWeight: "bold",
                    fontSize: '12px',
                    border: `1px solid ${colorScheme.accent}`,
                    borderRadius: "4px",
                    "&.MuiButton-contained": {
                      background: colorScheme.accent,
                      color: colorScheme.white,
                    },
                    "&.MuiButton-outlined": {
                      color: colorScheme.accent,
                      "&:hover": {
                        border: `1px solid ${colorScheme.accent}`,
                        color: colorScheme.accent,
                        backgroundColor: colorScheme.highlight
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
            width: isMobile ? '100%' : '35%',
            p: 2,
            background: '#FFFFFF',
            borderRadius: '8px',
            border: `1px solid ${colorScheme.divider}`,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Package Summary */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1.5,
              borderRadius: "6px",
              marginBottom: 2,
              background: colorScheme.primaryLight,
              border: `1px solid ${colorScheme.divider}`,
            }}
          >
            <Typography variant="body2" sx={{ 
              color: colorScheme.textPrimary,
              fontWeight: "bold",
              fontSize: "20px"
            }}>
              {selectedGB || "0"} GB
            </Typography>
            <Typography variant="body2" sx={{ 
              color: colorScheme.textPrimary,
              fontWeight: "bold",
              fontSize: "16px"
            }}>
              Rs. {selectedPrice ? Math.floor(selectedPrice) : "0"} + Tax
            </Typography>
          </Box>

          {/* Payment Options */}
          <Typography variant="body2" sx={{ 
            color: colorScheme.textPrimary,
            mb: 1,
            fontWeight: 500,
            fontSize: '14px'
          }}>
            Select Payment Method
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 1, 
            marginTop: 1,
            marginBottom: 2,
          }}>
            <Button
              variant={paymentMethod === "payNow" ? "contained" : "outlined"}
              onClick={() => !isLoading && setPaymentMethod("payNow")}
              sx={{
                py: 1,
                borderRadius: '4px',
                fontWeight: 600,
                textTransform: 'capitalize',
                fontSize: '14px',
                ...(paymentMethod === "payNow" ? {
                  background: colorScheme.accent,
                  color: colorScheme.white,
                } : {
                  color: colorScheme.accent,
                  border: `1px solid ${colorScheme.accent}`,
                  background: 'transparent',
                })
              }}
            >
              <Typography variant="body2" sx={{fontWeight: 700, fontSize: '18px'}}>Pay Now</Typography>
            </Button>
          </Box>

          <Divider sx={{ 
            my: 1, 
            borderColor: colorScheme.divider
          }} />

          {/* Terms and Conditions */}
          <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Checkbox
                checked={isCheckboxChecked}
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                disabled={isLoading}
                sx={{
                  color: colorScheme.accent,
                  "&.Mui-checked": { 
                    color: colorScheme.accent,
                  },
                  padding: '4px',
                  '& .MuiSvgIcon-root': {
                    fontSize: '20px'
                  }
                }}
              />
              <Typography variant="body2" sx={{ 
                color: colorScheme.textPrimary, 
                fontSize: '12px' 
              }}>
                I agree to the{" "}
                <span style={{ 
                  color: colorScheme.accent,
                  fontWeight: "bold", 
                  textDecoration: "underline", 
                  cursor: "pointer" 
                }}>
                  terms and conditions
                </span>
              </Typography>
            </Box>

            <Button
              fullWidth
              variant="contained"
              disabled={!isCheckboxChecked || !paymentMethod || !selectedGB || isLoading}
              sx={{
                background: colorScheme.accent,
                color: colorScheme.white,
                py: 1.5,
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: '14px',
                "&:hover": {
                  opacity: 0.9,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                },
                "&:disabled": { 
                  background: colorScheme.divider,
                  color: colorScheme.textSecondary
                },
              }}
              onClick={handleSubmit}
            >
              <Typography variant="body2" sx={{fontWeight: 700, fontSize: '20px', textTransform:'capitalize'}}>
              {isLoading ? <CircularProgress size={20} color="inherit" /> : "Submit"}
              </Typography>

            </Button>
          </Box>
        </Box>
      </Box>
        
      {/* Result Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose}
        PaperProps={{
          sx: {
            background: '#FFFFFF',
            color: colorScheme.textPrimary,
            borderRadius: '12px',
            border: `1px solid ${colorScheme.divider}`,
            minWidth: isMobile ? '90vw' : '400px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            overflow: "hidden",
          }
        }}
      >
        <DialogTitle sx={{ 
          background: errorMessage ? 'rgba(211, 47, 47, 0.1)' : 'rgba(56, 142, 60, 0.1)',
          borderBottom: `1px solid ${colorScheme.divider}`,
          fontWeight: 700,
          letterSpacing: "0.5px",
          color: errorMessage ? colorScheme.errorRed : colorScheme.successGreen,
          fontSize: '18px',
          py: 2
        }}>
           <Typography variant="body2" sx={{fontWeight: 700, fontSize: '20px', textTransform:'capitalize'}}>
             {errorMessage ? "Error" : "Success"}
           </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ py: 3, px: 3 }}>
          <Typography variant="body2" sx={{ 
            color: colorScheme.textPrimary, 
            fontSize: '15px',
            lineHeight: 1.6,
            mb: 2
          }}>
            {errorMessage || successMessage}
          </Typography>
        </DialogContent>
        
        <DialogActions
          sx={{
            p: 2,
            background: "#FAFAFA",
            borderTop: `1px solid ${colorScheme.divider}`
          }}
        >
          <Button 
            onClick={handleDialogClose} 
            sx={{ 
              color: colorScheme.textPrimary,
              borderRadius: "6px",
              px: 3,
              border: `1px solid ${colorScheme.divider}`,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '14px',
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              }
            }}
          >
            <Typography variant="body2" sx={{fontWeight: 700, fontSize: '16px', textTransform:'capitalize'}}>
             Close
           </Typography>
          </Button>
          
          {!errorMessage && (
            <Button 
              onClick={handleDialogClose} 
              sx={{ 
                background: colorScheme.accent,
                color: colorScheme.white,
                borderRadius: "6px",
                px: 3,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '14px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                '&:hover': { 
                  opacity: 0.9,
                }
              }}
            >
              <Typography variant="body2" sx={{fontWeight: 700, fontSize: '16px', textTransform:'capitalize'}}>
                 Continue
              </Typography>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetExtraGbPage;