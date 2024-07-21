import { combineReducers } from 'redux';
import SolverSlice from './SolverSlice';
// import someReducer from './someSlice'; // Example reducer

const rootReducer = combineReducers({
  solver: SolverSlice,
});

export default rootReducer;
