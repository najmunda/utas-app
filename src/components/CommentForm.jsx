import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { asyncCreateComment } from '../states/threadDetail/action';
import TextArea from './TextArea';
import TextButton from './TextButton';

function CommentForm({ isCommentFormFocus = false, threadId }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  function handleContentInput(e) {
    setContent(e.currentTarget.value);
  }

  function handleFormSubmit(e) {
    dispatch(asyncCreateComment(threadId, content));
    setContent('');
    e.preventDefault();
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-4 flex flex-col gap-2
        bg-white border border-neutral-300 rounded-lg hover:shadow-lg"
    >
      <TextArea
        name="body"
        id="body"
        onChange={handleContentInput}
        autoFocus={isCommentFormFocus}
        value={content}
        placeholder="Komentari utas..."
      />
      <TextButton
        type="submit"
      >
        Pos Komentar
      </TextButton>
    </form>
  );
}

CommentForm.propTypes = {
  isCommentFormFocus: PropTypes.bool,
  threadId: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  isCommentFormFocus: false,
};

export default CommentForm;
