import React from 'react';
import { useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import { Formik } from 'formik';
import {
  useCdkAreas,
  useCdkCompetences,
  useCdkDifficulties
} from '../../../../utils/hooks';
import { cdkFilterFormSchema } from '../../../../utils/validationSchemas';
import { singleValueSelectCdk } from '../../../../utils/selectFieldStyles/singleValueSelect';
import SearchInputTextField from '../../../common/ui/SearchInputTextField';
import SelectField from '../../../common/ui/SelectField';
import AnimateDots from '../../../common/AnimateDots';
import './index.scss';

const CdkFilterForm = props => {
  const { onSubmit } = props;

  const {
    areas,
    isInitialized: isAreasInitialized,
  } = useCdkAreas();
  const {
    competences,
    getCompetences,
    isInitialized: isCompetencesInitialized,
  } = useCdkCompetences();
  const {
    difficulties,
    isInitialized: isDifficultiesInitialized,
  } = useCdkDifficulties();

  const location = useLocation();
  const intl = useIntl();

  const areaOptions = React.useMemo(() => {
    return areas.sort().map(name => ({
      label: name,
      value: name,
    }));
  }, [areas]);
  const competenceOptions = React.useMemo(() => {
    return competences.sort().map(name => ({
      label: name,
      value: name,
    }));
  }, [competences]);
  const difficultyOptions = React.useMemo(() => {
    return difficulties.map(name => ({
      label: name,
      value: name,
    }));
  }, [difficulties]);

  const paramEntries = Object.fromEntries(new URLSearchParams(location.search).entries());
  const initialValues = {
    area: paramEntries.area ? areaOptions.find(option => option.value === paramEntries.area) || null : null,
    competence: paramEntries.competence ? competenceOptions.find(option => option.value === paramEntries.competence) || null : null,
    difficulty: paramEntries.difficulty ? difficultyOptions.find(option => option.value === paramEntries.difficulty) || null : null,
    search: paramEntries.search || '',
  };
  const isInitialized = isAreasInitialized && isCompetencesInitialized && isDifficultiesInitialized;

  return (
    isInitialized ? (
      <Formik
        initialValues={initialValues}
        validationSchema={cdkFilterFormSchema(intl)}
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
          <form className="cdk-filter-form" onSubmit={handleSubmit}>
            <SelectField
              className="cdk-filter-form__select -cdk-filter"
              placeholder={intl.messages.common?.select}
              label={intl.messages.user?.cdkRepositoryPage.list.area}
              name="area"
              value={values.area}
              onChange={(area) => {
                setFieldValue('area', area);
                setFieldValue('competence', null);
                getCompetences(area?.value || null);
                handleSubmit();
              }}
              onBlur={() => setFieldTouched('area', true, true)}
              styles={singleValueSelectCdk}
              isClearable={true}
              isSearchable={true}
              options={areaOptions}
              filterOption={(option, input) =>
                option.label.toLowerCase().startsWith(input.toLowerCase())
              }
              error={touched.area && errors.area}
            />
            <SelectField
              className="cdk-filter-form__select"
              placeholder={intl.messages.common?.select}
              label={intl.messages.user?.cdkRepositoryPage.list.competence}
              name="competence"
              value={values.competence}
              onChange={(competence) => {
                setFieldValue('competence', competence);
                handleSubmit();
              }}
              onBlur={() => setFieldTouched('competence', true, true)}
              styles={singleValueSelectCdk}
              isClearable={true}
              isSearchable={true}
              options={competenceOptions}
              filterOption={(option, input) =>
                option.label.toLowerCase().startsWith(input.toLowerCase())
              }
              error={touched.competence && errors.competence}
            />
            <SelectField
              className="cdk-filter-form__select"
              placeholder={intl.messages.common?.select}
              label={intl.messages.user?.cdkRepositoryPage.list.difficulty}
              name="difficulty"
              value={values.difficulty}
              onChange={(difficulty) => {
                setFieldValue('difficulty', difficulty);
                handleSubmit();
              }}
              onBlur={() => setFieldTouched('difficulty', true, true)}
              styles={singleValueSelectCdk}
              isClearable={true}
              isSearchable={true}
              options={difficultyOptions}
              filterOption={(option, input) =>
                option.label.toLowerCase().startsWith(input.toLowerCase())
              }
              error={touched.difficulty && errors.difficulty}
            />
            {/** Will need to create a new search field based on the text field.
             * Also value change must be applied only when the button/enter is pressed.
             * In the same time form must be submitted.
             * */}
            <SearchInputTextField
              className="cdk-filter-form__search-input"
              placeholder={intl.messages.common?.search}
              name="search"
              value={values.search}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              error={touched.search && errors.search}
            />
          </form>
        )}
      </Formik>
    ) : (
      <>{intl.messages.common?.loading}<AnimateDots /></>
    )
  );
};

export default CdkFilterForm;
