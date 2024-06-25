import axios from "axios";
import type { AxiosRequestConfig, AxiosError } from "axios";

const ALL_PODCAST_UTL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export interface AxiosRequest {
  url: string;
  method: AxiosRequestConfig["method"];
  body?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

const axiosBaseRequest = async ({
  url,
  method,
  body,
  params,
  headers,
}: AxiosRequest) => {
  try {
    const result = await axios({
      url,
      method,
      data: body,
      params,
      headers,
    });
    return { data: result.data };
  } catch (axiosError) {
    const error = axiosError as AxiosError;

    return {
      error: {
        status: error.response?.status,
        data: error.response?.data || error.message,
      },
    };
  }
};

export const getAllPodcast = async () => {
  const allPodcast = await axiosBaseRequest({
    url: ALL_PODCAST_UTL,
    method: "GET",
  });

  return allPodcast;
};
