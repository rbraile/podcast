import { IEpisode } from "@/types/Episode";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface InitialStateProps {
  episode: IEpisode;
}

const initialState: Partial<InitialStateProps> = {
  episode: undefined,
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    setEpisode: (
      state: Partial<InitialStateProps>,
      action: PayloadAction<IEpisode>
    ) => {
      state.episode = action.payload;
    },
  },
});

export const { setEpisode } = episodeSlice.actions;
export default episodeSlice.reducer;
