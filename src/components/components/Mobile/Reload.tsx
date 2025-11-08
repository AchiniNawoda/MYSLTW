// ✅ Updated Reload.tsx
import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { keyframes } from "@emotion/react";
import ReloadHistory from "./ReloadHistory";
import EBill from "./Ebill";
import Payment from "./Payment";

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const colorScheme = {
  primary: "rgb(255, 255, 255)",
  primaryLight: "rgb(250, 250, 250)",
  primaryDark: "rgb(245, 245, 245)",
  accent: "rgb(0, 120, 212)",
  secondaryAccent: "rgb(0, 95, 184)",
  highlight: "rgba(0, 120, 212, 0.1)",
  textPrimary: "rgba(0, 0, 0, 0.87)",
  textSecondary: "rgba(0, 0, 0, 0.6)",
  divider: "rgba(0, 0, 0, 0.12)",
  cardBg: "rgba(255, 255, 255, 0.9)",
  buttonGradient:
    "linear-gradient(135deg, rgba(0, 120, 212, 0.9) 0%, rgba(0, 95, 184, 0.9) 100%)",
  navbarBg: "rgba(255, 255, 255, 0.95)",
  glassEffect: "rgba(255, 255, 255, 0.7)",
  glowEffect: "rgba(0, 120, 212, 0.2)",
  shadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
};

const reloadBundles = [
  { name: "Rs.100 Reload", bonus: "5% Extra Credit", validity: "7 Days" },
  { name: "Rs.200 Reload", bonus: "10% Extra Credit", validity: "14 Days" },
  { name: "Rs.500 Reload", bonus: "20% Extra Credit", validity: "30 Days" },
  { name: "Rs.1000 Reload", bonus: "30% Extra Credit", validity: "60 Days" },
];

export default function Reload({ onBack, isMobile = false }) {
  const [showHistory, setShowHistory] = useState(false);
  const [showEBill, setShowEBill] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");

  const currentBalance = "Rs. 452.75";

  if (showHistory) {
    return (
      <ReloadHistory onBack={() => setShowHistory(false)} isMobile={isMobile} />
    );
  }

  if (showEBill) {
    return <EBill onBack={() => setShowEBill(false)} isMobile={isMobile} />;
  }

  if (showPayment) {
    return (
      <Payment
        onBack={() => setShowPayment(false)}
        defaultAmount={selectedAmount}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "440px",
        height: "100%",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1300px",
            backgroundColor: colorScheme.primary,
            borderRadius: "12px",
            boxShadow: colorScheme.shadow,
            overflow: "hidden",
            p: 3,
          }}
        >
          <Box sx={{ position: "relative", mb: 3, height: "40px" }}>
            <Button
              onClick={onBack}
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                minWidth: "auto",
                p: 0.5,
                color: colorScheme.accent,
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
              }}
            >
              <ArrowBackIcon fontSize="medium" />
            </Button>
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: 700,
                fontSize: "24px",
                color: colorScheme.accent,
                textAlign: "center",
              }}
            >
              Reload
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <Box
              sx={{
                width: "260px",
                backgroundColor: colorScheme.cardBg,
                borderRadius: "12px",
                border: `1px solid ${colorScheme.highlight}`,
                p: 3,
                boxShadow: colorScheme.shadow,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                    color: colorScheme.secondaryAccent,
                    mb: 1,
                  }}
                >
                  Current Balance
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: colorScheme.accent }}
                >
                  {currentBalance}
                </Typography>
              </Box>
              <Button
                fullWidth
                onClick={() => setShowHistory(true)}
                sx={{ ...buttonStyle }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                    color: colorScheme.accent,
                    textTransform: "capitalize",
                  }}
                >
                  Reload History
                </Typography>
              </Button>
              <Button
                fullWidth
                onClick={() => setShowEBill(true)}
                sx={{ ...buttonStyle }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    fontSize: "18px",
                    color: colorScheme.accent,
                    textTransform: "none",
                  }}
                >
                  Download eBill
                </Typography>
              </Button>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  fontSize: "18px",
                  color: colorScheme.secondaryAccent,
                  mb: 2,
                }}
              >
                Quick Reload
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 2,
                }}
              >
                {reloadBundles.map((bundle, index) => (
                  <Paper
                    key={index}
                    sx={{
                      height: 200,
                      background: colorScheme.cardBg,
                      borderRadius: "12px",
                      p: 2,
                      border: "2px solid rgba(0, 150, 255, 0.6)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: colorScheme.highlight,
                        transform: "translateY(-4px)",
                        boxShadow: `0 8px 20px ${colorScheme.glowEffect}`,
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontSize: "18px",
                          color: colorScheme.secondaryAccent,
                        }}
                      >
                        {bundle.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: colorScheme.textSecondary, mt: 0.5 }}
                      >
                        {bundle.validity}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#27ae60", fontWeight: 600, mt: 0.5 }}
                      >
                        {bundle.bonus}
                      </Typography>
                    </Box>
                    <Button
                      fullWidth
                      sx={{
                        border: `1px solid ${colorScheme.accent}`,
                        color: colorScheme.accent,
                        py: 1,
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "1rem",
                        position: "relative",
                        overflow: "hidden",
                        backgroundColor: "transparent",
                        "&:hover": {
                          backgroundColor: colorScheme.highlight,
                          transform: "translateY(-2px)",
                          boxShadow: `0 5px 15px ${colorScheme.glowEffect}`,
                          "&::before": { opacity: 1 },
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: colorScheme.glassEffect,
                          opacity: 0,
                          transition: "opacity 0.5s ease",
                          animation: `${shimmer} 2s infinite`,
                        },
                      }}
                      onClick={() => {
                        const numericAmount = bundle.name.replace(/[^\d]/g, "");
                        setSelectedAmount(numericAmount);
                        setShowPayment(true);
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontSize: "18px",
                          color: colorScheme.accent,
                        }}
                      >
                        Reload Now
                      </Typography>
                    </Button>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const buttonStyle = {
  color: colorScheme.accent,
  py: 1,
  borderRadius: "8px",
  border: `1px solid ${colorScheme.accent}`,
  fontWeight: 600,
  fontSize: "0.875rem",
  background: "rgba(0, 120, 212, 0.03)",
  "&:hover": {
    background: "rgba(0, 120, 212, 0.08)",
    borderColor: colorScheme.secondaryAccent,
  },
};
