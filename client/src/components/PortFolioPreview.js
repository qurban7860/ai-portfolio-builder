import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { jsPDF } from "jspdf";

const PortfolioPreview = () => {
  const { generatedPortfolio } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleExportPdf = () => {
    if (generatedPortfolio) {
      const pdf = new jsPDF("p", "mm", "a4");
      const source = document.getElementById("portfolio-preview-content");
      if (source) {
        pdf.html(source, {
          callback: (doc) => {
            doc.save("portfolio.pdf");
          },
          margin: [10, 10, 10, 10],
          autoPaging: "text",
          x: 0,
          y: 0,
          width: pdf.internal.pageSize.getWidth(),
          windowWidth: document.documentElement.scrollWidth,
        });
      } else {
        console.error("Portfolio preview content not found.");
      }
    } else {
      alert("No portfolio to export.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  if (!generatedPortfolio) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleGoBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 600,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Portfolio Preview
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleExportPdf}
          startIcon={<FileDownloadIcon />}
        >
          Export to PDF
        </Button>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
            <Box
              id="portfolio-preview-content"
              sx={{
                typography: "body1",
                color: "text.primary",
                lineHeight: 1.6,
              }}
              dangerouslySetInnerHTML={{ __html: generatedPortfolio }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PortfolioPreview;
