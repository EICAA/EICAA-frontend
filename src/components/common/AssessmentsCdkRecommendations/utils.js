export const COMPETENCE_BASELINE_AVERAGES = {
  0: {
    0: 2.81965859030837,
    1: 2.63325991189427,
    2: 2.79669603524229,
    3: 2.78340675477239,
    4: 2.44218061674009,
    5: 3.16327092511013,
  },
  1: {
    0: 3.09691629955947,
    1: 3.13546255506608,
    2: 2.46696035242291,
    3: 2.68171806167401,
    4: 2.86710719530103,
    5: 2.5454295154185,
  },
  2: {
    0: 3.41226138032305,
    1: 2.92070484581498,
    2: 2.82621145374449,
    3: 2.53083700440529,
    4: 2.34030837004405,
    5: 3.13560022026432,
    6: 3.284140969163,
  },
};

export const COMPETENCE_BASELINE_DEVIATIONS = {
  0: {
    0: 0.752637108837835,
    1: 0.906364713156784,
    2: 0.790203306641867,
    3: 0.892386155807945,
    4: 0.856687118491508,
    5: 0.842704985615406,
  },
  1: {
    0: 0.816195874975607,
    1: 0.87793489882718,
    2: 0.884416607103402,
    3: 0.910184637740144,
    4: 0.835126949888504,
    5: 0.887133021159464,
  },
  2: {
    0: 0.882964628708123,
    1: 0.878940645380687,
    2: 0.816948477699792,
    3: 0.906185549306598,
    4: 0.970885900576215,
    5: 0.882151729305703,
    6: 0.870538426339643,
  },
};

// DO NOT USE THIS
// Notice: z scores are already calculated in getCompetenceAverages!
// Also note: this worked for the grouped competenceAverages representation
/* const getZScores = (competenceAverages) => {
  const zScores = []; // = {};

  for (let idxA = 0; idxA < competenceAverages.length; idxA++) {
    const area = competenceAverages[idxA];

    for (let idxB = 0; idxB < area.competences.length; idxB++) {
      const competence = area.competences[idxB];

      const zScore =
        (competence.avg - COMPETENCE_BASELINE_AVERAGES[idxA][idxB]) /
          COMPETENCE_BASELINE_DEVIATIONS[idxA][idxB] +
        2.5;

      zScores.push({ area: idxA + 1, competence: idxB + 1, z: Math.max(Math.min(zScore, 5), 1) });
    }
  }

  return zScores;
}; */

const ungroupCompetences = (competenceAverages) => {
  const competences = [];

  for (let idxA = 0; idxA < competenceAverages.length; idxA++) {
    const area = competenceAverages[idxA];

    for (let idxB = 0; idxB < area.competences.length; idxB++) {
      const competence = area.competences[idxB];

      competences.push({ area: idxA + 1, competence: idxB + 1, avg: competence.avg });
    }
  }

  return competences;
};

export const selectDifficulty = (score) => {
  if (score > 4) {
    return 'advanced';
  } else if (score > 3) {
    return 'intermediate';
  } else {
    return 'basic';
  }
  // Older limits were 3.5, 2.5
};

// Notice: z scores are already calculated in getCompetenceAverages!
export const getGroupedModuleRecommendations = (competenceAverages) => {
  // highest first
  const competencedOrdered = ungroupCompetences(competenceAverages).sort((a, b) => {
    if (a.avg > b.avg) {
      return -1;
    }
    if (a.avg < b.avg) {
      return 1;
    }
    return 0;
  });

  const competencesGrouped = competencedOrdered.reduce(
    (acc, module) => {
      acc[selectDifficulty(module.avg)].push(module);

      return acc;
    },
    { basic: [], intermediate: [], advanced: [] },
  );

  return competencesGrouped;
};

// Notice: z scores are already calculated in getCompetenceAverages!
export const getSingleListModuleRecommendations = (competenceAverages) => {
  // lowest first
  const competencedOrdered = ungroupCompetences(competenceAverages).sort((a, b) => {
    if (a.avg > b.avg) {
      return 1;
    }
    if (a.avg < b.avg) {
      return -1;
    }
    return 0;
  });

  return competencedOrdered;
};
