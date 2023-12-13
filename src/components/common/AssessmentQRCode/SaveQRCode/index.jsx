import React, { useCallback } from 'react';
import * as classnames from 'classnames';
import Button from '../../ui/Buttons/Button';
import './index.scss';

const downloadStringAsFile = (data, filename) => {
  let a = document.createElement('a');
  a.download = filename;
  a.href = data;
  a.click();
};

const SaveQRCode = (props) => {
  const { className, fileName, qrCodeRef, ...btnProps } = props;

  const download = useCallback(() => {
    if (qrCodeRef) {
      const dataURI = qrCodeRef.current.children[0].toDataURL('image/png');
      downloadStringAsFile(dataURI, fileName);
    }
  }, [qrCodeRef, fileName]);

  return (
    <div className={classnames('save-qr-code', className && className)} onClick={download}>
      <Button {...btnProps} />
    </div>
  );
};

export default SaveQRCode;
