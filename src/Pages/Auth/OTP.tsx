import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { textFieldStyles } from "./LogIn";
import { MuiOtpInput } from "mui-one-time-password-input";
import verifyOTP from "../../services/changePassword/verifyOTP";
import useStore from "../../services/useAppStore";

interface OTPProps {
  onSelectTab: (tab: string) => void;
}

const OTPPage = ({ onSelectTab }: OTPProps) => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const { otpState } = useStore();

  const [otpVerified, setOtpVerified] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [error, setError] = useState("");

  // Start countdown timer
  useEffect(() => {
    if (timeLeft === 0 || otpVerified) return;

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, otpVerified]);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
    setError(""); // Clear error when user starts typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    if (attemptsLeft <= 0) {
      setError("No attempts left. Please request a new OTP.");
      return;
    }

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new OTP.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const userId = otpState?.userName;
      if (!userId) {
        setError("No user ID found. Please try again.");
        setLoading(false);
        return;
      }

      const response = await verifyOTP(userId, newPassword, otp);
      
      if (response?.isSuccess) {
        console.log("Password changed successfully");
        onSelectTab("login");
      } else {
        const newAttempts = attemptsLeft - 1;
        setAttemptsLeft(newAttempts);
        
        if (newAttempts <= 0) {
          setError("No attempts left. OTP verification failed.");
        } else {
          setError(`Invalid OTP. ${newAttempts} attempt(s) left.`);
        }
      }
    } catch (error) {
      setError("Error verifying OTP. Please try again.");
      console.error("Error verifying OTP", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
  setError("");
  setAttemptsLeft(3);   // reset attempts
  setTimeLeft(120);     // reset timer
  setOtp("");           // clear OTP field

  try {
    // Example API call to resend OTP
    const userId = otpState?.userName;
    if (!userId) {
      setError("No user ID found. Please try again.");
      return;
    }

    // You need to create resendOTP service similar to verifyOTP
    // await resendOTP(userId);

    console.log("OTP resent successfully");
  } catch (error) {
    setError("Failed to resend OTP. Please try again.");
    console.error(error);
  }
};



  const isOTPFieldDisabled = attemptsLeft <= 0 || timeLeft <= 0;

  return (
    <Box
      sx={{
        height: "100%",
        //paddingTop: "30px",
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
          Forgot Password ?
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#0056A2",
            textAlign: "center",
            marginBottom: "20px",
            maxWidth: "400px",
            mb: "30px",
            fontSize: "14px",
          }}
        >
          Enter 6 digits OTP code to reset your profile password.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
{timeLeft > 0 && (
  <Typography variant="body2" sx={{ color: "#0056A2", mb: 2 }}>
    Time remaining: {formatTime(timeLeft)}
  </Typography>
)}

{attemptsLeft > 0 && (
  <Typography variant="body2" sx={{ color: "#0056A2", mb: 2 }}>
    Attempts left: {attemptsLeft}
  </Typography>
)}
<Button
  onClick={handleResendOtp}
  variant="contained"   // use contained so it looks like a real button
  disabled={timeLeft > 0}
  sx={{
    mb: 2,
    borderRadius: 15,
    height: "40px",
    width: "160px",
    textTransform: "capitalize",
    backgroundColor: timeLeft > 0 ? "#A4A4AA" : "#0056A2",
    "&:hover": {
      backgroundColor: timeLeft > 0 ? "#A4A4AA" : "#004080",
    },
  }}
>
  Resend OTP
</Button>




        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            mb: "30px",
          }}
        >
          <Typography variant="body2" sx={{ color: " #A4A4AA", mb: 2 }}>
            Enter your OTP
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
          <MuiOtpInput
            sx={{
              margin: "auto",
              width: "80%",
              minWidth: "350px",
              "& .MuiInputBase-root": {
                backgroundColor: isOTPFieldDisabled ? "#f5f5f5" : "#ffffff",
                borderRadius: "16px",
                height: "50px",
                border: "2px solid #7FAAD0",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  borderColor: isOTPFieldDisabled ? "#7FAAD0" : "#0056A2",
                },
                transition: "border 0.3s ease",
                pointerEvents: isOTPFieldDisabled ? "none" : "auto",
                opacity: isOTPFieldDisabled ? 0.6 : 1,
              },
              "& input": {
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#0056A2",
                cursor: isOTPFieldDisabled ? "not-allowed" : "text",
              },
            }}
            value={otp}
            onChange={handleChange}
            length={6}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            mb: "10px",
          }}
        >
          <Typography variant="body2" sx={{ color: " #A4A4AA" }}>
            New Password
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
            fullWidth
            sx={{
              ...textFieldStyles,
            }}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={newPassword}
            placeholder="Enter your new password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Typography variant="body2" sx={{ color: "#0056A2", mb: "30px" }}>
          minimum 6 characters
        </Typography>
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="primary"
          disabled={attemptsLeft <= 0 || timeLeft <= 0 || loading}
          sx={{
            width: "200px",
            borderRadius: 15,
            height: "50px",
            textTransform: "capitalize",
            mb: "10px",
          }}
        >
          {loading ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            <Typography
              variant="body2"
              sx={{ fontSize: "16px", color: "#FFFFFF" }}
            >
              Submit
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
          Back to{" "}
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
            Sign in
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default OTPPage;