import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getChartData } from './utils';
import './index.scss';

const LineChart = (props) => {
  const { binnedData } = props;
  const { data, options } = useMemo(() => getChartData(binnedData), [binnedData]);

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

  return (
    <div className="line-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
