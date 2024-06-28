import Link from "next/link";
import styles from "./podcast.module.scss";

export interface PodcastProps {
  title: string;
  podcastId: string;
  description?: string;
  src: string;
  alt: string;
  author: string;
  type?: string;
  handleSelectPodcast?: (arg0: string) => void;
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
  const handleClick = () => {
    handleSelectPodcast && podcastId && handleSelectPodcast(podcastId);
  };

  const children = (
    <div className={type === "podcastItem" ? styles.podcastItem : ""}>
      <Link className={styles.imageLink} href={`/podcast/${podcastId}`}>
        <img className={styles.podcastAvatar} src={src} alt={alt} />
      </Link>
      <div className={styles.podcastContent}>
        <div className={styles.containerTitle}>
          <Link href={`/podcast/${podcastId}`}>
            <strong className={styles.title}>{title}</strong>
          </Link>
          <span className={styles.author}>By: {author}</span>
        </div>
        {description && (
          <>
            <p className={styles.descriptionTitle}>Description:</p>
            <p className={styles.descriptionText}>{description}</p>
          </>
        )}
      </div>
    </div>
  );

  if (handleSelectPodcast) {
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
