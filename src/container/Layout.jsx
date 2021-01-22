import React, { useEffect, useState } from 'react';
import { client } from '../lib/apollo-client';
import { gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { SearchBar } from '../components/SearchBar';
import { Chart } from '../components/Chart';

const getMetrics = async () => {
  let result = null;
  await client()
    .query({
      query: gql`
        query {
          getMetrics
        }
      `,
    })
    .then(data => (result = data.data));
  return result;
};

const getMultipleMeasurements = async metrics => {
  let result = null;
  let previousTime = new Date(Date.now() - 30 * 60000).getTime();
  let input = metrics.map(metric => {
    return `{ metricName: "${metric}", after: ${previousTime} }`;
  });

  await client()
    .query({
      query: gql`{
    getMultipleMeasurements(input: [${input}]){
      metric,
        measurements {
        metric,
          at,
          value,
          unit
      }
    }
  }
`,
    })
    .then(data => (result = data.data));
  return result;
};

const useStyles = makeStyles({
  card: {
    margin: '5% 10%',
  },
  taskBar: {
    backgroundColor: 'red',
  },
});

export const Layout = () => {
  const classes = useStyles();
  let [metrics, setMetrics] = useState({});
  let [selection, setSelection] = useState([]);
  let [multipleMeasures, setMultipleMeasures] = useState([]);

  useEffect(() => {
    // TODO improve the initialization
    const fetchAll = async () => {
      let _metrics = [];
      let _getMultipleMeasurements = [];
      let _arMultipleMeasurements = [];

      try {
        _metrics = await getMetrics();
        _metrics = _metrics.getMetrics;
        setMetrics(_metrics);
      } catch (e) {
        console.log(e);
      }

      try {
        _getMultipleMeasurements = await getMultipleMeasurements(_metrics);
        _arMultipleMeasurements = _getMultipleMeasurements.getMultipleMeasurements;
        setMultipleMeasures(_arMultipleMeasurements);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAll();
  }, []);

  if (metrics.length > 1) {
    return (
      <Card className={classes.card}>
        <CardContent style={{ padding: 0 }}>
          <SearchBar metrics={metrics} selection={selection} setSelection={setSelection} />
          <Chart data={multipleMeasures} selection={selection} />
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
};
