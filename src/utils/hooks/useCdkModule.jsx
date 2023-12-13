import React from 'react';
import { useParams } from 'react-router';
import { getCdkModule } from '../../api/services/Cdk';
import { CDK_DATA, CDK_TYPES } from '../constants';
import { AppContext } from '../../storage/context';
import { REDUCER_TYPES } from '../../storage/reducers/utils';
import { useLoadingLayer, useShowErrorModal } from './index';

// TODO: Integrate cdk json data into response
export const useCdkModule = () => {
  const [, dispatch] = React.useContext(AppContext);

  const { cdkRepositoryType, cdkId } = useParams();
  const loadingLayer = useLoadingLayer();
  const showErrorModal = useShowErrorModal();

  const fetchCdkModule = React.useCallback(async () => {
    try {
      loadingLayer.show();
      const response = await getCdkModule(cdkRepositoryType, cdkId);
      const { data, status } = response;

      if (status >= 200 && status < 300 && data) {
        const moduleMeta = data.data;
        const moduleData =
          cdkRepositoryType === CDK_TYPES.STUDENT
            ? CDK_DATA.STUDENT.cdkModules.find((module) => module.id === Number(cdkId))
            : CDK_DATA.EMPLOYEE.cdkModules.find((module) => module.id === Number(cdkId));

        if (moduleData) {
          moduleData.additionalCompetenceList = [];
          for (const key of Object.keys(moduleData)) {
            if (key.includes('additionalCompetences') && moduleData[key]) {
              moduleData.additionalCompetenceList.push(moduleData[key]);
            }
          }
        }

        if (moduleMeta && moduleData) {
          dispatch({
            type: REDUCER_TYPES.SET_CDK_MODULE,
            cdkModule: { moduleData, moduleMeta },
          });
        }
      }
    } catch (err) {
      showErrorModal(err);
    } finally {
      loadingLayer.hide();
    }
  }, [dispatch, cdkRepositoryType, cdkId, loadingLayer, showErrorModal]);

  return fetchCdkModule;
};
