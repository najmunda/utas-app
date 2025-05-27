import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router';
import { X } from 'lucide-react';
import CategoryItem from './CategoryItem';

function CategoriesFilter({ categories = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  function handleCategoryForm(e) {
    const formData = new FormData(e.currentTarget);
    const categoryObj = Object.fromEntries(formData);
    setSearchParams(categoryObj);
    e.preventDefault();
  }

  function handleResetButton() {
    setSearchParams({});
  }

  return (
    <form onChange={handleCategoryForm} className="flex items-center gap-2">
      {selectedCategory && (
        <button
          type="button"
          onClick={handleResetButton}
          className="order-first self-start px-2 py-1 rounded-lg bg-lime-400
            border border-neutral-300"
        >
          <X />
        </button>
      )}
      {categories.map((category) => (category === selectedCategory
        ? <CategoryItem key={category} category={category} isOption isSelected />
        : <CategoryItem key={category} category={category} isOption />
      ))}
    </form>
  );
}

CategoriesFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired),
};

CategoriesFilter.defaultProps = {
  categories: [],
};

export default CategoriesFilter;
