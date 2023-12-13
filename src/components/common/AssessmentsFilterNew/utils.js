import { ASSESSMENT_TYPES, EXTENDED_CHECKBOX_STATUSES } from '../../../utils/constants';
import { COUNTRIES } from '../../../utils/countries';
import { Common, Employee, Student } from '../../../utils/selectOptions/demographics';

export const getDemographicsFieldLabels = (intl) => {
  return {
    [ASSESSMENT_TYPES.EMPLOYEE]: {
      country: intl.messages.common?.country,
      educationLevel: intl.messages.participant?.demographicsPage.employee.educationLevel,
      workExperience: intl.messages.participant?.demographicsPage.employee.workExperience,
      workField: intl.messages.participant?.demographicsPage.employee.workField,
      organisationType: intl.messages.participant?.demographicsPage.employee.organisationType,
      organisationSize: intl.messages.participant?.demographicsPage.employee.organisationSize,
      levelOfPosition: intl.messages.participant?.demographicsPage.employee.levelOfPosition,
      gender: intl.messages.participant?.demographicsPage.common.gender,
      ageGroup: intl.messages.participant?.demographicsPage.common.ageGroup,
    },
    [ASSESSMENT_TYPES.STUDENT]: {
      country: intl.messages.common?.country,
      educationLevel: intl.messages.participant?.demographicsPage.student.educationLevel,
      majorField: intl.messages.participant?.demographicsPage.student.majorField,
      hasWorkExperience: intl.messages.participant?.demographicsPage.student.hasWorkExperience,
      workExperience: intl.messages.participant?.demographicsPage.student.workExperience,
      employmentStatus: intl.messages.participant?.demographicsPage.student.work,
      employmentType: intl.messages.participant?.demographicsPage.student.employmentType,
      gender: intl.messages.participant?.demographicsPage.common.gender,
      ageGroup: intl.messages.participant?.demographicsPage.common.ageGroup,
    },
  };
};

const getTranslatedMap = (collection) => {
  return collection.reduce((acc, item) => {
    acc[item.value] = item.translatedName['en'];
    return acc;
  }, {});
};

export const getDemographicsValuesLabels = () => {
  const country = COUNTRIES.reduce((acc, item) => {
    acc[item.alpha2Code] = item.translatedName['en'];
    return acc;
  }, {});

  const educationLevel = getTranslatedMap(Common.EDUCATION_LEVEL_OPTIONS);
  const gender = getTranslatedMap(Common.GENDER_OPTIONS);
  const yesNo = getTranslatedMap(Common.YES_NO_OPTIONS);

  return {
    [ASSESSMENT_TYPES.EMPLOYEE]: {
      country,
      educationLevel,
      workExperience: getTranslatedMap(Employee.WORK_EXPERIENCE_OPTIONS),
      workField: getTranslatedMap(Employee.WORKING_FIELD_OPTIONS),
      organisationType: getTranslatedMap(Employee.ORGANISATION_TYPE_OPTIONS),
      organisationSize: getTranslatedMap(Employee.ORGANISATION_SIZE_OPTIONS),
      levelOfPosition: getTranslatedMap(Employee.LEVEL_OF_POSITION_OPTIONS),
      gender,
      ageGroup: getTranslatedMap(Employee.AGE_OPTIONS),
    },
    [ASSESSMENT_TYPES.STUDENT]: {
      country,
      educationLevel,
      majorField: getTranslatedMap(Student.MAJOR_FIELD_OPTIONS),
      hasWorkExperience: yesNo,
      workExperience: getTranslatedMap(Student.WORK_EXPERIENCE_OPTIONS),
      employmentStatus: yesNo,
      employmentType: getTranslatedMap(Student.EMPLOYMENT_TYPE_OPTIONS),
      gender,
      ageGroup: getTranslatedMap(Student.AGE_OPTIONS),
    },
  };
};

