import React from 'react';
import * as classnames from 'classnames';
import { CDK_CARD_TYPES, LAYOUTS } from '../../../utils/constants';
import { useResolveScreen, useShowImageModal, useStyles } from '../../../utils/hooks';
import { BREAKPOINTS } from '../../../utils/breakpoints';
import CdkDescription from './CdkDescription';
import { containsRegExp, imageRegExp, urlRegExp } from '../../../utils/helpers';
import './index.scss';

const CdkCard = (props) => {
  const {
    className,
    type = CDK_CARD_TYPES.TEXT,
    layout = LAYOUTS.COLUMN,
    style = {},
    borderRadiusType,
    title,
    description,
    descriptionIsHtml = false,
    important = false,
  } = props;

  const containerElement = React.useRef();
  const titleElement = React.useRef();
  const descriptionElement = React.useRef();

  const { isMobile } = useResolveScreen(BREAKPOINTS.xl);
  const styles = useStyles({
    cdkCardContainer: containerElement,
    cdkCardTitle: titleElement,
    descriptionElement: descriptionElement,
  });

  const showImage = useShowImageModal();

  const cardDescriptionStyle = React.useMemo(() => {
    if (isMobile && !styles.isCdkCardMaxHeight) return {};

    return styles.cdkCardDescriptionStyle;
  }, [isMobile, styles.cdkCardDescriptionStyle, styles.isCdkCardMaxHeight]);

  const displayText =
    (type === CDK_CARD_TYPES.TEXT || type === CDK_CARD_TYPES.IMAGE_AND_TEXT) &&
    (title || description);

  const descriptionIsList =
    description &&
    description instanceof Array &&
    description.length !== 0 &&
    !containsRegExp(description, imageRegExp) &&
    !containsRegExp(description, urlRegExp);

  const descriptionIsEmptyList =
    description && description instanceof Array && description.length === 0;

  const descriptionHasImage =
    description &&
    description instanceof Array &&
    description.length !== 0 &&
    containsRegExp(description, imageRegExp);

  const descriptionHasUrl =
    description &&
    description instanceof Array &&
    description.length !== 0 &&
    containsRegExp(description, urlRegExp);

  const descriptionType = React.useMemo(() => {
    if (descriptionIsHtml) return 'html';
    if (descriptionIsList) return 'list';
    if (descriptionHasUrl && !descriptionHasImage) return 'text-and-url';
    if (descriptionHasImage) return 'text-and-image';

    return 'text';
  }, [descriptionHasImage, descriptionHasUrl, descriptionIsHtml, descriptionIsList]);

  return (
    <article
      className={classnames(
        'cdk-card',
        className && className,
        type && `-type-${type}`,
        `-layout-${layout}`,
        borderRadiusType && `-border-radius-${borderRadiusType}`,
        (!description ||
          descriptionIsEmptyList ||
          (!(description instanceof Array) && description?.length < 3)) &&
          `-empty`,
      )}
      style={style}
    >
      {displayText ? (
        <div
          ref={containerElement}
          className={classnames('cdk-card__text-container', type && `-type-${type}`)}
        >
          <p
            ref={titleElement}
            className={classnames('cdk-card__title', important && '-important')}
          >
            {title}
          </p>
          <div className="cdk-card__description-container" style={cardDescriptionStyle}>
            <CdkDescription
              ref={descriptionElement}
              className="cdk-card__description"
              type={descriptionType}
              description={description}
              showImage={showImage}
            />
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default CdkCard;
