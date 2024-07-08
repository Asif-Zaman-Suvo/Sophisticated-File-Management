import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import LoginForm from "@/components/LoginForm/LoginForm";

export default async function Home() {
  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Its time to sign in
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}
