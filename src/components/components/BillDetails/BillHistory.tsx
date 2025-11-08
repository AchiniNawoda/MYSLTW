import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import downloadBill from "../../services/billMethod/downloadBill";
import resendBill from "../../services/billMethod/resendEBill";
import useStore from "../../services/useAppStore";
import { BillHistoryProps } from "../../types/types";
import { useTranslation } from "react-i18next";

interface DownloadResponse {
  success?: boolean;
  errorShow?: string;
}

const OutstandingBills: React.FC<BillHistoryProps> = ({
  selectedTab,
  billingHistory,
  telephoneNo,
  accountNo,
}) => {
  const { t } = useTranslation();

  const formatCurrency = (value: number | string) =>
  Number(value).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const billHistoryList = billingHistory?.listofBillHistoryDetail || [];
  const billMethodDataBundle = useStore((state) => state.billMethodDataBundle);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleDownloadBill = async (
    eBillEmail: string,
    accountNo: string,
    tpNo: string,
    ebillMonth: string
  ) => {
    try {
      const response: DownloadResponse = await downloadBill(
        eBillEmail,
        accountNo,
        tpNo,
        ebillMonth
      );
      if (response.success) {
        setDialogMessage(t("outstandingBills.downloadSuccess"));
      } else {
        setDialogMessage(t("outstandingBills.noBillFound"));
      }
    } catch {
      setDialogMessage(t("outstandingBills.downloadError"));
    }
    setOpenDialog(true);
  };

  const handleEmailNow = async (
    eBillEmail: string,
    accountNo: string,
    tpNo: string,
    ebillMonth: string
  ) => {
    if (!eBillEmail || eBillEmail.trim() === "") {
      setDialogMessage(t("outstandingBills.noEmail"));
      setOpenDialog(true);
      return;
    }
    try {
      const response = await resendBill(
        eBillEmail,
        accountNo,
        ebillMonth,
        tpNo
      );
      if (response?.success) {
        setDialogMessage(t("outstandingBills.emailSent"));
      } else {
        setDialogMessage(t("outstandingBills.emailProcessing"));
      }
    } catch {
      setDialogMessage(t("outstandingBills.emailError"));
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const eBillEmail = billMethodDataBundle?.email;

  return (
    <Box textAlign="center">
      {selectedTab === "Bill History" && billHistoryList.length > 0 ? (
        <Box
          color="#FFFFFF"
          p={1}
          borderRadius="8px"
          textAlign="left"
          width="96%"
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 2,
              overflow: "auto",
              maxHeight: 335,
              paddingRight: 0.5,
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f1f1f1",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#0D67A6",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#0056A2",
              },
            }}
          >
            {billHistoryList.map((bill, index) => (
              <Box
                key={index}
                bgcolor="#E0F7FA"
                p={2}
                mb={2}
                borderRadius="8px"
                display="flex"
                justifyContent="space-between"
                width="98%"
                alignItems="center"
                sx={{ marginTop: index === 3 ? 2 : 1 }}
              >
                <Box>
                  <Typography variant="body1" color="#0056A2" fontWeight="bold">
                    {t("outstandingBills.outstanding")}: Rs. {formatCurrency(bill.outstanding)}
                  </Typography>
                  <Typography variant="body1" color="#0056A2">
                    {t("outstandingBills.billValue")}: Rs. {formatCurrency(bill.billValue)}{" "}
                    {t("outstandingBills.for")} {bill.billMonth}
                  </Typography>
                  <Typography variant="body1" color="#0056A2">
                    {t("outstandingBills.payments")}: Rs. {formatCurrency(bill.payments)}
                  </Typography>
                </Box>

                {billMethodDataBundle?.bill_code === "02" && (
                  <Button
                    variant="contained"
                    color="info"
                    sx={{
                      backgroundColor: "#E0F7FA",
                      color: "#0056A2",
                      fontWeight: "bold",
                      border: "2px solid #0056A2",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                    onClick={() =>
                      handleEmailNow(
                        eBillEmail,
                        accountNo,
                        telephoneNo,
                        String(bill.billMonth)
                      )
                    }
                  >
                    <Typography variant="body2">
                      {t("outstandingBills.emailNow")}
                    </Typography>
                  </Button>
                )}
                {billMethodDataBundle?.bill_code === "23" && (
                  <Button
                    variant="contained"
                    color="info"
                    sx={{
                      backgroundColor: "#E0F7FA",
                      color: "#0056A2",
                      fontWeight: "bold",
                      border: "2px solid #0056A2",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      "&:hover": { backgroundColor: "#f0f0f0" },
                    }}
                    onClick={() =>
                      handleDownloadBill(
                        eBillEmail,
                        accountNo,
                        telephoneNo,
                        String(bill.billMonth)
                      )
                    }
                  >
                    <Typography variant="body2">
                      {t("outstandingBills.downloadEBill")}
                    </Typography>
                  </Button>
                )}
              </Box>
            ))}
          </TableContainer>
        </Box>
      ) : (
        <Typography variant="body1" color="red">
          {t("outstandingBills.noBillingHistory")}
        </Typography>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("outstandingBills.dialogTitle")}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary">
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t("outstandingBills.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OutstandingBills;
