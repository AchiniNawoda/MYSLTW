import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import useStore from "../../services/useAppStore";
import ProgressBar from "./ProgressBar";

const DetailedUsage = () => {
  const { usageDetails } = useStore();
  const { t } = useTranslation();

  const itemArray = [
    { label: t("detailedUsage.basePackage"), color: "#00D300" },
    { label: t("detailedUsage.extraGB"), color: "#ED4872" },
    { label: t("detailedUsage.loyalty"), color: "#FFDD00" },
    { label: t("detailedUsage.vas"), color: "#00FFFF" },
  ];

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          gap: 1,
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          padding: 2,
          borderRadius: "10px",
          height: "450px",
          boxShadow: "0px 3px 3px #0000004A",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontSize: "24px", fontWeight: 600, color: "#0056A2", mb: 2 }}
        >
           {t("detailedUsage.title")} 
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            mb: 1,
          }}
        >
          {itemArray.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  bgcolor: item.color,
                  borderRadius: "50%",
                }}
              />
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#0056A2", fontSize: "16px", fontWeight: 600 }}
          >
            {`${t("detailedUsage.totalUsage")} - ${usageDetails?.daily_total_usage}${usageDetails?.volumeunit}`}
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              width: "80%",
              height: 12,
              borderRadius: "5px",
              backgroundColor: "#E5E5EF",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: `${usageDetails?.daily_percentage}%`,
                height: "100%",
                borderRadius: "5px",
              }}
            >
              {usageDetails?.usages ? (
                usageDetails.usages.map((usage, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: `${usage.percentage}%`,
                      height: 12,
                      backgroundColor:
                        usage.sorter === 1
                          ? "#4FD745"
                          : usage.sorter === 2
                          ? "#F6E901"
                          : usage.sorter === 3
                          ? "#CF1C1F"
                          : "#00B4EB",
                    }}
                  />
                ))
              ) : (
                <Box>{t("detailedUsage.noData")}</Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            width: "90%",
            minHeight: "20px",
            gap: 2,
          }}
        >
          {usageDetails?.usages ? (
            usageDetails.usages.map((usage, index) => (
              <Box sx={{ width: "45%" }} key={index}>
                <ProgressBar usage={usage} />
              </Box>
            ))
          ) : (
            <Box>{t("detailedUsage.noData")}</Box>
          )}
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "space-around",
            width: "90%",
            height: "30px",
          }}
        >
          <StyledText text={t("detailedUsage.pd")} />
          <StyledText text={t("detailedUsage.pu")} />
          <StyledText text={t("detailedUsage.od")} />
          <StyledText text={t("detailedUsage.ou")} />
        </Box>
      </Box>
    </>
  );
};

export default DetailedUsage;

interface props {
  text: string;
}
export const StyledText = ({ text }: props) => {
  return (
    <Typography
      variant="body2"
      sx={{ color: "#0056A2", fontSize: "14px", fontWeight: 600, mt: 2 }}
    >
      {text}
    </Typography>
  );
};
