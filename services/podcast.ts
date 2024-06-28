import type { IPodcast } from "@/types/Podcast";
import type { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ALL_PODCAST_UTL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export const podcastApi = createApi({
  reducerPath: "podcastApi",
  baseQuery: fetchBaseQuery(),
  keepUnusedDataFor: 86400,
  endpoints: (builder) => ({
    getAllPodcast: builder.query({
      query: () => ({
        url: ALL_PODCAST_UTL,
        method: "GET",
      }),
    }),
    getPodcastById: builder.query<IPodcast, string>({
      query: (podcastId) => ({
        url: `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPodcastQuery, useGetPodcastByIdQuery } = podcastApi;
