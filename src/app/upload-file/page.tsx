import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Logout from "@/components/LogoutForm/LogoutForm";
import { Avatar, Box, Container, Typography } from "@mui/material";
import FileUpload from "@/components/FileUpload/FileUpload";

const FileUploadPage = async () => {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h5"> Welcome, {session?.user?.name}</Typography>
        <Logout />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          paddingTop: "13rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FileUpload />
      </Box>
    </Container>
  );
};

export default FileUploadPage;
