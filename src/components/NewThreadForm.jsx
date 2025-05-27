import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncCreateThread } from '../states/threads/action';
import TextArea from './TextArea';
import InputText from './InputText';
import TextButton from './TextButton';

function NewThreadForm({ categories = [] }) {
  const dispatch = useDispatch();
  const [inputtedTitle, setInputtedTitle] = useState('');
  const [inputtedCategory, setInputtedCategory] = useState('');
  const [inputtedBody, setInputtedBody] = useState('');

  function handleTitleInput(e) {
    setInputtedTitle(e.currentTarget.value);
  }

  function handleCategoryInput(e) {
    setInputtedCategory(e.currentTarget.value);
  }

  function handleBodyInput(e) {
    setInputtedBody(e.currentTarget.value);
  }

  function handleFormSubmit(e) {
    if (inputtedCategory) {
      dispatch(asyncCreateThread({
        title: inputtedTitle,
        body: inputtedBody,
        category: inputtedCategory,
      }));
    } else {
      dispatch(asyncCreateThread({ title: inputtedTitle, body: inputtedBody }));
    }
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-4 flex flex-col gap-2
        bg-white border border-neutral-300 rounded-lg hover:shadow-lg"
    >
      <div className="flex gap-2">
        <InputText
          type="text"
          name="title"
          id="title"
          value={inputtedTitle}
          onChange={handleTitleInput}
          placeholder="Ketik judul utas..."
          className="flex-1"
        />
        <InputText
          type="text"
          name="category"
          id="category"
          value={inputtedCategory}
          onChange={handleCategoryInput}
          list="categories"
          placeholder="Kategori..."
        />
        <datalist id="categories">
          {categories.map((category) => <option key={category}>{category}</option>)}
        </datalist>
      </div>
      <TextArea
        name="body"
        id="body"
        onChange={handleBodyInput}
        value={inputtedBody}
        placeholder="Apa yang ingin kamu bahas?"
      />
      <TextButton
        type="submit"
      >
        Buat Utas
      </TextButton>
    </form>
  );
}

NewThreadForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string.isRequired),
};

NewThreadForm.defaultProps = {
  categories: [],
};

export default NewThreadForm;
