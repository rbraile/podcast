"use client";
import { createContext, useState, useEffect, FC } from "react";
import { Entry } from "@/models";
import { getAllPodcast } from "@/services/podcast";

type IPodcastProviderProps = {
  children: React.ReactNode;
};

interface IPodcastContext {
  podcastList: Entry[];
}

const initialState: IPodcastContext = {
  podcastList: [],
};

export const PodcastContext = createContext(initialState);

export function PodcastProvider({ children }: IPodcastProviderProps) {
  const [podcastList, setPodcastList] = useState<Entry[]>([]);

  useEffect(() => {
    const getAll = async () => {
      const {
        data: {
          feed: { entry },
        },
      } = await getAllPodcast();
      setPodcastList(entry);
    };
    getAll();
  }, []);

  const value: IPodcastContext = {
    podcastList,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
