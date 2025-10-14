import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import createSalesLead, { SalesLeadCreationResponse } from "../../services/postpaid/createSalesLead";

interface OtherRequestPageProps {
  telephoneNo: string;
  selectedItem: string;
}

const OtherRequestPage: React.FC<OtherRequestPageProps> = ({ telephoneNo, selectedItem }) => {
  const { t } = useTranslation();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nic, setNic] = useState<string>("");
  const [contactTelNo, setContactTelNo] = useState<string>("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const BroadbandIcon = "https://mysltimages.s3.eu-north-1.amazonaws.com/Broadband.png";
  const PeoTVIcon = "https://mysltimages.s3.eu-north-1.amazonaws.com/PeoTV.png";
  const VoiceIcon = "https://mysltimages.s3.eu-north-1.amazonaws.com/Voice.png";

  const handleClick = (item: string) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
  };

  const buttonItems = [
    { label: "PeoTV", image: PeoTVIcon },
    { label: "Voice", image: VoiceIcon },
    { label: "Broadband", image: BroadbandIcon },
  ];

  const commonFontStyle = {
    color: "#00256A",
    fontSize: 16,
    fontWeight: "bold",
  };

  const TextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#057DE81A",
      height: 40,
      width: { sm: "60vw", md: "60vw", lg: "27vw" },
      borderRadius: "10px",
      "& fieldset": {
        border: "none",
      },
    },
    input: {
      color: "#00256A",
    },
  };

  const ButtonStyle = (isSelected: boolean) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: isSelected ? 27.5 : 25,
    height: isSelected ? 27.5 : 25,
    padding: 1.5,
    border: isSelected ? "4px solid #0056A2" : "3px solid #0056A2",
    borderRadius: "100%",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: isSelected ? "scale(1)" : "scale(1.1)",
    },
  });

  const handleSubmit = async () => {
    const response: SalesLeadCreationResponse | null = await createSalesLead(
      telephoneNo,
      firstName,
      lastName,
      nic,
      contactTelNo,
      selectedItems,
      selectedItem
    );

    if (response) {
      if (response.isSuccess) {
        setIsSuccess(true);
        setMessage(t("newConnectionCreated"));
      } else {
        setIsSuccess(false);
        setMessage(response.errorMessege || t("unexpectedError"));
      }
    } else {
      setIsSuccess(false);
      setMessage(t("unexpectedError"));
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box
      sx={{
        paddingX: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t("firstName")}
            </Typography>
            <TextField
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t("lastName")}
            </Typography>
            <TextField
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t("nic")}
            </Typography>
            <TextField
              variant="outlined"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 1 }}>
            <Typography variant="body2" sx={{ ...commonFontStyle }}>
              {t("mobileNumber")}
            </Typography>
            <TextField
              variant="outlined"
              value={contactTelNo}
              onChange={(e) => setContactTelNo(e.target.value)}
              sx={{ ...TextFieldStyle }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          padding: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "5vw",
        }}
      >
        {buttonItems.map((item) => {
          const isSelected = selectedItems.includes(item.label);
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50px",
                height: "80px",
              }}
              key={item.label}
            >
              <Button
                onClick={() => handleClick(item.label)}
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={ButtonStyle(isSelected)}>
                  <img src={item.image} alt={item.label} width={20} />
                </Box>
                <Typography
                  sx={{
                    color: isSelected ? "#0056A2" : "#00256A",
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {item.label}
                </Typography>
              </Button>
            </Box>
          );
        })}
      </Box>

      <Button
        sx={{
          mt: 2,
          paddingX: 4,
          border: "2px solid #00256A",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#057DE81A",
            transition: "all 0.3s ease",
          },
        }}
        onClick={handleSubmit}
      >
        <Typography
          variant="body2"
          sx={{ ...commonFontStyle, fontSize: 16, textTransform: "capitalize" }}
        >
          {t("submit")}
        </Typography>
      </Button>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center", color: isSuccess ? "green" : "red" }}>
          {isSuccess ? t("success") : t("error")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#0056A2",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OtherRequestPage;
