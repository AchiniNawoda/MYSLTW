import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { textFieldStyle } from "../assets/Themes/CommonStyles";
import addAccountPrepaid from "../services/addAccount/addAccountPrepaid";
import addAccountRequest from "../services/addAccount/addAccountRequest"; // Import the addAccountRequest function
import vasAccountRequest from "../services/addAccount/vasAccountRequest";
import { useNavigate } from "react-router-dom";

const AddAccountForm: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [postPaid, setPostPaid] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    telephone: "",
    accountNumber: "",
    nationalId: "",
    broadbandId: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null); // message for dialog
  const [openDialog, setOpenDialog] = useState(false); // Dialog open state
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);

    if (tabValue === 0 && !postPaid) {
      try {
        const response = await addAccountPrepaid(formData.telephone, formData.nationalId); // Pass telephone and nationalId
        console.log("API Response: ", response);

        // Check if there's an error message in the response and display it
        if (response.errorShow) {
          setMessage(response.errorShow); // Set error message
          setOpenDialog(true); // Open dialog
          return;
        }
        // Success
        setMessage("Account successfully added!");
        setOpenDialog(true);


        //Navigate to home or refresh account list here if needed
        navigate("/home");


      } catch (error) {
        console.error("API Request failed:", error);
      }
    }

    // If the tab is for postpaid, call the addAccountRequest API
    if (tabValue === 0 && postPaid) {
      try {
        const response = await addAccountRequest(
          formData.accountNumber,
          formData.telephone,
          formData.nationalId
        );
        console.log("API Response: ", response);

        // Check if there's an error message in the response and display it
        if (response.errorShow) {
          setMessage(response.errorShow); // Set error message
          setOpenDialog(true); // Open dialog
          return; //prevent adding account when there is an error
        }

          setMessage("Account successfully added!");
          setOpenDialog(true);

        
        //Navigate to home or refresh account list here if needed
        navigate("/home");


      } catch (error) {
        console.error("API Request failed:", error);
      }
    }

    // Call API function for broadband tab
    if (tabValue === 1) {
      try {
        const response = await vasAccountRequest(formData.broadbandId, formData.password);
        console.log("API Response: ", response);

        // Check if there's an error message in the response and display it
        if (response.errorShow) {
          setMessage(response.errorShow); // Set error message
          setOpenDialog(true); // Open dialog
          return;
        }

          setMessage("Account successfully added!");
          setOpenDialog(true);

        //Navigate to home or refresh account list here if needed
        navigate("/home");

      } catch (error) {
        console.error("API Request failed:", error);
      }
    }
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false); // Close the dialog
  };

  if (!showForm) return null;

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "white",
        color: "#0056A2",
        borderRadius: 2,
        p: 3,
        maxWidth: 400,
        mx: "auto",
        height: "470px",
        boxShadow: "none",
      }}
    >
      {/* Close Icon */}
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#0056A2",
        }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="body2" align="center" sx={{ fontSize: 24, fontWeight: "bold" }}>
        ── Add Account ──
      </Typography>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, newValue: number) => setTabValue(newValue)}
        centered
        sx={{
          "& .MuiTabs-indicator": { backgroundColor: "#4FD745" },
          "& .MuiTab-root": {
            color: "#B0C4DE",
            fontWeight: "bold",
          },
          "& .Mui-selected": { color: "#4FD745 !important" },
        }}
      >
        <Tab label="Telephone" />
        <Tab label="Broadband" />
      </Tabs>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {tabValue === 0 ? (
          <>
            {/* Postpaid/Prepaid Radio Buttons */}
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                row
                value={postPaid ? "postpaid" : "prepaid"}
                onChange={(e) => setPostPaid(e.target.value === "postpaid")}
              >
                <FormControlLabel
                  value="postpaid"
                  control={
                    <Radio
                      sx={{
                        color: "#0056A2",
                        "&.Mui-checked": { color: "#0056A2" },
                      }}
                    />
                  }
                  label="Post paid"
                  sx={{ color: "#0056A2" }}
                />
                <FormControlLabel
                  value="prepaid"
                  control={
                    <Radio
                      sx={{
                        color: "#0056A2",
                        "&.Mui-checked": { color: "#0056A2" },
                      }}
                    />
                  }
                  label="Pre paid"
                  sx={{ color: "#0056A2" }}
                />
              </RadioGroup>
            </FormControl>

            {/* Telephone Fields */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                mb: 1,
                mt: 1,
                textAlign: "left",
              }}
            >
              Telephone :
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              required
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              sx={{
                ...textFieldStyle(),
              }}
            />

            {/* Conditional Rendering: Hide SLT Account Number if Prepaid */}
            {postPaid && (
              <>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#0056A2",
                    mb: 1,
                    mt: 1,
                    textAlign: "left",
                  }}
                >
                  Account Number :
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  required
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  sx={{
                    ...textFieldStyle(),
                  }}
                />
              </>
            )}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                mb: 1,
                mt: 1,
                textAlign: "left",
              }}
            >
              National ID Card Number :
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              size="small"
              required
              name="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              sx={{
                ...textFieldStyle(),
              }}
            />
          </>
        ) : (
          <>
            {/* Broadband Fields */}
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                mb: 1,
                mt: 1,
                textAlign: "left",
              }}
            >
              Broadband ID :
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              size="small"
              required
              name="broadbandId"
              value={formData.broadbandId}
              onChange={handleChange}
              sx={{
                ...textFieldStyle(),
              }}
            />

            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: "#0056A2",
                mb: 1,
                mt: 2,
                textAlign: "left",
              }}
            >
              Password :
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{
                ...textFieldStyle(),
              }}
            />
          </>
        )}

        {/* Submit Button */}
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#4FD745",
            color: "white",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#42C93C" },
          }}
        >
          Submit
        </Button>
      </form>

      {/* Dialog to show error message */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>{message?.includes("successfully") ? "Success" : "Error"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddAccountForm;
