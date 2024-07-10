import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Logout from "@/components/LogoutForm/LogoutForm";
import { Box, Container, Typography } from "@mui/material";
import FileUpload from "@/components/FileUpload/FileUpload";
import DrawingCanvas from "@/components/DrawingCanvas/DrawingCanvas";

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
          flexDirection: "column",
          gap: 5,
          alignItems: "center",
        }}
      >
        <FileUpload />
        <DrawingCanvas />
      </Box>
    </Container>
  );
};

export default FileUploadPage;
