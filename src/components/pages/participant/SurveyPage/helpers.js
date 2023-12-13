import { lowerCaseInitial } from "../../../../utils/helpers";

export const restructureAssessmentQuestions = assessmentQuestions => {
  const structuredQuestions = [];
  let questionGroupPage = [];
  let groupId = 1;
  let pageId = 1;

  assessmentQuestions.items.forEach(capitalQuestion => {
    const question = {};

    for (const key of Object.keys(capitalQuestion)) {
      question[lowerCaseInitial(key)] = capitalQuestion[key];
    }

    // Restructure questions by competence groups into max. 4 long arrays as maximum 4 questions are allowed per page
    if (
      questionGroupPage.length &&
      questionGroupPage[0].competence !== question.competence
    ) {
      structuredQuestions.push(questionGroupPage);
      questionGroupPage = [];
      groupId++;
      pageId++;
    } else {
      if (questionGroupPage.length === 4) {
        structuredQuestions.push(questionGroupPage);
        questionGroupPage = [];
        pageId++;
      }
    }

    question.groupId = groupId;
    question.pageId = pageId;
    questionGroupPage.push(question);
  });
  
  structuredQuestions.push(questionGroupPage);
  const restructuredAssessmentQuestions = JSON.parse(JSON.stringify(assessmentQuestions));
  restructuredAssessmentQuestions.items = structuredQuestions;
  
  return restructuredAssessmentQuestions;
};

export const createAssessmentAnswersStructure = assessmentQuestions => {
  let groupId = 1;
  let pageId = 1;
  let itemsOnPage = 0;
  let lastItemCompetence;

  return assessmentQuestions?.map(question => {
    if (
      lastItemCompetence &&
      question.competence !== lastItemCompetence
    ) {
      groupId++;
      pageId++;
      itemsOnPage = 0;
    } else {
      if (itemsOnPage === 4) {
        pageId++;
        itemsOnPage = 0;
      }
    }

    itemsOnPage++;
    lastItemCompetence = question.competence;
    
    return {
      id: question.id,
      answer: null,
      groupId,
      pageId,
    };
  });
};

export const getCurrentPageId = assessmentAnswers => {
  if (!assessmentAnswers.filter(answer => answer.answer === null).length) {
    return Math.max(...assessmentAnswers.map(answer => answer.pageId));
  }

  return Math.min(
    ...assessmentAnswers
      .filter(answer => answer.answer === null)
      .map(answer => answer.pageId),
  );
};

export const getCurrentQuestionId = assessmentAnswers => {
  if (!assessmentAnswers.filter(answer => answer.answer === null).length) {
    return Math.max(...assessmentAnswers.map(answer => answer.id))
  }

  return Math.min(
    ...assessmentAnswers
      .filter(answer => answer.answer === null)
      .map(answer => answer.id),
  );
};
