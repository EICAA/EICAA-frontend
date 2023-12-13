import { addDecimalAlphaToHexColor } from '../../../../utils/helpers';
import { getFixedPercent } from '../utils';

// previous colors: ['#542E71', '#6A66A3', '#84A9C0', '#B3CBB9', '#DDD8B8']

export const Config = {
  BackgroundAlpha: 0.5,
  // same colors as seen in participant survey table
  Colors: ['#B2C84A', '#8ABB6B', '#65AF8B', '#40A4AA', '#0993D7'],
  Options: {
    maintainAspectRatio: false,
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          format: {
            style: 'percent',
          },
        },
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        position: 'bottom', // 'right'
      },
      title: {
        display: true,
        // text: 'Chartjs Stacked Bar Chart',
        font: {
          size: 22,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.x !== null) {
              label += `${getFixedPercent(context.parsed.x, 1)}%`;
            }
            return label;
          },
        },
      },
    },
  },
};

const getDataset = (proportionalSummary, intl) => {
  const dataset = [];

  if (proportionalSummary) {
    for (let idx = 0; idx < proportionalSummary.length; idx++) {
      const color = Config.Colors[idx];
      dataset.push({
        label: intl.messages.user?.assessmentsPage.scores[idx + 1],
        data: [proportionalSummary[idx]],
        borderColor: color,
        backgroundColor: addDecimalAlphaToHexColor(color, Config.BackgroundAlpha),
        categoryPercentage: 0.875, // 1
        barPercentage: 0.875, // 1
      });
    }
  }

  return dataset;
};

export const getChartData = (proportionalSummary, intl) => {
  const data = {
    labels: [''],
    datasets: getDataset(proportionalSummary, intl),
  };

  const options = Config.Options;
  options.plugins.title.text = intl.messages.user?.assessmentsPage.charts.stacked.title;

  return { data, options };
};