// Do not remove, as it can be useful later
export const getSelectionAsLists = (assessmentsResults, assessments, results) => {
  const selectedAssessments = Object.entries(assessments).reduce(
    (acc, assessment) => {
      const [assessmentId, selected] = assessment;

      if (selected !== EXTENDED_CHECKBOX_STATUSES.UNCHECKED) {
        acc[selected].push(assessmentId);
      }
      return acc;
    },
    { [EXTENDED_CHECKBOX_STATUSES.CHECKED]: [], [EXTENDED_CHECKBOX_STATUSES.PARTIAL]: [] },
  );

  let selectedResults = Object.entries(results)
    .filter(([, selected]) => selected)
    .map(([resultId]) => resultId);

  for (let assessmentId of selectedAssessments[EXTENDED_CHECKBOX_STATUSES.CHECKED]) {
    const assessmentResults = assessmentsResults[assessmentId].assessmentResults;
    const assessmentResultIds = Object.keys(assessmentResults || {});

    selectedResults = selectedResults.filter((resultId) => !assessmentResultIds.includes(resultId));
  }

  return {
    selectedAssessments,
    selectedResults,
  };
};

export const getSelectionAsSingleList = (
  assessmentsResults,
  assessments,
  results,
  shouldContainFullSelection = false,
) => {
  let selectedResults = Object.entries(results)
    .filter(([, selected]) => selected)
    .map(([resultId]) => resultId);

  const selectedAssessmentResults = Object.entries(assessments).reduce((acc, assessment) => {
    const [assessmentId, selected] = assessment;

    const selection = { id: assessmentId };

    if (selected !== EXTENDED_CHECKBOX_STATUSES.UNCHECKED) {
      if (shouldContainFullSelection || selected !== EXTENDED_CHECKBOX_STATUSES.CHECKED) {
        const assessmentResults = assessmentsResults[assessmentId].assessmentResults;
        const assessmentResultIds = Object.keys(assessmentResults || {});

        selection.resultIds = selectedResults.filter((resultId) =>
          assessmentResultIds.includes(resultId),
        );
      }

      acc.push(selection);
    }

    return acc;
  }, []);

  return selectedAssessmentResults;
};

export const getAssessmentTypeQuestionsData = (assessmentTypeData) => {
  const { items } = assessmentTypeData;

  const questions = {};
  const competences = [];
  const areas = [];

  if (items) {
    let currentArea;
    let currentCompetence;

    for (let item of items) {
      const { area, competence } = item;

      if (!currentArea || area !== currentArea.name) {
        currentArea = {
          name: area,
          competences: [],
        };

        areas.push(currentArea);
      }

      if (!currentCompetence || competence !== currentCompetence.name) {
        currentCompetence = {
          name: competence,
          questions: [],
        };

        currentArea.competences.push(currentCompetence);

        competences.push({ ...currentCompetence, area: currentArea.name });
      }

      currentCompetence.questions.push(`q${item.id}`);

      questions[`q${item.id}`] = {
        area: currentArea,
        competence: currentCompetence,
      };
    }
  }

  return {
    areas,
    competences,
    questions,
  };
};

export const transformRawResultToCompetenceScoreArray = (assessmentTypeQuestionsData, result) => {
  const { areas } = assessmentTypeQuestionsData;

  const transformedResult = [];

  for (let area of areas) {
    for (let areaCompetence of area.competences) {
      const { /*name,*/ questions } = areaCompetence;

      let totalCompetenceScore = questions.reduce((acc, question) => {
        return acc + result[question];
      }, 0);

      transformedResult.push(totalCompetenceScore / questions.length);
    }
  }

  return transformedResult;
};

/* For logging meaningful data on console */
/* export const transformRawResultToAreasObject = (assessmentTypeQuestionsData, result) => {
  const { areas } = assessmentTypeQuestionsData;

  const transformedResult = [];

  for (let area of areas) {
    const transformedArea = { name: area.name, competences: [] };

    let totalAreaScore = 0;

    for (let areaCompetence of area.competences) {
      const { name, questions } = areaCompetence;

      let totalCompetenceScore = questions.reduce((acc, question) => {
        return acc + result[question];
      }, 0);

      const averageCompetenceScore = totalCompetenceScore / questions.length;

      transformedArea.competences.push({
        name,
        avgScore: averageCompetenceScore,
      });

      totalAreaScore += averageCompetenceScore;
    }

    transformedArea.avgScore = totalAreaScore / transformedArea.competences.length;

    transformedResult.push(transformedArea);
  }

  return transformedResult;
}; */
