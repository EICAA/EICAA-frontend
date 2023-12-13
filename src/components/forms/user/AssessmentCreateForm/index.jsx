import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { BREAKPOINTS } from '../../../../utils/breakpoints';
import { useResolveScreen } from '../../../../utils/hooks';
import { assessmentCreateSchema } from '../../../../utils/validationSchemas';
import { multiValueSelect } from '../../../../utils/selectFieldStyles/multiValueSelect';
import {
  BOOLEANS_AS_STRING,
  DATE_LOCALE_PLACEHOLDERS,
  LANGUAGES,
  PATHS,
} from '../../../../utils/constants';
import { getLocalStorage } from '../../../../storage/storageHandlers/operations';
import { STORAGE_KEYS } from '../../../../storage/storageHandlers/config';
import { LANGUAGES_DATA } from '../../../../utils/languages';
import { COUNTRIES } from '../../../../utils/countries';
import { singleValueSelect } from '../../../../utils/selectFieldStyles/singleValueSelect';
import Button from '../../../common/ui/Buttons/Button';
import InputTextField from '../../../common/ui/InputTextField';
import SelectField from '../../../common/ui/SelectField';
import RadioButtonSelect from '../../../common/ui/RadioButtonSelect';
import DateInput from '../../../common/ui/DateInput';
import helpIcon from '../../../../assets/icons/question-mark.svg';
import './index.scss';

