"use client";
import { useState, useContext, useEffect } from "react";
import type { NextPage } from "next";
// models
import type { Entry } from "@/models";
// context
import { PodcastContext } from "@/context";
// components
import List from "@/components/List";
import Main from "@/components/Main";
import Spinner from "@/components/Spinner";
// styles
import styles from "./home.module.scss";

const PodcastListPage: NextPage = () => {
  const { podcastList: initialPodcastList } = useContext(PodcastContext);
  const [search, setSearch] = useState<string>("");
  const [podcastList, setPodcastList] = useState<Entry[]>(initialPodcastList);

  useEffect(() => {
    const filterPodcastlist = initialPodcastList.filter((podcast) =>
      podcast.title.label.toLocaleLowerCase().includes(search)
    );
    setPodcastList(filterPodcastlist);
  }, [search, initialPodcastList]);

  const handleSearchChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value.toLocaleLowerCase().trim());
  };

  const listProps = {
    list: podcastList,
    testId: "podcastList",
    className: "row",
  };

  return (
    <Main className={styles.mainBox}>
      <section className={styles.searchFieldSection}>
        <h1 className={styles.title}>Podcaster</h1>
        {podcastList.length === 0 && <Spinner />}
        <div className={styles.searchContainer}>
          <span data-testid="counter" className={styles.counter}>
            {podcastList.length}
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
      </section>
      {podcastList && <List {...listProps} />}
    </Main>
  );
};

export default PodcastListPage;
