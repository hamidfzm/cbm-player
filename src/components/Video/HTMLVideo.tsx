/* eslint-disable max-lines */
import type { ReactEventHandler } from 'react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import useReset from '../hooks/useReset';
import {
  actualBufferedAtom,
  durationAtom,
  loopAtom,
  mutedAtom,
  PlayerState,
  playingAtom,
  progressAtom,
  qualityAtom,
  qualityOptionsAtom,
  showInfoAtom,
  statusAtom,
  volumeAtom,
} from '../store';

import RawVideo from './RawVideo';
import type { VideoEvent, VideoProps } from './types';

const HTMLVideo = ({
  autoPlay,
  onEnded,
  onError,
  onTimeUpdate,
  startPosition,
  src,
}: VideoProps) => {
  const reset = useReset();
  const video = useRef<HTMLVideoElement>(null);
  const muted = useAtomValue(mutedAtom);
  const volume = useAtomValue(volumeAtom);
  const loop = useAtomValue(loopAtom);
  const setDuration = useSetAtom(durationAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const setActualBuffer = useSetAtom(actualBufferedAtom);
  const setStatus = useSetAtom(statusAtom);
  const setQualityOptions = useSetAtom(qualityOptionsAtom);
  const setQuality = useSetAtom(qualityAtom);
  const [playing, setPlaying] = useAtom(playingAtom);
  const setShowInfo = useSetAtom(showInfoAtom);
  const resetQuality = useResetAtom(qualityAtom);
  const resetQualityOptions = useResetAtom(qualityOptionsAtom);

  // const timerBuffer = useRef<number>();
  const [source, setSource] = useState<string>();

  useEffect(() => {
    if (typeof src === 'string') {
      setSource(src);
    } else {
      const sortedQualityOptions = Object.keys(src).sort();
      if (sortedQualityOptions.length > 0) {
        setQualityOptions(sortedQualityOptions);
        setQuality(sortedQualityOptions[0]);
        setSource(src[sortedQualityOptions[0]]);
      } else {
        resetQualityOptions();
        resetQuality();
        setSource('');
      }
    }
  }, [resetQuality, resetQualityOptions, setQuality, setQualityOptions, src]);

  useEffect(() => {
    if (video.current) {
      video.current.muted = muted;
    }
  }, [muted]);

  useEffect(() => {
    if (video.current) {
      video.current.volume = volume / 100;
    }
  }, [volume]);

  const handleEnded = useCallback(() => {
    if (video.current) {
      if (+startPosition === +video.current.duration) {
        video.current.currentTime = video.current.duration - 30;
        if (autoPlay) {
          setPlaying(true);
          video.current?.play();
        } else {
          setPlaying(false);
        }
      } else {
        setStatus(PlayerState.ENDED);

        onEnded?.();
      }
    }
  }, [autoPlay, onEnded, setPlaying, setStatus, startPosition]);

  const handleCanPlay = useCallback(() => {
    setStatus(PlayerState.READY);
    setDuration(video.current?.duration ?? 0);
  }, [setDuration, setStatus]);

  const handleTimeUpdate = useCallback<ReactEventHandler<HTMLVideoElement>>(
    // @ts-ignore
    (e: VideoEvent) => {
      setShowInfo(false);
      // if (playing) {
      //   setPlaying(true);
      // }

      // if (timerBuffer.current) {
      //   clearTimeout(timerBuffer.current);
      // }
      //
      // timerBuffer.current = window.setTimeout(
      //   () => setWaitingBuffer(true),
      //   1000
      // );

      onTimeUpdate?.(e);

      let choseBuffer = 0;
      let lenghtBuffer = e.target.buffered.length;
      let start = 0;
      let end = 0;
      let atualTime = e.target.currentTime;

      for (let i = 1; i <= lenghtBuffer; i++) {
        let startCheck = e.target.buffered.start(i - 1);
        let endCheck = e.target.buffered.end(i - 1);

        if (endCheck > atualTime && atualTime > startCheck) {
          choseBuffer = i;

          if (endCheck > end) {
            end = endCheck;
          }

          if (startCheck < start) {
            start = startCheck;
          }
        }
      }

      setActualBuffer({
        index: choseBuffer,
        start: start,
        end: end,
      });

      setProgress(e.target.currentTime);
    },
    [onTimeUpdate, setActualBuffer, setProgress, setShowInfo]
  );

  const handleError = useCallback<ReactEventHandler<HTMLVideoElement>>(
    // @ts-ignore
    (e: VideoEvent) => {
      setStatus(PlayerState.ERROR);
      onError?.(e);
    },
    [onError, setStatus]
  );

  useEffect(() => {
    if (video.current && Math.abs(video.current.currentTime - progress) > 1) {
      video.current.currentTime = progress;
    }
  }, [progress]);

  useEffect(() => {
    if (playing) {
      video.current?.play().catch(() => setPlaying(false));
    } else {
      video.current?.pause();
    }
  }, [playing, setPlaying]);

  useEffect(() => {
    reset(startPosition);
  }, [reset, setProgress, startPosition]);

  return (
    <RawVideo
      playsInline
      muted={muted}
      loop={loop}
      src={source}
      ref={video}
      controls={false}
      autoPlay={autoPlay}
      onCanPlay={handleCanPlay}
      onTimeUpdate={handleTimeUpdate}
      onError={handleError}
      onEnded={handleEnded}
    />
  );
};

const MemoizedHTMLVideo = memo(HTMLVideo);

export default MemoizedHTMLVideo;
