import React from 'react'
import Modal from 'react-modal'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import CloseButton from '../CloseButton'
import { motion } from 'framer-motion'
import { theme } from 'twin.macro'
import useWindowSize from '../hooks/useWindowSize'

const Dialog = ({
	children,
	className,
	closable = true, // Valor padrão definido diretamente no destructuring
	width = 520, // Valor padrão definido diretamente no destructuring
	height,
	style,
	isOpen,
	onClose,
	bodyOpenClassName,
	portalClassName,
	overlayClassName,
	contentClassName,
	closeTimeoutMS = 150, // Valor padrão definido diretamente no destructuring
	...rest
}) => {
	const currentSize = useWindowSize();

	const onCloseClick = (e) => {
		onClose(e);
	};

	const renderCloseButton = (
		<CloseButton onClick={onCloseClick} className="ltr:right-6 rtl:left-6" absolute />
	);

	const contentStyle = {
		content: {
			inset: 'unset',
			width: width !== undefined ? width : 'auto',
			height: height,
		},
		...style,
	};

	// Ajusta a largura com base no tamanho da janela
	if (currentSize.width <= parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ''))) {
		contentStyle.content.width = 'auto';
	}

	const defaultDialogContentClass = 'dialog-content';

	const dialogClass = classNames(
		defaultDialogContentClass,
		contentClassName
	);

	return (
		<Modal
			className={{
				base: classNames('dialog', className),
				afterOpen: 'dialog-after-open',
				beforeClose: 'dialog-before-close',
			}}
			overlayClassName={{
				base: classNames('dialog-overlay', overlayClassName),
				afterOpen: 'dialog-overlay-after-open',
				beforeClose: 'dialog-overlay-before-close',
			}}
			portalClassName={classNames('dialog-portal', portalClassName)}
			bodyOpenClassName={classNames('dialog-open', bodyOpenClassName)}
			ariaHideApp={false}
			isOpen={isOpen}
			style={{ ...contentStyle }}
			closeTimeoutMS={closeTimeoutMS}
			{...rest}
		>
			<motion.div
				className={dialogClass}
				initial={{ transform: 'scale(0.9)' }}
				animate={{
					transform: isOpen ? 'scale(1)' : 'scale(0.9)',
				}}
			>
				{closable && renderCloseButton}
				{children}
			</motion.div>
		</Modal>
	);
};

Dialog.propTypes = {
	closable: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
	overlayClassName: PropTypes.string,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	height: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	onClose: PropTypes.func,
	portalClassName: PropTypes.string,
	contentClassName: PropTypes.string,
	closeTimeoutMS: PropTypes.number,
	bodyOpenClassName: PropTypes.string,
};

export default Dialog;