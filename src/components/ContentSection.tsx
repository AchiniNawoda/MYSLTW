// src/components/BroadbandSection.js

import { useEffect, useState } from "react";
import fetchDataBalance from "../services/prepaid/fetchDataBalance";
import useStore from "../services/useAppStore";
import { DataBalance } from "../types/types";
import BillPage from "./BillDetails/Billpage";
import BroadbandPrepaidAddOnPackages from "./BroadBandPrepaidPackageDetails/BroadbandPrepaidAddOnPackages";
import BroadbandPrepaidMainPackages from "./BroadBandPrepaidPackageDetails/BroadbandPrepaidMainPackages";
import BroadbandDetailsPostPaid from "./BroadbandDetails/BroadbandDetailsPostPaid";
import BroadbandDetailsPrePaid from "./BroadbandDetails/BroadbandDetailsPrePaid";
import BroadbandDetailsPrepaidAddons from "./BroadbandDetails/BroadbandDetailsPrepaidAddons";

import AddComplaints from "./AddComplaints";
import ChangeContactForm from "./BroadbandAdditionalUIs/ChangeContactInfo";
import SubscriptionPage from "./BroadbandAdditionalUIs/Subscription";
import BroadbandPostPaidGetAddOns from "./BroadbandDetails/BroadbandPostPaidGetAddOns";
import BroadbandPostPaidPackageUpgrader from "./BroadbandDetails/BroadbandPostPaidPackageUpgrader";
import DailyUsage from "./BroadbandDetails/DailyUsage";
import Complaints from "./Complaints";
import DigitalLife from "./DigitalLife";
import GiftData from "./GiftData";
import HappyDay from "./HappyDay";
import MenuLeft from "./MenuLeft";
import NewServicesPage from "./NewServices/NewServicesPage";
import MyPackagePeotv from "./PeoTV/MyPackagePeotv";
import PeoTvGo from "./PeoTV/PeoTvGo";
import PhoneNumberList from "./ProfileMenuUIs/PhoneNumberList";
import UserProfile from "./ProfileMenuUIs/UserProfile";
import Promotion from "./Promotion";
import Redeem from "./Redeem";
import TransactionsHistory from "./TransactionsHistory";
import CallForwarding from "./Voice/CallForwarding";
import MyPackageVoice from "./Voice/MyPackageVoice";
import GetExtraGB from "./BroadbandDetails/GetExtraGB";
import DetailedUsage from "./BroadbandDetails/DetailedUsage";
import ProtocolReport from "./BroadbandDetails/ProtocolReport";
import fetchDetaliedReportAvailability from "../services/postpaid/enableDetailedReport/fetchDetaliedReportAvailability";
import DisableDetailedReport from "./BroadbandDetails/DisableDetailedReport";
import Box from "@mui/material/Box";
import VideoOnDemand from "./PeoTV/VideoOnDemand";
import NotificationsComponent from "./ProfileMenuUIs/NotificationsComponent";

import History from "./DataAddonHistory";

import { Typography } from "@mui/material";

import PeoTvPackages from "./PeoTV/PeoTvPackages";

const UnderConstruction = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "450px",
        backgroundColor: "white",
        borderRadius: 3,
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <Typography variant="body2" sx={{ color: "#0056A2", fontSize: 24 }}>
        Under Construction
      </Typography>
    </Box>
  );
};

