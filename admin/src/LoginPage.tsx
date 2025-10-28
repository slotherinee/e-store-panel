import { Login, LoginForm } from "react-admin";
import { Box, Typography } from "@mui/material";

export const CustomLoginPage = () => (
  <Login backgroundImage="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80">
    <Box
      sx={{
        marginTop: -2,
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Panel
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Sign in with your admin credentials
      </Typography>
    </Box>
    <LoginForm />
  </Login>
);
