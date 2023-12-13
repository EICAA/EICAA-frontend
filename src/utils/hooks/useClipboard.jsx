import React from 'react';
import { useIntl } from 'react-intl';
import useSnackBar from '../../components/common/ui/SnackBar/hooks';

export const useClipboard = () => {
  const intl = useIntl();
  const snackBar = useSnackBar();

  const copyAssessmentUrl = React.useCallback(
    async (assessment) => {
      try {
        if (!assessment?.id) {
          throw new Error('URL could not be created. No assessment.');
        }

        const host = window.location.origin;
        const url = `${host}/start?assessment=${assessment.hash || assessment.id}`;

        await navigator.clipboard.writeText(url);

        snackBar.open(intl.messages.snackBars?.copyUrlSuccess);
      } catch (err) {
        console.error(err);
        snackBar.open(intl.messages.snackBars?.copyUrlFailure, { color: 'red' });
      }
    },
    [intl.messages, snackBar],
  );

  return React.useMemo(() => ({ copyAssessmentUrl }), [copyAssessmentUrl]);
};
