import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keysPressed: 0,
  accuracy: 100,
  nextKey: 'a',
};

const rootReducer = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    typeKeyPressed: (state, action) => {
  const { keyPressed, expectedKey } = action.payload;
  const isCorrect = keyPressed.toLowerCase() === expectedKey.toLowerCase();
  console.log('isCorrect:', isCorrect);
  state.keysPressed += 1;

  if (!isCorrect) {
    state.accuracy -= 1;
  }

  state.nextKey = isCorrect ? getRandomKey() : state.nextKey;
},
    resetStats: (state) => {
      state.keysPressed = 0;
      state.accuracy = 100;
    },
  },
});


const getRandomKey = () => {
  const keys = ['a', 's', 'd', 'f', 'j', 'k', 'l'];
  return keys[Math.floor(Math.random() * keys.length)];
};

export const { typeKeyPressed , resetStats } = rootReducer.actions;
export default rootReducer.reducer;


