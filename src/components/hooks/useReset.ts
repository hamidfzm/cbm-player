import { useCallback } from 'react';
import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';

import {
  actualBufferedAtom,
  durationAtom,
  progressAtom,
  showQualityOptionsAtom,
  statusAtom,
} from '../store';

const useReset = () => {
  const resetShowQualityOptions = useResetAtom(showQualityOptionsAtom);
  const resetDuration = useResetAtom(durationAtom);
  const resetStatus = useResetAtom(statusAtom);
  const resetActualBuffered = useResetAtom(actualBufferedAtom);
  const setProgress = useSetAtom(progressAtom);

  return useCallback(
    (startPosition?: number) => {
      resetShowQualityOptions();
      resetDuration();
      resetStatus();
      resetActualBuffered();
      if (startPosition != undefined) {
        setProgress(startPosition);
      }
    },
    [
      resetActualBuffered,
      resetDuration,
      resetShowQualityOptions,
      resetStatus,
      setProgress,
    ]
  );
};

export default useReset;
