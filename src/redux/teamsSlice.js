// redux/teamsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Takımları API'den çekme (zaten mevcut)
export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  const response = await fetch('https://localhost:7033/api/Teams');
  if (!response.ok) throw new Error('Failed to fetch teams');
  const data = await response.json();
  return data;
});

const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    items: [], // Takımlar listesi
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    addTeam: (state, action) => {
      // Yeni takımı listeye ekle
      state.items.push(action.payload);
    },
    updateTeam: (state, action) => {
      // Var olan takımı güncelle
      const index = state.items.findIndex((team) => team.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addTeam, updateTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
