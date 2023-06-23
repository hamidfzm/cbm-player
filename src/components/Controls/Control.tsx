import { styled } from '@mui/material';

const Control = styled('div')`
  position: relative;
  margin: auto 0;

  button {
    opacity: 0.5;
    transition: all 0.2s ease-out;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

export default Control;
