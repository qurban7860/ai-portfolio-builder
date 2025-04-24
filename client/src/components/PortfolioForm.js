import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormData, generatePortfolioStart, generatePortfolioSuccess } from '../userSlice'; 
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { useNavigate } from 'react-router-dom'; 
import {
  TextField, Button, Typography, Box, Paper, Stack, Divider, Container
} from '@mui/material';
import axios from 'axios';

const PortfolioForm = () => {
  const formData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormData({ name, value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(generatePortfolioStart());

    try {
      const response = await axios.post('http://localhost:5000/api/generate-portfolio', formData);
      dispatch(generatePortfolioSuccess(response.data.portfolio)); 
      navigate('/preview'); 
    } catch (error) {
      console.error('Error generating portfolio:', error);
      dispatch({
        type: 'user/generatePortfolioFailure',
        payload: error.response?.data?.error || 'Failed to generate portfolio.',
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
     <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 600 }}>
        Portfolio Form
      </Typography>
    <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mt: 4 }}>
    <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
     <Button variant="contained" color="primary" startIcon={<PsychologyAltIcon />}>
       Create Your AI-Generated Portfolio
     </Button>
    </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <Stack spacing={3}>
          <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth />
            <TextField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} fullWidth />
          </Box>

          <Box display="grid" gap={2} gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}>
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth />
            <TextField label="GitHub Profile" name="github" value={formData.github} onChange={handleChange} fullWidth />
          </Box>

          <TextField label="Professional Summary" name="summary" multiline rows={4} value={formData.summary} onChange={handleChange} fullWidth />
          <TextField label="Education (one per line)" name="education" multiline rows={4} value={formData.education} onChange={handleChange} fullWidth />
          <TextField label="Skills (comma-separated)" name="skills" value={formData.skills} onChange={handleChange} fullWidth />
          <TextField label="Experience (one per line)" name="experience" multiline rows={4} value={formData.experience} onChange={handleChange} fullWidth />
          <TextField label="Projects (one per line)" name="projects" multiline rows={4} value={formData.projects} onChange={handleChange} fullWidth />
          <TextField label="Awards & Recognition (one per line)" name="awards" multiline rows={4} value={formData.awards} onChange={handleChange} fullWidth />

          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            sx={{ alignSelf: 'center', mt: 2, px: 5 }}
          >
            🚀 Generate Portfolio
          </Button>

          {formData.loading && (
            <Typography variant="body2" color="text.secondary" align="center">
              Generating portfolio...
            </Typography>
          )}
          {formData.error && (
            <Typography variant="body2" color="error" align="center">
              {formData.error}
            </Typography>
          )}
        </Stack>
      </Box>
    </Paper>
    </Container>
  );
};

export default PortfolioForm;