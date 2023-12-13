import eicaaWithTextLogo from '../../../assets/logos/logo-eicaa-with-text-small.png';

import { COMPETENCES_DATA, QUESTIONS_DATA, SIZES } from './utils';

const answerTableHeaders = ['ID', 'Question', 'Answer', 'Avg.', '25%', '50%', '75%'];

/**
 * Returns all table data for each area's each competence.
 * A (currently safe) assumption is made that both question items and answers are
 * ordered by questionId.
 *
 * @param {*} assessmentQuestions
 * @param {*} assessmentAnswers
 * @returns
 */
export const getAreaList = (assessmentQuestions, assessmentAnswers) => {
  const areaList = [];

  const { items } = assessmentQuestions;

  let answerIdx = 0; // for question
  let groupIdx = 0; // for competence

  let currentArea;
  let currentGroup;

  while (answerIdx < assessmentAnswers.length) {
    try {
      const currentAnswer = assessmentAnswers[answerIdx];
      const currentQuestion = items[answerIdx];

      const { groupId, answer } = currentAnswer;
      const { area, competence, hint, question, id } = currentQuestion;

      if (currentArea?.area !== area) {
        currentArea = {
          area,
          groups: [],
        };

        areaList.push(currentArea);
      }

      if (currentGroup?.groupId !== groupId) {
        currentGroup = {
          groupId,
          competence,
          hint,
          questions: [],
          refData: {
            avg: COMPETENCES_DATA.AVG[groupIdx],
            p25: COMPETENCES_DATA.P25[groupIdx],
            p50: COMPETENCES_DATA.P50[groupIdx],
            p75: COMPETENCES_DATA.P75[groupIdx],
          },
        };

        currentArea.groups.push(currentGroup);

        groupIdx++;
      }

      currentGroup.questions.push({
        id,
        question,
        answer,
        refData: {
          avg: QUESTIONS_DATA.AVG[answerIdx],
          p25: QUESTIONS_DATA.P25[answerIdx],
          p50: QUESTIONS_DATA.P50[answerIdx],
          p75: QUESTIONS_DATA.P75[answerIdx],
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      answerIdx++;
    }
  }

  return areaList;
};

const baseAnswerCellStyle = {
  font: 'Rubik-Bold',
  fontStyle: 'bold',
  halign: 'center',
  valign: 'middle',
  fontSize: 9,
};

export const printResultsHeader = ({ pdf, surveyMetadata, submitDate, finalY }) => {
  const { day, month, year, hour, minute } = submitDate;

  pdf.setFontSize(20);
  const title = `${surveyMetadata.name} +  Answers`;
  const titleLines = pdf.splitTextToSize(title, SIZES.CONTENT_WIDTH_LEFT);
  pdf.text(titleLines, 10, (finalY += 56 * SIZES.UNIT_PT), {
    maxWidth: SIZES.CONTENT_WIDTH_LEFT,
  });
  finalY += (titleLines.length - 1) * 25 * 1.15 * SIZES.UNIT_PT; // Offset calculated for extra lines

  pdf.text(
    `Submitted on: ${day}.${month}.${year} ${hour}:${minute}`,
    10,
    (finalY += 40 * SIZES.UNIT_PT),
    { maxWidth: 130 },
  );

  pdf.addImage(eicaaWithTextLogo, 'PNG', 149, 13, 40, 20);

  return finalY;
};

/**
 * Prints results as tables for each competence
 */
export const printResultTables = ({ pdf, answerTitles, areaList, finalY }) => {
  for (let { area, groups } of areaList) {
    if (finalY > 245) {
      pdf.addPage();
      finalY = 0;
    }

    pdf.setFontSize(16);
    pdf.text(`Area: ${area}`, 10, (finalY += 36 * SIZES.UNIT_PT), {
      maxWidth: SIZES.CONTENT_WIDTH,
    });
    finalY -= 4 * SIZES.UNIT_PT;

    for (let group of groups) {
      const { competence, hint, questions, refData: groupRefData } = group;

      let averageOfAnswers = questions?.length
        ? questions.map((item) => item.answer).reduce((sum, ans) => sum + ans, 0) / questions.length
        : undefined;

      if (averageOfAnswers) {
        averageOfAnswers = `${
          answerTitles[+averageOfAnswers.toFixed(0)]
        }\n(${+averageOfAnswers.toFixed(2)})`; // .toFixed(2);
      }

      const competenceTitle =
        hint && hint !== '-' ? `Competence: ${competence} (${hint})` : `Competence: ${competence}`;

      /* pdf.setFontSize(14);
      const competenceTitleLines = pdf.splitTextToSize(competenceTitle, SIZES.CONTENT_WIDTH);
      pdf.text(competenceTitleLines, 10, (finalY += 28 * SIZES.UNIT_PT), {
        maxWidth: SIZES.CONTENT_WIDTH,
      });
      // Offset calculated for extra lines
      finalY += (competenceTitleLines.length - 1) * 14 * 1.15 * SIZES.UNIT_PT; */

      if (finalY > 252) {
        pdf.addPage();
        finalY = 0;
      }

      pdf.autoTable({
        showHead: 'never',
        body: [
          [
            competenceTitle,
            averageOfAnswers,
            groupRefData.avg,
            groupRefData.p25,
            groupRefData.p50,
            groupRefData.p75,
          ],
        ],
        startY: finalY + 24 * SIZES.UNIT_PT,
        margin: {
          left: 10,
          right: 10,
        },
        styles: {
          font: 'Rubik-Regular',
          fontStyle: 'normal',
          fontType: 'normal',
        },
        bodyStyles: {
          fontSize: 9.5,
        },
        columnStyles: {
          0: {
            cellWidth: 115, // was 162
            halign: 'left',
            valign: 'top',
            fontSize: 12,
          },
          1: {
            cellWidth: 30,
            ...baseAnswerCellStyle,
          },
          2: {
            cellWidth: 12,
            ...baseAnswerCellStyle,
          },
          3: {
            cellWidth: 11,
            ...baseAnswerCellStyle,
          },
          4: {
            cellWidth: 11,
            ...baseAnswerCellStyle,
          },
          5: {
            cellWidth: 11,
            ...baseAnswerCellStyle,
          },
        },
      });

      finalY = pdf.lastAutoTable?.finalY;

      pdf.autoTable({
        head: [answerTableHeaders],
        body: questions.map((item) => [
          item.id,
          item.question,
          `${answerTitles[item.answer]} (${item.answer})`,
          item.refData.avg,
          item.refData.p25,
          item.refData.p50,
          item.refData.p75,
        ]),
        startY: finalY, // + 12 * SIZES.UNIT_PT,
        margin: {
          left: 10,
          right: 10,
        },
        styles: {
          font: 'Rubik-Regular',
          fontStyle: 'normal',
          fontType: 'normal',
        },
        headStyles: {
          fillColor: '#4792A8',
          cellPadding: {
            vertical: 4 * SIZES.UNIT_PT,
          },
          valign: 'middle',
        },
        bodyStyles: {
          cellPadding: {
            vertical: 3 * SIZES.UNIT_PT,
          },
          fontSize: 9.5,
        },
        columnStyles: {
          0: {
            cellWidth: 9, // was 10
            halign: 'center',
          },
          1: {
            cellWidth: 106, // was 152
          },
          2: {
            cellWidth: 30,
            ...baseAnswerCellStyle,
          },
          3: {
            cellWidth: 12,
            ...baseAnswerCellStyle,
          },
          4: {
            cellWidth: 11,
            ...baseAnswerCellStyle,
          },
          5: {
            cellWidth: 11,
            ...baseAnswerCellStyle,
          },
          6: {
            cellWidth: 11,
            ...baseAnswerCellStyle,
          },
        },
        didParseCell: (hookData) => {
          if (hookData.section === 'head') {
            // Cannot style header cell for each column, so it is done this way
            if ([0, 2, 3, 4, 5, 6].includes(hookData.column.dataKey)) {
              hookData.cell.styles.halign = 'center';
            }
          }
        },
      });

      finalY = pdf.lastAutoTable?.finalY;
    }
  }

  // return finalY
};
