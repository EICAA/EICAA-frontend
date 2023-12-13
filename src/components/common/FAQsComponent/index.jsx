import React from 'react';
import faqsData from '../../../i18n/en.json';
import QuestionAnswerBlock from '../QuestionAnswerBlock';

const FAQsComponent = () => {
  const { title, questions, answers } = faqsData.faqs;

  const qaList = Object.keys(questions).map((key) => ({
    id: key,
    question: questions[key],
    answer: answers[key],
  }));

  return (
    <div>
    {qaList.map((item) => (
      <QuestionAnswerBlock key={item.id} qaItem={item} />
    ))}
    </div>
  );
};

export default FAQsComponent;
