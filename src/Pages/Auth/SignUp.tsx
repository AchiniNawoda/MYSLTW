import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Checkbox,
  Tooltip,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import registerUser from "../../services/register/register";
import useStore from "../../services/useAppStore";
import { OtpGlobalState, OtpResponse } from "../../types/types";
import { useTranslation } from "react-i18next";
import TermsDialog from "./TermsConditions";

interface SignupProps {
  onSelectTab: (tab: string) => void;
}

const Signup = ({ onSelectTab }: SignupProps) => {
  const { t } = useTranslation();
  const [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false); // For terms and conditions acceptance
  const [termsDialogOpen, setTermsDialogOpen] = useState(false); // For terms dialog
  const [passwordTouched, setPasswordTouched] = useState(false); // For password field touched state
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null); // For confirm password error message

  const { setOtpState } = useStore();

  // Determine if input is email or mobile
  const determineUserType = (input: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (emailRegex.test(input)) return "EMAIL";
    if (phoneRegex.test(input)) return "MOBILE";
    return "UNKNOWN";
  };

  // Password strength checker
  const getPasswordStrength = (pwd: string) => {
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    };

    const passedCount = Object.values(checks).filter(Boolean).length;
    return { checks, passedCount, total: 5 };
  };

  // Validate password against all criteria
  const validatePassword = (pwd: string): boolean => {
    const { checks } = getPasswordStrength(pwd);
    return Object.values(checks).every(Boolean);
  };

  const getPasswordTooltipContent = () => {
    if (!password) return null;

    const { checks } = getPasswordStrength(password);

    return (
      <Box sx={{p: 0.5}}>
        <Typography variant="caption" sx={{ fontWeight: "bold", display: "block", mb: 0.5 }}>
          {t("signup.passwordPolicy.title")}
        </Typography>

        {/* Length check */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.3 }}>
          {checks.length ? (
            // <CheckCircleIcon sx={{ fontSize: 14, color: "#4caf50" }} />
            <CheckCircleIcon fontSize="small" sx={{ color: "green", mr: 0.5 }} />
          ) : (
            // <CancelIcon sx={{ fontSize: 14, color: "#f44336" }} />
            <CancelIcon fontSize="small" sx={{ color: "red", mr: 0.5 }} />
          )}
          <Typography variant="caption">
            {t("signup.passwordPolicy.minLength")}
          </Typography>
        </Box>

        {/* Uppercase check */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.3 }}>
          {checks.uppercase ? (
            <CheckCircleIcon fontSize="small" sx={{ color: "green", mr: 0.5 }} />
          ) : (
            <CancelIcon fontSize="small" sx={{ color: "red", mr: 0.5 }} />
          )}
          <Typography variant="caption">
            {t("signup.passwordPolicy.uppercase")}
          </Typography>
        </Box>

        {/* Lowercase check */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.3 }}>
          {checks.lowercase ? (
            <CheckCircleIcon fontSize="small" sx={{ color: "green", mr: 0.5 }} />
          ) : (
            <CancelIcon fontSize="small" sx={{ color: "red", mr: 0.5 }} />
          )}
          <Typography variant="caption">
            {t("signup.passwordPolicy.lowercase")}
          </Typography>
        </Box>

        {/* Number check */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.3 }}>
          {checks.number ? (
            <CheckCircleIcon fontSize="small" sx={{ color: "green", mr: 0.5 }} />
          ) : (
            <CancelIcon fontSize="small" sx={{ color: "red", mr: 0.5 }} />
          )}
          <Typography variant="caption">
            {t("signup.passwordPolicy.number")}
          </Typography>
        </Box>

        {/* Special character check */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {checks.special ? (
            <CheckCircleIcon fontSize="small" sx={{ color: "green", mr: 0.5 }} />
          ) : (
            <CancelIcon fontSize="small" sx={{ color: "red", mr: 0.5 }} />
          )}
          <Typography variant="caption">
            {t("signup.passwordPolicy.specialChar")}
          </Typography>
        </Box>
      </Box>
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordTouched(true);

    // Clear confirm password error if passwords match
    if (confirmPassword && newPassword === confirmPassword) {
      setConfirmPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check for mismatch in real-time
    if (passwordTouched && newConfirmPassword !== password) {
      setConfirmPasswordError(t("signup.error.passwordMismatch"));
    } else {
      setConfirmPasswordError(null);
    }
  };

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    setErrorMessage(null);
    setConfirmPasswordError(null);

    // Validate password strength
    if (!validatePassword(password)) {
      setErrorMessage(t("signup.error.weakPassword"));
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError(t("signup.error.passwordMismatch") || "Passwords do not match!");
      setErrorMessage(t("signup.error.passwordMismatch"));
      setLoading(false);
      return;
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      setErrorMessage(t("signup.error.acceptTerms"));
      setLoading(false);
      return;
    }
    
    const userType = determineUserType(userID);
    if (userType === "UNKNOWN") {
      setErrorMessage(t("signup.error.invalidInput"));
      setLoading(false);
      return;
    }
    try {
      const response: OtpResponse = await registerUser(
        userID,
        password,
        confirmPassword,
        name,
        userType
      );
      if (response.isSuccess) {
        const data: OtpGlobalState = {
          userName: userID,
          userType: userType,
          dataBundle: response.dataBundle,
        };
        setOtpState(data);
        onSelectTab("registerotp");
      } else {
        setErrorMessage(response.errorMessage || t("signup.error.registrationFailed"));
        alert(response.errorShow);
      }
    } catch (error) {
      setErrorMessage(t("signup.error.generic"));
    }
    setLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword((prev) => !prev);
};
 
  const handleOpenTermsDialog = () => {
    setTermsDialogOpen(true);
  };

  const handleCloseTermsDialog = () => {
    setTermsDialogOpen(false);
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setTermsDialogOpen(false);
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      mt: -1,
      border: "1px solid #F0F0F3",
      borderRadius: "15px",
      height: "40px",
      transition: "all 0.3s ease",
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        borderColor: "#0F3B7A",
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "transparent",
        },
        borderColor: "#0F3B7A",
      },
      "& .MuiOutlinedInput-input::placeholder": {
        fontSize: "14px",
        color: "#999999",
      },
      "& input:-webkit-autofill": {
       height: "4px",
       border: "1px solid white",
     },
    },
  };

  // Get password strength for current password
  const passwordStrength = getPasswordStrength(password);
  // Check if password is valid
  const isPasswordValid = validatePassword(password);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="h1"
        sx={{
          //fontFamily: "Sarabun, sans-serif",
          color: "#0056A2",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {t("signup.title")}
      </Typography>

      <Box
        sx={{
          width: { xs: "90%", sm: "65%" },
          //maxWidth: { xs: "100%", sm: "80%" },
          mx: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                whiteSpace: "pre-line",
                width: "100%",
                maxWidth: { xs: "90%", sm: "90%" },
                alignSelf: "center",
              }}
            >
              {errorMessage}
            </Alert>
            // <Typography color="error" variant="body2">
            //   {errorMessage}
            // </Typography>
          )}

          <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
            {t("signup.emailOrMobile")}
          </Typography>
          <TextField
            sx={textFieldStyles}
            fullWidth
            variant="outlined"
            margin="normal"
            value={userID}
            placeholder={t("signup.emailOrMobilePlaceholder")}
            onChange={(e) => setUserID(e.target.value.trim())}
            required
          />

          <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
            {t("signup.name")}
          </Typography>
          <TextField
            sx={textFieldStyles}
            fullWidth
            variant="outlined"
            margin="normal"
            value={name}
            placeholder={t("signup.namePlaceholder")}
            onChange={(e) => setName(e.target.value.trim())}
            required
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
              {t("signup.password")}
            </Typography>
            {passwordTouched && password && (
              <Tooltip
                title={getPasswordTooltipContent()}
                arrow
                placement="right"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "white",
                      color: 'rgba(0, 0, 0, 0.87)',
                      boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
                      border: '1px solid #e0e0e0',
                      '& .MuiTooltip-arrow': {
                        color: 'white',
                        '&::before': {
                          border: '1px solid #e0e0e0',
                        },
                      },
                    },
                  },
                }}
                >
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 0.5,
                    cursor: "pointer",
                  }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: isPasswordValid ? "#4caf50" : "#f44336",
                        fontWeight: "bold",
                      }}
                    >
                      {passwordStrength.passedCount}/{passwordStrength.total}
                    </Typography>
                    {isPasswordValid ? (
                      <CheckCircleIcon sx={{ fontSize: 16, color: "#4caf50" }} />
                    ) : (
                      <CancelIcon sx={{ fontSize: 16, color: "#f44336" }} />
                    )}
                  </Box>
              </Tooltip>
            )}
          </Box>
          <TextField
            fullWidth
            sx={textFieldStyles}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            placeholder={t("signup.passwordPlaceholder")}
            onChange={handlePasswordChange}
            required
            error={passwordTouched && password.length > 0 && !isPasswordValid}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t("signup.togglePasswordVisibility")}
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
            {t("signup.confirmPassword")}
          </Typography>
          <TextField
            fullWidth
            sx={textFieldStyles}
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            placeholder={t("signup.confirmPasswordPlaceholder")}
            onChange={handleConfirmPasswordChange}
            required
            error={!!confirmPasswordError}
            //helperText={confirmPasswordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t("signup.togglePasswordVisibility")}
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {confirmPasswordError && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: "error.main", 
                display: "block",
                mt: 0.5,
              }}
            >
              {t("signup.error.passwordMismatch")}
            </Typography>
          )}

          {/* old password field without strength checker */}
          {/* <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
            {t("signup.password")}
          </Typography>
          <TextField
            fullWidth
            sx={textFieldStyles}
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            placeholder={t("signup.passwordPlaceholder")}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t("signup.togglePasswordVisibility")}
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="body2" sx={{ color: "#0F3B7A" }}>
            {t("signup.confirmPassword")}
          </Typography>
          <TextField
            fullWidth
            sx={textFieldStyles}
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            placeholder={t("signup.confirmPasswordPlaceholder")}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t("signup.togglePasswordVisibility")}
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> */}

          {/* Terms and Conditions Checkbox */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              name="terms"
              sx={{ 
                color: termsAccepted ? "#0F3B7A" : "#ccc",
                boxSizing: "border-box",
                '&.Mui-checked': {
                  color: "#0F3B7A",
                },
              }}
              required
            />
            <Typography variant="body2" sx={{ color: "#0F3B7A", fontSize: "0.875rem",}}>
              {t("signup.acceptTerms.prefix")}{" "}
              <Typography
                onClick={handleOpenTermsDialog}
                component={"span"}
                variant="body2"
                sx={{ 
                  color: "#0F3B7A", 
                  //textDecoration: "underline", 
                  cursor: "pointer",
                  fontWeight: "bold",
                  ":hover": { textDecoration: "underline",},
                }}
              >
                {t("signup.acceptTerms.conditions")}
              </Typography>
            </Typography>
          </Box>


          <Button
            variant="contained"
            type="submit"
            sx={{
              mt: "20px",
              width: "100%",
              backgroundColor: "primary",
              padding: "12px",
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#003b5c",
              },
            }}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
                {t("signup.signupButton")}
              </Typography>
            )}
          </Button>
        </form>
      </Box>

      <TermsDialog
        open={termsDialogOpen}
        onClose={handleCloseTermsDialog}
        onAccept={handleAcceptTerms}
      />
    </Box>
  );
};

export default Signup;