import { IPodcast } from "@/types/Podcast";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  podcastSelected: IPodcast;
}

const initialState: Partial<InitialStateProps> = {
  podcastSelected: undefined,
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {
    setPodcastSelected: (
      state: Partial<InitialStateProps>,
      action: PayloadAction<IPodcast>
    ) => {
      state.podcastSelected = action.payload;
    },
  },
});

export const { setPodcastSelected } = podcastSlice.actions;
export default podcastSlice.reducer;
