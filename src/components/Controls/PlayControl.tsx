import { memo, useCallback } from 'react';
import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useAtom } from 'jotai';

import { playingAtom } from '../store';

import Control from './Control';

const PlayControl = () => {
  const [playing, setPlaying] = useAtom(playingAtom);
  const handleClick = useCallback(() => {
    setPlaying(!playing);
  }, [playing, setPlaying]);

  return (
    <Control>
      {!playing && (
        <IconButton size="small" onClick={handleClick}>
          <PlayArrow />
        </IconButton>
      )}
      {playing && (
        <IconButton size="small" onClick={handleClick}>
          <Pause />
        </IconButton>
      )}
    </Control>
  );
};

const MemoizedPlayControl = memo(PlayControl);

export default MemoizedPlayControl;
