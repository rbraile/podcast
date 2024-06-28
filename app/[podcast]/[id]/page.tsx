"use client";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { millisecondsToMinutes, format } from "date-fns";
import { podcastSelector } from "@/redux/features/podcastSlice";
import { useAppSelector } from "@/redux/store";
import { useGetPodcastByIdQuery } from "@/services/podcast";
import Podcast from "@/components/Podcast";
import { setEpisode } from "@/redux/features/episodeSlice";
import { IEpisode } from "@/types/Episode";

import styles from "./episodeList.module.scss";
import { IPodcast } from "@/types/Podcast";

export default function PodcastItem({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data, isLoading }: any = useGetPodcastByIdQuery(params.id);
  const podcastSelected: IPodcast | any = useAppSelector(podcastSelector);
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
      <aside className={styles.sidebar}>
        <Podcast
          key={data.results[0].artistName}
          title={data.results[0].collectionName}
          src={data.results[0].artworkUrl100}
          alt={data.results[0].artistName}
          author={data.results[0].artistName}
          description={podcastSelected?.summary?.label}
          type="podcastItem"
        />
      </aside>
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
              {/* <Link href={`${params.id}/episode/${episode.trackId}`}> */}
              <span>{episode.trackName}</span>
              <span>{millisecondsToMinutes(episode.trackTimeMillis)}</span>
              <span>{format(episode.releaseDate, "dd/mm/yyyy")} </span>
              {/* </Link> */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  ) : (
    !isLoading && <p>volver a home</p>
  );
}
