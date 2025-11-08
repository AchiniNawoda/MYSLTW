import React, { useState } from "react";
import { Box, Tabs, Tab, Paper, Typography, Button, Divider } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PhoneIcon from '@mui/icons-material/Phone';
import SmsIcon from '@mui/icons-material/Sms';
import CallIcon from '@mui/icons-material/Call';

interface UsageHistoryProps {
  onBack: () => void;
}

interface UsageCardProps {
  updatedAt: string;
  title: string;
  used: number;
  total: number;
  remaining: string;
  unit: string;
  expiry: string;
}

const colorScheme = {
  primaryDark: 'rgb(13, 54, 90)',
  primaryLight: 'rgb(25, 71, 114)',
  accent: 'rgb(0, 168, 232)',
  secondaryAccent: 'rgb(64, 196, 255)',
  highlight: 'rgba(100, 210, 255, 0.3)',
  textPrimary: 'rgba(255, 255, 255, 0.95)',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  divider: 'rgba(255, 255, 255, 0.12)',
  cardBg: 'rgba(18, 63, 102, 0.4)',
  buttonGradient: 'linear-gradient(135deg, rgba(0, 168, 232, 0.9) 0%, rgba(64, 196, 255, 0.9) 100%)',
  navbarBg: 'rgba(13, 54, 90, 0.9)',
  glassEffect: 'rgba(255, 255, 255, 0.05)',
  glowEffect: 'rgba(64, 196, 255, 0.3)'
};

export default function UsageHistory({ onBack }: UsageHistoryProps) {
  const [usageTab, setUsageTab] = useState(0);

  return (
    <Box sx={{ 
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }}>
      {/* Button Container with Adjusted Layout */}
      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        mb: 1
      }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{
            color: colorScheme.textPrimary,
            zIndex: 2,
            transition: 'all 0.3s ease',
            px: 2,
            py: 1,
            borderRadius: '8px',
            backgroundColor: 'transparent',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 700,
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'rgba(0, 168, 232, 0.1)',
              transform: 'translateX(-5px)',
              boxShadow: `0 0 12px ${colorScheme.glowEffect}`
            },
            '& .MuiSvgIcon-root': {
              transition: 'all 0.3s ease',
              marginRight: '8px',
              fontSize: '1.25rem'
            },
            '&:hover .MuiSvgIcon-root': {
              transform: 'translateX(-3px)'
            }
          }}
        >
          Usage History
        </Button>
      </Box>

      {/* Tabs - Unchanged */}
      <Tabs
        value={usageTab}
        onChange={(e, newValue) => setUsageTab(newValue)}
        centered
        textColor="inherit"
        sx={{
          mb: 4,
          borderRadius: "12px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          '.MuiTabs-flexContainer': { gap: 1 },
          '.MuiTab-root': {
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 600,
            borderRadius: '8px',
            minHeight: '48px',
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#00e6e6',
              background: 'rgba(0,230,230,0.1)'
            }
          }
        }}
      >
        <Tab icon={<DataUsageIcon />} label="Data" />
        <Tab icon={<PhoneIcon />} label="Voice" />
        <Tab icon={<SmsIcon />} label="SMS" />
        <Tab icon={<CallIcon />} label="Call" />
      </Tabs>

      {/* Tab Content - Unchanged */}
      <Paper sx={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '16px',
        p: 3,
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white'
      }}>
        {usageTab === 1 ? (
          <>
            <UsageCard
              updatedAt="28/04/2025 12:23 PM"
              title="Voice M2M"
              used={20}
              total={777}
              remaining="757 min"
              unit="min"
              expiry="2025-05-03 07:04:57"
            />
            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.3)' }} />
            <UsageCard
              updatedAt="28/04/2025 12:23 PM"
              title="M2O Voice"
              used={168}
              total={1000}
              remaining="832 min"
              unit="min"
              expiry="2025-05-03 07:04:57"
            />
          </>
        ) : usageTab === 2 ? (
          <>
            <UsageCard
              updatedAt="28/04/2025 12:30 PM"
              title="M2M SMS"
              used={2}
              total={777}
              remaining="775"
              unit=""
              expiry="2025-05-03 07:04:57"
            />
            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.3)' }} />
            <UsageCard
              updatedAt="28/04/2025 12:30 PM"
              title="M2O SMS"
              used={126}
              total={1000}
              remaining="378"
              unit=""
              expiry="2025-05-03 07:04:57"
            />
          </>
        ) : usageTab === 3 ? (
          <>
            <UsageCard
              updatedAt="28/04/2025 12:35 PM"
              title="Loyalty Voice"
              used={0}
              total={2}
              remaining="2"
              unit=""
              expiry="2025-05-03 07:04:57"
            />
            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.3)' }} />
            <UsageCard
              updatedAt="28/04/2025 12:35 PM"
              title="Call Center Voice"
              used={0}
              total={3}
              remaining="3"
              unit=""
              expiry="2025-05-03 07:04:57"
            />
          </>
        ) : (
          <UsageCard
            updatedAt="28/04/2025 11:22 AM"
            title="Anytime"
            used={1.88}
            total={2}
            remaining="122.61 MB"
            unit="GB"
            expiry="2025-05-03 07:04:57"
          />
        )}
      </Paper>
    </Box>
  );
}

// Usage Card Component - Unchanged
const UsageCard = ({ updatedAt, title, used, total, remaining, unit, expiry }: UsageCardProps) => {
  const progress = (used / total) * 100;
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 0.5 }}>
        Updated as at {updatedAt}
      </Typography>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: 'white' }}>
        {title}
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2, color: 'rgba(255,255,255,0.7)' }}>
        Bundle
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <Box sx={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 5 }}>
            <Box sx={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00e6e6, #0099cc)',
              borderRadius: 5
            }} />
          </Box>
        </Box>
        <Typography variant="body2" fontWeight={600}>
          {remaining}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          {used} {unit} used of {total} {unit}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
          Remaining
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
        Expires on: {expiry}
      </Typography>
    </Box>
  );
};