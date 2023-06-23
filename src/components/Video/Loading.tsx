import { memo } from 'react';
import { styled } from '@mui/material';

const Loading = () => (
  <Container>
    <Animator>
      <div />
      <div />
      <div />
    </Animator>
  </Container>
);

const MemoizedLoading = memo(Loading);

export default MemoizedLoading;

const Container = styled('div')`
  position: absolute;
  height: 100% !important;
  width: 100% !important;
  display: flex;
`;

const Animator = styled('div')`
  display: flex;
  margin: auto;

  div {
    &:nth-child(2) {
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }

    animation: 1s linear toUpOpacity infinite;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.palette.primary.main};
    margin: auto 5px;
  }
`;
