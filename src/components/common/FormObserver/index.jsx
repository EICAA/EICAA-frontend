import React from 'react';

const FormObserver = (props) => {
  const {
    values,
    errors,
    isSubmitting,
    setValues = () => {},
    setErrors = () => {},
    setIsSubmitting = () => {},
  } = props;

  React.useEffect(() => {
    setValues(values);
    setErrors(errors);
    setIsSubmitting(isSubmitting);
  }, [values, errors, isSubmitting, setValues, setErrors, setIsSubmitting]);
};

export default FormObserver;
