import React from 'react';
import { useIntl } from 'react-intl';
import { CDK_RATING_CARD_TYPES } from '../../../../../utils/constants';
import { AppContext } from '../../../../../storage/context';
import { useCdkModuleRating, useCdkModuleRatings } from '../../../../../utils/hooks';
import CdkRatingCard from '../../../../common/CdkRatingCard';
import './index.scss';

const CdkModulePageRating = () => {
  const [{ cdkModule = {} }] = React.useContext(AppContext);

  const { cdkRating, postCdkRating, isInitialized: isRatingInitialized } = useCdkModuleRating();
  const {
    cdkRatings,
    isInitialized: isRatingsInitialized,
    fetchCdkRatings,
  } = useCdkModuleRatings();

  const { moduleName } = cdkModule?.moduleData || {};

  const intl = useIntl();

  return (
    <div className="cdk-module-page-rating">
      <div className="cdk-module-page-rating__content">
        <h2 className="cdk-module-page-rating__title">
          {`${intl.messages.user?.cdkModulePage.rating}: ${moduleName}`}
        </h2>
        <div className="cdk-module-page-rating__card-container">
          {isRatingsInitialized ? (
            <CdkRatingCard
              className="cdk-module-page-rating__card"
              type={CDK_RATING_CARD_TYPES.SUMMARY}
              rating={cdkRatings}
            />
          ) : null}
          {isRatingInitialized ? (
            <CdkRatingCard
              className="cdk-module-page-rating__card"
              type={CDK_RATING_CARD_TYPES.RATING}
              rating={cdkRating}
              postCdkRating={postCdkRating}
              fetchCdkRatings={fetchCdkRatings}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CdkModulePageRating;
