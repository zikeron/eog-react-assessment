import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { gql, useSubscription } from '@apollo/client';

const useStyles = makeStyles({
  root: {
    width: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const NEW_MEASUREMENTS = gql`
  subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export const Sticker = ({ lastSelected }) => {
  const classes = useStyles();
  const [dataSub, setDataSub] = useState([]);
  const { data: newMeasurement, loading } = useSubscription(NEW_MEASUREMENTS);

  const [dataStick] = newMeasurement
    ? Object.values(newMeasurement).filter(element => element.metric === lastSelected)
    : [];

  useEffect(() => {
    if (typeof dataStick !== 'undefined') {
      setDataSub(dataStick);
    }
  },[dataStick]);

  if (!loading && lastSelected.length > 0 && dataSub) {
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {dataSub.metric}
          </Typography>
          <Typography variant="h5" component="h2">
            {`${dataSub.value} ${dataSub.unit}`}
          </Typography>
        </CardContent>
      </Card>
    );
  } else return null;
};
