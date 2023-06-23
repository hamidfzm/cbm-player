import { memo, useId } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAtom } from 'jotai';

import map4Samples from './samples/mp4Samples';
import { sourceAtom } from './store';

const SourceSelector = () => {
  const labelId = useId();
  const [source, setSource] = useAtom(sourceAtom);
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSource(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        value={source}
        label={label}
        onChange={handleChange}
        labelId={labelId}
      >
        {map4Samples.map((sample) => (
          <MenuItem key={sample.source} value={sample.source}>
            MP4: {sample.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
const label = 'Source';

const MemoizedSourceSelector = memo(SourceSelector);

export default MemoizedSourceSelector;
