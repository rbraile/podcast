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

const data = {
  contents:
    '\n\n\n{\n "resultCount":21,\n "results": [\n{"wrapperType":"track", "kind":"podcast"}\n]\n}',
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("podcast-hooks", () => {
  it("should call getAllPodcast", async () => {
    fetchMock.mockOnceIf(
      "https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Fus%2Frss%2Ftoppodcasts%2Flimit%3D100%2Fgenre%3D1310%2Fjson",
      () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify(data),
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
      `https://api.allorigins.win/get?url=https%3A%2F%2Fitunes.apple.com%2Flookup%3Fid%3D1234%26media%3Dpodcast%26entity%3DpodcastEpisode%26limit%3D20`,
      () =>
        Promise.resolve({
          status: 200,
          body: JSON.stringify(data),
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
