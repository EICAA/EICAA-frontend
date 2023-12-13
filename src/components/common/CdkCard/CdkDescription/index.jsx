import React from 'react';
import * as classnames from 'classnames';
import DescriptionList from '../../DescriptionList';
import DescriptionImageOrResource from '../DescriptionImageOrResource';
import { containsRegExp, imageRegExp, urlRegExp } from '../../../../utils/helpers';
import './index.scss';

const CdkDescription = React.forwardRef((props, ref) => {
  const { className, type, description, showImage } = props;

  const renderDescription = React.useCallback(() => {
    switch (type) {
      case 'html':
        return (
          <p
            ref={ref}
            className={classnames('description__html')}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        );

      case 'list':
        return (
          <div ref={ref} className={classnames('description__list')}>
            <DescriptionList className="description__description-list" description={description} />
          </div>
        );

      case 'text-and-url':
        return (
          <div ref={ref} className={classnames('description__text-and-url')}>
            {description.map((item, index) =>
              containsRegExp(item, urlRegExp) ? (
                <p key={index}>
                  <a href={item} target="_blank" rel="noreferrer">
                    {item}
                  </a>
                </p>
              ) : (
                <p key={index}>{item}</p>
              ),
            )}
          </div>
        );

      case 'text-and-image':
        return (
          <div ref={ref} className={classnames('description__text-and-image')}>
            {description.map((item, index) =>
              containsRegExp(item, imageRegExp) ? (
                <DescriptionImageOrResource
                  className="description__description-image"
                  key={index}
                  item={item}
                  index={index}
                  showImage={showImage}
                />
              ) : containsRegExp(item, urlRegExp) ? (
                <p key={index}>
                  <a href={item} target="_blank" rel="noreferrer">
                    {item}
                  </a>
                </p>
              ) : (
                <p key={index}>{item}</p>
              ),
            )}
          </div>
        );

      case 'text':
        return (
          <p ref={ref} className={classnames('description__text')}>
            {description}
          </p>
        );

      default:
        return null;
    }
  }, [description, ref, showImage, type]);

  return (
    <div className={classnames('description', className && className)}>{renderDescription()}</div>
  );
});

export default CdkDescription;
