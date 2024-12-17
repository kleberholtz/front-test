import React from 'react';
import PropTypes from 'prop-types';
import { FormContextProvider } from '../context';
import { useConfig } from '../../ConfigProvider';
import { SIZES, LAYOUT } from '../../utils/constant';
import classNames from 'classnames';

const FormContainer = ({
    children,
    labelWidth = 100, // Valor padrão diretamente no destructuring
    layout = LAYOUT.VERTICAL, // Valor padrão diretamente no destructuring
    size,
    className,
}) => {
    const { controlSize } = useConfig();

    const contextValue = {
        labelWidth,
        layout,
        size: size || controlSize, // Fallback para o tamanho global
    };

    return (
        <FormContextProvider value={contextValue}>
            <div className={classNames('form-container', layout, className)}>
                {children}
            </div>
        </FormContextProvider>
    );
};

FormContainer.propTypes = {
    layout: PropTypes.oneOf([LAYOUT.HORIZONTAL, LAYOUT.VERTICAL, LAYOUT.INLINE]),
    size: PropTypes.oneOf([SIZES.LG, SIZES.SM, SIZES.MD]),
    labelWidth: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    className: PropTypes.string,
};

export default FormContainer;