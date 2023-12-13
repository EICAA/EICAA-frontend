import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const ButtonPaginator = (props) => {
	const {
		label = '',
		type = 'button-paginator',
		className = '',
		handleClick = () => { },
		disabled = false,
	} = props;

	return (
		<button
			type={type}
			className={classnames(
        'button-paginator',
        className && className,
        disabled && '-disabled',
      )}
			onClick={handleClick}
			disabled={disabled}
		>
      {label}
		</button>
	)
}

export default ButtonPaginator;
