import React from 'react';
import PropTypes from 'prop-types';

function CategoryItem({ category, isOption = false, isSelected = false }) {
  return isOption ? (
    <div
      className={`px-2 py-1 rounded-lg ${isSelected ? 'bg-lime-400 order-first' : 'bg-white'}
        border border-neutral-300`}
    >
      <input
        type="radio"
        checked={isSelected || false}
        value={category}
        name="category"
        id={category}
        className="opacity-0 absolute"
        readOnly
      />
      <label className="cursor-pointer" htmlFor={category}>{category}</label>
    </div>
  ) : (
    <p className="self-start px-2 py-1 rounded-lg bg-white border border-neutral-300">{category}</p>
  );
}

CategoryItem.propTypes = {
  /** Name of category */
  category: PropTypes.string.isRequired,
  /** Boolean that decide is component clickable (radio input) or not (text) */
  isOption: PropTypes.bool,
  /** Boolean that decide is radio input selected or not */
  isSelected: PropTypes.bool,
};

CategoryItem.defaultProps = {
  isOption: false,
  isSelected: false,
};

export default CategoryItem;
