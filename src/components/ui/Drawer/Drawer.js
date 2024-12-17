import React from 'react'
import classNames from 'classnames'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import CloseButton from '../CloseButton'
import { motion } from 'framer-motion'

const Drawer = ({
	children,
	className,
	closable = true, // Valor padrão diretamente no destructuring
	width = 400, // Valor padrão diretamente no destructuring
	height = 400, // Valor padrão diretamente no destructuring
	isOpen,
	onClose,
	closeTimeoutMS = 300, // Valor padrão diretamente no destructuring
	placement = 'right', // Valor padrão diretamente no destructuring
	bodyOpenClassName,
	portalClassName,
	overlayClassName,
	title,
	footer,
	headerClass,
	footerClass,
	bodyClass,
	showBackdrop = true, // Valor padrão diretamente no destructuring
	lockScroll = true, // Valor padrão diretamente no destructuring
	...rest
}) => {

	const onCloseClick = (e) => {
		onClose(e);
	};

	const renderCloseButton = (
		<CloseButton onClick={onCloseClick} />
	);

	const getStyle = () => {
		if (placement === 'left' || placement === 'right') {
			return {
				dimensionClass: 'vertical',
				contentStyle: { width },
				motionStyle: {
					[placement]: `-${width}${typeof width === 'number' && 'px'}`
				}
			};
		}

		if (placement === 'top' || placement === 'bottom') {
			return {
				dimensionClass: 'horizontal',
				contentStyle: { height },
				motionStyle: {
					[placement]: `-${height}${typeof height === 'number' && 'px'}`
				}
			};
		}
	};

	const { dimensionClass, contentStyle, motionStyle } = getStyle();

	return (
		<Modal
			className={{
				base: classNames('drawer', className),
				afterOpen: 'drawer-after-open',
				beforeClose: 'drawer-before-close'
			}}
			overlayClassName={{
				base: classNames('drawer-overlay', overlayClassName, !showBackdrop && 'bg-transparent'),
				afterOpen: 'drawer-overlay-after-open',
				beforeClose: 'drawer-overlay-before-close'
			}}
			portalClassName={classNames('drawer-portal', portalClassName)}
			bodyOpenClassName={classNames('drawer-open', lockScroll && 'drawer-lock-scroll', bodyOpenClassName)}
			ariaHideApp={false}
			isOpen={isOpen}
			closeTimeoutMS={closeTimeoutMS}
			{...rest}
		>
			<motion.div
				className={classNames('drawer-content', dimensionClass)}
				style={contentStyle}
				initial={motionStyle}
				animate={{
					[placement]: isOpen ? 0 : motionStyle[placement]
				}}
			>
				{(title || closable) && (
					<div className={classNames('drawer-header', headerClass)}>
						{typeof title === 'string' ? <h4>{title}</h4> : <span>{title}</span>}
						{closable && renderCloseButton}
					</div>
				)}
				<div className={classNames('drawer-body', bodyClass)}>
					{children}
				</div>
				{footer && <div className={classNames('drawer-footer', footerClass)}>{footer}</div>}
			</motion.div>
		</Modal>
	);
};

Drawer.propTypes = {
	placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	height: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]),
	closable: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	footer: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	headerClass: PropTypes.string,
	footerClass: PropTypes.string,
	bodyClass: PropTypes.string,
	showBackdrop: PropTypes.bool,
	lockScroll: PropTypes.bool,
	bodyOpenClassName: PropTypes.string,
	portalClassName: PropTypes.string,
	overlayClassName: PropTypes.string,
};

export default Drawer;