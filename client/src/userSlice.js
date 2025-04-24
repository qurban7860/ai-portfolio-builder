import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  phone: '', 
  email: '',
  github: '',
  summary: '',
  education: '', 
  skills: '',
  experience: '',
  projects: '',
  awards: '',    
  generatedPortfolio: '',
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    generatePortfolioStart: (state) => {
      state.loading = true;
      state.error = null;
      state.generatedPortfolio = '';
    },
    generatePortfolioSuccess: (state, action) => {
      state.loading = false;
      state.generatedPortfolio = action.payload;
    },
    generatePortfolioFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateFormData,
  generatePortfolioStart,
  generatePortfolioSuccess,
  generatePortfolioFailure,
} = userSlice.actions;

export default userSlice.reducer;