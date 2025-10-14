import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import setHappyDay from "../services/postpaid/setHappyDay"; // Import API function
import useStore from "../services/useAppStore"; // Import useStore

const HappyDay: React.FC = () => {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { serviceDetails } = useStore();
  const serviceID = serviceDetails?.listofBBService[0]?.serviceID;

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSetHappyDay = async () => {
    if (!serviceID || !selectedDate) {
      alert(t("happyDay.missingServiceIdOrDate"));
      return;
    }

    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const response = await setHappyDay(serviceID, formattedDate);

    if (response?.isSuccess) {
      setApiResponse(response.dataBundle?.message || t("happyDay.success"));
      setErrorMessage(null);
      setIsSuccess(true);
    } else {
      setErrorMessage(response?.errorShow || t("happyDay.error"));
      setApiResponse(null);
      setIsSuccess(false);
    }

    setDialogOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          color: "#0F2552",
          padding: 2,
          borderRadius: "10px",
          height: "auto",
          boxShadow: "0px 3px 3px #0000004A",
          overflow: "hidden",
          boxSizing: "border-box",
          width: "100%",
          mx: "auto"
        }}
      >


        {/* Header Text */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            //fontSize: "16px",
            fontSize: { xs: "14px", sm: "16px" },
            fontWeight: "bold",
            //mb: 1,
            color: "#0056A2",
          }}
        >
          {t("happyDay.chooseMessage1")}{" "}
          <Typography
            variant="body2"
            component="span"
            sx={{
              //fontSize: "16px",
              fontSize: { xs: "14px", sm: "16px" },
              fontWeight: "bold",
              //mb: 2,
              color: "#40E734",
            }}
          >
            {t("happyDay.chooseMessage2")}
            <br />
          </Typography>{" "}
          {t("happyDay.chooseMessage3")}
        </Typography>


        {/* Main Content Area */}
        <Box sx={{ 
          display: "flex", 
          gap: 2,
          //flexDirection: "column",
          flexDirection: { xs: "column", lg: "row" }, // Stack on mobile, row on desktop
          //justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box"
          }}>

            {/* Left Column - Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              //width: "50%",
              width: { xs: "100%", lg: "50%" },
              gap: 2,
              boxSizing: "border-box"
            }}
          >
            <TextField
              value={selectedDate ? selectedDate.format("DD-MM-YYYY") : ""}
              sx={{
                width: "100%",
                "& .MuiInputBase-root": {
                  height: "40px",
                  backgroundColor: "#057DE81A",
                  width: "100%",
                  borderRadius: "10px",
                  mt: 1,
                  border: "2px solid #ffffff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    borderColor: "#0056A2",
                  },
                  transition: "border 0.3s ease",
                },
                "& input": {
                  textAlign: "center",
                  fontFamily: "Poppins, sans-serif",
                  color: "#0056A2",
                  fontWeight: "medium",
                },
              }}
            />

            {/* Dialog for displaying API messages */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
              <DialogTitle
                sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}
              >
                {isSuccess ? t("happyDay.success") : t("happyDay.error")}
              </DialogTitle>
              <DialogContent>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    width: "400px",
                    height: "50px",
                    gap: -10,
                    color: "#0056A2",
                    fontWeight: "bold",
                    fontSize: "10px",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  {isSuccess ? (
                    <>
                      {apiResponse}
                      {/* Success GIF */}
                      <img
                        src="https://cdn.dribbble.com/users/39201/screenshots/3694057/nutmeg.gif"
                        alt={t("happyDay.success")}
                        style={{ width: "100px", height: "30px", borderRadius: "10px" }}
                      />
                    </>
                  ) : (
                    <>
                      {errorMessage}
                      {/* Failure GIF */}
                      <img
                        src="https://i.gifer.com/Z16w.gif"
                        alt={t("happyDay.error")}
                        style={{ width: "30px", height: "18px", borderRadius: "10px" }}
                      />
                    </>
                  )}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose} autoFocus>
                  {t("happyDay.ok")}
                </Button>
              </DialogActions>
            </Dialog>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                mb: 1,
                color: "#0056A2",
                backgroundColor: "#FFFFFF",
                border: "2px solid #0056A2",
                height: "50px",
                //width: "45%",
                width: { xs: "100%", sm: "60%" }, // Full width on mobile, 60% on tablet+
                //minWidth: "120px",
                maxWidth: "200px",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#F5F9FF"
                }
              }}
              onClick={handleSetHappyDay}
            >
              <Typography
                variant="body2"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0056A2",
                }}
              >
                {t("happyDay.setDate")}
              </Typography>
            </Button>

            <Box sx={{ width: "100%" }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#0056A2",
                  textAlign: "left",
                }}
              >
                {t("happyDay.termsConditions")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "12px", color: "#0056A2", textAlign: "left", mt: 1 }}
              >
                {t("happyDay.term1")}
                <br />
                {t("happyDay.term2")}
              </Typography>
            </Box>
          </Box>

          {/* Right Column - Calendar */}
          <Box
            sx={{
              //display: "flex",
              //flexDirection: "row",
              width: { md: "100%", lg: "50%" }, // Full width on mobile, half on desktop
              minHeight: "300px", // Ensure calendar has enough space
              borderRadius: "10px",
              padding: "5px",
              border: "2px solid #0056A273",
              boxSizing: "border-box",
              //width:"50%",
              overflow: "hidden",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={handleDateChange}
                disablePast
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HappyDay;
