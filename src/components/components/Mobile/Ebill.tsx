import React, { useState } from "react";
import { Box, Typography, Button, TextField, FormControlLabel, Checkbox, RadioGroup, Radio, FormLabel, FormGroup } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { keyframes } from '@emotion/react';

interface EBillProps {
  onBack: () => void;
  isMobile?: boolean;
}

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
  buttonGradient: 'linear-gradient(135deg, rgba(0, 120, 212, 0.9) 0%, rgba(0, 95, 184, 0.9) 100%)',
  glassEffect: 'rgba(255, 255, 255, 0.7)',
  glowEffect: 'rgba(0, 120, 212, 0.2)',
  shadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
};

export default function EBill({ onBack, isMobile = false }: EBillProps) {
  const [sendToEmail, setSendToEmail] = useState("No");
  const [agree, setAgree] = useState(false);

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '440px', height: '100%' }}>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '1300px', backgroundColor: colorScheme.primary, borderRadius: '12px', boxShadow: colorScheme.shadow, overflow: 'hidden', position: 'relative', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, position: 'relative' }}>
            <Button onClick={onBack} sx={{ minWidth: 'auto', p: 0.5, mr: 2, color: colorScheme.accent, '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' } }}>
              <ArrowBackIcon fontSize="medium" />
            </Button>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '24px', color: colorScheme.accent }}>Download eBill</Typography>
            </Box>
            <Box sx={{ width: '40px' }} />
          </Box>

          <Box sx={{ background: colorScheme.cardBg, borderRadius: '12px', border: `1px solid ${colorScheme.highlight}`, p: 3, boxShadow: colorScheme.shadow, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: colorScheme.textPrimary }}>
              eBill Preferences
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <FormLabel component="legend">Select eBill Period</FormLabel>
                <TextField label="From" type="date" fullWidth InputLabelProps={{ shrink: true }} sx={{ mt: 1, backgroundColor: 'white', borderRadius: '8px' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField label="To" type="date" fullWidth InputLabelProps={{ shrink: true }} sx={{ mt: 4, backgroundColor: 'white', borderRadius: '8px' }} />
              </Box>
            </Box>

            <Box>
              <FormLabel component="legend">Select Bill Content</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Incoming" />
                <FormControlLabel control={<Checkbox />} label="Outgoing" />
              </FormGroup>
            </Box>

            <Box>
              <FormLabel component="legend">Send to email?</FormLabel>
              <RadioGroup
                row
                value={sendToEmail}
                onChange={(e) => setSendToEmail(e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>

            <FormControlLabel
              control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />}
              label="I agree to the Terms & Conditions"
            />

            <Button
              variant="outlined"
              fullWidth
              disabled={!agree}
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
              onClick={() => alert('Proceeding to download...')}
            >
              <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '18px', color: colorScheme.accent }}>
                Next
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
