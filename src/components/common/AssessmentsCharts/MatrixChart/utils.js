import colors from '../../../../utils/colors';
import { addDecimalAlphaToHexColor } from '../../../../utils/helpers';

export const Config = {
  Colors: [colors.wheelBlue, colors.wheelOrange, colors.wheelGreen],
  Options: {
    maintainAspectRatio: false,
    plugins: {
      legend: false,
      tooltip: {
        displayColors: false,
        callbacks: {
          title() {
            return '';
          },
          label(context) {
            const v = context.dataset.data[context.dataIndex];
            return ['Competence: ' + v.x, 'Score: ' + v.y, v.v];
          },
        },
      },
      title: {
        display: true,
        // text: 'Chartjs Matrix Chart',
        font: {
          size: 22,
        },
      },
      subtitle: {
        display: true,
        // text: 'Chartjs Matrix Chart',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        position: 'top',
        type: 'category',
        // labels: labels,
        offset: true,
        ticks: {
          display: true,
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: 'category',
        // labels: [5, 4, 3, 2, 1],
        offset: true,
        reverse: false,
        ticks: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
  },
};

export const getChartData = (competenceGradeHistogram, count, intl) => {
  const data = {
    datasets: [],
  };

  const xLabels = [];

  if (competenceGradeHistogram) {
    const dataValues = [];

    const areas = [];

    for (let idx = 0; idx < competenceGradeHistogram.length; idx++) {
      const { area, competences } = competenceGradeHistogram[idx];

      if (!areas.includes(area)) {
        areas.push(area);
      }

      for (let item of competences) {
        const { histogram, competence } = item;

        for (let idxA = 1; idxA <= 5; idxA++) {
          dataValues.push({
            z: area,
            x: competence,
            y: intl.messages.user?.assessmentsPage.scores[idxA],
            v: histogram[idxA - 1],
          });
        }

        xLabels.push(competence);
      }
    }

    const getBackgroundColor = (ctx) => {
      const dataPoint = ctx.dataset.data[ctx.dataIndex];
      if (dataPoint) {
        const value = dataPoint.v;
        const alpha = value / count;

        const z = dataPoint.z;
        const zIdx = areas.indexOf(z);

        if (zIdx >= 0) {
          return addDecimalAlphaToHexColor(Config.Colors[zIdx], alpha);
        }
      }
      return '#55555'; // should not happen
    };

    const getBorderColor = (ctx) => {
      const dataPoint = ctx.dataset.data[ctx.dataIndex];
      if (dataPoint) {
        const value = dataPoint.v;
        const alpha = 0.3 + (0.7 * value) / count;

        const z = dataPoint.z;
        const zIdx = areas.indexOf(z);

        if (zIdx >= 0) {
          return addDecimalAlphaToHexColor(Config.Colors[zIdx], alpha);
        }
      }
      return '#55555'; // should not happen
    };

    const dataset = {
      label: 'Basic matrix',
      data: dataValues,
      borderWidth: 1,
      backgroundColor: getBackgroundColor,
      borderColor: getBorderColor,
      hoverBackgroundColor: getBorderColor,
      hoverBorderColor: getBackgroundColor,
      height: ({ chart }) => (chart.chartArea || {}).height / 5,
    };

    dataset.width = ({ chart }) => (chart.chartArea || {}).width / xLabels.length;

    data.datasets.push(dataset);
  }

  const options = Config.Options;

  options.scales.x.labels = xLabels;
  options.scales.y.labels = [5, 4, 3, 2, 1].map(
    (item) => intl.messages.user?.assessmentsPage.scores[item],
  );
  options.plugins.title.text = intl.messages.user?.assessmentsPage.charts.matrix.title;
  options.plugins.subtitle.text = intl.messages.user?.assessmentsPage.charts.matrix.subtitle;

  return {
    data,
    options,
  };
};
