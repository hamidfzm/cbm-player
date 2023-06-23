import type { ReactNode } from 'react';
import { Container as MuiContainer, styled } from '@mui/material';

type ContainerProps = {
  children?: ReactNode;
};

const Container = ({ children }: ContainerProps) => (
  <Base maxWidth="xl">{children ?? <div>Hello</div>}</Base>
);

export default Container;

const Base = styled(MuiContainer)`
  min-height: 240px;
  position: relative;
  background: #000;
  overflow: hidden;
`;
