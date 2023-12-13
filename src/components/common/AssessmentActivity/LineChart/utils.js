import { addDecimalAlphaToHexColor } from '../../../../utils/helpers';

const colors = ['#68B0AB', '#4A7C59', '#8F6593', '#0E6BA8', '#0A2472'];

const getBackgroundColors = () => {
  const backgroundColor = colors
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return backgroundColor;
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 25,
      },
    },
  },
};

const getLabels = (binnedData) => {
  if (binnedData) {
    const first = binnedData[0];

    if (first) {
      return first.distribution.map((item) => item.date);
    }
  }

  return [];
};

const getDatasets = (binnedData) => {
  const datasets = [];

  const backgroundColors = getBackgroundColors();

  for (let idx = 0; idx < binnedData.length; idx++) {
    const { name, distribution } = binnedData[idx];

    const color = backgroundColors[idx % backgroundColors.length];

    datasets.push({
      label: name,
      data: distribution.map((item) => item.count),
      borderColor: color,
      backgroundColor: addDecimalAlphaToHexColor(color, 0.5),
    });
  }

  return datasets;
};

export const getChartData = (binnedData) => {
  const labels = getLabels(binnedData);
  const datasets = getDatasets(binnedData);

  const data = {
    labels,
    datasets,
  };

  return { data, options };
};
