import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ForgetPassword from "./ForgetPassword";
import Login from "./LogIn";
import OTPPage from "./OTP";
import RegisterOTP from "./RegisterOTP";
import Signup from "./SignUp";
import SocialMediaLogin from "./SocialMediaLogin";

const LoginOrSignup = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState("login");
  const loginImage = "https://mysltimages.s3.eu-north-1.amazonaws.com/loginImage.png";
  const backgroundImage = "https://res.cloudinary.com/dtqcgwrgk/image/upload/v1753257146/HomeBackground_qjrvxb.png";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          //width: "83vw",
          width: { xs: "90vw", md: "83vw" },
          maxWidth: "900px",
          //height: "630px",
          height: { xs: "auto", md: "630px" },
          minHeight: { xs: "auto", md: "630px" },
          //margin: "1px",
          margin: { xs: "20px 0", md: "1px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={loginImage}
          alt={t("loginOrSignup.loginImageAlt")}
          sx={{
            display: { xs: "none", md: "block" },
            width: "auto",
            maxWidth: "45%",
            height: "95%",
            borderRadius: 3,
            zIndex: 1,
            marginRight: "-100px",
            boxShadow: "0px 3px 3px #0056A260",
            position: "relative",
            right: "50px" // Better than negative margin
          }}
        ></Box>
        <Box
          sx={{
            //width: { xs: "90%", md: "71%" },
            width: { xs: "100%", sm: "450px", md: "500px" }, // Fixed widths work better
            height: "100%",
            backgroundColor: "background.paper",
            borderRadius: 3,
            //border: "1px solid #0056A2",
            zIndex: 0,
            //paddingLeft: { xs: "0px", md: "100px" },
            padding: { xs: "20px", md: "20px 20px 20px 70px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //justifyContent: "start",
          }}
        >
          <Box
            sx={{
              width: "100%",
              //width: { xs: "90%", sm: "400px" },
              height: "52px",
              margin: "20px 0",
              backgroundColor: "#D9F7FF",
              borderRadius: "20px",
              boxShadow: "0px 3px 3px #0056A260",
              display:
                selectedTab === "forgetPassword" || selectedTab === "otp"
                  ? "none"
                  : "flex",
              alignItems: "center",
              //justifyContent: "space-around",
              justifyContent: "space-between",
              padding: "5px",
              boxSizing: "border-box",
            }}
          >
            <Box
              onClick={() => setSelectedTab("login")}
              sx={{
                width: "48%",
                height: "100%",
                backgroundColor:
                  selectedTab === "login" ? "#0056A2" : "transparent",
                color: selectedTab === "login" ? "#ffffff" : "#0056A2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    selectedTab !== "login"
                      ? "rgba(0, 86, 162, 0.1)"
                      : undefined,
                  "& .MuiTypography-root": {
                    transform:
                      selectedTab !== "login" ? "scale(1.1)" : "none",
                    transition: "transform 0.3s ease",
                  },
                },
              }}
            >
              <Typography variant="body2"
                sx={{
                  transform: selectedTab !== "login" ? "none" : "none", // Removed scale effect
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: selectedTab !== "login" ? "scale(1.05)" : "none",
                  }
                }}>
                {t("loginOrSignup.login")}
              </Typography>
            </Box>
            <Box
              onClick={() => setSelectedTab("signup")}
              sx={{
                width: "48%",
                height: "100%",
                backgroundColor:
                  selectedTab === "signup" ? "#0056A2" : "transparent",
                color: selectedTab === "signup" ? "#ffffff" : "#0056A2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                transition: "all 0.3s ease",
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor:
                    selectedTab !== "signup"
                      ? "rgba(0, 86, 162, 0.1)"
                      : undefined,
                  "& .MuiTypography-root": {
                    transform:
                      selectedTab !== "signup" ? "scale(1.1)" : "none",
                    transition: "transform 0.3s ease",
                  },
                },
              }}
            >
              <Typography variant="body2"
                sx={{
                  transform: selectedTab !== "signup" ? "none" : "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: selectedTab !== "signup" ? "scale(1.05)" : "none",
                  }
                }}>
                {t("loginOrSignup.signup")}
                </Typography>
            </Box>
          </Box>

          <Box sx={{ 
            //marginX: "20px", 
            //height: "100%" ,
            width: "100%",
            padding: "0 20px",
            flexGrow: 1,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#0056A2",
              borderRadius: "3px",
            }
            }}>
              
            {selectedTab === "login" && (
              <>
                <Login onSelectTab={setSelectedTab} />
                <SocialMediaLogin />
              </>
            )}
            {selectedTab === "signup" && (
              <>
                <Signup onSelectTab={setSelectedTab} />
                <SocialMediaLogin />
              </>
            )}
            {selectedTab === "forgetPassword" && (
              <ForgetPassword onSelectTab={setSelectedTab} />
            )}
            {selectedTab === "otp" && <OTPPage onSelectTab={setSelectedTab} />}
            {selectedTab === "registerotp" && (
              <RegisterOTP onSelectTab={setSelectedTab} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginOrSignup;
