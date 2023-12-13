import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const Button = React.forwardRef((props, ref) => {
	const {
		label = '',
    icon = null,
		type = 'button',
		className = '',
		handleClick = () => { },
		disabled = false,
	} = props;

	return (
		<button
      ref={ref}
			type={type}
			className={classnames(
        'button',
        className && className,
        disabled && '-disabled',
      )}
			onClick={handleClick}
			disabled={disabled}
		>
			{icon &&
      <img
        className="button__icon"
        src={icon}
        alt="back" />
      }
      {label}
		</button>
	);
});

export default Button;
