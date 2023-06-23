import type { Source, VideoEvent } from './Video';

export type PlayerProps = {
  title?: string;
  subtitle?: string;
  src: Source;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  startPosition?: number;

  onCanPlay?: () => void;
  onTimeUpdate?: (event: VideoEvent) => void;
  onEnded?: () => void;
  onError?: (event: VideoEvent) => void;
};
