import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { playerSlice } from '../reducers/playerSlice'

const store = configureStore({
  reducer: {
    player: playerSlice.reducer
  }
});

export default store;