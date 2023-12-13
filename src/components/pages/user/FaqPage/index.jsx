import React from 'react';
import { useIntl } from 'react-intl';

import QuestionAnswerBlock from '../../../common/QuestionAnswerBlock';
import './index.scss';
import FAQsComponent from '../../../common/FAQsComponent';

const QAList = [
  {
    q: 'Question one?',
    a: 'Answer one...',
  },
  {
    q: 'Question two?',
    a: 'Answer two...',
  },
];

const FaqPage = () => {
  const intl = useIntl();

  return (
    <div className="faq-page">
      <div className="faq-page__container">
        <h1 className="faq-page__title">{intl.messages.user?.faqPage.title}</h1>
        <div className="faq-page__content">
        <FAQsComponent />
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
