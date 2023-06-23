import type { VideoHTMLAttributes } from 'react';
import { forwardRef, memo, useCallback } from 'react';
import { styled } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

import { playingAtom, progressAtom } from '../store';

const RawVideo = forwardRef<
  HTMLVideoElement,
  VideoHTMLAttributes<HTMLVideoElement>
>((props, ref) => {
  const [playing, setPlaying] = useAtom(playingAtom);
  const setProgress = useSetAtom(progressAtom);

  const handlePause = useCallback(() => {
    if (playing) {
      setPlaying(false);
    }
  }, [playing, setPlaying]);

  const handlePlay = useCallback(() => {
    if (!playing) {
      setPlaying(true);
    }
  }, [playing, setPlaying]);

  const handleAbort = useCallback(() => {
    setPlaying(false);
    setProgress(0);
  }, [setPlaying, setProgress]);

  return (
    <Base
      ref={ref}
      {...props}
      onPause={handlePause}
      onPlay={handlePlay}
      onAbort={handleAbort}
    />
  );
});

RawVideo.displayName = 'RawVideo';

const MemoizedRawVideo = memo(RawVideo);

export default MemoizedRawVideo;

const Base = styled('video')`
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  cursor: none;
`;
