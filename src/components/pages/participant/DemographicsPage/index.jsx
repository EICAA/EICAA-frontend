import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { PARTICIPANT_ASSESSMENT_KEYS } from '../../../../storage/storageHandlers/config';
import { useIdbStorageAssessment } from '../../../../storage/storageHandlers/hooks';
import { ASSESSMENT_TYPES, EICAA_URL, PATHS, QUERY_PARAM_KEYS } from '../../../../utils/constants';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import DemographicsEmployeeForm from '../../../forms/participant/DemographicsEmployeeForm';
import DemographicsStudentForm from '../../../forms/participant/DemographicsStudentForm';
import PageFooter from '../../../common/PageFooter';
import ScreenResolver from '../../../common/ScreenResolver';
import DryRunBox from '../../../common/ui/DryRunBox';
import backgroundImage from '../../../../assets/images/working-on-laptop.webp';
import './index.scss';

const DemographicsPage = () => {
  const [assessment, setAssessment] = useState({});

  const navigate = useNavigate();
  const intl = useIntl();
  const searchParams = useSearchParams()[0];
  const idbStorageAssessment = useIdbStorageAssessment();

  const assessmentCode = searchParams.get(QUERY_PARAM_KEYS.ASSESSMENT);
  const isDryRun = searchParams.get(QUERY_PARAM_KEYS.DRY_RUN);
  const surveyMetadata = assessment[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA];
  const assessmentType = surveyMetadata?.assessmentType;

  const startQuestions = useCallback(
    async (values, { setSubmitting }) => {
      let demographicsData;

      switch (assessmentType) {
        case ASSESSMENT_TYPES.EMPLOYEE:
          demographicsData = {
            country: values.country.data,
            educationLevel: values.educationLevel?.value,
            workExperience: values.workExperience?.value,
            workField: values.workField?.value,
            organisationType: values.organisationType?.value,
            organisationSize: values.organisationSize?.value,
            levelOfPosition: values.levelOfPosition?.value,
            gender: values.gender?.value,
            ageGroup: values.ageGroup?.value,
          };
          break;
        case ASSESSMENT_TYPES.STUDENT:
          demographicsData = {
            country: values.country?.data,
            educationLevel: values.educationLevel?.value,
            majorField: values.majorField?.value,
            hasWorkExperience: values.hasWorkExperience?.value,
            workExperience: values.workExperience?.value,
            employmentStatus: values.employmentStatus?.value,
            employmentType: values.employmentType?.value,
            gender: values.gender?.value,
            ageGroup: values.ageGroup?.value,
          };
          break;
        default:
          break;
      }

      for (const key of Object.keys(demographicsData)) {
        if (!demographicsData[key]) {
          delete demographicsData[key];
        }
      }

      if (!isDryRun) {
        await idbStorageAssessment.setData(
          PARTICIPANT_ASSESSMENT_KEYS.DEMOGRAPHICS_FORM_DATA,
          demographicsData,
        );
      }

      const path = `${PATHS.assessment}?${QUERY_PARAM_KEYS.ASSESSMENT}=${assessmentCode}${
        isDryRun ? `&${QUERY_PARAM_KEYS.DRY_RUN}=true` : ''
      }`;
      navigate(path);
      setSubmitting(false);
    },
    [assessmentCode, assessmentType, idbStorageAssessment, isDryRun, navigate],
  );

  const renderForm = useCallback(() => {
    switch (assessmentType) {
      case ASSESSMENT_TYPES.EMPLOYEE:
        return <DemographicsEmployeeForm onSubmit={startQuestions} />;
      case ASSESSMENT_TYPES.STUDENT:
        return <DemographicsStudentForm onSubmit={startQuestions} />;
      default:
        return null;
    }
  }, [assessmentType, startQuestions]);

  const checkPageRequirements = useCallback(async () => {
    const assessmentData = await idbStorageAssessment.get();

    if (!assessmentData) {
      return;
    }

    setAssessment(assessmentData);

    if (isDryRun) {
      return true;
    }

    // Check prerequisites to stay on page - show 404 or navigate if it fails
    const surveyMetadata = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.SURVEY_METADATA];
    const landingFormData = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.LANDING_FORM_DATA];
    const demographicsFormData = assessmentData[PARTICIPANT_ASSESSMENT_KEYS.DEMOGRAPHICS_FORM_DATA];

    // Check prerequisites to stay on page - show 404 if it fails
    if (!assessmentCode) {
      navigate(PATHS.pageNotAvailable);
      return false;
    }

    if (
      !surveyMetadata ||
      !landingFormData ||
      !landingFormData?.consentGiven ||
      (surveyMetadata?.emailRequired && !landingFormData?.email)
    ) {
      navigate(`${PATHS.start}?assessment=${assessmentCode}`);
      return false;
    }

    if (!surveyMetadata?.demographics || demographicsFormData) {
      navigate(`${PATHS.assessment}?assessment=${assessmentCode}`);
      return false;
    }

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentCode, navigate]);

  useEffect(() => {
    checkPageRequirements();
  }, [checkPageRequirements]);

  return (
    <div className="demographics-page">
      <div className="demographics-page__container">
        <div className="demographics-page__content-container">
          <div className="demographics-page__content">
            <div className="demographics-page__header">
              <div className="demographics-page__header-top">
                <div
                  className="demographics-page__logo-eicaa"
                  onClick={() => {
                    window.open(EICAA_URL, '_blank');
                  }}
                />
                <div className="demographics-page__logo-eu" />
              </div>
            </div>
            <h1 className="demographics-page__title">
              {intl.messages.participant?.demographicsPage.title}
            </h1>
            <p className="demographics-page__subtitle">
              {intl.messages.participant?.demographicsPage.someQuestions}
            </p>
            <div className="form-wrapper">
              <div className="demographics-page__form-container">{renderForm()}</div>
            </div>
            <PageFooter />
          </div>
        </div>
        <ScreenResolver
          large={BREAKPOINTS.lg}
          desktop={
            <div className="demographics-page__image-container">
              <img
                className="demographics-page__image"
                src={backgroundImage}
                alt="working-on-laptop"
              />
              <div className="demographics-page__parallelograms" />
            </div>
          }
          mobile={null}
        />
      </div>
      <DryRunBox show={isDryRun} />
    </div>
  );
};

export default DemographicsPage;
