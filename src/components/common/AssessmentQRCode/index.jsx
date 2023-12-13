import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import * as classnames from 'classnames';
import { useIntl } from 'react-intl';
import SaveQRCode from './SaveQRCode';
import './index.scss';

const AssessmentQRCode = (props) => {
  const { className, url, assessmentData } = props;

  const intl = useIntl();
  const qrCodeRef = useRef(null);

  return (
    <div className={classnames('qr-code', className && className)}>
      <div ref={qrCodeRef}>
        <QRCodeCanvas value={url} size={256} />
      </div>
      <SaveQRCode
        className="qr-code__button"
        fileName={`${assessmentData?.name}_QRCode.png`}
        qrCodeRef={qrCodeRef}
        label={intl.messages.user?.qrCodePage.download}
      />
    </div>
  );
};

export default AssessmentQRCode;
