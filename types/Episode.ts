export interface IEpisode {
  country: string;
  collectionViewUrl: string;
  artworkUrl160: string;
  episodeContentType: string;
  trackId: number;
  trackName: string;
  artistIds: string[];
  artworkUrl60: string;
  contentAdvisoryRating: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  genres: IGenre[];
  episodeGuid: string;
  description: string;
  releaseDate: string;
  shortDescription: string;
  feedUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  episodeUrl: string;
  episodeFileExtension: string;
  artworkUrl600: string;
  trackTimeMillis: number;
  kind: string;
  wrapperType: string;
}

export interface IGenre {
  name: string;
  id: string;
}
