import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getFaultList from "../services/getFaultList";
import { Fault } from "../types/types";
import useStore from "../services/useAppStore";
import { useTranslation } from "react-i18next";

const Complaints = () => {
  const { selectedTelephone, setLeftMenuItem } = useStore();
  const [faults, setFaults] = useState<Fault[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFaultList = async () => {
      console.log("Telephone Number passed:", selectedTelephone);
      setLoading(true);
      setError(null);

      try {
        const response = await getFaultList(selectedTelephone);
        console.log("API Response in Complaints Component:", response);
        setLoading(false);

        if (response?.isSuccess) {
          if (response.dataBundle.asset && response.dataBundle.asset.length > 0) {
            const faultsList = response.dataBundle.asset.flatMap((asset) => {
              if (asset.fault) {
                return asset.fault.map((fault: any) => ({
                  ...fault,
                  serviceName: asset.serviceName,
                }));
              }
              return [];
            });
            setFaults(faultsList);
          } else {
            setError(t("complaints.noFaultsFound"));
          }
        } else {
          setError(response?.errorMessage || t("complaints.failedToFetch"));
        }
      } catch (err) {
        setError(t("complaints.failedToFetchTryAgain"));
        console.error("Error fetching fault list:", err);
        setLoading(false);
      }
    };

    fetchFaultList();
  }, [selectedTelephone, t]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        color: "#0056A2",
        padding: 1,
        borderRadius: "10px",
        boxShadow: "0px 3px 3px #0000004A",
        height: "60vh",
      }}
    >
      <Typography
        variant="body2"
        align="center"
        sx={{ fontSize: 24, fontWeight: "bold", marginBottom: "32px" }}
      >
         {t("complaints.title")} 
      </Typography>

      {loading ? (
        <Typography variant="body2">{t("common.loading")}</Typography>
      ) : error ? (
        <Typography
          variant="body2"
          sx={{ marginBottom: "16px", fontWeight: "bold", color: "#0056A2" }}
        >
          {error}
        </Typography>
      ) : faults.length === 0 ? (
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "16px",
          }}
        >
          {t("complaints.noFaultsFound")}
        </Typography>
      ) : (
        faults.map((fault) => (
          <Card
            key={fault.faultRef}
            sx={{
              backgroundColor: "#3076B2",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              width: "80%",
            }}
          >
            <CardContent sx={{ flex: 1, padding: "8px" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                {t("complaints.serviceName")}: {fault.serviceName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                {t("complaints.faultRef")}: {fault.faultRef}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                {t("complaints.status")}: {fault.status}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "12px" }}>
                {t("complaints.date")}: {fault.date}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#0056A2",
          color: "#FFFFFF",
          fontWeight: "bold",
          padding: "8px 30px",
          "&:hover": {
            backgroundColor: "#003D75",
            justifyContent: "flex-end",
          },
        }}
        onClick={() => {
          setLeftMenuItem("SUBMIT YOUR COMPLAINT");
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "20px" }}>
          {t("complaints.submitButton")}
        </Typography>
      </Button>
    </Box>
  );
};

export default Complaints;
