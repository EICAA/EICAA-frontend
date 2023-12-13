import * as React from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { feedbackSchema } from '../../../../utils/validationSchemas';
import TextareaField from '../../../common/ui/TextareaField';
import RatingSelector from '../../../common/ui/RatingSelector';
import Button from '../../../common/ui/Buttons/Button';
import './index.scss';

const FeedbackForm = props => {
  const { onSubmit, isFeedbackSent } = props;

  const intl = useIntl();

  const initialValues = {
    rating: null,
    feedback: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={feedbackSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({ values, touched, errors, handleChange, handleSubmit, handleBlur, setFieldValue, isSubmitting }) => (
        <form className="finish-page-form" onSubmit={handleSubmit}>
          <h4 className="finish-page-form__title">{intl.messages.participant?.finishPage.form.ratingTitle}</h4>
          <RatingSelector
            className="finish-page-form__rating-selector"
            name="rating"
            value={values.rating}
            onChange={rating => {
              setFieldValue('rating', rating);
            }}
          />
          <h4 className="finish-page-form__title">{intl.messages.participant?.finishPage.form.title}</h4>
          <TextareaField
            className="finish-page-form__input-textarea"
            placeholder=""
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.feedback && errors.feedback}
          />
          <Button
            className='finish-page-form__button -primary-light'
            label={intl.messages.participant?.finishPage.form.submitButton}
            type='submit'
            onSubmit={handleSubmit}
            disabled={isSubmitting || Object.keys(errors)?.length || (!values.feedback && !values.rating) || isFeedbackSent}
          />
        </form>
      )}
    </Formik>
  );
}

export default FeedbackForm;
