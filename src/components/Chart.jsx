import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const Chart = ({ data, selection }) => {
  let dataArrObj = [];
  let colors = ['#a83a32', '#2d8fa1', '#5ba12d', '#9c2894', '#e6ad8e', '#32403f'];

  data.forEach((element, index) => {
    if (selection.includes(element.metric)) {
      let property = element.metric;
      element.measurements.forEach(measurement => {
        dataArrObj.push(
          Object.assign(
            {
              name: new Date(measurement.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              [property]: measurement.value,
            },
            {},
          ),
        );
      });
    }
  });

  return (
    <LineChart
      width={1200}
      height={500}
      data={dataArrObj}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {selection.length > 0
        ? selection.map((element, index) => (
            <Line type="monotone" dataKey={element} stroke={colors[index]} activeDot={{ r: 4 }} key={index} />
          ))
        : null}
    </LineChart>
  );
};
