import colors from '../../../../utils/colors';
import { addDecimalAlphaToHexColor } from '../../../../utils/helpers';

export const Config = {
  Options: {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        // text: 'Chartjs2 Radar Chart',
        font: {
          size: 22,
        },
      },
      subtitle: {
        display: true,
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 1,
        },
        min: 0,
        max: 5,
      },
    },
  },
  Colors: [colors.wheelBlue, colors.wheelOrange, colors.wheelGreen],
};

const getLabels = (competenceAverages) => {
  const labels = [];

  if (competenceAverages) {
    for (let idx = 0; idx < competenceAverages.length; idx++) {
      const { competences } = competenceAverages[idx];

      for (let item of competences) {
        const { competence } = item;

        labels.push(competence);
      }
    }
  }

  return labels;
};

const getDatasets = (competenceAverages, intl) => {
  const datasets = [];

  if (competenceAverages) {
    const datasetLines = [[], [], []];

    for (let idx = 0; idx < competenceAverages.length; idx++) {
      const { area, competences } = competenceAverages[idx];

      for (let idxA = 0; idxA < competenceAverages.length; idxA++) {
        const datasetData = datasetLines[idx];

        if (idx === idxA) {
          for (let item of competences) {
            const { avg } = item;

            datasetData.push(avg);
          }
        } else {
          // leading and trailing nulls
          for (let idxB = 0; idxB < competenceAverages[idxA].competences.length; idxB++) {
            datasetData.push(null);
          }
        }
      }

      const dataset = {
        label: `Area: ${area}`,
        data: datasetLines[idx],
        backgroundColor: addDecimalAlphaToHexColor(Config.Colors[idx], 0.4),
        borderColor: Config.Colors[idx],
        borderWidth: 1,
      };

      datasets.push(dataset);
    }
  }

  return datasets;
};

export const getChartData = (competenceAverages, intl) => {
  const data = {
    labels: getLabels(competenceAverages),
    datasets: getDatasets(competenceAverages, intl),
  };

  const options = Config.Options;
  options.plugins.title.text = intl.messages.user?.assessmentsPage.charts.radar.title;
  options.plugins.subtitle.text = intl.messages.user?.assessmentsPage.charts.radar.subtitle;
  
  options.scales.r.ticks.callback = (value) => {
    // does not print 'None', so had to work around
    return intl.messages.user?.assessmentsPage.scores?.[value] + '';
  };

  return { data, options };
};
