import { ReactNode } from "react";
import type { IPodcast } from "@/types/Podcast";
import Podcast from "@/components/Podcast";

import styles from "./list.module.scss";

export interface ListProps {
  testId: string;
  title?: ReactNode;
  className?: string;
  list: IPodcast[];
  handleSelectPodcast?: (arg0: string) => void;
}

function List({
  list,
  className,
  title,
  testId,
  handleSelectPodcast,
}: ListProps) {
  return (
    <section className={styles.conatainer}>
      {title}
      <ul
        className={className ? styles[className] : styles.default}
        data-testid={testId}
      >
        {list.map((podcast) => (
          <Podcast
            key={podcast.id.attributes["im:id"]}
            title={podcast.title.label}
            podcastId={podcast.id.attributes["im:id"]}
            src={podcast["im:image"][2].label}
            alt={podcast["im:name"].label}
            author={podcast["im:artist"].label}
            handleSelectPodcast={handleSelectPodcast}
          />
        ))}
      </ul>
    </section>
  );
}

export default List;
