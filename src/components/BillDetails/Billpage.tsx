import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import fetchBillStatus from "../../services/billMethod/fetchBillStatus";
import fetchBillingDetails from "../../services/postpaid/fetchBillingDetails";
import fetchBillingHistory from "../../services/postpaid/fetchBillingHistory";
// Import the store
import useStore from "../../services/useAppStore";
import Navbar from "./BillDetailNavbar";
import BillDetails from "./BillDetails";
import OutstandingBills from "./BillHistory";
import BillMethod from "./BillMethod";

interface BillPageProps {
  telephoneNo: string;
  accountNo: string;
}

const BillPage: React.FC<BillPageProps> = ({ telephoneNo, accountNo }) => {
  const [selectedTab, setSelectedTab] = useState("Total Payable");
  const [setBillingDetails] = useState<any>(null);
  const [billingHistory, setBillingHistory] = useState<any>(null);
  const setBillMethodDataBundle = useStore((state) => state.setBillMethodDataBundle); // Use the setBillMethodDataBundle method from store

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchBillingDetails(telephoneNo, accountNo);
      setBillingDetails(details);
    };
    fetchDetails();
  }, [telephoneNo, accountNo]);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await fetchBillingHistory(telephoneNo, accountNo);
      setBillingHistory(history);
    };
    fetchHistory();
  }, [telephoneNo, accountNo]);

  useEffect(() => {
    const fetchBillStatusDetails = async () => {
      const response = await fetchBillStatus(accountNo, telephoneNo);
      if (response && response.dataBundle) {
        console.log("Data Bundle:", response.dataBundle); // Log the extracted dataBundle
        setBillMethodDataBundle(response.dataBundle); // Store dataBundle in the store
      }
    };
    fetchBillStatusDetails();
  }, [accountNo, telephoneNo, setBillMethodDataBundle]); // Trigger when accountNo or telephoneNo changes

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          color: "#FFFFFF1A",
          padding: 1.2,
          borderRadius: "10px",
          height: "465px",
          boxShadow: "0px 3px 3px #0000004A",
          overflow: "hidden",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Navbar onTabChange={handleTabChange} />
        </Box>
        <Box sx={{ width: "99%", alignItems: "center", justifyContent: "center" }}>
          {selectedTab === "Total Payable" && <BillDetails
                selectedTab={selectedTab}
                telephoneNo={telephoneNo}
                accountNo={accountNo}
               
              />}
          {selectedTab === "Bill History" && <OutstandingBills
                selectedTab={selectedTab}
                billingHistory={billingHistory}
                telephoneNo={telephoneNo}
                accountNo={accountNo}
              />}
          {selectedTab === "Bill Methods" && <BillMethod selectedTab={selectedTab} />}
        </Box>
      </Box>
    </Box>
  );
};

export default BillPage;