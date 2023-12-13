import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContextProvider, INITIAL_STATE } from './storage/context';
import { reducer } from './storage/reducers/reducer';
import { PATHS } from './utils/constants';
import StorageHandler from './storage/StorageHandler';
import Internationalization from './components/common/Internationalization';
import InternationalizationParticipant from './components/common/InternationalizationParticipant';
import ProtectedRoute from './components/common/Routing';
import LandingPage from './components/pages/participant/LandingPage';
import DemographicsPage from './components/pages/participant/DemographicsPage';
import SurveyPage from './components/pages/participant/SurveyPage';
import FinishPage from './components/pages/participant/FinishPage';
import Participant404 from './components/pages/participant/Participant404';
import PrivacyPolicyPage from './components/pages/participant/PrivacyPolicyPage';
import FaqPage from './components/pages/user/FaqPage';
import LoginPage from './components/pages/user/LoginPage';
import RegisterPage from './components/pages/user/RegisterPage';
import PasswordForgotPage from './components/pages/user/PasswordForgotPage';
import PasswordResetPage from './components/pages/user/PasswordResetPage';
import DashboardPage from './components/pages/user/DashboardPage';
import AccountPage from './components/pages/user/AccountPage';
import CompetenceMonitorPage from './components/pages/user/CompetenceMonitorPage';
import AssessmentPage from './components/pages/user/AssessmentPage';
import AssessmentCreatePage from './components/pages/user/AssessmentCreatePage';
import AssessmentArchivedPage from './components/pages/user/AssessmentArchivedPage';
import CdkRepositoryPage from './components/pages/user/CdkRepositoryPage';
import CdkRepositoryPageType from './components/pages/user/CdkRepositoryPage/CdkRepositoryPageType';
import CdkRepositoryPageList from './components/pages/user/CdkRepositoryPage/CdkRepositoryPageList';
import CdkModulePage from './components/pages/user/CdkModulePage';
import CdkModulePageOverview from './components/pages/user/CdkModulePage/CdkModulePageOverview';
import CdkModulePageManual from './components/pages/user/CdkModulePage/CdkModulePageManual';
import CdkModulePageResources from './components/pages/user/CdkModulePage/CdkModulePageResources';
import CdkModulePageScope from './components/pages/user/CdkModulePage/CdkModulePageScope';
import CdkModulePageAssessment from './components/pages/user/CdkModulePage/CdkModulePageAssessment';
import CdkModulePageAuthor from './components/pages/user/CdkModulePage/CdkModulePageAuthor';
import CdkModulePageRating from './components/pages/user/CdkModulePage/CdkModulePageRating';
import AssessmentQRCodePage from './components/pages/user/AssessmentQRCodePage';
import Error404 from './components/pages/error/Error404';
import Modal from './components/common/Modal';
import PromptModal from './components/common/PromptModal';
import ErrorModal from './components/common/ErrorModal';
import ImageModal from './components/common/ImageModal';
import SnackBar from './components/common/ui/SnackBar';
import LoadingLayer from './components/common/LoadingLayer';

function App() {
  const {
    start,
    demographics,
    assessment,
    finish,
    privacyPolicy,
    frequentlyAsked,
    pageNotAvailable,
    root,
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    dashboard,
    account,
    assessments,
    create,
    archivedAssessments,
    cdkRepository,
    CDK_REPOSITORY,
    cdkModules,
    CDK_MODULES,
    pageNotFound,
    params: { assessmentId, cdkRepositoryType, cdkId },
    qrCode,
  } = PATHS;

  return (
    <ContextProvider initialState={INITIAL_STATE} reducer={reducer}>
      <Router>
        <Routes>
          <Route element={<InternationalizationParticipant />}>
            <Route path={`${start}`} exact element={<LandingPage />} />
            <Route path={`${demographics}`} exact element={<DemographicsPage />} />
            <Route path={`${assessment}`} exact element={<SurveyPage />} />
            <Route path={`${finish}`} exact element={<FinishPage />} />
            <Route path={`${privacyPolicy}`} exact element={<PrivacyPolicyPage />} />
            <Route path={`${pageNotAvailable}`} exact element={<Participant404 />} />
          </Route>
          <Route element={<Internationalization />}>
            <Route path={`${user}${register}`} exact element={<RegisterPage />} />
            <Route path={`${user}${login}`} exact element={<LoginPage />} />
            <Route path={`${user}${forgotPassword}`} exact element={<PasswordForgotPage />} />
            <Route path={`${user}${resetPassword}`} exact element={<PasswordResetPage />} />
            <Route path={`${user}${privacyPolicy}`} exact element={<PrivacyPolicyPage />} />
            <Route path={`${user}${frequentlyAsked}`} exact element={<FaqPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={`${user}${dashboard}`} exact element={<DashboardPage />} />
              <Route path={`${user}${account}`} exact element={<AccountPage />} />
              <Route path={`${user}${assessments}`} exact element={<CompetenceMonitorPage />} />
              <Route
                path={`${user}${assessments}${create}`}
                exact
                element={<AssessmentCreatePage />}
              />
              <Route
                path={`${user}${assessments}${assessmentId}`}
                exact
                element={<AssessmentPage />}
              />
              <Route path={`${user}${qrCode}`} exact element={<AssessmentQRCodePage />} />
              <Route
                path={`${user}${archivedAssessments}`}
                exact
                element={<AssessmentArchivedPage />}
              />
            </Route>
            <Route path={`${user}${cdkRepository}`} exact element={<CdkRepositoryPage />}>
              <Route path={CDK_REPOSITORY.type} exact element={<CdkRepositoryPageType />} />
              <Route
                path={`${CDK_REPOSITORY.list}${cdkRepositoryType}`}
                exact
                element={<CdkRepositoryPageList />}
              />
              <Route
                index
                exact
                element={<Navigate replace to={`${user}${cdkRepository}/${CDK_REPOSITORY.type}`} />}
              />
            </Route>
            <Route
              path={`${user}${cdkModules}${cdkRepositoryType}${cdkId}`}
              exact
              element={<CdkModulePage />}
            >
              <Route path={CDK_MODULES.overview} exact element={<CdkModulePageOverview />} />
              <Route path={CDK_MODULES.manual} exact element={<CdkModulePageManual />} />
              <Route path={CDK_MODULES.resources} exact element={<CdkModulePageResources />} />
              <Route path={CDK_MODULES.scope} exact element={<CdkModulePageScope />} />
              <Route path={CDK_MODULES.assessment} exact element={<CdkModulePageAssessment />} />
              <Route path={CDK_MODULES.author} exact element={<CdkModulePageAuthor />} />
              <Route path={CDK_MODULES.rating} exact element={<CdkModulePageRating />} />
            </Route>
            <Route index exact element={<LoginPage />} />
            <Route path={`${user}${root}`} exact element={<LoginPage />} />
            <Route path={`${user}${register}`} exact element={<RegisterPage />} />
            <Route path={`${pageNotFound}`} exact element={<Error404 />} />
            <Route path="*" element={<Navigate replace to={pageNotFound} />} />
          </Route>
        </Routes>
      </Router>
      <Modal />
      <PromptModal />
      <ErrorModal />
      <ImageModal />
      <SnackBar />
      <LoadingLayer />
      <StorageHandler />
    </ContextProvider>
  );
}

export default App;
