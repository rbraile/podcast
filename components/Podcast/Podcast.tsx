import Link from "next/link";
import styles from "./podcast.module.scss";

export interface PodcastProps {
  title: string;
  podcastId: string;
  src: string;
  alt: string;
  author: string;
}

/**
 * @function Podcast
 * @category Podcast
 * @description Podcast item component
 */
function Podcast({ title, podcastId, alt, src, author }: PodcastProps) {
  return (
    <li key={podcastId} className={styles.podcastContainer}>
      <Link href={`/podcast/${podcastId}`}>
        <img className={styles.podcastAvatar} src={src} alt={alt} />
        <div className={styles.podcastContent}>
          <span className={styles.title}>{title.split("-")[0].trim()}</span>
          <span className={styles.author}>Author: {author}</span>
        </div>
      </Link>
    </li>
  );
}

export default Podcast;
