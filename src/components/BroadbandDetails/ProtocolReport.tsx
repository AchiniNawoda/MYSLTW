import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useStore from "../../services/useAppStore";
import fetchProtocolReport from "../../services/postpaid/fetchProtocolReport";
import { Button, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import {
  MappedData,
  ProtocolData,
  ProtocolReportDetails,
} from "../../types/types";
import { useTranslation } from "react-i18next";

const ProtocolReport = () => {
  const { t } = useTranslation();
  const { usageDetails, serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Total");
  const [protocolReport, setProtocolReport] = useState<ProtocolReportDetails>();
  const tabs = ["Total", "Download", "Upload"];
  const colorArray = [
    "#3070F5", "#57BEB5", "#AE59DC", "#5B61D6", "#EA334B", "#F2A73B",
    "#F5C242", "#9F6EDD", "#F56991", "#67D968", "#B0B0B0",
  ];

  const isMdUp = useMediaQuery("(min-width:900px)");
  const innerRadius = isMdUp ? 100 : 60;
  const outerRadius = isMdUp ? 150 : 100;

  useEffect(() => {
    const getProtocolReport = async () => {
      setLoading(true);
      if (serviceID && usageDetails?.date) {
        const response = await fetchProtocolReport(serviceID, usageDetails?.date);
        if (response) setProtocolReport(response);
      }
      setLoading(false);
    };
    getProtocolReport();
  }, [serviceID, usageDetails]);

  const mapObjectToDataFormat = (
    data: ProtocolData[] | undefined,
    colorArray: string[]
  ): MappedData[] => {
    return (data || []).map((item, index) => ({
      id: index,
      value: item.presentage,
      label: item.protocol,
      color: colorArray[index % colorArray.length],
    }));
  };

  const totalMappedData = protocolReport ? mapObjectToDataFormat(protocolReport.total, colorArray) : [];
  const downloadMappedData = protocolReport ? mapObjectToDataFormat(protocolReport.download, colorArray) : [];
  const uploadMappedData = protocolReport ? mapObjectToDataFormat(protocolReport.upload, colorArray) : [];

  const currentMappedData =
    selectedTab === "Total"
      ? totalMappedData
      : selectedTab === "Download"
      ? downloadMappedData
      : uploadMappedData;

  return (
    <Box
      sx={{
        //position: "relative",
        display: "flex",
        flexDirection: {xs: "column", md: "row"},
        //gap: 1,
        gap: { xs: 2, md: 3 },
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        //padding: 2,
        padding: { xs: 1.5, md: 2 },
        borderRadius: "10px",
        height: "auto",
        minHeight: "450px",
        boxShadow: "0px 3px 3px #0000004A",
        //overflow: "hidden",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Left section: Legend and Labels */}
          <Box
            sx={{
              width: {xs: "100%", md:"40%"},
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              //padding: 2,
              padding: { xs: 1, md: 2 },
              order: { xs: 2, md: 1 } // Changes order on mobile
            }}
          >
            <Box sx={{ display: "flex", width: "100%", justifyContent: "center", mb: { xs: 1, md: 2 } }}>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  //fontSize: 24,
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  fontWeight: "bold",
                  marginBottom: 2,
                  color: "#0056A2",
                }}
              >
                ── {t(`protocol.${selectedTab.toLowerCase()}`)} ──
              </Typography>
            </Box>
            {currentMappedData.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  //marginBottom: 1.5,
                  marginBottom: { xs: 1, md: 1.5 },
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    flexShrink: 0,
                  }}
                ></Box>
                <Typography variant="body2" sx={{ color: "#00256B", fontWeight: 500, fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  {item.label}
                </Typography>
                <Typography variant="body2" sx={{ color: "#888", fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  ({item.value.toFixed(2)}%)
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Right section: Chart and Tabs */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: {xs: "100%", md:"60%"},
              minHeight: "450px",
              border: "2px solid #0056A252",
              borderRadius: "15px",
              //padding: "7px",
              padding: { xs: 1, md: 2 },
              boxSizing: "border-box",
              order: { xs: 1, md: 2 } // Changes order on mobile
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "35px",
                // gap: 2,
                // mt: 1,
                // mx: 3,
                // mb: 1,
                // width: "95%",
                gap: { xs: 1, md: 2 },
                mt: { xs: 0, md: 1 },
                mx: { xs: 1, md: 3 },
                mb: { xs: 0.5, md: 1 },
                width: { xs: "100%", md: "95%" },
                border: "2px solid #0056A2",
                borderRadius: "8px",
                padding: "2px",
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  height: "3px"
                }
              }}
            >
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  sx={{
                    flex: 1,
                    //flexGrow: 1,
                    minWidth: "max-content",
                    height: "100%",
                    backgroundColor:
                      selectedTab === tab ? "#0056A2" : "#FFFFFF",
                    color: selectedTab === tab ? "#FFFFFF" : "#0056A2",
                    fontWeight: selectedTab === tab ? 700 : 500,
                    borderRadius: "6px",
                    boxShadow:
                      selectedTab === tab
                        ? "0px 4px 6px rgba(0, 86, 162, 0.3)"
                        : "none",
                    "&:hover": {
                      backgroundColor: "#0056A2",
                      color: "#FFFFFF",
                    },
                    textTransform: "none",
                    px: 1,
                    "& .MuiTypography-root": {
                      fontSize: { xs: "0.75rem", md: "0.875rem" },
                      whiteSpace: "nowrap"
                    }
                  }}
                >
                  <Typography variant="body2">{t(`protocol.${tab.toLowerCase()}`)}</Typography>
                </Button>
              ))}
            </Box>
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.value.toFixed(2)}%`,
                  arcLabelMinAngle: 20,
                  arcLabelRadius: "105%",
                  data: currentMappedData,
                  // innerRadius: 100,
                  // outerRadius: 150,
                  innerRadius: innerRadius,
                  outerRadius: outerRadius,
                  paddingAngle: 0.5,
                  cornerRadius: 0,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 200,
                  cy: 120,
                  // cx: "50%",
                  // cy: "50%",
                },
              ]}
              sx={{
                width: "100%",
                height: "100%",
                mt: {xs: 0, md: 2},
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: "bold",
                  fill: "#ffffff",
                  fontSize: 12,
                  fontFamily: "Poppins",
                },
              }}
              width={400}
              height={250}
              slotProps={{ legend: { hidden: true } }}
            />
            <Typography sx={{ bottom: "20px", color: "#0056A2", mt: 1 }}>
              {t("protocol.dateUsage")} : {usageDetails?.displaydate}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProtocolReport;
