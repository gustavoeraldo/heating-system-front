import React from 'react';
import PropTypes from 'prop-types';
import { Line } from '@ant-design/charts';

import './styles.css';

function LineGraph({ dataSource, frequency }) {
  const graph_config = {
    data: dataSource,
    height: 600,
    width: 1000,
    xField: 'created_at',
    yField: 'measure',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return `${v} ºC`;
        },
      },
    },
    xAxis: {
      // tickCount: 7*(frequency/frequency),
      label: {
        formatter: function formatter(v) {
          const date = new Date(v);

          return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
      },
    },
    seriesField: 'tag',
    color: function color(_ref) {
      var tag = _ref.tag;
      return tag === 'Sensor 1' ? '#F4664A' : 
        tag === 'Sensor 2' ? '#30BF78' : tag === 'Sensor 3' ? '#FAAD14' : '#40a9ff';
    },
    point: {
      size: 5,
      shape: 'diamond',
    }
  }

  return (
    <Line {...graph_config}/>
  );
}

LineGraph.propTypes = {
  dataSource: PropTypes.func.isRequired,
  frequency: PropTypes.number.isRequired,
};

export default LineGraph;