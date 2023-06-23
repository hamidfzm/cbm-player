export type DRM = {
  widevineLicenseServer?: string;
  playReadyLicenseServer?: string;
  fairplayLicenseServer?: string;
  headers?: { [key: string]: string };
};

export type VideoEvent = {
  target: HTMLVideoElement;
};

export type SimpleSource = string;
export type QualitySource = { [quality: string]: string };
export type Source = SimpleSource | QualitySource;

export type VideoProps = {
  src: Source;
  startPosition: number;
  autoPlay: boolean;
  onEnded?: () => void;
  onError?: (event: VideoEvent) => void;
  onTimeUpdate?: (event: VideoEvent) => void;
  drm?: DRM;
};

export type SimplePlayerProps = {
  src: string;
  startPosition: number;
  autoPlay: boolean;
  onEnded?: () => void;
  onError?: (event: VideoEvent) => void;
  onTimeUpdate?: (event: VideoEvent) => void;
};

export type DRMVideoProps = SimplePlayerProps & {
  drm?: DRM;
};
