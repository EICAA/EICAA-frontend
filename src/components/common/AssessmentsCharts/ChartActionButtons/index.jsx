import React, { useCallback } from 'react';
import { saveAs } from 'file-saver';
import { useIntl } from 'react-intl';

import filtersIcon from '../../../../assets/icons/download-file.svg';
import infoIcon from '../../../../assets/icons/info-circle-white.svg';
import { AppContext } from '../../../../storage/context';
import { REDUCER_TYPES } from '../../../../storage/reducers/utils';
import './index.scss';

/**
 * @param base64Data
 * @param contentType
 * @param sliceSize
 * @returns {Blob}
 * @link https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 */
const base64toBlob = (base64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = window.atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

const ChartActionButtons = ({ chartRef, chartMessages, fileName = 'chart.png' }) => {
  const dispatch = React.useContext(AppContext)[1];
  const intl = useIntl();

  const downloadChart = useCallback(() => {
    if (chartRef) {
      const base64Image = chartRef.current.toBase64Image().replace('data:image/png;base64,', '');

      const content = base64toBlob(base64Image);
      const file = new File([content], fileName, { type: 'image/png' });
      saveAs(file);
    }
  }, [chartRef, fileName]);

  const showDescription = useCallback(() => {
    const { description, title } = chartMessages || {};
    dispatch({
      type: REDUCER_TYPES.SET_MODAL_DATA,
      modalData: {
        intlMessages: intl.messages,
        title,
        message: description,
      },
    });
  }, [dispatch, intl, chartMessages]);

  return (
    <div className="chart-action-buttons">
      <div className="show-description-button" onClick={showDescription}>
        <img className="show-description__icon" src={infoIcon} alt="download chart" />
      </div>
      <div className="save-chart-button" onClick={downloadChart}>
        <img className="save-chart-button__icon" src={filtersIcon} alt="download chart" />
      </div>
    </div>
  );
};

export default ChartActionButtons;
