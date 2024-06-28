import Podcast from "@/components/Podcast";
import { podcastSelector } from "@/redux/features/podcastSlice";
import styles from "./Sidebar.module.scss";
import { IPodcast } from "@/types/Podcast";
import { useAppSelector } from "@/redux/store";

/**
 * @function Sidebar
 * @category Layout
 * @description aside conatiner bar.
 */
function Sidebar() {
  const dataSelected: IPodcast | any = useAppSelector(podcastSelector);

  return (
    dataSelected && (
      <aside className={styles.sidebar}>
        <Podcast
          title={dataSelected.podcastSelected["im:name"].label}
          src={dataSelected.podcastSelected["im:image"][2].label}
          alt={dataSelected.podcastSelected["im:name"].label}
          author={dataSelected.podcastSelected["im:artist"].label}
          description={dataSelected.podcastSelected?.summary?.label}
          podcastId={dataSelected.podcastSelected.id.attributes["im:id"]}
          type="podcastItem"
        />
      </aside>
    )
  );
}

export default Sidebar;
