import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/Auth";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

interface LoginProps {
  onSelectTab: (tab: string) => void;
}

export const textFieldStyles = {
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

const Login = ({ onSelectTab }: LoginProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const result = await userLogin(event, email, password);
    setLoading(false);
    if (result.success) {
      navigate("/home");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        paddingTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          //fontFamily: "Poppins, sans-serif",
          color: "#0056A2",
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        {t("login.title")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Typography variant="body2" sx={{ color: " #0F3B7A" }}>
          {t("login.emailLabel")}
        </Typography>
        <TextField
          sx={{ ...textFieldStyles }}
          fullWidth
          variant="outlined"
          margin="normal"
          value={email}
          placeholder={t("login.emailPlaceholder")}
          onChange={(e) => setEmail(e.target.value.trim())}
          required
        />
        <Typography variant="body2" sx={{ color: " #0F3B7A" }}>
          {t("login.passwordLabel")}
        </Typography>
        <TextField
          fullWidth
          sx={{ ...textFieldStyles }}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          value={password}
          placeholder={t("login.passwordPlaceholder")}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t("login.togglePasswordVisibility")}
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "" }}>
          <Button
            onClick={() => onSelectTab("forgetPassword")}
            variant="text"
            sx={{
              color: "#0056A2",
              "&:hover": {
                backgroundColor: "#ffffff",
                boxShadow: "none",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                textTransform: "capitalize",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("login.forgotPassword")}
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginY: "24px",
          }}
        >
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 15,
              height: "40px",
              textTransform: "capitalize",
            }}
          >
            {loading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
                {t("login.loginButton")}
              </Typography>
            )}
          </Button>
          <Typography variant={"body2"} sx={{ marginTop: "24px", color: "#333333" }}>
            {t("login.noAccountText")}{" "}
            <Typography
              onClick={() => onSelectTab("signup")}
              component="span"
              sx={{
                color: "#0056A2",
                textDecoration: "underline",
                transition: "0.3s",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {t("login.signUpLink")}
            </Typography>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default Login;