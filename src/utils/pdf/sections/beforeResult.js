import chart from '../../../assets/images/chart.png';
import eicaaWithTextLogo from '../../../assets/logos/logo-eicaa-with-text-small.png';

const TYPES = {
  NORMAL: 'normal',
  ITALIC: 'italic',
  //LINK: 'link',
  PAGE_BREAK: 'PAGE_BREAK',
};

const mergedText = [
  {
    text: 'To allow a better understanding of your results, we would like to provide you with some conceptual background information. The self-assessment is based on the EICAA Competence Framework which leans on the European Entrepreneurship Competence Framework (EntreComp) of the European Commission. Both frameworks endorse a wide understanding of entrepreneurship. Basically, this means that they do not limit entrepreneurial activities to the creation of start-ups. Rather, they define entrepreneurship as ',
    type: TYPES.NORMAL,
  },

  {
    text: '“when you act upon opportunities and ideas and transform them into (financial, cultural, or social) value for others.”',
    type: TYPES.ITALIC,
  },
];

const mergedTextString = mergedText.map((textObj) => textObj.text).join(' ');

const rightAlignedText = '1.  Ideas & Opportunities\n2.  Resources\n3.  Into Action';

const texts = [
  {
    text: 'Dear Participant,',
    type: TYPES.NORMAL,
  },
  {
    text: 'thank you for taking part in the EICAA self-assessment. You can find a summary of your result together with a certificate of participation below (scroll down).',
    type: TYPES.NORMAL,
  },
  {
    text: mergedTextString,
    type: TYPES.NORMAL,
  },
  {
    text: 'On the basis of this definition, we distinguish 3 intertwined entrepreneurship competence areas:',
    type: TYPES.NORMAL,
  },
  {
    text: '...',
    type: TYPES.PAGE_BREAK,
  },
  {
    text: 'Each area integrates a set of entrepreneurship competences (see figure 1). The questions of the EICAA self-assessment reflect these competences. The following paragraphs summarize what each competence area is about.',
    type: TYPES.NORMAL,
  },
  {
    text: 'Competence Area 1: Ideas & Opportunities',
    type: TYPES.ITALIC,
  },
  {
    text: 'This area integrates competences that are associated with the initial stages of an entrepreneurial/value-creating activity. It focuses on competences that are needed to detect opportunities and to generate and assess ideas appropriately. Thus, not only creativity but also the ability to identify needs and to immerse with potential users/target groups fall under this competence area. However, it also focuses on competences that are needed to develop a vision for an entrepreneurial venture and for your own personal development. Last, it covers competences such as ethical and sustainable thinking. These competences are considered key for developing a wider view that goes beyond the mere economic value of any entrepreneurial activity. They allow you to better assess what impact your entrepreneurial activity creates from a societal point of view, what your plans and actions mean for sustainability and whether you are able to manage moral and ethical dilemmas entrepreneurial activities may encompass.',
    type: TYPES.NORMAL,
  },
  {
    text: 'Competence Area 2: Resources',
    type: TYPES.ITALIC,
  },
  {
    text: 'This area distinguishes personal traits and competences that are associated with finding, organizing and dealing with the resources needed to develop an entrepreneurial/value-creating activity. Therefore, it integrates competences like self-awareness and self-efficacy, motivation and perseverance, digital competence and the ability to mobilize others. These are complemented by financial and economic know-how and the ability to acquire and manage resources (material and non-material). The competence area Resources functionally connects the areas Ideas & Opportunities and Into Action. In fact, resources are needed in both of them but also for advancing from ideation to execution with regard to an entrepreneurial endeavor.',
    type: TYPES.NORMAL,
  },
  {
    text: 'Competence Area 3: Into Action',
    type: TYPES.ITALIC,
  },
  {
    text: 'The competences underlying this area are related to the actual implementation of an entrepreneurial/value-creating activity. Consequently, it focuses on competences that are needed to initiate, develop, and sustain an entrepreneurial endeavor – not only alone but also through the leading of and the collaborating with others. Moreover, it captures the oftentimes challenging, dynamic and unsecure nature of entrepreneurial realization processes. This is done by integrating the competences coping with uncertainty, ambiguity, and risk, managing (agile) processes, and learning through experience. Importantly, it also integrates the competence design validation (prototyping, experimenting, and testing) as well as the ability to engage in co-creation processes.',
    type: TYPES.NORMAL,
  },
  {
    text: 'Please note that the composition of each competence area is evidence-based. All included competences have been theoretically derived and empirically validated. For more information please consult the EICAA Competence Framework and/or the documentation of the EICAA Competence Monitor establishment.',
    type: TYPES.NORMAL,
  },

  {
    text: '...',
    type: TYPES.PAGE_BREAK,
  },
];

