"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoginIcon from "@mui/icons-material/Login";
import Stack from "@mui/material/Stack";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "97vh",
      }}
    >
      {session ? (
        <>
          <Typography variant="body1">
            Signed in as {session?.user?.name}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => signOut()}
            sx={{ mt: 2 }}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>
          <Stack spacing={2} alignItems="center">
            <LoginIcon sx={{ fontSize: 50 }} />
            <Typography variant="h4">Sign in</Typography>
            <Typography variant="body1">
              You must be authenticated to use the app
            </Typography>
            <Button
              startIcon={<GitHubIcon />}
              variant="contained"
              color="primary"
              onClick={() => signIn()}
              sx={{ mt: 2 }}
            >
              SIGN IN WITH GITHUB
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
