import {
  Card,
  CardContent,
  Container as MuiContainer,
  CssBaseline,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import Player from 'cbm-player';
import { useAtomValue } from 'jotai';

import SourceSelector from './SourceSelector';
import { sourceAtom } from './store';

const Example = () => {
  const source = useAtomValue(sourceAtom);
  return (
    <CssBaseline>
      <Container>
        <Typography variant="h2" gutterBottom textAlign="center">
          CBM Player Demo
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <SourceSelector />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={9}>
            <Player src={source} />
          </Grid>
        </Grid>
      </Container>
    </CssBaseline>
  );
};

export default Example;

const Container = styled(MuiContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 90vh;
  min-width: 90vw;
`;
