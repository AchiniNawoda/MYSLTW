import React from "react";
import { Box, Typography, Button, Paper, Divider, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { keyframes } from '@emotion/react';

interface ReloadHistoryProps {
  onBack: () => void;
  isMobile?: boolean;
}

const transactions = [
  { date: "28 Apr 2025", time: "10:29 PM", amount: "Rs.200.00" },
  { date: "01 Apr 2025", time: "11:13 PM", amount: "Rs.200.00" },
  { date: "01 Apr 2025", time: "11:12 PM", amount: "Rs.500.00" },
  { date: "01 Mar 2025", time: "10:41 PM", amount: "Rs.500.00" },
  { date: "01 Mar 2025", time: "10:37 PM", amount: "Rs.100.00" },
  { date: "26 Feb 2025", time: "6:01 AM", amount: "Rs.100.00" },
  { date: "11 Feb 2025", time: "5:58 AM", amount: "Rs.200.00" },
];

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const colorScheme = {
  primary: 'rgb(255, 255, 255)',
  primaryDark: 'rgb(245, 245, 245)',
  accent: 'rgb(0, 120, 212)',
  secondaryAccent: 'rgb(0, 95, 184)',
  highlight: 'rgba(0, 120, 212, 0.1)',
  textPrimary: 'rgba(0, 0, 0, 0.87)',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
  divider: 'rgba(0, 0, 0, 0.12)',
  cardBg: 'rgba(255, 255, 255, 0.9)',
  glassEffect: 'rgba(255, 255, 255, 0.7)',
  glowEffect: 'rgba(0, 120, 212, 0.2)',
  shadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
};

export default function ReloadHistory({ onBack, isMobile = false }: ReloadHistoryProps) {
  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '440px', height: '100%' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '1300px', backgroundColor: colorScheme.primary, borderRadius: '12px', boxShadow: colorScheme.shadow, overflow: 'hidden', position: 'relative', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, position: 'relative' }}>
            <Button onClick={onBack} sx={{ minWidth: 'auto', p: 0.5, mr: 2, color: colorScheme.accent, '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' } }}>
              <ArrowBackIcon fontSize="medium" />
            </Button>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '24px', color: colorScheme.accent }}>Reload History</Typography>
            </Box>
            <Box sx={{ width: '40px' }} />
          </Box>

          <Paper sx={{ background: colorScheme.cardBg, borderRadius: '16px', p: 2, border: `1px solid ${colorScheme.highlight}`, boxShadow: colorScheme.shadow }}>
            {transactions.map((tx, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colorScheme.textPrimary }}>
                      {tx.date}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colorScheme.textSecondary }}>
                      {tx.time}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: colorScheme.accent }}>
                      {tx.amount}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography variant="caption" sx={{ color: "#00cc44", fontWeight: 600 }}>
                        OTHER
                      </Typography>
                      <Box sx={{
                        px: 0.8,
                        py: 0.2,
                        backgroundColor: "#00cc44",
                        color: "white",
                        fontSize: "0.75rem",
                        borderRadius: "4px",
                        fontWeight: 600,
                        lineHeight: 1,
                      }}>
                        Rs
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                {index !== transactions.length - 1 && (
                  <Divider sx={{ my: 2, borderColor: colorScheme.divider }} />
                )}
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}