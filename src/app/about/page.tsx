import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Logout from "@/components/LogoutForm/LogoutForm";
import { Avatar, Box, Container, Typography } from "@mui/material";
import About from "@/components/About/About";

const HomePage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Typography variant="h5">Welcome, {session?.user?.name}</Typography>
        <Avatar
          sx={{ width: 56, height: 56, mt: 2 }}
          alt={session?.user?.name || ""}
          src={session?.user?.image || ""}
        />
        <About />
        <Logout />
      </Box>
    </Container>
  );
};

export default HomePage;
