import eicaaWithTextLogo from '../../../assets/logos/logo-eicaa-with-text-small.png';
import erasmusLogoWithText from '../../../assets/logos/erasmusLogoWithText.png';
import licenseInfo from '../../../assets/images/license-info-text.jpg';
import lineUp from '../../../assets/images/line-up.png';
import lineDown from '../../../assets/images/line-down.png';
import lineLeft from '../../../assets/images/line-left.png';
import lineRight from '../../../assets/images/line-right.png';
import backgroundImage from '../../../assets/images/background-image.png';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const titleCertificate = 'CERTIFICATE';
const titleCertificateSmall = 'OF PARTICIPATION';
const textMain =
  'The Entrepreneurial and Intrapreneurial Competences Assessment Alliance (EICAA) hereby confirms the successful completion of the self-assessment.';
const textThankyou = 'We thank you for your participation.';

const textFooter =
  'The mission of the EICAA consortium is to strengthen entrepreneurial competence development among students, academic staff, and corporate employees – in Europe and beyond.';

const titleDisclaimer = 'DISCLAIMER:';
const textBox =
  'The information set out in this document are those of EICAA and do not reflect the official opinion of the European Union. Neither the European Union institutions and bodies nor any person acting on their behalf may be held responsible for the use which may be made of the information contained therein.';
const textLicense = 'License Info:';
const textInfo = 'EICAA Funding Info:';

export const printPagesAfterResult = ({ pdf, submitDate }) => {
  pdf.addPage();

  pdf.addImage(eicaaWithTextLogo, 'PNG', 25, 30, 51, 25);
  pdf.addImage(erasmusLogoWithText, 'PNG', 126, 30, 60, 14);
  pdf.addImage(lineUp, 'PNG', 0, -5, 300, 25);
  pdf.addImage(lineLeft, 'PNG', 0, 0, 25, 300);
  pdf.addImage(lineRight, 'PNG', 185, 0, 25, 300);
  pdf.addImage(lineDown, 'PNG', 0, 275, 300, 25);
  pdf.addImage(backgroundImage, 'PNG', 43, -6, 300, 300);

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const rectWidth = 180;
  const rectHeight = 40;
  const maxWidth = 100;
  const footerMaxWidth = 180;
  const rectX = (pageWidth - rectWidth) / 2;
  const rectY = (pageHeight - rectHeight) / 3;

  pdf.setTextColor(10, 171, 206);

  const submittedMonth = months[submitDate.month - 1];
  const titleCertificateLines = pdf.splitTextToSize(titleCertificate, maxWidth);
  const titleCertificateSmallLines = pdf.splitTextToSize(titleCertificateSmall, maxWidth);
  const textThankyouLines = pdf.splitTextToSize(textThankyou, maxWidth);
  const textLinesMain = pdf.splitTextToSize(textMain, maxWidth);
  const textLinesFooter = pdf.splitTextToSize(textFooter, footerMaxWidth);

  titleCertificateLines.forEach((line, index) => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(36);
    pdf.text(line, pageWidth / 4 - 10, rectY + 15 + index * 4, 'left');
  });
  titleCertificateSmallLines.forEach((line, index) => {
    pdf.setFontSize(22);
    pdf.text(line, pageWidth / 4 - 10, rectY + 25 + index * 4, 'left');
  });
  textThankyouLines.forEach((line, index) => {
    pdf.setFontSize(18);
    pdf.text(line, pageWidth / 4 - 10, rectY + 88 + index * 4, 'left');
  });
  pdf.setFontSize(18);
  pdf.text(
    `${submittedMonth} ${submitDate.day}, ${submitDate.year}.`,
    pageWidth / 4 - 10,
    rectY + 120,
    'left',
  );

  const maxTextWidth = 120;

  textLinesMain.forEach((line, index) => {
    pdf.setFontSize(18);
    pdf.text(line, pageWidth / 4-10, rectY + 45 + index * 9, {align: 'left', maxTextWidth: maxWidth});
  });


  textLinesFooter.forEach((line, index) => {
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(12);
    pdf.text(line, pageWidth / 2, rectY + 175 + index * 4, {
      align: 'center',
    });
  });

  pdf.addPage();

  pdf.addImage(eicaaWithTextLogo, 'PNG', 149, 13, 40, 20);
  pdf.addImage(licenseInfo, 'JPG', 80, 170, 70, 17);
  pdf.addImage(erasmusLogoWithText, 'PNG', 80, 220, 70, 17);

  pdf.setFont('helvetica', 'normal');
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(1);
  pdf.rect(rectX, rectY, rectWidth, rectHeight);
  pdf.stroke();

  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0);
  pdf.text(titleDisclaimer, pageWidth / 2, rectY + 8, { align: 'center' });
  const maxWidthBox = 170;

  const textLines = pdf.splitTextToSize(textBox, maxWidthBox);
  textLines.forEach((line, index) => {
    pdf.setFontSize(12);
    pdf.text(line, pageWidth / 2, rectY + 17 + index * 5, 'center');
  });

  pdf.text(textLicense, pageWidth / 4 - 35, rectY + 95, 'left');
  pdf.text(textInfo, pageWidth / 4 - 35, rectY + 145, 'left');
};
