import React from 'react';
import PropTypes from 'prop-types';

function TextButton({ children, type, ...props }) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      {...props}
      className="w-fit p-2 bg-lime-400 hover:bg-lime-500 border border-neutral-300
        rounded-lg cursor-pointer"
    >
      {children}
    </button>
  );
}

TextButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  type: PropTypes.string.isRequired,
};

export default TextButton;
