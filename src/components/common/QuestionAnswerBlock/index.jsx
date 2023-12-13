import React, { useState } from 'react';
import * as classnames from 'classnames';
import { useIntl } from 'react-intl';

import './index.scss';

const QuestionAnswerBlock = ({ qaItem }) => {
   const { question, answer } = qaItem;
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();

  if (!qaItem || !qaItem.question || !qaItem.answer) {
    return null;
  }

  return (
    <div className="question-answer-block">
      <div className="question-answer-block__header">
        <h3 className="question-answer-block__title">{`Q: ${JSON.stringify(question)}`}</h3>
        <div
          className={classnames('question-answer-block__toggle', isOpen ? 'open' : '')}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {isOpen ? intl.messages.user?.faqPage.hide : intl.messages.user?.faqPage.show}
          </span>
        </div>
      </div>
      <div className={classnames('question-answer-block__panel', isOpen ? 'open' : '')}>
        <div className="question-answer-block__panel-content">
          <p>{`A: ${JSON.stringify(answer)}`}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerBlock;
