import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import PropTypes from 'prop-types';

import './styles.css';

function LineGraph({ dataSource }) {
 
  return (
    <LineChart
      width={1024}
      height={450}
      data={dataSource}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="created_at" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="bottom" />
      <Line type="monotone" dataKey="sensor2" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="sensor3" stroke="#82ca9d" />
      <Line type="monotone" dataKey="measure" stroke="#FE4A49" />
      <Line type="monotone" dataKey="sensor4" stroke="#003049" />
    </LineChart>
  );
}

LineGraph.propTypes = {
  dataSource: PropTypes.func.isRequired,
};

export default LineGraph;