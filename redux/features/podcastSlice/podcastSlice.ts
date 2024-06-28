import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const podcastSlice = createSlice({
  name: "podcast",
  initialState: {},
  reducers: {
    setPodcastSelected: (state: any, action: PayloadAction) => {
      state.podcastSelected = action.payload;
    },
  },
});

export const { setPodcastSelected } = podcastSlice.actions;
export default podcastSlice.reducer;
