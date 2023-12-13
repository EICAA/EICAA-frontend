import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { CDK_RATING_CARD_TYPES } from '../../../utils/constants';
import { useFormObserver } from '../FormObserver/hooks';
import { defaultInitialValues } from './helpers';
import CdkRatingForm from '../../forms/user/CdkRatingForm';
import Button from '../ui/Buttons/Button';
import './index.scss';

const CdkRatingCard = (props) => {
  const { className, type, rating, postCdkRating /*, fetchCdkRatings*/ } = props;

  const formRef = React.useRef();

  const intl = useIntl();
  const formObserver = useFormObserver();
  const { errors, isSubmitting } = formObserver;

  const submitRatings = React.useCallback(
    async (values, { setSubmitting }) => {
      const ratingValues = {
        helpfulness: values.helpfulness,
        trainingResults: values.trainingResults,
        easeOfUse: values.easeOfUse,
        interactivity: values.interactivity,
      };

      await postCdkRating(ratingValues);

      setSubmitting(false);

      // await fetchCdkRatings();
    },
    [postCdkRating /*, fetchCdkRatings*/],
  );

  const initSubmitRatings = React.useCallback(async () => {
    if (!formRef.current) {
      return;
    }

    formRef.current.handleSubmit();
  }, []);

  const titleKey = React.useMemo(() => {
    switch (type) {
      case CDK_RATING_CARD_TYPES.SUMMARY:
        return 'ratingSummaryTitle';
      case CDK_RATING_CARD_TYPES.RATING:
        return 'ratingRatingTitle';
      default:
        return '';
    }
  }, [type]);

  const cardFooter = React.useMemo(() => {
    switch (type) {
      case CDK_RATING_CARD_TYPES.SUMMARY:
        return (
          <p className="cdk-rating-card__text-sum">
            {`${intl.messages.user?.cdkModulePage.module.ratingNumber} ${rating.count}`}
          </p>
        );
      case CDK_RATING_CARD_TYPES.RATING:
        return (
          <Button
            className="cdk-rating-card__button-submit"
            label={intl.messages.user?.cdkModulePage.module.ratingSubmit}
            handleClick={initSubmitRatings}
            disabled={isSubmitting || Object.keys(errors).length}
          />
        );
      default:
        return null;
    }
  }, [rating, errors, isSubmitting, type, initSubmitRatings, intl.messages]);

  return (
    <section className={classnames('cdk-rating-card', className && className)}>
      <div className="cdk-rating-card__header">
        <p className="cdk-rating-card__title">
          {intl.messages.user?.cdkModulePage.module[titleKey]}
        </p>
      </div>
      <CdkRatingForm
        formRef={formRef}
        className="cdk-rating-card__form"
        initialValues={rating || defaultInitialValues}
        onSubmit={submitRatings}
        formObserver={formObserver}
        disabled={type === CDK_RATING_CARD_TYPES.SUMMARY}
      />
      <div className="cdk-rating-card__footer">{cardFooter}</div>
    </section>
  );
};

export default CdkRatingCard;