const ContentSection = () => {
  const [addOnData, setAddOnData] = useState<DataBalance[]>([]);
  const [mainData, setMainData] = useState<DataBalance[]>([]);
  const {
    selectedLeftMenuItem,
    selectedTelephone,
    selectedAccountNo,
    packageListUpdate,
    selectedNavbarItem,
    packageName,
    serviceDetails,
    setEmail,
    setDetailReportAvailability
  } = useStore();

  const disabledItems = [
    "New Services",
    "Promotion",
    "Digital Life",
    "Bill",
    "Hot Devices",
    "Complaints",
    "SUBMIT YOUR COMPLAINT",
    "My Profile",
    "Manage Connections",
    "Subscription",
    "ContactInformationChange",
    "GetExtraGB",
    "Notifications",
  ];

  useEffect(() => {
    const getDetailedReportAvailability = async () => {
      const subscriberID = serviceDetails?.listofBBService[0]?.serviceID;
      if (subscriberID) {
        try {
          const response = await fetchDetaliedReportAvailability(subscriberID);
          if (response) {
            setDetailReportAvailability(response.availability);
            if (response.email) {
              
            }
          }
        } catch (error) {
          console.error("Error fetching detailed report availability:", error);
        }
      }
    };
    getDetailedReportAvailability();
  }, [serviceDetails, setEmail, setDetailReportAvailability]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const data = await fetchDataBalance(selectedTelephone);
        
        if (data) {
          const { addOnData, mainData } = data.reduce(
            (acc, item) => {
              if (item.packageCategory === "Add-ons") {
                acc.addOnData.push(item);
              } else {
                acc.mainData.push(item);
              }
              return acc;
            },
            { addOnData: [], mainData: [] } as {
              addOnData: DataBalance[];
              mainData: DataBalance[];
            }
          );
          setAddOnData(addOnData);
          setMainData(mainData);
        }
      } catch (error) {
        console.error("Error fetching data balance:", error);
      }
    };

    fetchData();
  }, [selectedTelephone, packageListUpdate]);

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: { xs: "column", sm: "row" }, 
      gap: 1, 
      width: "100%", 
      flexGrow: 1, 
      boxSizing: 'border-box', 
      overflow: 'hidden',
      }}>

      <Box
        sx={{
          width: { xs: "100%", sm: "250px" },
          minWidth: { sm: "250px" },
          display: disabledItems.includes(selectedLeftMenuItem)
            ? "none"
            : "block",
          flexShrink: 0
        }}
      >
        <MenuLeft />
      </Box>
      <Box
        sx={{
          width: { xs: "100%", sm: disabledItems.includes(selectedLeftMenuItem) ? "100%" : "calc(100% - 266px)"},
          height: "100%",
          flexGrow: 1,
          boxSizing: 'border-box',
        }}
      >
        {/* Postpaid */}
        {selectedLeftMenuItem === "Summary" && <BroadbandDetailsPostPaid />}
        {selectedLeftMenuItem === "Daily Usage" && <DailyUsage />}
        {selectedLeftMenuItem === "Gift Data" && <GiftData />}
        {selectedLeftMenuItem === "History" && <History />}
        {selectedLeftMenuItem === "Redeem Data" && <Redeem />}
        {selectedLeftMenuItem === "Happy Day" && <HappyDay />}
        {selectedLeftMenuItem === "Subscription" && <SubscriptionPage />}
        {selectedLeftMenuItem === "ContactInformationChange" && (
          <ChangeContactForm />
        )}
        {selectedLeftMenuItem === "DetailedUsageDetails" && <DetailedUsage />}
        {selectedLeftMenuItem === "ProtocolReport" && <ProtocolReport />}
        {selectedLeftMenuItem === "PostPaidPackageUpgrade" && (
          <BroadbandPostPaidPackageUpgrader />
        )}
        {selectedLeftMenuItem === "GetExtraGB" && (
          <GetExtraGB packageName={packageName} />
        )}
        {selectedLeftMenuItem === "GetPostpaidAddOnPackages" && (
          <BroadbandPostPaidGetAddOns />
        )}
        {selectedLeftMenuItem === "DisableDetailReport" && (
          <DisableDetailedReport />
        )}

        {/* Prepaid */}
        {selectedLeftMenuItem === "Main Packages" && (
          <BroadbandDetailsPrePaid dataBalance={mainData} />
        )}
        {selectedLeftMenuItem === "Data Add-Ons" && (
          <BroadbandDetailsPrepaidAddons dataBalance={addOnData} />
        )}
        {selectedLeftMenuItem === "GetBroadbandMainPackage" && (
          <BroadbandPrepaidMainPackages />
        )}
        {selectedLeftMenuItem === "GetBroadbandAddOnPackage" && (
          <BroadbandPrepaidAddOnPackages />
        )}
        {selectedLeftMenuItem === "Transaction" && (
          <TransactionsHistory serviceId={selectedTelephone} />
        )}

        {/* PeoTV */}
        {selectedLeftMenuItem === "My Package" &&
          selectedNavbarItem === "PeoTV" && <MyPackagePeotv />}
        {selectedLeftMenuItem === "VOD" && <VideoOnDemand />}
        {selectedLeftMenuItem === "PEOTVGO" && <PeoTvGo />}
        {selectedLeftMenuItem === "Packages" && <PeoTvPackages />}

        {/* Voice */}
        {selectedLeftMenuItem === "My Package" &&
          selectedNavbarItem === "Voice" && <MyPackageVoice />}
        {selectedLeftMenuItem === "Call Forwarding" && (
          <CallForwarding telephoneNo={selectedTelephone} />
        )}

        {/* QuickAccess */}
        {selectedLeftMenuItem === "New Services" && (
          <NewServicesPage telephoneNo={selectedTelephone} />
        )}
        {selectedLeftMenuItem === "Promotion" && (
          <Promotion telephoneNo={selectedTelephone} />
        )}
        {selectedLeftMenuItem === "Digital Life" && <DigitalLife />}
        {selectedLeftMenuItem === "Bill" && (
          <BillPage
            telephoneNo={selectedTelephone}
            accountNo={selectedAccountNo}
          />
        )}
        {selectedLeftMenuItem === "Hot Devices" && <UnderConstruction />}
        {selectedLeftMenuItem === "Complaints" && <Complaints />}
        {selectedLeftMenuItem === "SUBMIT YOUR COMPLAINT" && (
          <AddComplaints telephoneNo={selectedTelephone} />
        )}
        {selectedLeftMenuItem === "My Profile" && <UserProfile />}
        {selectedLeftMenuItem === "Manage Connections" && <PhoneNumberList />}
        {selectedLeftMenuItem === "Notifications" && <NotificationsComponent />}
        
      </Box>
    </Box>
  );
};

export default ContentSection;