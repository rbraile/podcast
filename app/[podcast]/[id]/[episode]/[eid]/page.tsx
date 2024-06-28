"use client";
import { episodeSelector } from "@/redux/features/episodeSlice";
import { useAppSelector } from "@/redux/store";
import { IEpisode } from "@/types/Episode";

import Sidebar from "@/components/Sidebar";

import styles from "./episode.module.scss";

export default function PodcastItem() {
  const data = useAppSelector(episodeSelector) as { episode: IEpisode };

  return (
    data && (
      <div className={styles.pageContainer}>
        <Sidebar />
        <section className={styles.episodeContainer}>
          <h1 className={styles.title}>{data.episode.trackName}</h1>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.episode.description }}
          ></p>
          <audio
            className={styles.audioPlayer}
            src={data.episode.episodeUrl}
            controls
          ></audio>
        </section>
      </div>
    )
  );
}
