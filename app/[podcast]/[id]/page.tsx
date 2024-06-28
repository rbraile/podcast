"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { millisecondsToMinutes, format } from "date-fns";
import { useGetPodcastByIdQuery } from "@/services/podcast";
import { setEpisode } from "@/redux/features/episodeSlice";
import { IEpisode } from "@/types/Episode";

import Sidebar from "@/components/Sidebar";

import styles from "./episodeList.module.scss";

export default function PodcastItem({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, isLoading }: any = useGetPodcastByIdQuery(params.id);
  const dispatch = useDispatch();

  const handleEpisodeSelection = (trackId: number) => {
    const episode = data.results
      .slice(1)
      .find((epi: IEpisode) => epi.trackId === trackId);
    dispatch(setEpisode(episode));
    router.push(`${params.id}/episode/${episode.trackId}`);
  };

  return !isLoading && data ? (
    <div className={styles.container}>
      <Sidebar />
      <section className={styles.episodeContainer}>
        <div className={styles.counter}>
          <h2 className={styles.title}>
            Episodes: {data.results[0].trackCount}
          </h2>
        </div>
        <ul className={styles.episodeList}>
          <li className={styles.episodeRow}>
            <span>
              <strong>Title</strong>
            </span>
            <span>
              <strong>Date</strong>
            </span>
            <span>
              <strong>Durarion</strong>
            </span>
          </li>
          {data.results.slice(1).map((episode: any) => (
            <li
              key={episode.trackId}
              className={styles.episodeRow}
              onClick={() => handleEpisodeSelection(episode.trackId)}
            >
              <span>{episode.trackName}</span>
              <span>{millisecondsToMinutes(episode.trackTimeMillis)}</span>
              <span>{format(episode.releaseDate, "dd/mm/yyyy")} </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  ) : (
    !isLoading && <p>volver a home</p>
  );
}
