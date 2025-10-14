import React from "react";

import { Box, Typography } from "@mui/material";

const NotificationsComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "450px",
        backgroundColor: "white",
        borderRadius: 3,
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <Typography variant="h6" color="textSecondary">
        Notifications Component is under construction.
      </Typography>
    </Box>
  );
};

export default NotificationsComponent;