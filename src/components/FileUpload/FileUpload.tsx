"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Input, Typography } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const CustomInput = styled("input")({
  background: "green",
  border: "none",
  padding: "0px 30px",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px",
  boxShadow: "0px 6px 10px -3px rgba(0,0,0,0.75)",
  fontSize: "14px",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "#18680d",
  },
});

export default function FileUpload() {
  const [file, setFile] = React.useState<File | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files ? event.target.files[0] : null);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res?.ok) {
        throw new Error(await res.text());
      }
    } catch (e: any) {
      console.log(e);
    }
  };
  console.log("Current file:", file);
  return (
    <Box
      gap={2}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Typography variant="h6">Upload Images or PDFs</Typography>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} gap={4}>
          <Button
            variant="contained"
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Choose file
            <VisuallyHiddenInput
              type="file"
              name="file"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
            />
          </Button>
          <CustomInput type="submit" value="UPLOAD FILE" />
        </Box>
      </form>
      {file && <Typography variant="h6">{file?.name}</Typography>}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4}
        width="100%"
      ></Box>
    </Box>
  );
}
