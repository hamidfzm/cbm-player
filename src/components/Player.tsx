import { NoSsr as MuiNoSsr } from '@mui/material';
import { Provider as JotaiProvider } from 'jotai';

import Container from './Container';
import { Controls } from './Controls';
import type { PlayerProps } from './types';
import Video from './Video';

const Player = ({
  src,
  startPosition = 0,
  autoPlay = false,
  onEnded,
  onError,
  onTimeUpdate,
}: PlayerProps) => (
  <MuiNoSsr>
    <JotaiProvider>
      <Container>
        <Video
          src={src}
          startPosition={startPosition}
          autoPlay={autoPlay}
          onEnded={onEnded}
          onError={onError}
          onTimeUpdate={onTimeUpdate}
        />
        <Controls />
      </Container>
    </JotaiProvider>
  </MuiNoSsr>
);

export default Player;
