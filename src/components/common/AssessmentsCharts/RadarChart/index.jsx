import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import ChartActionButtons from '../ChartActionButtons';
import { getChartData } from './utils';
import './index.scss';

const RadarChart = (props) => {
  const { competenceAverages } = props;
  const chartRef = useRef(null);
  const intl = useIntl();
  const { data, options } = useMemo(
    () => getChartData(competenceAverages, intl),
    [competenceAverages, intl],
  );

  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

  return (
    <div className="radar-chart">
      <Radar data={data} options={options} ref={chartRef} />
      <ChartActionButtons
        chartRef={chartRef}
        chartMessages={intl.messages.user?.assessmentsPage.charts.radar}
      />
    </div>
  );
};

export default RadarChart;
