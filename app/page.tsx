"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
// types
import type { IPodcast } from "@/types/Podcast";
// components
import List from "@/components/List";
import Main from "@/components/Main";
import Spinner from "@/components/Spinner";
// styles
import styles from "./home.module.scss";

import { useGetAllPodcastQuery } from "@/services/podcast";
import { setPodcastSelected } from "@/redux/features/podcastSlice";

const PodcastListPage: NextPage = () => {
  const [search, setSearch] = useState<string>("");
  const [podcastList, setPodcastList] = useState<IPodcast[]>();
  const { data, isLoading } = useGetAllPodcastQuery({});
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const filterPodcastlist = data?.feed?.entry.filter((podcast: IPodcast) =>
      podcast.title.label.toLocaleLowerCase().includes(search)
    );
    setPodcastList(filterPodcastlist);
  }, [search]);

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value.toLocaleLowerCase().trim());
  };

  const handleSelectPodcast = (podcastId: string) => {
    const podcastSelected = data?.feed?.entry.find(
      (podcast: IPodcast) => podcast.id.attributes["im:id"] === podcastId
    );
    dispatch(setPodcastSelected(podcastSelected));
    router.push(`/podcast/${podcastId}`);
  };

  if (isLoading) return <p>loading</p>;

  return (
    <Main className={styles.mainBox}>
      <section className={styles.searchFieldSection}>
        <h1 className={styles.title}>Podcaster</h1>
        {isLoading && <Spinner />}
        <div className={styles.searchContainer}>
          <span data-testid="counter" className={styles.counter}>
            {podcastList ? podcastList.length : data?.feed?.entry.length}
          </span>
          <input
            data-testid="search"
            className={styles.searchField}
            type="text"
            placeholder="Filter podcasts..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        {
          <List
            list={podcastList ? podcastList : data.feed.entry}
            testId="podcastList"
            className="row"
            handleSelectPodcast={handleSelectPodcast}
          />
        }
      </section>
    </Main>
  );
};

export default PodcastListPage;
