import { MouseEventHandler } from "react";
import styles from "./podcast.module.scss";

export interface PodcastProps {
  title: string;
  podcastId?: string;
  description?: string;
  src: string;
  alt: string;
  author: string;
  type?: string;
  handleSelectPodcast?: (arg0: string) => any;
}

/**
 * @function Podcast
 * @category Podcast
 * @description Podcast item component
 */
function Podcast({
  title,
  podcastId,
  alt,
  src,
  author,
  description,
  type,
  handleSelectPodcast,
}: PodcastProps) {
  const handleClick = (_event: any) => {
    handleSelectPodcast && podcastId && handleSelectPodcast(podcastId);
  };

  const children = (
    <div className={type === "podcastItem" ? styles.podcastItem : ""}>
      <img className={styles.podcastAvatar} src={src} alt={alt} />
      <div className={styles.podcastContent}>
        <span className={styles.title}>{title.split("-")[0].trim()}</span>
        {description ? (
          <span className={styles.description}>Description: {description}</span>
        ) : (
          <span className={styles.author}>Author: {author}</span>
        )}
      </div>
    </div>
  );

  if (podcastId && handleSelectPodcast) {
    return (
      <li
        key={podcastId}
        className={styles.podcastContainer}
        onClick={handleClick}
      >
        {children}
      </li>
    );
  }
  return children;
}

export default Podcast;
