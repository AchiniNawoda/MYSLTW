import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchAccountDetails from "../../services/fetchAccountDetails";
import removeAccount from "../../services/profile/removeAccount";
import AddAccountForm from "../AddAccountForm"; 

const PhoneNumberList: React.FC = () => {
  const [phoneNumbers, setPhoneNumbers] = useState<
    { phoneNumber: string; accountNo: string }[]
  >([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const watermarkLogo = "https://mysltimages.s3.eu-north-1.amazonaws.com/watermarklogo.png";
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<string | null>(
    null
  );
  const [selectedAccountNo, setSelectedAccountNo] = useState<string | null>(
    null
  );
  const [showAddForm, setShowAddForm] = useState<boolean>(false); // State to toggle AddAccountForm popup
  const navigate = useNavigate();

  useEffect(() => {
    const getAccountDetails = async () => {
      const accountData = await fetchAccountDetails();
      if (accountData) {
        const phoneNumbersList = accountData.map((item) => ({
          phoneNumber: item.telephoneno,
          accountNo: item.accountno,
        }));
        setPhoneNumbers(phoneNumbersList);
      }
    };

    getAccountDetails();
  }, []);

  const handleDeleteClick = (accountNo: string, phoneNo: string) => {
    setSelectedAccountNo(accountNo);
    setSelectedPhoneNumber(phoneNo);
    setOpenDialog(true);
  };

  const handleDeleteConfirmation = async (confirm: boolean) => {
    if (confirm && selectedAccountNo && selectedPhoneNumber) {
      const response = await removeAccount(selectedAccountNo, selectedPhoneNumber);
      if (response) {
        navigate("/login");
      }
    }
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "450px",
        backgroundColor: "white",
        borderRadius: 3,
        padding: 2,
        boxShadow: 3,
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: "24px",
          color: "#0056A2",
          fontWeight: "bold",
          marginBottom: "20px",
          mb: 5,
        }}
      >
        Manage Connection
      </Typography>

      {phoneNumbers.map(({ phoneNumber, accountNo }, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "80%",
            padding: 1,
            marginBottom: 1,
            backgroundColor: "#0056A2",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ ml: 2, fontSize: "16px", color: "white" }}
          >
            {phoneNumber}
          </Typography>
          <IconButton
            onClick={() => handleDeleteClick(accountNo, phoneNumber)}
            sx={{ color: "white", marginLeft: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      {/* Add Account Button */}
      {phoneNumbers.length < 4 && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: 5,
            backgroundColor: "#0056A2",
            "&:hover": {
              backgroundColor: "#004080",
            },
          }}
          onClick={() => setShowAddForm(true)} // Show the AddAccountForm popup
        >
          Add Account
        </Button>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>Do you want to remove this account?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDeleteConfirmation(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleDeleteConfirmation(true)} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Account Popup */}
      <Dialog
        open={showAddForm}
        onClose={() => setShowAddForm(false)} // Close the AddAccountForm
        
        PaperProps={{
          sx: {
            borderRadius: 3, // Add smooth corners
            overflow: "hidden",
          },
        }}
      >
        <AddAccountForm />
      </Dialog>

      {/* Watermark */}
      <Box sx={{ position: "absolute", right: "2%", bottom: "2%" }}>
        <img
          src={watermarkLogo}
          alt="Watermark Logo"
          style={{ height: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default PhoneNumberList;
