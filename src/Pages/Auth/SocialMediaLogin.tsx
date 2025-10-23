import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import { languageState } from "../../types/types";
import { useState } from "react";

// Facebook Types (for safety, kept as `any` until confirmed)
type FacebookAuthResponse = any;
type FacebookProfile = any;

const CLIENT_ID = "641643356344-un4nm5pqbp11f2g0h8rmuri4u8ij6fev.apps.googleusercontent.com";

const SocialMediaLoginInner = () => {
  const { t, i18n } = useTranslation();
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const navigate = useNavigate();
  const GoogleLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/google-icon.png";
  const FacebookLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/facebook-icon1.jpg";

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLanguage = event.target.value as 'en' | 'si' | 'ta';
    i18n.changeLanguage(newLanguage);
    languageState.currentLanguage = newLanguage;
    sessionStorage.setItem('appLanguage', newLanguage);
  };

  // Google login logic
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      console.log("Google access token:", accessToken);

      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("Google user info:", res.data);
        //navigate("/home");
      } catch (err) {
        console.error("Google user info fetch error:", err);
      } finally {
        navigate("/home");
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });

  // Facebook login success handler
  const handleFacebookSuccess = (response: FacebookAuthResponse) => {
    console.log("Facebook login success:", response);
    setIsFacebookLoading(false);
    navigate("/home");
  };

  // Facebook profile info handler
  const handleFacebookProfile = (profile: FacebookProfile) => {
    console.log("Facebook profile:", profile);
  };

  // Facebook login failure handler
  const handleFacebookFailure = (error: unknown) => {
    console.error("Facebook login failed:", error);
    setIsFacebookLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        mt: 2,
        mb: 2,
        gap: 2,
      }}
    >
      {/* Language Selector */}
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          value={i18n.language}
          onChange={handleLanguageChange}
          displayEmpty
          inputProps={{ 'aria-label': t('languageSelector.selectLanguage') }}
          sx={{
            borderRadius: '20px',
            '& .MuiSelect-select': { py: 1 }
          }}
        >
          <MenuItem value="en">{t('languages.english')}</MenuItem>
          <MenuItem value="si">{t('languages.sinhala')}</MenuItem>
          <MenuItem value="ta">{t('languages.tamil')}</MenuItem>
        </Select>
      </FormControl>

      

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          position: "relative",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Social Media Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

          <Typography variant="body2" sx={{ color: "#333333" }}>
              {t("socialLogin.orSignInWith")}
            </Typography>

          {/* Google Login */}
          <Box
            component="img"
            src={GoogleLogo}
            alt={t("socialLogin.googleLogin")}
            onClick={() => loginWithGoogle()}
            sx={{
              width: 37,
              height: 37,
              cursor: "pointer",
              borderRadius: "50%",
              transition: "0.3s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          />

          {/* Facebook Login */}
          <FacebookLogin
            appId="515088714636776"
            onSuccess={handleFacebookSuccess}
            onFail={handleFacebookFailure}
            onProfileSuccess={handleFacebookProfile}
            useRedirect={false}
            render={({ onClick }) => (
              <Box
                component="img"
                src={FacebookLogo}
                alt={t("socialLogin.facebookLogin")}
                onClick={(e) => {
                  e.preventDefault();
                  setIsFacebookLoading(true);
                  if (onClick) onClick();
                }}
                sx={{
                  width: 37,
                  height: 37,
                  cursor: "pointer",
                  borderRadius: "50%",
                  opacity: isFacebookLoading ? 0.6 : 1,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />
            )}
          />
        </Box>

        {/* Loading Indicator */}
        {isFacebookLoading && (
          <CircularProgress
            size={24}
            sx={{ position: "absolute", right: -40 }}
            aria-label={t("socialLogin.loading")}
          />
        )}
      </Box>
    </Box>
  );
};

const SocialMediaLogin = () => (
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <SocialMediaLoginInner />
  </GoogleOAuthProvider>
);

export default SocialMediaLogin;
