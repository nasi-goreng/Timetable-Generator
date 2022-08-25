import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHighways = createAsyncThunk(
  "highways/fetchHighways",
  async (selectedCity) => {
    try {
      const { data: response } = await axios.get(
        `/api/highways?city=${selectedCity}`
      );
      return response;
    } catch (err) {
      console.error("Cannot get api/highways", err);
    }
  }
);

const initialState = {
  selected: "select highway",
  highways: [],
};

const highwaySlice = createSlice({
  name: "highways",
  initialState,
  reducers: {
    // Add your reducers here. Read about slices and reducers here: https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#writing-slices
    updateSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHighways.fulfilled, (state, action) => {
      // state.length = 0;
      // state.push(action.payload.map((hWObj) => hWObj.highway));
      state.highways = action.payload.map((hWObj) => hWObj.highway);
    });
  },
});

export const { updateSelected } = highwaySlice.actions;

export default highwaySlice.reducer;
