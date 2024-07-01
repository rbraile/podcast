import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IStatus {
  content_length: number;
  content_type: string;
  http_code: number;
  response_time: number;
  url: string;
}

interface IResponse {
  contents: string;
  status: IStatus;
}

export const ALL_PODCAST_UTL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export const podcastApi = createApi({
  reducerPath: "podcastApi",
  baseQuery: fetchBaseQuery(),
  keepUnusedDataFor: 86400,
  endpoints: (builder) => ({
    getAllPodcast: builder.query({
      query: () => ({
        url: `https://api.allorigins.win/get?url=${encodeURIComponent(
          ALL_PODCAST_UTL
        )}`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.error(err);
        }
      },
      transformResponse: (response: IResponse) => {
        return JSON.parse(response.contents);
      },
    }),
    getPodcastById: builder.query<any, string>({
      query: (podcastId) => ({
        url: `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )}`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          return data;
        } catch (err) {
          console.error(err);
        }
      },
      transformResponse: (response: IResponse) => {
        return JSON.parse(response.contents);
      },
    }),
  }),
});

export const { useGetAllPodcastQuery, useGetPodcastByIdQuery } = podcastApi;
