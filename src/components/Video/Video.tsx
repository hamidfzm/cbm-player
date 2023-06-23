import { memo, Suspense } from 'react';

import LazyHTMLVideo from './LazyHTMLVideo';
import Loading from './Loading';
import type { VideoProps } from './types';

const Video = (props: VideoProps) => {
  const { src } = props;

  if (typeof src === 'string') {
    if (src.endsWith('.m3u8')) {
      return null;
    } else if (src.endsWith('.mpd')) {
      return null;
    } else if (src.startsWith('https://www.youtube.com/')) {
      return null;
    }

    return (
      <Suspense fallback={<Loading />}>
        <LazyHTMLVideo {...props} />
      </Suspense>
    );
  } else {
    return (
      <Suspense fallback={<Loading />}>
        <LazyHTMLVideo {...props} />
      </Suspense>
    );
  }
};

const MemoizedVideo = memo(Video);

export default MemoizedVideo;
