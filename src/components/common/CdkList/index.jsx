import React from 'react';
import { useNavigate } from 'react-router';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { PATHS } from '../../../utils/constants';
import { useCdkList, useStyles } from '../../../utils/hooks';
import CdkTable from '../CdkTable';
import PaginationControl from '../PaginationControl';
import Button from '../ui/Buttons/Button';
import iconArrowBack from '../../../assets/icons/arrow-back.svg';
import './index.scss';

const CdkList = (props) => {
  const { className, filters } = props;

  const navigate = useNavigate();
  const intl = useIntl();

  const tableRef = React.useRef();

  const styles = useStyles({
    cdkTable: tableRef,
  });

  const { cdkList, page, limit, count, setPage, setStart } = useCdkList(
    styles.cdkTableStyle,
    filters,
  );

  return (
    <section className={classnames('cdk-list', className && className)}>
      <CdkTable ref={tableRef} cdkList={cdkList} />
      <PaginationControl
        className="cdk-list__pagination-control"
        count={count}
        page={page}
        setPage={setPage}
        limit={limit}
        setStart={setStart}
      />
      <Button
        className="cdk-list__button-back -white-bordered"
        label={intl.messages.common?.back}
        icon={iconArrowBack}
        handleClick={() =>
          navigate(`${PATHS.user}${PATHS.cdkRepository}/${PATHS.CDK_REPOSITORY.type}`)
        }
      />
    </section>
  );
};

export default CdkList;
