import { atom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';

export enum PlayerState {
  PLAYING,
  PAUSED,
  STOPPED,
  LOADING,
  READY,
  BUFFERING,
  ERROR,
  ENDED,
}

export const statusAtom = atomWithReset<PlayerState>(PlayerState.STOPPED);
export const playingAtom = atom(
  (get) => get(statusAtom) === PlayerState.PLAYING,
  (_get, set, newStatus) => {
    set(statusAtom, newStatus ? PlayerState.PLAYING : PlayerState.PAUSED);
  }
);

export const progressAtom = atom(0);
export const volumeAtom = atomWithStorage('cbm-volume', 50);
export const mutedAtom = atom(true);
export const durationAtom = atomWithReset(0);
export const playbackRateAtom = atom(1);
export const loopAtom = atom(false);
export const qualityAtom = atomWithReset('auto');
export const qualityOptionsAtom = atomWithReset(['auto']);
export const showControlsAtom = atom(true);
export const showInfoAtom = atom(false);
export const showQualityOptionsAtom = atomWithReset(false);

export const showVolumeAtom = atom(false);
export const fullscreenAtom = atom(false);
export const actualBufferedAtom = atomWithReset({ start: 0, end: 0, index: 0 });
