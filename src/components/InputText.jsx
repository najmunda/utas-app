import PropTypes from 'prop-types';
import React from 'react';

function InputText({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`${className} p-2 border border-neutral-300 rounded-lg`}
    />
  );
}

InputText.propTypes = {
  className: PropTypes.string,
};

InputText.defaultProps = {
  className: '',
};

export default InputText;
