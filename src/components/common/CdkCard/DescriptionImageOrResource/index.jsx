import React from 'react';
import * as classnames from 'classnames';
import './index.scss';
//import { responses } from '../../../../api/services/Cdk/mocks';
import { AppContext } from '../../../../storage/context';
import {
  getCdkImageUrl,
  getCdkResourceUrl,
  getModuleFolderName,
} from '../../../pages/user/CdkModulePage/helpers';

// const cdkImages = responses.getCdkImages;

// name instead of fileName
/* const getMockedImage = (name) => {
  return cdkImages.find((img) => img.name === name); // { name, image, alt }
}; */

const getPictureOrResourceData = (moduleFolderName, name) => {
  const [linkTextRaw, fileName] = (name || '').replaceAll('##', '').split('::');

  const linkText = linkTextRaw && linkTextRaw.includes('picture') ? '' : 'Resource'; // linkTextRaw

  let image = !linkText ? getCdkImageUrl(moduleFolderName, fileName, false) : null;
  let thumbnail = !linkText ? getCdkImageUrl(moduleFolderName, fileName, true) : null;
  let resource = linkText ? getCdkResourceUrl(moduleFolderName, fileName) : null;

  return {
    linkText,
    image,
    thumbnail,
    alt: 'Image',
    resource,
  };
};

const DescriptionImage = ({ image, thumbnail, alt, showImage, className }) => {
  return (
    <div className={classnames('description-image__thumbnail-container', className && className)}>
      <img
        className="description-image__thumbnail"
        src={thumbnail}
        alt={alt}
        onClick={() => showImage({ image, alt })}
      />
    </div>
  );
};

const DescriptionResource = ({ linkText, resource, className }) => {
  return (
    <div className={classnames('description__text-and-url', className && className)}>
      <a href={resource} target="_blank" rel="noreferrer">
        {linkText}
      </a>
    </div>
  );
};

const DescriptionImageOrResource = (props) => {
  const { className, item, showImage } = props;

  const [{ cdkModule = {} }] = React.useContext(AppContext);
  const { competenceID } = cdkModule?.moduleData || {};

  const moduleFolderName = React.useMemo(() => getModuleFolderName(competenceID), [competenceID]);

  const { linkText, image, thumbnail, alt, resource } = React.useMemo(() => {
    return getPictureOrResourceData(moduleFolderName, item);
  }, [moduleFolderName, item]);

  return (
    <div>
      {!linkText ? (
        <DescriptionImage
          image={image}
          thumbnail={thumbnail}
          alt={alt}
          showImage={showImage}
          className={className}
        />
      ) : null}
      {linkText ? (
        <DescriptionResource linkText={linkText} resource={resource} className={className} />
      ) : null}
    </div>
  );
};

export default DescriptionImageOrResource;
