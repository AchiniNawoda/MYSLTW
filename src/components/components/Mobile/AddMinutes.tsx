import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { keyframes } from '@emotion/react';

interface AddMinutesProps {
  onBack: () => void;
  isMobile?: boolean;
}

const minuteBundles = [
  { name: "100 Minutes", price: "Rs.99.00", validity: "3 Days" },
  { name: "200 Minutes", price: "Rs.149.00", validity: "7 Days" },
  { name: "500 Minutes", price: "Rs.299.00", validity: "14 Days" },
  { name: "Unlimited Talk", price: "Rs.499.00", validity: "30 Days" },
  { name: "Night Talk", price: "Rs.59.00", validity: "1 Night (10 PM - 6 AM)" },
  { name: "Weekend Talk", price: "Rs.199.00", validity: "Sat - Sun" },
  { name: "Work Hour Pack", price: "Rs.149.00", validity: "Mon - Fri (8 AM - 5 PM)" },
  { name: "Student Offer", price: "Rs.89.00", validity: "5 Days" },
];

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const colorScheme = {
  primary: 'rgb(255, 255, 255)',
  primaryLight: 'rgb(250, 250, 250)',
  primaryDark: 'rgb(245, 245, 245)',
  accent: 'rgb(0, 120, 212)',
  secondaryAccent: 'rgb(0, 95, 184)',
  highlight: 'rgba(0, 120, 212, 0.1)',
  textPrimary: 'rgba(0, 0, 0, 0.87)',
  textSecondary: 'rgba(0, 0, 0, 0.6)',
  divider: 'rgba(0, 0, 0, 0.12)',
  cardBg: 'rgba(255, 255, 255, 0.9)',
  buttonGradient: 'linear-gradient(135deg, rgba(0, 120, 212, 0.9) 0%, rgba(0, 95, 184, 0.9) 100%)',
  navbarBg: 'rgba(255, 255, 255, 0.95)',
  glassEffect: 'rgba(255, 255, 255, 0.7)',
  glowEffect: 'rgba(0, 120, 212, 0.2)',
  shadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
};

export default function AddMinutes({ onBack, isMobile = false }: AddMinutesProps) {
  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '440px', height: '100%' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '1300px', backgroundColor: colorScheme.primary, borderRadius: '12px', boxShadow: colorScheme.shadow, overflow: 'hidden', position: 'relative', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, position: 'relative' }}>
            <Button onClick={onBack} sx={{ minWidth: 'auto', p: 0.5, mr: 2, color: colorScheme.accent, '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' } }}>
              <ArrowBackIcon fontSize="medium" />
            </Button>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '24px', color: colorScheme.accent }}>Add Minutes</Typography>
            </Box>
            <Box sx={{ width: '40px' }} />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 2, overflow: 'hidden', pr: 0 }}>
            {minuteBundles.map((bundle, index) => (
              <Paper key={index} sx={{ height: 200, background: colorScheme.cardBg, color: colorScheme.accent, borderRadius: '12px', p: 2, border: `1px solid ${colorScheme.highlight}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease', '&:hover': { background: colorScheme.highlight, transform: 'translateY(-4px)', boxShadow: `0 8px 20px ${colorScheme.glowEffect}` } }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '18px', color: colorScheme.secondaryAccent }}>{bundle.name}</Typography>
                  <Typography variant="body2" sx={{ color: colorScheme.textSecondary, mt: 0.5 }}>{bundle.validity}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '20px', mb: 1, color: '#27ae60' }}>{bundle.price}</Typography>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      border: `1px solid ${colorScheme.accent}`,
                      color: colorScheme.accent,
                      py: 1,
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      position: 'relative',
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: colorScheme.highlight,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 5px 15px ${colorScheme.glowEffect}`,
                        '&::before': { opacity: 1 }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: colorScheme.glassEffect,
                        opacity: 0,
                        transition: 'opacity 0.5s ease',
                        animation: `${shimmer} 2s infinite`
                      }
                    }}
                    onClick={() => alert(`Buy ${bundle.name}`)}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '18px', color: colorScheme.accent, textTransform: 'capitalize' }}>Activate</Typography>
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}