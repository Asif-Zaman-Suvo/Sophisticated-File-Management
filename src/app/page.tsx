import { getServerSession } from "next-auth";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default async function Home() {
  const session = await getServerSession();
  console.log(session, "sess");

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {session?.user?.name ? (
          <Box>
            <Avatar
              alt={session?.user?.name}
              src={session?.user?.image || ""}
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h5" component="h1" gutterBottom>
              Welcome, {session?.user?.name}!
            </Typography>
            <Typography variant="body1">
              You are logged in as {session?.user?.email}.
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}
