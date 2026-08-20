export interface Track {
  title: string;
  artist: string;
  duration: string;
  /** Optional image URL for album art */
  artwork?: string;
}

export interface AudioPlayerProps {
  tracks: Track[];
  className?: string;
}
