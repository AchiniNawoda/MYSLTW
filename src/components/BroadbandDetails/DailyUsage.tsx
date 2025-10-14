import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import fetchDailyUsageData from "../../services/postpaid/fetchDailyUsage";
import fetchPreviousDailyUsageData from "../../services/postpaid/fetchPreviousDailyUsageData";
import useStore from "../../services/useAppStore";
import { DailyUsageDetails } from "../../types/types";
import { useTranslation } from "react-i18next";

const getMonthNames = (t: any): string[] => {
  const now = new Date();
  const monthNames = new Intl.DateTimeFormat("en-US", { month: "long" });

  const lastMonth = monthNames.format(
    new Date(now.setMonth(now.getMonth() - 1))
  ); // Last month
  const twoMonthsAgo = monthNames.format(
    new Date(now.setMonth(now.getMonth() - 1))
  ); // Month before last

  // Return translated names for "Current Month" + month names
  return [t("currentMonth"), lastMonth, twoMonthsAgo];
};

const DailyUsage = () => {
  const { t } = useTranslation();
  const { serviceDetails, setLeftMenuItem, setUsageDetails, detailReportAvailability } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;
  const months = getMonthNames(t);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const [usageData, setUsageData] = useState<DailyUsageDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data: DailyUsageDetails[] | null = null;

        if (serviceID) {
          if (selectedMonth === months[0]) {
            data = await fetchDailyUsageData(serviceID, "01");
          } else if (selectedMonth === months[1]) {
            data = await fetchPreviousDailyUsageData(serviceID, "01", 1);
          } else if (selectedMonth === months[2]) {
            data = await fetchPreviousDailyUsageData(serviceID, "01", 2);
          }
        }
        if (data) {
          setUsageData(data);
        }
      } catch (error) {
        console.error("Error fetching daily usage data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceID, selectedMonth]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        //padding: 1.5,
        padding: 2,
        borderRadius: "10px",
        height: "100%",
        minHeight: "500px", // Prevent too short on empty states
        boxShadow: "0px 3px 3px #0000004A",
        overflow: "hidden",
        maxWidth: "900px", // Prevent over-stretching on wide screens
        mx: "auto", // Center the whole component
      }}
    >
      <Typography
        //variant="body2"
        variant="body2"
        align="center"
        sx={{
          //fontSize: "24px",
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
          fontWeight: "bold",
          color: "#0056A2",
          mb: 2,
          px: 1,
          width: "100%",
          //marginBottom: 1,
        }}
      >
         {t("dailyUsage")} 
      </Typography>

      {/* Month Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
          gap: 1,
          mb: 1,
          //width: "95%",
          width: "100%",
          maxWidth: "500px", // Added max constraint
          border: "2px solid #0056A2",
          borderRadius: "8px",
          //px: 1,
          px: 0.5, // Reduced padding
          mx: "auto", // Center horizontally
        }}
      >
        {months.map((month) => (
          <Button
            key={month}
            onClick={() => handleMonthChange(month)}
            sx={{
              flex: 1,
              minWidth: 0, // Allows buttons to shrink more
              flexGrow: 1,
              height: "80%",
              backgroundColor: selectedMonth === month ? "#0056A2" : "#FFFFFF",
              color: selectedMonth === month ? "#FFFFFF" : "#0056A2",
              fontWeight: selectedMonth === month ? 700 : 500,
              borderRadius: "6px",
              boxShadow:
                selectedMonth === month
                  ? "0px 4px 6px rgba(0, 86, 162, 0.3)"
                  : "none",
              "&:hover": {
                backgroundColor: "#0056A2",
                color: "#FFFFFF",
              },
              textTransform: "none",
              fontSize: "0.875rem", // Explicit font size
              px: 0.5, // Reduced horizontal padding
            }}
          >
            <Typography variant="body2">{month}</Typography>
          </Button>
        ))}
      </Box>

      {/* Loading state */}
      {loading && (
        <Typography variant="body1" sx={{ color: "#0056A2", marginBottom: 2 }}>
          {t("loadingData")}
        </Typography>
      )}

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // Allow wrapping on small screens
          justifyContent: "center",
          alignItems: "center",
          //gap: 4,
          gap: 2,
          mb: 1,
          width: "100%",
          maxWidth: "600px",
          mx: "auto"
        }}
      >
        {["basePackage", "extraGB", "loyalty", "vas"].map((label, index) => {
          const colors = ["#00D300", "#ED4872", "#FFDD00", "#00FFFF"];
          return (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: colors[index],
                  borderRadius: "50%",
                }}
              />
              <Typography variant="body2">{t(label)}</Typography>
            </Box>
          );
        })}
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          overflow: "auto",
          maxHeight: "335px",
          paddingRight: 0.5,
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#0D67A6",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#0056A2",
          },
        }}
      >
        <Table>
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "#0056A2",
            }}
          >
            <TableRow>
              <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {t("date")}
              </TableCell>
              <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {t("totalUsage")}
                </Typography>
                <Typography variant="body2">(in GB)</Typography>
              </TableCell>
              <TableCell align="center" sx={{ width: "40%", color: "#FFFFFF", fontWeight: "bold" }}>
                {t("usage")}
              </TableCell>
              <TableCell align="center" sx={{ color: "#FFFFFF", fontWeight: "bold" }}>
                {t("report")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usageData ? (
              usageData.map((row: DailyUsageDetails, index: number) => (
                <TableRow key={index} sx={{ height: "40px" }}>
                  <TableCell align="center" sx={{ padding: "6px" }}>
                    {row.displaydate}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "6px" }}>
                    {row.daily_total_usage}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "6px" }}>
                    {row?.usages ? (
                      <Box
                        sx={{
                          height: "40px",
                          pt: 2,
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          flexDirection: "column",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            height: 9,
                            borderRadius: "5px",
                            backgroundColor: "#E5E5EF",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              width: `${row.daily_percentage}%`,
                              height: "100%",
                              borderRadius: "5px",
                            }}
                          >
                            {row.usages
                              ? row.usages.map((usage, index) => {
                                  const colors = ["#00D300", "#FFDD00", "#ED4872", "#00FFFF"];
                                  return (
                                    <Box
                                      key={index}
                                      sx={{
                                        width: `${usage.percentage}%`,
                                        height: 9,
                                        backgroundColor: usage.sorter === 1
                                          ? colors[0]
                                          : usage.sorter === 2
                                          ? colors[1]
                                          : usage.sorter === 3
                                          ? colors[2]
                                          : colors[3],
                                      }}
                                    ></Box>
                                  );
                                })
                              : null}
                          </Box>
                        </Box>
                        <Link
                          onClick={() => {
                            setLeftMenuItem("DetailedUsageDetails");
                            setUsageDetails(row);
                          }}
                          href="#"
                          underline="hover"
                          sx={{
                            fontSize: "0.75rem",
                            textAlign: "center",
                            mt: 1,
                            color: "#0056A2",
                          }}
                        >
                          {t("viewDetailedUsage")}
                        </Link>
                      </Box>
                    ) : (
                      <Box>
                        <Typography variant="body2" sx={{ color: "#0056A2", fontWeight: 600 }}>
                          {t("noData")}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Link
                      onClick={() => {
                        if (detailReportAvailability) {
                          setLeftMenuItem("ProtocolReport");
                          setUsageDetails(row);
                        } else {
                          setLeftMenuItem("Subscription");
                        }
                      }}
                      href="#"
                      underline="hover"
                      sx={{ color: "#0056A2" }}
                    >
                      {detailReportAvailability ? t("more") : t("view")}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {t("noDataAvailable")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DailyUsage;
