import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useIntl } from 'react-intl';
import * as classnames from 'classnames';
import { PATHS } from '../../../utils/constants';
import { generateColorByText, formatRawText } from '../../../utils/helpers';
import {
  AREA_COLOR_MAP,
  COMPETENCE_COLOR_MAP,
  DIFFICULTY_COLOR_MAP,
} from '../../../utils/color-maps';
import { AppContext } from '../../../storage/context';
import { REDUCER_TYPES } from '../../../storage/reducers/utils';
import Button from '../ui/Buttons/Button';
import CdkTableCell from '../ui/CdkTableCell';
import './index.scss';

const CdkTable = React.forwardRef((props, ref) => {
  const { className, cdkList } = props;

  const [, dispatch] = React.useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();
  const { cdkRepositoryType } = useParams();
  const intl = useIntl();

  const navigateToModule = (jsonId) => () => {
    const params = Object.fromEntries(new URLSearchParams(location.search).entries());

    dispatch({
      type: REDUCER_TYPES.SET_CDK_LIST_SEARCH_PARAMS,
      cdkListSearchParams: params,
    });
    navigate(
      `${PATHS.user}${PATHS.cdkModules}/${cdkRepositoryType}/${jsonId}/${PATHS.CDK_MODULES.overview}`,
    );
  };

  return (
    <table ref={ref} className={classnames('cdk-table', className && className)}>
      <thead className="cdk-table__header">
        <tr className="cdk-table__header-row">
          <th className="cdk-table__header-cell">
            {intl.messages.user?.cdkRepositoryPage.list.moduleName}
          </th>
          <th className="cdk-table__header-cell">
            {intl.messages.user?.cdkRepositoryPage.list.area}
          </th>
          <th className="cdk-table__header-cell">
            {intl.messages.user?.cdkRepositoryPage.list.competence}
          </th>
          <th className="cdk-table__header-cell">
            {intl.messages.user?.cdkRepositoryPage.list.difficulty}
          </th>
          <th className="cdk-table__header-cell"></th>
        </tr>
      </thead>
      <tbody className="cdk-table__body">
        {cdkList?.length
          ? cdkList.map((cdkModule, i) => (
              <tr className="cdk-table__body-row" key={i}>
                <td className="cdk-table__body-cell">
                  <CdkTableCell className="cdk-table__cell-content" text={cdkModule.name} />
                </td>
                <td className="cdk-table__body-cell">
                  <CdkTableCell
                    className="cdk-table__cell-content"
                    text={cdkModule.area}
                    color={generateColorByText(AREA_COLOR_MAP, formatRawText(cdkModule.area), {
                      alpha: 0.4,
                    })}
                  />
                </td>
                <td className="cdk-table__body-cell">
                  <CdkTableCell
                    className="cdk-table__cell-content"
                    text={cdkModule.competence}
                    color={generateColorByText(
                      COMPETENCE_COLOR_MAP,
                      formatRawText(cdkModule.competence),
                      {
                        alpha: 0.4,
                      },
                    )}
                  />
                </td>
                <td className="cdk-table__body-cell">
                  <CdkTableCell
                    className="cdk-table__cell-content"
                    text={cdkModule.difficulty}
                    color={generateColorByText(DIFFICULTY_COLOR_MAP, cdkModule.difficulty, {
                      alpha: 0.5,
                    })}
                  />
                </td>
                <td className="cdk-table__body-cell">
                  <Button
                    className="cdk-table__button"
                    label={intl.messages.common?.select}
                    handleClick={navigateToModule(cdkModule.jsonId)}
                  />
                </td>
              </tr>
            ))
          : null}
        <tr className="cdk-table__bottom-bar">
          <td className="cdk-table__bottom-bar-cell" />
          <td className="cdk-table__bottom-bar-cell" />
          <td className="cdk-table__bottom-bar-cell" />
          <td className="cdk-table__bottom-bar-cell" />
          <td className="cdk-table__bottom-bar-cell" />
        </tr>
      </tbody>
    </table>
  );
});

export default CdkTable;
