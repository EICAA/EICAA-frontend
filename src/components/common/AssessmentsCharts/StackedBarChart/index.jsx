import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import ChartActionButtons from '../ChartActionButtons';
import { getChartData } from './utils';
import './index.scss';

const StackedBarChart = (props) => {
  const { proportionalSummary } = props;
  const chartRef = useRef(null);
  const intl = useIntl();
  const { data, options } = useMemo(
    () => getChartData(proportionalSummary, intl),
    [proportionalSummary, intl],
  );

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  return (
    <div className="stacked-bar-chart">
      <Bar data={data} options={options} ref={chartRef} />
      <ChartActionButtons
        chartRef={chartRef}
        chartMessages={intl.messages.user?.assessmentsPage.charts.stacked}
      />
    </div>
  );
};

export default StackedBarChart;
