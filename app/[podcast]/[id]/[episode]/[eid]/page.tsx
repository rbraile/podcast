"use client";
import { episodeSelector } from "@/redux/features/episodeSlice";
import { useAppSelector } from "@/redux/store";
import { IEpisode } from "@/types/Episode";

export default function PodcastItem() {
  const data = useAppSelector(episodeSelector) as { episode: IEpisode };
  return (
    <div>
      <p>{data?.episode?.trackName}</p>
      <p>{data?.episode?.description}</p>
      <audio src={data?.episode?.episodeUrl} controls></audio>
    </div>
  );
}
