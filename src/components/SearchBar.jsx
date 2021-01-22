import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Grid, Chip } from '@material-ui/core';
import { InputBar } from './InputBar';

const useStyles = makeStyles({
  searchBar: {
    backgroundColor: 'blue',
  },
  chip: {
    minWidth: 250,
    margin: 3,
    fontSize: 15,
  },
});

export const SearchBar = ({ metrics, selection, setSelection }) => {
  const classes = useStyles();
  console.log('selection SearchBar', selection);
  return (
    <CardContent className={classes.searchBlue}>
      <Grid container spacing={4} justify="space-between">
        <Grid item xs={12} sm={6}>
          {selection.map(measurement => {
            return selection.includes(measurement.metric) ? (
              <Chip label={`${measurement.metric}: ${measurement.value}${measurement.unit}`} />
            ) : null;
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputBar metrics={metrics} selection={selection} setSelection={setSelection} />
        </Grid>
      </Grid>
    </CardContent>
  );
};
