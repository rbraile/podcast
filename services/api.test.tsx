import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetAllPodcastQuery, useGetPodcastByIdQuery } from "@/services"; // RTK Query
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import type { ReactNode } from "react";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

function Wrapper(props: { children: ReactNode }) {
  return <Provider store={store}>{props.children}</Provider>;
}

const data = {};

describe("podcast-hooks", () => {
  it("should call getAllPodcast", async () => {
    fetchMock.mockOnceIf(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
      () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify({ data }),
        })
    );
    const { result } = renderHook(() => useGetAllPodcastQuery({}), {
      wrapper: Wrapper,
    });

    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getAllPodcast",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("should call useGetPodcastByIdQuery", async () => {
    fetchMock.mockOnceIf(
      `https://itunes.apple.com/lookup?id=1234&media=podcast&entity=podcastEpisode&limit=20`,
      () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify({ data }),
        })
    );

    const { result } = renderHook(() => useGetPodcastByIdQuery("1234"), {
      wrapper: Wrapper,
    });
    expect(result.current).toMatchObject({
      status: "pending",
      endpointName: "getPodcastById",
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it("renders hook", async () => {
    // ...
  });
});
