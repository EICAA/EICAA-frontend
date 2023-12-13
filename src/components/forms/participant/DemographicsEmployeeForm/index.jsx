import * as React from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { demographicsEmployeeSchema } from '../../../../utils/validationSchemas';
import { LANGUAGES } from '../../../../utils/constants';
import { COUNTRIES } from '../../../../utils/countries';
import { Common, Employee } from '../../../../utils/selectOptions/demographics';
import { singleValueSelect } from '../../../../utils/selectFieldStyles/singleValueSelect';
import { AppContext } from '../../../../storage/context';
import SelectField from '../../../common/ui/SelectField';
import Button from '../../../common/ui/Buttons/Button';
import './index.scss';

const DemographicsEmployeeForm = (props) => {
  const { selectedParticipantLanguage = LANGUAGES.EN } = React.useContext(AppContext)[0];

  const { onSubmit } = props;

  const intl = useIntl();

  const initialValues = {
    country: null,
    educationLevel: null,
    workExperience: null,
    workField: null,
    organisationType: null,
    organisationSize: null,
    levelOfPosition: null,
    gender: null,
    ageGroup: null,
  };

  const countryOptions = COUNTRIES.map((country) => ({
    label: country.translatedName[selectedParticipantLanguage],
    value: country.translatedName[selectedParticipantLanguage],
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={demographicsEmployeeSchema(intl)}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    >
      {({
        values,
        touched,
        errors,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <form className="demographics-page-employee-form" onSubmit={handleSubmit}>
          {/*<h2 className="demographics-page-employee-form__title">
            {intl.messages.participant?.demographicsPage.common.title}
          </h2>*/}
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.employee.countryQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.common?.country}
            name="country"
            value={values.country}
            onChange={(country) => setFieldValue('country', country)}
            onBlur={() => setFieldTouched('country', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={countryOptions}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.country && errors.country}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.employee.educationLevelQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.employee.educationLevel}
            name="educationLevel"
            value={values.educationLevel}
            onChange={(educationLevel) => setFieldValue('educationLevel', educationLevel)}
            onBlur={() => setFieldTouched('educationLevel', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Common.EDUCATION_LEVEL_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.educationLevel && errors.educationLevel}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.employee.workExperienceQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.employee.workExperience}
            name="workExperience"
            value={values.workExperience}
            onChange={(workExperience) => setFieldValue('workExperience', workExperience)}
            onBlur={() => setFieldTouched('workExperience', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Employee.WORK_EXPERIENCE_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.workExperience && errors.workExperience}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.employee.workFieldQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.employee.workField}
            name="workField"
            value={values.workField}
            onChange={(workField) => setFieldValue('workField', workField)}
            onBlur={() => setFieldTouched('workField', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Employee.WORKING_FIELD_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.workField && errors.workField}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.employee.organisationTypeQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.employee.organisationType}
            name="organisationType"
            value={values.organisationType}
            onChange={(organisationType) => setFieldValue('organisationType', organisationType)}
            onBlur={() => setFieldTouched('organisationType', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Employee.ORGANISATION_TYPE_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.organisationType && errors.organisationType}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.employee.organisationSizeQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.employee.organisationSize}
            name="organisationSize"
            value={values.organisationSize}
            onChange={(organisationSize) => setFieldValue('organisationSize', organisationSize)}
            onBlur={() => setFieldTouched('organisationSize', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Employee.ORGANISATION_SIZE_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.organisationSize && errors.organisationSize}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.employee.levelOfPositionQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.employee.levelOfPosition}
            name="levelOfPosition"
            value={values.levelOfPosition}
            onChange={(levelOfPosition) => setFieldValue('levelOfPosition', levelOfPosition)}
            onBlur={() => setFieldTouched('levelOfPosition', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Employee.LEVEL_OF_POSITION_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.levelOfPosition && errors.levelOfPosition}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.common.genderQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.common.gender}
            name="gender"
            value={values.gender}
            onChange={(gender) => setFieldValue('gender', gender)}
            onBlur={() => setFieldTouched('gender', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Common.GENDER_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.gender && errors.gender}
          />
          <p className="demographics-page-employee-form__question">
            {intl.messages.participant?.demographicsPage.common.ageGroupQuestion}
          </p>
          <SelectField
            className="demographics-page-employee-form__select"
            placeholder={intl.messages.participant?.demographicsPage.common.ageGroup}
            name="ageGroup"
            value={values.ageGroup}
            onChange={(ageGroup) => setFieldValue('ageGroup', ageGroup)}
            onBlur={() => setFieldTouched('ageGroup', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Employee.AGE_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.ageGroup && errors.ageGroup}
          />
          <Button
            className="demographics-page-employee-form__button -primary-light"
            label={intl.messages.common?.start}
            type="submit"
            onSubmit={handleSubmit}
            disabled={isSubmitting || Object.keys(errors)?.length}
          />
        </form>
      )}
    </Formik>
  );
};

export default DemographicsEmployeeForm;
