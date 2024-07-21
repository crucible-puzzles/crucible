// SolverSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../store/Store';
import { Puzzle } from '../types/types';
import axios from 'axios';
import * as consts from '../app/config';

interface SolverState {
  puzzle: Puzzle | null;
}

const initialState: SolverState = {
  puzzle: null,
};

const solverSlice = createSlice({
  name: 'solver',
  initialState,
  reducers: {
    setPuzzle(state, action: PayloadAction<Puzzle>) {
      state.puzzle = action.payload;
    },
  },
});

export const { setPuzzle } = solverSlice.actions;
export default solverSlice.reducer;

export const fetchPuzzle = (puzzleId: string) => async (dispatch: AppDispatch) => {
  try {
    console.log('fetching puzzle...');
    const response = await axios.get(`${consts.GET_PUZZLE}/${puzzleId}`);
    const data = response.data;

    // Transform the date string to a Date object
    const puzzle: Puzzle = {
      ...data,
      createdOn: new Date(data.createdOn),
    };
    console.log('Puzzle data:', puzzle);
    dispatch(setPuzzle(puzzle));
    console.log(puzzle);
  } catch (error) {
    console.error('Error fetching puzzle:', error);
  }
};
