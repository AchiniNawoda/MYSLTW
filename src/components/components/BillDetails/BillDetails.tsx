import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import fetchBillingDetails from "../../services/postpaid/fetchBillingDetails";
import { BillingInquiry } from "../../types/types"; // Import the correct type

interface BillingDetail {
  outstandingBalance: number;
  lastBillDate: string;
  lastPaymentAmount: number;
  lastPaymentDate: string;
  billAmount: number;
}

interface BillDetailsProps {
  selectedTab: string;
  telephoneNo: string;
  accountNo: string;
}

const BillDetails: React.FC<BillDetailsProps> = ({
  selectedTab,
  telephoneNo,
  accountNo,
}) => {
  const { t } = useTranslation();

  const [billingDetails, setBillingDetails] = useState<BillingDetail[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const rawDetails = await fetchBillingDetails(telephoneNo, accountNo);

        if (!rawDetails) {
          setBillingDetails(null);
          return;
        }

        // Convert string fields to numbers for type-safe use
        const formattedDetails: BillingDetail[] = rawDetails.map((item: BillingInquiry) => ({
          outstandingBalance: parseFloat(item.outstandingBalance),
          lastBillDate: item.lastBillDate,
          lastPaymentAmount: parseFloat(item.lastPaymentAmount),
          lastPaymentDate: item.lastPaymentDate,
          billAmount: parseFloat(item.billAmount),
        }));

        setBillingDetails(formattedDetails);
      } catch (error) {
        console.error("Failed to fetch billing details:", error);
        setBillingDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [telephoneNo, accountNo]);

  if (loading) {
    return (
      <Box sx={{ p: 2, mt: 2, textAlign: "center", width: "95%" }}>
        <CircularProgress />
      </Box>
    );
  }

  const billingData = billingDetails?.[0];

  if (!billingData) {
    return (
      <Box sx={{ p: 2, mt: 2, textAlign: "center", width: "95%" }}>
        <Typography>{t("bill.noBillingDetails") || "No billing details found."}</Typography>
      </Box>
    );
  }

  const handlePayNow = () => {
    const formData = {
      EventSource: accountNo,
      vpc_Amount: billingData.billAmount.toString(),
      prepaidID: "",
      reciever: "",
      packageId: "",
      channel: "SLTPRE",
      commitUser: "Omni",
      reporterPackage: "",
      callbackURLSLT: "",
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://billpay.slt.lk/confirm.php";
    form.target = "_self";

    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Box sx={{ p: 0, width: "99%" }}>
      {selectedTab === "Total Payable" && (
        <>
          <Box
            sx={{
              bgcolor: "#0056A2",
              color: "#FFFFFF",
              borderRadius: "8px",
              textAlign: "left",
              padding: 2,
              width: "98%",
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">{t("bill.totalPayable")}:</Typography>
              <Typography variant="body1">
                {t("currency")} {formatCurrency(billingData.outstandingBalance)}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {t("bill.forMonthEnding")} {billingData.lastBillDate}
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "#E0F7FA",
              color: "#0056A2",
              mt: 4,
              borderRadius: "8px",
              textAlign: "left",
              padding: 2,
              width: "98%",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {t("bill.lastPayment")}: {t("currency")} {formatCurrency(billingData.lastPaymentAmount)}
            </Typography>
            <Typography variant="body1">
              {t("on")} {billingData.lastPaymentDate}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color="success"
              sx={{
                padding: "10px 20px",
                fontWeight: "bold",
                minHeight: "7vh",
                width: "15%",
                borderRadius: 2,
              }}
              onClick={handlePayNow}
            >
              <Typography variant="body2">{t("bill.payNow")}</Typography>
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default BillDetails;
