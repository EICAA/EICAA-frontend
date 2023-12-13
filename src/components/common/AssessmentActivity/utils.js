import { format } from 'date-fns';
import { Formats, getEarlierDate } from '../../../utils/date';

export const makeBinning = (resultData, days, now) => {
  const dataPoints = [];

  let resultIdx = 0;
  let currentResult = resultData[0];

  for (let currentDay = 0; currentDay < days; currentDay++) {
    const dayStart = getEarlierDate(now, currentDay, true);
    // const dayEnd = getEarlierDate(now, currentDay - 1, true);

    let count = 0;

    while (currentResult && currentResult.createdAt >= dayStart.toISOString()) {
      count += 1;
      resultIdx += 1;
      currentResult = resultData[resultIdx];
    }

    dataPoints.unshift({
      date: format(dayStart, Formats.DateShort),
      count,
    });
  }

  return dataPoints;
};

export const makeBinnings = (assessmentList, resultsData, days, now) => {
  const binnedData = [];

  const assessmentIds = Object.keys(resultsData || {});

  for (let assessmentId of assessmentIds) {
    const resultData = resultsData[assessmentId];

    const assessmentData = assessmentList.filter((item) => `${item.id}` === assessmentId)[0];

    binnedData.push({
      name: assessmentData.name,
      distribution: makeBinning(resultData, days, now),
    });
  }

  return binnedData;
};
