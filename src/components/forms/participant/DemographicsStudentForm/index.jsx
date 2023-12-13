import * as React from 'react';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import { demographicsStudentSchema } from '../../../../utils/validationSchemas';
import { LANGUAGES } from '../../../../utils/constants';
import { COUNTRIES } from '../../../../utils/countries';
import { Common, Student } from '../../../../utils/selectOptions/demographics';
import { singleValueSelect } from '../../../../utils/selectFieldStyles/singleValueSelect';
import { AppContext } from '../../../../storage/context';
import SelectField from '../../../common/ui/SelectField';
import Button from '../../../common/ui/Buttons/Button';
import './index.scss';

const DemographicsStudentForm = (props) => {
  const { selectedParticipantLanguage = LANGUAGES.EN } = React.useContext(AppContext)[0];

  const { onSubmit } = props;

  const intl = useIntl();

  const initialValues = {
    country: null,
    educationLevel: null,
    majorField: null,
    hasWorkExperience: null,
    workExperience: null,
    employmentStatus: null,
    employmentType: null,
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
      validationSchema={demographicsStudentSchema(intl)}
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
        <form className="demographics-page-student-form" onSubmit={handleSubmit}>
          <p className="demographics-page-student-form__question">
            {intl.messages.participant?.demographicsPage.student.countryQuestion}
          </p>
          <SelectField
            className="demographics-page-student-form__select"
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
          <p className="demographics-page-student-form__question">
            {intl.messages.participant?.demographicsPage.student.educationLevelQuestion}
          </p>
          <SelectField
            className="demographics-page-student-form__select"
            placeholder={intl.messages.participant?.demographicsPage.student.educationLevel}
            name="educationLevel"
            value={values.educationLevel}
            onChange={(educationLevel) => setFieldValue('educationLevel', educationLevel)}
            onBlur={() => setFieldTouched('educationLevel', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Common.EDUCATION_LEVEL_OPTIONS
              .slice()
              .sort((a, b) => a.translatedName[selectedParticipantLanguage].localeCompare(b.translatedName[selectedParticipantLanguage]))
              .map((option) => ({
                label: option.translatedName[selectedParticipantLanguage],
                value: option.value,
              }))
            }
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.educationLevel && errors.educationLevel}
          />
          <p className="demographics-page-student-form__question">
            {intl.messages.participant?.demographicsPage.student.majorFieldQuestion}
          </p>
          <SelectField
            className="demographics-page-student-form__select"
            placeholder={intl.messages.participant?.demographicsPage.student.majorField}
            name="majorField"
            value={values.majorField}
            onChange={(majorField) => setFieldValue('majorField', majorField)}
            onBlur={() => setFieldTouched('majorField', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Student.MAJOR_FIELD_OPTIONS
              .slice()
              .sort((a, b) => a.translatedName[selectedParticipantLanguage].localeCompare(b.translatedName[selectedParticipantLanguage]))
              .map((option) => ({
                label: option.translatedName[selectedParticipantLanguage],
                value: option.value,
              }))
            }
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.majorField && errors.majorField}
          />
          <p className="demographics-page-student-form__question">
            {intl.messages.participant?.demographicsPage.student.hasWorkExperienceQuestion}
          </p>
          <SelectField
            className="demographics-page-student-form__select"
            placeholder={intl.messages.common?.select}
            name="hasWorkExperience"
            value={values.hasWorkExperience}
            onChange={(hasWorkExperience) => setFieldValue('hasWorkExperience', hasWorkExperience)}
            onBlur={() => setFieldTouched('hasWorkExperience', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Common.YES_NO_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.hasWorkExperience && errors.hasWorkExperience}
          />
          {values.hasWorkExperience?.value === Student.CONDITIONAL_VALUES.YES && (
            <>
              <p className="demographics-page-student-form__question">
                {intl.messages.participant?.demographicsPage.student.workExperienceQuestion}
              </p>
              <SelectField
                className="demographics-page-student-form__select"
                placeholder={intl.messages.participant?.demographicsPage.student.workExperience}
                name="workExperience"
                value={values.workExperience}
                onChange={(workExperience) => setFieldValue('workExperience', workExperience)}
                onBlur={() => setFieldTouched('workExperience', true, true)}
                styles={singleValueSelect}
                isClearable={true}
                isSearchable={true}
                options={Student.WORK_EXPERIENCE_OPTIONS.map((option) => ({
                  label: option.translatedName[selectedParticipantLanguage],
                  value: option.value,
                }))}
                filterOption={(option, input) =>
                  option.label.toLowerCase().startsWith(input.toLowerCase())
                }
                error={touched.workExperience && errors.workExperience}
              />
            </>
          )}
          <p className="demographics-page-student-form__question">
            {intl.messages.participant?.demographicsPage.student.workQuestion}
          </p>
          <SelectField
            className="demographics-page-student-form__select"
            placeholder={intl.messages.common?.select}
            name="employmentStatus"
            value={values.employmentStatus}
            onChange={(employmentStatus) => setFieldValue('employmentStatus', employmentStatus)}
            onBlur={() => setFieldTouched('employmentStatus', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Common.YES_NO_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.employmentStatus && errors.employmentStatus}
          />
          {values.employmentStatus?.value === Common.CONDITIONAL_VALUES.YES && (
            <>
              <p className="demographics-page-student-form__question">
                {intl.messages.participant?.demographicsPage.student.employmentTypeQuestion}
              </p>
              <SelectField
                className="demographics-page-student-form__select"
                placeholder={intl.messages.participant?.demographicsPage.student.employmentType}
                name="employmentType"
                value={values.employmentType}
                onChange={(employmentType) => setFieldValue('employmentType', employmentType)}
                onBlur={() => setFieldTouched('employmentType', true, true)}
                styles={singleValueSelect}
                isClearable={true}
                isSearchable={true}
                options={Student.EMPLOYMENT_TYPE_OPTIONS.map((option) => ({
                  label: option.translatedName[selectedParticipantLanguage],
                  value: option.value,
                }))}
                filterOption={(option, input) =>
                  option.label.toLowerCase().startsWith(input.toLowerCase())
                }
                error={touched.employmentType && errors.employmentType}
              />
            </>
          )}
          <p className="demographics-page-student-form__question">
            {intl.messages.participant?.demographicsPage.common.genderQuestion}
          </p>
          <SelectField
            className="demographics-page-student-form__select"
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
          <p className="demographics-page-student-form__question">
            {intl.messages.participant?.demographicsPage.common.ageGroupQuestion}
          </p>
          <SelectField
            className="demographics-page-student-form__select"
            placeholder={intl.messages.participant?.demographicsPage.common.ageGroup}
            name="ageGroup"
            value={values.ageGroup}
            onChange={(ageGroup) => setFieldValue('ageGroup', ageGroup)}
            onBlur={() => setFieldTouched('ageGroup', true, true)}
            styles={singleValueSelect}
            isClearable={true}
            isSearchable={true}
            options={Student.AGE_OPTIONS.map((option) => ({
              label: option.translatedName[selectedParticipantLanguage],
              value: option.value,
            }))}
            filterOption={(option, input) =>
              option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            error={touched.ageGroup && errors.ageGroup}
          />
          <Button
            className="demographics-page-student-form__button -primary-light"
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

export default DemographicsStudentForm;
