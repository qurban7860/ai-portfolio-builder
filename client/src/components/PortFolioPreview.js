import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Paper, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Tooltip, IconButton } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { jsPDF } from "jspdf";
import { useAuth } from '../context/AuthContext';

const PortfolioPreview = () => {
  const { generatedPortfolio } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  const handleExportPdf = () => {
    if (!user) {
      setOpenDialog(true);
    } else if (generatedPortfolio) {
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
      }
    } else {
      alert("No portfolio to export.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!generatedPortfolio) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tooltip title="Go Back" arrow>
          <IconButton onClick={handleGoBack} color="primary" variant="outlined">
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        </Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
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

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box
          id="portfolio-preview-content"
          sx={{ typography: "body1", color: "text.primary", lineHeight: 1.6 }}
          dangerouslySetInnerHTML={{ __html: generatedPortfolio }}
        />
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: "primary.main", pb: 1 }}> Export Portfolio </DialogTitle>
        <Divider />
        <DialogContent sx={{ py: 2 }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: 16 }}>
            You need to be logged in to export your portfolio. Please sign up or log in to continue.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 1 }}>
          <Button onClick={handleCloseDialog} color="error" variant="outlined" >
            Cancel
          </Button>
          <Button onClick={() => {
            handleCloseDialog();
            navigate('/signup');
            }}
            variant="contained" color="primary"
          >
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PortfolioPreview;