const AssessmentCreateForm = (props) => {
  const { onSubmit } = props;

  const navigate = useNavigate();
  const intl = useIntl();
  const { isMobile } = useResolveScreen(BREAKPOINTS.xl);

  const initialValues = {
    name: '',
    maxParticipants: '',
    country: null,
    availableLanguages: [],
    activeFrom: new Date(),
    activeTo: null,
    demographics: BOOLEANS_AS_STRING.TRUE,
    shareResults: BOOLEANS_AS_STRING.TRUE,
  };

  const selectedLanguageCode = getLocalStorage(STORAGE_KEYS.LANGUAGE || LANGUAGES.EN);
  const countryOptions = COUNTRIES.map((country) => ({
    label: country.translatedName[selectedLanguageCode],
    value: country.translatedName[selectedLanguageCode],
    data: country.alpha2Code,
  })).sort((a, b) => {
    if (b.label > a.label) {
      return -1;
    }
    if (b.label < a.label) {
      return 1;
    }
    return 0;
  });
  const languageOptions = LANGUAGES_DATA.map((language) => ({
    label: language.translatedName[selectedLanguageCode],
    value: language.translatedName[selectedLanguageCode],
    data: language.alpha2Code,
  }));
  const radioSelectBooleanOptions = [
    {
      label: intl.messages.common?.yes,
      value: BOOLEANS_AS_STRING.TRUE,
    },
    {
      label: intl.messages.common?.no,
      value: BOOLEANS_AS_STRING.FALSE,
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={assessmentCreateSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <form className="assessment-create-form" onSubmit={handleSubmit}>
          <div className="assessment-create-form__container">
            <div className="assessment-create-form__container-part">
              <InputTextField
                className="assessment-create-form__input"
                placeholder={intl.messages.user?.assessmentCreatePage.assessmentNamePlaceholder}
                label={`${intl.messages.user?.assessmentCreatePage.assessmentName}*`}
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />
              <InputTextField
                className="assessment-create-form__input -low-width"
                placeholder={intl.messages.user?.assessmentCreatePage.maxParticipantsPlaceholder}
                label={intl.messages.user?.assessmentCreatePage.maxParticipants}
                labelFlex="start-center"
                name="maxParticipants"
                tooltip={{
                  iconComponent: (
                    <img
                      className="input-text-field__tooltip-icon"
                      src={helpIcon}
                      alt="question-mark"
                    />
                  ),
                  text: intl.messages.user?.assessmentCreatePage.maxParticipantsTooltip,
                }}
                value={values.maxParticipants}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                error={touched.maxParticipants && errors.maxParticipants}
              />
              <SelectField
                className="assessment-create-form__select"
                placeholder={intl.messages.common?.country}
                label={`${intl.messages.user?.assessmentCreatePage.assessmentCountry}*`}
                name="country"
                value={values.country}
                onChange={(country) => setFieldValue('country', country)}
                onBlur={() => setFieldTouched('country', true, true)}
                styles={singleValueSelect}
                isClearable={true}
                isSearchable={true}
                options={countryOptions}
                filterOption={(option, input) =>
                  option.value.toLowerCase().startsWith(input.toLowerCase())
                }
                error={touched.country && errors.country}
              />
              <SelectField
                className="assessment-create-form__select -multi"
                placeholder={intl.messages.common?.select}
                label={`${intl.messages.user?.assessmentCreatePage.assessmentLanguages}*`}
                name="availableLanguages"
                value={values.availableLanguages}
                isMulti
                onChange={(language) => setFieldValue('availableLanguages', language)}
                onBlur={() => setFieldTouched('availableLanguages', true, true)}
                styles={multiValueSelect}
                isClearable={true}
                isSearchable={true}
                options={languageOptions}
                filterOption={(option, input) =>
                  option.value.toLowerCase().startsWith(input.toLowerCase())
                }
                error={touched.availableLanguages && errors.availableLanguages}
                menuPlacement={isMobile ? 'auto' : 'top'}
              />
            </div>
            <div className="assessment-create-form__container-part">
              <div className="assessment-create-form__date-container">
                <DateInput
                  className="assessment-create-form__date-input"
                  label={`${intl.messages.user?.assessmentCreatePage.startDate}*`}
                  name="activeFrom"
                  value={values.activeFrom}
                  onChange={(date) => {
                    setFieldValue('activeFrom', date);
                  }}
                  onBlur={() => setFieldTouched('activeFrom', true, true)}
                  locale={selectedLanguageCode}
                  dayPlaceholder={DATE_LOCALE_PLACEHOLDERS.DAY[selectedLanguageCode]}
                  monthPlaceholder={DATE_LOCALE_PLACEHOLDERS.MONTH[selectedLanguageCode]}
                  yearPlaceholder={DATE_LOCALE_PLACEHOLDERS.YEAR[selectedLanguageCode]}
                  clearIcon={null}
                  error={touched.activeFrom && errors.activeFrom}
                  errorOnBottom
                />
                <DateInput
                  className="assessment-create-form__date-input"
                  label={intl.messages.user?.assessmentCreatePage.endDate}
                  name="activeTo"
                  tooltip={{
                    iconComponent: (
                      <img
                        className="radio-button-select__tooltip-icon"
                        src={helpIcon}
                        alt="question-mark"
                      />
                    ),
                    text: intl.messages.user?.assessmentCreatePage.endDateTooltip,
                  }}
                  labelFlex="start-center"
                  value={values.activeTo}
                  onChange={(date) => {
                    setFieldValue('activeTo', date ? new Date(date) : date);
                  }}
                  onBlur={() => setFieldTouched('activeTo', true, true)}
                  locale={selectedLanguageCode}
                  dayPlaceholder={DATE_LOCALE_PLACEHOLDERS.DAY[selectedLanguageCode]}
                  monthPlaceholder={DATE_LOCALE_PLACEHOLDERS.MONTH[selectedLanguageCode]}
                  yearPlaceholder={DATE_LOCALE_PLACEHOLDERS.YEAR[selectedLanguageCode]}
                  error={touched.activeTo && errors.activeTo}
                  errorOnBottom
                />
              </div>
              <RadioButtonSelect
                className="assessment-create-form__radio-input"
                options={radioSelectBooleanOptions}
                name="demographics"
                label={`${intl.messages.user?.assessmentCreatePage.participantDemographics}*`}
                tooltip={{
                  iconComponent: (
                    <img
                      className="radio-button-select__tooltip-icon"
                      src={helpIcon}
                      alt="question-mark"
                    />
                  ),
                  text: intl.messages.user?.assessmentCreatePage.demographicsTooltip,
                }}
                value={values.demographics}
                onChange={(event) => {
                  setFieldValue('demographics', event.target?.value);
                }}
                onBlur={handleBlur}
                error={touched.demographics && errors.demographics}
              />
              <RadioButtonSelect
                className="assessment-create-form__radio-input"
                options={radioSelectBooleanOptions}
                name="shareResults"
                label={`${intl.messages.user?.assessmentCreatePage.shareResults}*`}
                value={values.shareResults}
                onChange={(event) => {
                  setFieldValue('shareResults', event.target?.value);
                }}
                onBlur={handleBlur}
                error={touched.shareResults && errors.shareResults}
              />
              <div className="assessment-create-form__required-fields">
                {intl.messages.user?.assessmentCreatePage.requiredFields}
              </div>
            </div>
          </div>
          <div className="assessment-create-form__button-container">
            <Button
              className="assessment-create-form__button -white-bordered"
              label={intl.messages.common?.cancel}
              handleClick={() => navigate(`${PATHS.user}${PATHS.dashboard}`)}
              disabled={isSubmitting}
            />
            <Button
              className="assessment-create-form__button"
              label={intl.messages.common?.create}
              type="submit"
              onSubmit={handleSubmit}
              disabled={isSubmitting || Object.keys(errors).length || !Object.keys(touched).length}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AssessmentCreateForm;
