import { Container as MuiContainer, styled } from '@mui/material';

import DefaultControls from './DefaultControls';
import type { ControlProps } from './types';

const Controls = ({ children }: ControlProps) => (
  <Container>{children ?? <DefaultControls />}</Container>
);

export default Controls;

const Container = styled(MuiContainer)`
  position: absolute;
  direction: ltr;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.2s ease-out;

  padding: 10px;
  font-size: 1.5em;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.7) 20%,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0) 60%,
    rgba(0, 0, 0, 0.7) 80%,
    rgba(0, 0, 0, 1) 100%
  );
`;
