import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { textFieldStyles } from "./LogIn";
import { useState } from "react";
import sendOTPRequest from "../../services/changePassword/sendOTPRequest";
import { OtpGlobalState } from "../../types/types";
import { determineUserType } from "../../services/helperFunctions";
import useStore from "../../services/useAppStore";
import { useTranslation } from "react-i18next";

interface ForgetPasswordProps {
  onSelectTab: (tab: string) => void;
}

const ForgetPassword = ({ onSelectTab }: ForgetPasswordProps) => {
  const { t } = useTranslation();
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const { setOtpState } = useStore();

  const handleSubmit = async () => {
    // Validate userID is not empty
    if (!userID.trim()) {
      alert(t("Enter user email or phone number")); // or use MUI Snackbar/HelperText
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userID)) {
      alert(t("Enter a valid email address"));
      return;
    }

    // If future is phone number validation needed, include following in a single validation function along with email validation
    
    // Validate phone number format
    // const phoneRegex = /^\d{10}$/;
    // if (!phoneRegex.test(userID)) {
    //   alert(t("forgetPassword.invalidPhone"));
    //   return;
    // }



    setLoading(true);
    const userType = determineUserType(userID);

    if (userType === "UNKNOWN") {
      alert(t("signup.error.invalidInput"));
      setLoading(false);
      return;
    }

    // Send OTP request
  //   await sendOTPRequest(userID, userType);
  //   const data: OtpGlobalState = {
  //     userName: userID,
  //     userType: null,
  //     dataBundle: null,
  //   };
  //   setOtpState(data);
  //   setLoading(false);
  //   onSelectTab("otp");
  // };

    try {
      const response = await sendOTPRequest(userID, userType);
      if (response && response.isSuccess) {
        const data: OtpGlobalState = {
          userName: userID,
          userType,
          dataBundle: response.dataBundle,
        };
        setOtpState(data);
        onSelectTab("otp");
      } else {
        alert(t("No user found with this ID"));
      }
    } catch (error) {
      console.error("Error sending OTP", error);
      alert(t("Failed to send OTP. Please try again later."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        height: "80%",
        paddingTop: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        marginTop: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Poppins, sans-serif",
            color: "#0056A2",
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {t("forgetPassword.title")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            textAlign: "center",
            marginBottom: "20px",
            maxWidth: "400px",
            mb: "40px",
          }}
        >
          {t("forgetPassword.description")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            mb: "40px",
          }}
        >
          <Typography variant="body2" sx={{ color: "#A4A4AA" }}>
            {t("forgetPassword.userIDLabel")}
            <Typography
              component="sup"
              sx={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1rem",
                marginLeft: "2px",
              }}
            >
              *
            </Typography>
          </Typography>
          <TextField
            sx={{ ...textFieldStyles }}
            fullWidth
            variant="outlined"
            margin="normal"
            value={userID}
            placeholder={t("forgetPassword.userIDPlaceholder")}
            onChange={(e) => setUserID(e.target.value.trim())}
            required
          />
        </Box>

        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: "200px",
            borderRadius: 15,
            height: "40px",
            textTransform: "capitalize",
            mb: "10px",
          }}
        >
          {loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
              {t("forgetPassword.submitButton")}
            </Typography>
          )}
        </Button>
        <Typography
          variant="body2"
          sx={{
            color: "#333333",
            textAlign: "center",
            marginBottom: "20px",
            maxWidth: "400px",
          }}
        >
          {t("forgetPassword.backTo")}{" "}
          <Typography
            onClick={() => onSelectTab("login")}
            component="span"
            sx={{
              color: "#0056A2",
              cursor: "pointer",
              textTransform: "capitalize",
              textDecoration: "underline",
            }}
          >
            {t("forgetPassword.signIn")}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
