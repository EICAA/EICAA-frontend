import * as Yup from 'yup';
import { LIMITS } from './constants';
import { CONDITIONAL_VALUES } from './selectOptions/demographics/common';

const today = new Date();
today.setHours(0, 0, 0, 0);

const Shape = {
  ValueLabel: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string(),
  }),
  DataValueLabel: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string(),
    data: Yup.string(),
  }),
};

Yup.addMethod(Yup.date, 'dateNotPast', function (errorMessage) {
  return this.test(`test-date-past-today`, errorMessage, function (value) {
    const { path, createError } = this;

    return value >= today || !value || createError({ path, message: errorMessage });
  });
});

export const landingSchema = (intl) => {
  return Yup.object().shape({
    email: Yup.string()
      .required(intl.messages.errors?.emailEmpty)
      .email(intl.messages.errors?.emailInvalid)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    consentGiven: Yup.boolean().oneOf([true], intl.messages.errors?.acceptTerms),
  });
};

export const landingSchemaNoEmail = (intl) => {
  return Yup.object().shape({
    consentGiven: Yup.boolean().oneOf([true], intl.messages.errors?.acceptTerms),
  });
};

export const demographicsEmployeeSchema = (intl) => {
  return Yup.object().shape({
    country: Shape.DataValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    educationLevel: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    workExperience: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    workField: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    organisationType: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    organisationSize: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    levelOfPosition: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    gender: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    ageGroup: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
  });
};

export const demographicsStudentSchema = (intl) => {
  return Yup.object().shape({
    country: Shape.DataValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    educationLevel: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    majorField: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    hasWorkExperience: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    workExperience: Yup.object().when('hasWorkExperience', {
      is: (hasWorkExperience) => hasWorkExperience?.value === CONDITIONAL_VALUES.YES,
      then: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
      otherwise: Shape.ValueLabel.nullable(),
    }),
    employmentStatus: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    employmentType: Yup.object().when('employmentStatus', {
      is: (employmentStatus) => employmentStatus?.value === CONDITIONAL_VALUES.YES,
      then: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
      otherwise: Shape.ValueLabel.nullable(),
    }),
    gender: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    ageGroup: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
  });
};

export const feedbackSchema = (intl) => {
  return Yup.object().shape({
    feedback: Yup.string().max(LIMITS.TEXT, intl.messages.errors?.textTooLong),
  });
};

export const loginSchema = (intl) =>
  Yup.object().shape({
    email: Yup.string()
      .required(intl.messages.errors?.emailEmpty)
      .email(intl.messages.errors?.emailInvalid)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    password: Yup.string()
      .required(intl.messages.errors?.passwordEmpty)
      .min(8, intl.messages.errors?.passwordTooShort)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    rememberMe: Yup.boolean(),
  });

export const registerSchema = (intl) =>
  Yup.object().shape({
    email: Yup.string()
      .required(intl.messages.errors?.emailEmpty)
      .email(intl.messages.errors?.emailInvalid)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    password: Yup.string()
      .required(intl.messages.errors?.passwordEmpty)
      .min(8, intl.messages.errors?.passwordTooShort),
    firstName: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    lastName: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    organization: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    position: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    country: Shape.DataValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    role: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    consentGiven: Yup.boolean().oneOf([true], intl.messages.errors?.acceptTerms),
  });

export const passwordForgotSchema = (intl) =>
  Yup.object().shape({
    email: Yup.string()
      .required(intl.messages.errors?.emailEmpty)
      .email(intl.messages.errors?.emailInvalid),
  });

export const passwordResetSchema = (intl) =>
  Yup.object().shape({
    password: Yup.string()
      .required(intl.messages.errors?.passwordEmpty)
      .min(8, intl.messages.errors?.passwordTooShort)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    passwordConfirm: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .oneOf([Yup.ref('password'), null], intl.messages.errors?.passwordMismatch),
  });

export const assessmentCreateSchema = (intl) =>
  Yup.object().shape({
    name: Yup.string().required(intl.messages.errors?.fieldRequired),
    maxParticipants: Yup.number()
      .integer(intl.messages.errors?.mustBeWhole)
      .min(1, intl.messages.errors?.valueTooLow)
      .max(LIMITS.MAX_INT4, intl.messages.errors?.valueTooHigh)
      .nullable(true),
    country: Shape.DataValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    availableLanguages: Yup.array()
      .of(Shape.DataValueLabel)
      .nullable()
      .min(1, intl.messages.errors?.fieldRequired),
    activeFrom: Yup.date().nullable().required(intl.messages.errors?.fieldRequired),
    activeTo: Yup.date()
      .nullable()
      .dateNotPast(intl.messages.errors?.datePast)
      .when('activeFrom', (activeFrom, schema) => {
        if (activeFrom) {
          return schema.min(activeFrom, intl.messages.errors?.dateBeforeStart);
        } else {
          return schema;
        }
      }),
    demographics: Yup.boolean(),
    shareResults: Yup.boolean(),
  });

export const assessmentActivateSchema = (intl) =>
  Yup.object().shape({
    archived: Yup.boolean(),
    activeFrom: Yup.date().nullable().required(intl.messages.errors?.fieldRequired),
    activeTo: Yup.date()
      .nullable()
      .dateNotPast(intl.messages.errors?.datePast)
      .when('activeFrom', (activeFrom, schema) => {
        if (activeFrom) {
          return schema.min(activeFrom, intl.messages.errors?.dateBeforeStart);
        } else {
          return schema;
        }
      }),
  });

export const accountEditSchema = (intl) =>
  Yup.object().shape({
    email: Yup.string()
      .required(intl.messages.errors?.emailEmpty)
      .email(intl.messages.errors?.emailInvalid),
    firstName: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    lastName: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    organization: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    position: Yup.string()
      .required(intl.messages.errors?.fieldRequired)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    country: Shape.DataValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
    role: Shape.ValueLabel.nullable().required(intl.messages.errors?.fieldRequired),
  });

export const passwordChangeSchema = (intl) =>
  Yup.object().shape({
    password: Yup.string()
      .required(intl.messages.errors?.passwordEmpty)
      .min(8, intl.messages.errors?.passwordTooShort)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
    newPassword: Yup.string()
      .required(intl.messages.errors?.passwordEmpty)
      .min(8, intl.messages.errors?.passwordTooShort)
      .max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
  });

export const cdkFilterFormSchema = (intl) =>
  Yup.object().shape({
    area: Shape.ValueLabel.nullable(),
    competence: Shape.ValueLabel.nullable(),
    difficulty: Shape.ValueLabel.nullable(),
    search: Yup.string().max(LIMITS.CHAR, intl.messages.errors?.textTooLong),
  });

export const cdkRatingSchema = (intl) =>
  Yup.object().shape({
    helpfulness: Yup.number()
      .min(0.5, intl.messages.errors?.fieldRequired)
      .required(intl.messages.errors?.fieldRequired),
    trainingResults: Yup.number()
      .min(0.5, intl.messages.errors?.fieldRequired)
      .required(intl.messages.errors?.fieldRequired),
    easeOfUse: Yup.number()
      .min(0.5, intl.messages.errors?.fieldRequired)
      .required(intl.messages.errors?.fieldRequired),
    interactivity: Yup.number()
      .min(0.5, intl.messages.errors?.fieldRequired)
      .required(intl.messages.errors?.fieldRequired),
  });
