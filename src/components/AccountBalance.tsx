import { Button, Typography, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { parseTime } from "../services/helperFunctions";
import fetchBillingDetails from "../services/postpaid/fetchBillingDetails";
import fetchWalletDetail from "../services/prepaid/fetchWalletDetails";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

const AccountBalance: React.FC = () => {
  const { t } = useTranslation();
  const { serviceDetails, selectedTelephone, setLeftMenuItem } = useStore();
  const [amount, setAmount] = useState("");
  const [expireTime, setExpireTime] = useState("");
  const [billingAmount, setBillingAmount] = useState<string | null>(null);
  const isPrepaid = serviceDetails?.promotionType === "Prepaid";

  useEffect(() => {
    const fetchData = async () => {
      const walletDetails = await fetchWalletDetail(selectedTelephone);
      const amount = walletDetails?.amount ? walletDetails.amount / 100 : 0;
      const formattedAmount = amount.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setAmount(formattedAmount);

      const walletExpireTime = walletDetails?.expireTime;
      const formattedTime = walletExpireTime ? parseTime(walletExpireTime) : null;
      const formattedExpireDate = formattedTime
        ? formattedTime.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : t("N/A");

      setExpireTime(formattedExpireDate);

      if (selectedTelephone && serviceDetails?.accountNo) {
        const billingInquiry = await fetchBillingDetails(
          selectedTelephone,
          serviceDetails.accountNo
        );
        if (billingInquiry && billingInquiry.length > 0) {
          const billAmount = parseFloat(billingInquiry[0].billAmount || "0");
          const formattedBillAmount = billAmount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          setBillingAmount(formattedBillAmount);
        }
      }
    };

    fetchData();
  }, [selectedTelephone, serviceDetails, t]);

  const formatAmount = (value: string) => {
    if (!value) return "0.00";
    const num = parseFloat(value.replace(/,/g, ""));
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: { xs: 1, sm: 2 },
        paddingY: { xs: 1, sm: 1 },
        //width: { xs: "auto", lg: "100%" },
        width: { sm: "auto", lg: "50%" }, //Without Loyalty Points Section
        minHeight: "65px",
        border: "2px solid #FFFFFF",
        borderRadius: "16px",
        backgroundColor: "#FFFFFF80",
        flexWrap: "nowrap",
        gap: { xs: 1, sm: 0 },
      }}
    >
      <Grid container spacing={1} alignItems="center" wrap="wrap">
        {/* Text Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography
            variant="body2"
            sx={{ 
              color: "#0056A2", 
              //fontSize: { xs: 16, sm: 18 }, 
              fontSize: { xs: "1rem", sm: "1.125rem" }, 
              fontWeight: 700,
              lineHeight: 1.2
            }}
          >
            {isPrepaid ? t("Balance") : t("Total Payable")}
          </Typography>


            {/* Don't show expiry date on PostPaid */}
          {isPrepaid && (
            <Typography
              variant="body2"
              sx={{ 
                color: "#0056A2", 
                //fontSize: { xs: 12, sm: 14 }, 
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                mt: 0.5,
                wordBreak: "break-word" 
              }}
            >
              {isPrepaid ? t("Expires on ") : t("For month Ending at ")}
              <Typography component="span" sx={{ fontWeight: 700 }}>
                {expireTime}
              </Typography>
            </Typography>
          )}
          
        </Grid>

        {/* Amount Section */}
        <Grid item xs={12} sm={3} md={4}
          //Without Loyalty Points Section
          sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" } }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#0056A2",
              //fontSize: { xs: 22, sm: 25 },
              fontSize: { xs: "1rem", sm: "1.5rem" },
              fontWeight: 900,
              textAlign: { xs: "left", sm: "center" },
              //mt: { xs: 1, sm: 0 },
              lineHeight: 1.1
            }}
          >
            Rs. {isPrepaid ? amount : billingAmount ? formatAmount(billingAmount) : "0.00"}
          </Typography>
        </Grid>

        {/* Action Button */}
        <Grid item xs={12} sm={3} md={4}
          sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "flex-end" }}}
        >

          <Button
            fullWidth
            sx={{
              backgroundColor: "#4FD745",
              borderRadius: 2,
              //height: 45,
              height: { xs: 40, sm: 45 },
              maxWidth: { xs: "100%", sm: "120px" },
              //marginX: { xs: 0, sm: "auto" },
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#47d002ff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)"
              },
              transition: "all 0.2s ease",
              //wordBreak: "break-word"
            }}
            onClick={() => {
              setLeftMenuItem(isPrepaid ? "Transaction" : "Bill");
            }}
          >
            <Typography
              variant="body2"
              sx={{ 
                color: "#FFFFFF", 
                //fontSize: 14,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                //fontSize: "clamp(14px, 2vw, 18px)",
                fontWeight: 600,
                whiteSpace: "normal",
                textAlign: "center",
                wordBreak: "break-word"
              }}
            >
              {isPrepaid ? t("Transaction") : t("Pay Now")}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountBalance;
