"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, Typography } from "@mui/material";

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

const FileViewer = styled("div")({
  marginTop: "20px",
  border: "1px solid #ccc",
  padding: "10px",
  width: "100%",
  maxWidth: "600px",
  borderRadius: "5px",
  boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const FileItem = styled("div")({
  marginBottom: "10px",
  padding: "5px",
  width: "100%",
  textAlign: "left",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "& a": {
    textDecoration: "none",
    color: "#007bff",
  },
  "& a:hover": {
    textDecoration: "underline",
  },
});

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  console.log(uploadedFiles, "uploaded files");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files ? event.target.files[0] : null);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;
    console.log(file, "file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://sophisticated-management-backend-production.up.railway.app/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        setUploadedFiles((prev) => [...prev, result.filePath]);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

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
      {file && <Typography variant="h6">{file.name}</Typography>}

      {uploadedFiles?.length > 0 && (
        <FileViewer>
          <Typography variant="h6">Uploaded Files</Typography>
          {uploadedFiles?.map((filePath, index) => (
            <FileItem key={index}>
              <Typography>{filePath}</Typography>
            </FileItem>
          ))}
        </FileViewer>
      )}
    </Box>
  );
}
