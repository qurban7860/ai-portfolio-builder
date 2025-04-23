import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, generatePortfolioStart } from '../userSlice';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const PortfolioForm = () => {
  const formData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(generatePortfolioStart());

    try {
      const response = await axios.post('http://localhost:5000/api/generate-portfolio', formData);
      dispatch({ type: 'user/generatePortfolioSuccess', payload: response.data.portfolio });
    } catch (error) {
      console.error('Error generating portfolio:', error);
      dispatch({
        type: 'user/generatePortfolioFailure',
        payload: error.response?.data?.error || 'Failed to generate portfolio.',
      });
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
       ✨ Build Your Portfolio with AI
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ '& > :not(style)': { m: 1, width: '100%' } }}>
        <TextField
          label="Summary"
          name="summary"
          multiline
          rows={4}
          value={formData.summary}
          onChange={handleChange}
        />
        <TextField
          label="Skills (comma-separated)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />
        <TextField
          label="Experience (separate each with a newline)"
          name="experience"
          multiline
          rows={4}
          value={formData.experience}
          onChange={handleChange}
        />
        <TextField
          label="Projects (separate each with a newline)"
          name="projects"
          multiline
          rows={4}
          value={formData.projects}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Generate Portfolio
        </Button>
        {formData.loading && <Typography>Generating portfolio...</Typography>}
        {formData.error && <Typography color="error">{formData.error}</Typography>}
      </Box>
    </Container>
  );
};

export default PortfolioForm;