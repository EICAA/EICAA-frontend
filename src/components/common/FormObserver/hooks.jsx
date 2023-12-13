import React from 'react';

export const useFormObserver = () => {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return React.useMemo(() => (
    { values, errors, isSubmitting, setValues, setErrors, setIsSubmitting }
  ), [values, errors, isSubmitting, setValues, setErrors, setIsSubmitting]);
};
