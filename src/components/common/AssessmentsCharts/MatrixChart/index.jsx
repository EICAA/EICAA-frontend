import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  TimeScale,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

import ChartActionButtons from '../ChartActionButtons';
import { getChartData } from './utils';
import './index.scss';

const MartixChart = (props) => {
  const { competenceGradeHistogram, count } = props;
  const chartRef = useRef(null);
  const intl = useIntl();
  const { data, options } = useMemo(
    () => getChartData(competenceGradeHistogram, count, intl),
    [competenceGradeHistogram, count, intl],
  );

  ChartJS.register(
    TimeScale,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    MatrixController,
    MatrixElement,
  );

  return (
    <div className="martix-chart">
      <Chart type="matrix" data={data} options={options} ref={chartRef} />
      <ChartActionButtons
        chartRef={chartRef}
        chartMessages={intl.messages.user?.assessmentsPage.charts.matrix}
         
      />
    </div>
  );
};

export default MartixChart;
