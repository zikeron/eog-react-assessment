import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel, Input, Chip } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      minWidth: 500,
      float: 'right',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

export const InputBar = ({ metrics, selection = [], setSelection }) => {
  const classes = useStyles();
  const handleChange = event => {
    setSelection(event.target.value);
  };

  if (metrics.length > 1) {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel>Please Select Your Metrics</InputLabel>
        <Select
          multiple
          value={selection}
          onChange={handleChange}
          input={<Input />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={{ style: { maxHeight: 300, minWidth: 250 } }}
        >
          {metrics.map(metric => (
            <MenuItem key={metric} value={metric}>
              {metric}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else return null;
};
