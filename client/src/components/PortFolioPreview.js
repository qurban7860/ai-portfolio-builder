import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Paper } from '@mui/material';

const PortfolioPreview = () => {
  const generatedPortfolio = useSelector((state) => state.user.generatedPortfolio);

  if (!generatedPortfolio) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Portfolio Preview
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: generatedPortfolio }} />
      </Paper>
    </Container>
  );
};

export default PortfolioPreview;