export const printPagesBeforeResult = ({ pdf }) => {
  const pageWidth = pdf.internal.pageSize.getWidth();

  const margin = 20;
  const maxTextWidth = 170;
  const logoHeight = 25;

  pdf.setFontSize(12);
  pdf.addImage(eicaaWithTextLogo, 'PNG', 149, 13, 40, 20);

  const textChart = 'Figure 1: Visualization of the EICAA Competence Framework (Source: EICAA)';
  const textOneMarker =
    '¹FFE-YE 2012: Impact of Entrepreneurship Education in Denmark – 2011. In L. Vestergaard, K. Moberg & C. Jørgensen (Eds.). Odense: The Danish Foundation for Entrepreneurship - Young Enterprise.';

  let firstPageRendered = false;
  let addedLinks = false;

  const imageWidth = 100;
  const imageHeight = 100;
  const imageX = (pageWidth - imageWidth) / 2;
  const imageY = 125;
  pdf.addImage(chart, 'PNG', imageX * 0.8, imageY + 12, imageWidth * 1.2, imageHeight * 1.2);

  let currentY = margin + logoHeight - 5;

  function setFont(type) {
    if (type === TYPES.NORMAL) {
      // pdf.setFont('Rubik-Regular', 'normal');
      pdf.setFont('helvetica', 'normal');
    } else if (type === TYPES.ITALIC) {
      // pdf.setFont('Rubik-Regular', 'normal');
      pdf.setFont('helvetica', 'italic');
    }
  }
  // pdf.setFont('Rubik-Regular', 'normal');
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'italic');
  pdf.textWithLink(
    'EICAA Competence Framework: https://www.eicaa.eu/results/competence-framework/',
    20,
    108,
    { url: 'https://www.eicaa.eu/results/competence-framework/' },
  );
  pdf.setFont('helvetica', 'normal');


  texts.forEach((textObj) => {
    const { text, type } = textObj;

    if (type === TYPES.PAGE_BREAK) {
      currentY = margin + logoHeight - 8;
      pdf.addPage();
      firstPageRendered = true;
      pdf.addImage(eicaaWithTextLogo, 'PNG', 149, 13, 40, 20);
    } else if (type !== TYPES.PAGE_BREAK) {
      currentY += 4.5;
    }

    if(!addedLinks && firstPageRendered && type == TYPES.PAGE_BREAK){
      pdf.setFont('helvetica', 'italic');
      pdf.textWithLink(
        'EICAA Competence Framework: https://www.eicaa.eu/results/competence-framework/',
        20,
        273,
        { url: 'https://www.eicaa.eu/results/competence-framework/' },
      );

      pdf.textWithLink(
        'EICAA Competence Monitor: https://www.eicaa.eu/results/competence-monitor/',
        20,
        278,
        { url: 'https://www.eicaa.eu/results/competence-monitor/' },
      );
      pdf.setFont('helvetica', 'normal');
      addedLinks = true;
    }
    
    setFont(type);

    if (type === TYPES.NORMAL || type === TYPES.ITALIC) {
      const textLines = pdf.splitTextToSize(text, maxTextWidth);
      pdf.text(textLines, margin, currentY, { align: 'justify', maxWidth: maxTextWidth });
      currentY += textLines.length * 5;
    }

    if (!firstPageRendered) {
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      const textOneMarkerLines = pdf.splitTextToSize(textOneMarker, maxTextWidth);
      pdf.text(textOneMarkerLines, margin, 275, { align: 'left', maxWidth: maxTextWidth });

      pdf.setTextColor(68, 84, 106);
      pdf.text(textChart, pageWidth / 2, 255, 'center');

      pdf.setTextColor(0, 0, 0);

      pdf.setLineWidth(0.5);
      pdf.line(20, 270, 60, 270);

      pdf.setFontSize(12);
      firstPageRendered = true;

      pdf.setFont('helvetica', 'normal');
      pdf.text(rightAlignedText, 30, 126, { align: 'left' });
    }
  });
};
