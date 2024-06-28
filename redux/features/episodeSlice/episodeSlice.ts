import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const episodeSlice = createSlice({
  name: "episode",
  initialState: { episode: {} },
  reducers: {
    setEpisode: (state: any, action: PayloadAction) => {
      state.episode = action.payload;
    },
  },
});

export const { setEpisode } = episodeSlice.actions;
export default episodeSlice.reducer;
