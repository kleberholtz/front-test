import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { APP_NAME } from 'constants/app.constant'

const LOGO_SRC_PATH = '/img/logo/'

const Logo = ({
	type = 'full',
	mode = 'light',
	gutter = '',
	className = '',
	imgClass = '',
	style = {},
	logoWidth = 'auto'
}) => {
	return (
		<div
			className={classNames('flex justify-center', className, gutter)}
			style={{
				...style,
				width: logoWidth,
			}}
		>
			<img
				className={classNames('py-2', imgClass)}
				width="58px"
				src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
				alt={`${APP_NAME} logo`}
			/>
		</div>
	);
};

Logo.propTypes = {
	mode: PropTypes.oneOf(['light', 'dark']),
	type: PropTypes.oneOf(['full', 'streamline']),
	gutter: PropTypes.string,
	className: PropTypes.string,
	imgClass: PropTypes.string,
	style: PropTypes.object,
	logoWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Logo;