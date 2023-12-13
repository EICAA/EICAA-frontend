import React from 'react';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import AssessmentCard from '../AssessmentCard';
import { AppContext } from '../../../storage/context';
import { ASSESSMENT_LIST_TYPES } from '../../../utils/constants';
import { useLoadingLayer, useShowErrorModal } from '../../../utils/hooks';
import { calculateArchivedCardCount, calculateCardCount } from './helpers';
import { getAssessmentList } from '../../../api/services/Assessments';
import PaginationControl from '../PaginationControl';
import './index.scss';

const AssessmentList = (props) => {
  const { isLoading } = React.useContext(AppContext)[0];

  const [assessmentList, setAssessmentList] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(0);
  const [start, setStart] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const { className, title, type } = props;

  const intl = useIntl();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const containerElement = React.useRef();

  const fetchAssessmentList = React.useCallback(async () => {
    try {
      loadingLayer.show();

      const query = { start, limit };

      if (type === ASSESSMENT_LIST_TYPES.LIVE) {
        query.active = true;
      }
      if (type === ASSESSMENT_LIST_TYPES.ARCHIVED) {
        query.active = false; // active = undefined will list both!
      }

      const response = await getAssessmentList(query);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data.data && data.meta) {
        setAssessmentList(data.data);
        setCount(data.meta.count);
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [loadingLayer, showErrorModal, start, limit, type]);

  const onResize = React.useCallback(() => {
    let cardsPerPage;

    switch (type) {
      case ASSESSMENT_LIST_TYPES.LIVE:
        cardsPerPage = calculateCardCount();
        break;
      case ASSESSMENT_LIST_TYPES.ARCHIVED:
        cardsPerPage = calculateArchivedCardCount();
        break;
      default:
        break;
    }

    setLimit(cardsPerPage);
    setStart(0);
    setPage(1);
  }, [type]);

  React.useEffect(() => {
    if (limit) {
      fetchAssessmentList();
    }
  }, [limit, fetchAssessmentList]);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return (
    <div className={classnames('assessment-list', className && className)}>
      <h2 className="assessment-list__title">{title}</h2>
      <div ref={containerElement} className="assessment-list__container">
        {isLoading ? (
          <p className="assessment-list__message">{`${intl.messages.common?.loading}...`}</p>
        ) : (
          <>
            {assessmentList?.length ? (
              <>
                {assessmentList
                  ?.filter(assessment => type !== ASSESSMENT_LIST_TYPES.ARCHIVED ? !assessment.archived : true)
                  .map((assessment) => (
                  <AssessmentCard
                    key={assessment.id}
                    className="assessment-list__assessment-card"
                    assessment={assessment}
                    archived={type === ASSESSMENT_LIST_TYPES.ARCHIVED}
                    reloadList={fetchAssessmentList}
                  />
                ))}
              </>
            ) : (
              <p className="assessment-list__message">{intl.messages.common?.noData}</p>
            )}
          </>
        )}
      </div>
      <PaginationControl
        className="assessment-list__pagination-control"
        count={count}
        page={page}
        setPage={setPage}
        limit={limit}
        setStart={setStart}
      />
    </div>
  );
};

export default AssessmentList;
