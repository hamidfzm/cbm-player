import { memo } from 'react';

import PlayControl from './PlayControl';

const DefaultControls = () => (
  <>
    <PlayControl />
  </>
);

const MemoizedDefaultControls = memo(DefaultControls);

export default MemoizedDefaultControls;
