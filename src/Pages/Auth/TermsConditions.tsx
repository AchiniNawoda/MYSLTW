import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface TermsDialogProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const TermsConditions = ({ open, onClose, onAccept }: TermsDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "15px",
          padding: "10px",
        }
      }}
    >
      <DialogTitle sx={{ 
        color: "#0F3B7A", 
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "1.5rem",
        padding: "20px 24px 10px",
      }}>
        {t("signup.terms.dialogTitle")}
      </DialogTitle>
      <DialogContent sx={{ padding: "20px 24px" }}>
        <Box sx={{ 
          maxHeight: "400px", 
          overflow: "auto",
          paddingRight: "10px",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}>
          <Typography variant="body2" sx={{ color: "#0F3B7A", whiteSpace: "pre-line" }}>
            {t("signup.terms.content")}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ 
        padding: "16px 24px 20px",
        justifyContent: "center",
        gap: "15px"
      }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            color: "#0F3B7A",
            borderColor: "#0F3B7A",
            borderRadius: "50px",
            padding: "8px 24px",
            fontWeight: "bold",
            "&:hover": {
              borderColor: "#003b5c",
              backgroundColor: "rgba(15, 59, 122, 0.04)"
            },
          }}
        >
          {t("signup.terms.cancel")}
        </Button>
        <Button 
          onClick={onAccept} 
          variant="contained"
          sx={{ 
            backgroundColor: "#0F3B7A",
            borderRadius: "50px",
            padding: "8px 24px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#003b5c",
            },
          }}
        >
          {t("signup.terms.accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsConditions;