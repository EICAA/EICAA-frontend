import {
  COMPETENCE_BASELINE_AVERAGES,
  COMPETENCE_BASELINE_DEVIATIONS,
} from '../AssessmentsCdkRecommendations/utils';

const getCompetenceInitArray = (assessmentTypeQuestionsData) => {
  const { competences } = assessmentTypeQuestionsData;
  const initArray = [];

  for (let competence of competences) {
    const { area, name } = competence;

    initArray.push({
      area,
      competence: name,
    });
  }

  return initArray;
};

const areaCompetenceCount = [6, 6, 7];

const resultIdxToAreaAndCompetenceIdx = (idx) => {
  let remaining = idx;
  let areaIdx = 0;
  let competenceIdx = 0;

  while (areaCompetenceCount[areaIdx] <= remaining) {
    remaining -= areaCompetenceCount[areaIdx];
    competenceIdx++;
  }

  return { areaIdx, competenceIdx };
};

const resolvedAreaAndCompetenceIndexes = [];

for (let idx = 0; idx < 19; idx++) {
  resolvedAreaAndCompetenceIndexes.push(resultIdxToAreaAndCompetenceIdx(idx));
}

const getZScore = (avg, areaIdx, competenceIdx) => {
  const zScore =
    (avg - COMPETENCE_BASELINE_AVERAGES[areaIdx][competenceIdx]) /
      COMPETENCE_BASELINE_DEVIATIONS[areaIdx][competenceIdx] +
    2.5;

  // Normalizing
  return Math.max(Math.min(zScore, 5), 1);
};

// EDIT: updated to show zScores instead of averages
const getCompetenceAverages = (
  requestedData,
  count,
  assessmentTypeQuestionsData,
  grouped = true,
) => {
  let data;

  if (requestedData && requestedData.length && assessmentTypeQuestionsData) {
    data = getCompetenceInitArray(assessmentTypeQuestionsData);

    for (let item of data) {
      item.score = 0;
    }

    for (let result of requestedData) {
      for (let idx = 0; idx < result.length; idx++) {
        data[idx].score += result[idx];
      }
    }

    for (let idx = 0; idx < data.length; idx++) {
      const item = data[idx];

      item.avg = item.score / count;
      delete item.score;

      // Calculate ZScores - overwrite
      const { areaIdx, competenceIdx } = resolvedAreaAndCompetenceIndexes[idx];
      item.avg = getZScore(item.avg, areaIdx, competenceIdx);
    }
  }

  if (!grouped) {
    return data;
  }

  let dataByAreas = [];

  if (data) {
    const dataByAreasObj = data.reduce((acc, item) => {
      const { area, competence, avg } = item;

      let currentArea = acc[area];

      if (!currentArea) {
        currentArea = {
          area,
          competences: [],
        };

        acc[area] = currentArea;
      }

      currentArea.competences.push({ competence, avg });

      return acc;
    }, {});

    dataByAreas = Object.values(dataByAreasObj);

    for (let area of dataByAreas) {
      const sum = area.competences.reduce((acc, competence) => {
        return acc + competence.avg;
      }, 0);

      area.avg = sum / area.competences.length;
    }
  }

  return dataByAreas;
};

const getCompetenceGradeHistogram = (
  requestedData,
  assessmentTypeQuestionsData,
  grouped = true,
) => {
  let data;

  if (requestedData && requestedData.length && assessmentTypeQuestionsData) {
    data = getCompetenceInitArray(assessmentTypeQuestionsData);

    for (let item of data) {
      item.histogram = [0, 0, 0, 0, 0];
    }

    for (let result of requestedData) {
      for (let idx = 0; idx < result.length; idx++) {
        const { histogram } = data[idx];

        // const grade = Math.round(result[idx]);

        // Calculate zGrades
        const { areaIdx, competenceIdx } = resolvedAreaAndCompetenceIndexes[idx];
        const zGrade = Math.round(getZScore(result[idx], areaIdx, competenceIdx));
        histogram[zGrade - 1] += 1;
      }
    }
  }

  if (!grouped) {
    return data;
  }

  let dataByAreas = [];

  if (data) {
    const dataByAreasObj = data.reduce((acc, item) => {
      const { area, competence, histogram } = item;

      let currentArea = acc[area];

      if (!currentArea) {
        currentArea = {
          area,
          competences: [],
        };

        acc[area] = currentArea;
      }

      currentArea.competences.push({ competence, histogram });

      return acc;
    }, {});

    dataByAreas = Object.values(dataByAreasObj);
  }

  return dataByAreas;
};

const getProportionalSummary = (requestedData) => {
  let data;

  if (requestedData && requestedData.length) {
    data = [0, 0, 0, 0, 0];
    let count = 0;

    for (let result of requestedData) {
      let average = 0;
      for (let idx = 0; idx < result.length; idx++) {
        const answer = result[idx];

        // Calculate ZScores - overwrite
        const { areaIdx, competenceIdx } = resolvedAreaAndCompetenceIndexes[idx];
        const zScore = getZScore(answer, areaIdx, competenceIdx);

        average += zScore; // answer
      }

      average /= result.length;

      const grade = Math.round(average);
      data[grade - 1]++;

      count++;
    }

    for (let idx = 0; idx < data.length; idx++) {
      data[idx] /= count;
    }
  }

  return data;
};

const getFixedPercent = (val, numDigits = 0) => (val * 100).toFixed(numDigits);

const getStrengthsAndWeaknesses = (competenceAverages, threshold = 1) => {
  let competences = [];

  for (let area of competenceAverages) {
    for (let competence of area.competences) {
      competences.push({
        ...competence,
        area: area.area,
      });
    }
  }

  competences.sort((a, b) => {
    return a.avg - b.avg;
  });

  const min = competences[0].avg;
  const max = competences[competences.length - 1].avg;

  const competencesReversed = [...competences].reverse();
  const strengths = competencesReversed.filter((competence) => competence.avg > max - threshold);
  strengths.splice(5);
  const weaknesses = competences.filter((competence) => competence.avg < min + threshold);
  weaknesses.splice(5);

  return { strengths, weaknesses };
};

export {
  getCompetenceAverages,
  getCompetenceGradeHistogram,
  getProportionalSummary,
  getFixedPercent,
  getStrengthsAndWeaknesses,
};
