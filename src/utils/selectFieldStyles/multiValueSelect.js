import colors from '../colors';
import { singleValueSelect } from './singleValueSelect';

export const multiValueSelect = {
  ...singleValueSelect,
  multiValue: provided => ({
    ...provided,
    position: 'relative'
  }),
  multiValueLabel: provided => ({
    ...provided,
    backgroundColor: colors.white,
    color: colors.black,
    paddingRight: '24px',
    borderRadius: '3px'
  }),
  multiValueRemove: provided => ({
    ...provided,
    backgroundColor: colors.greyLighter,
    color: colors.white,
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '14px',
    height: '14px',
    padding: '0',
    borderRadius: '2px',

    '&:hover': {
      backgroundColor: colors.primaryLight,
      color: colors.white,
      cursor: 'pointer'
    }
  })
};
