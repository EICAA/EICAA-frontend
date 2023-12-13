import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
import { PARTICIPANT_ASSESSMENT_KEYS } from '../../storage/storageHandlers/config';

import { printPagesBeforeResult } from './sections/beforeResult';
import { getAreaList, printResultTables, printResultsHeader } from './sections/results';
import { printPagesAfterResult } from './sections/afterResult';
import { getSubmitDate } from './sections/utils';

/* eslint-disable no-unused-vars */
import * as rubikRegular from './Rubik-Regular-normal';
import * as rubikItalic from './Rubik-Italic-normal';
import * as rubikBold from './Rubik-Bold-normal';
/* eslint-enable no-unused-vars */

/*
  Resolving issues with UTF-8 support based on these sources:
  - https://github.com/parallax/jsPDF#use-of-unicode-characters--utf-8
  -
*/

applyPlugin(jsPDF);

/**
 * Creates and saves the Answers PDF layout.
 *
 * @param {*} assessmentData
 */

export const createResultsWithTablesPdf = (assessmentData) => {
  const assessmentEnd = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_END];
  const surveyMetadata = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA];
  const assessmentQuestions = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_QUESTIONS];
  const assessmentAnswers = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.ASSESSMENT_ANSWERS];

  const { answers } = assessmentQuestions;

  const answerTitles = answers.reduce((acc, answer) => {
    acc[answer.score] = answer.title;
    return acc;
  }, {});

  try {
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',     
    });

    const submitDateRaw = new Date(assessmentEnd);
    const submitDate = getSubmitDate(submitDateRaw);

    //pdf.addFont('helvetica', 'normal');
    //pdf.setFont('helvetica');
    pdf.setFont('Rubik-Regular', 'normal');

    printPagesBeforeResult({ pdf });

    // Results section

    let finalY = 0;

    finalY = printResultsHeader({ pdf, surveyMetadata, submitDate, finalY });

    const areaList = getAreaList(assessmentQuestions, assessmentAnswers);

    printResultTables({ pdf, answerTitles, areaList, finalY });

    // end of: Results section

    printPagesAfterResult({ pdf, submitDate });

    pdf.save('assessment-answers.pdf');
  } catch (err) {
    console.error(err);
  }
};
