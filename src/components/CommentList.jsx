import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

function CommentList({
  threadId, isCommentFormFocus = false, comments, columnCount,
}) {
  const renderedComments = comments
    .toSpliced(0, 0, {})
    .reduce((array, comment, commentIndex) => {
      const columnIndex = commentIndex < columnCount ? commentIndex : commentIndex % columnCount;
      return array.map((column, index) => (index === columnIndex ? [...column, comment] : column));
    }, (new Array(columnCount)).fill([]));

  const columnClassName = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
  }[columnCount] ?? 'grid-cols-1';

  return (
    <div className={`grid ${columnClassName} gap-2`}>
      {renderedComments.map((column, columnIndex) => (
        <div
          key={`${columnCount}${columnIndex}`}
          className="flex-1 flex flex-col gap-2 items-stretch"
        >
          {column.map((comment, commentIndex) => (columnIndex === 0 && commentIndex === 0 ? (
            <CommentForm
              key={threadId}
              isCommentFormFocus={isCommentFormFocus}
              threadId={threadId}
            />
          ) : (<CommentItem key={comment.id} data={comment} threadId={threadId} />)))}
        </div>
      ))}
    </div>
  );
}

CommentList.propTypes = {
  threadId: PropTypes.string.isRequired,
  isCommentFormFocus: PropTypes.bool,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
  columnCount: PropTypes.number.isRequired,
};

CommentList.defaultProps = {
  isCommentFormFocus: false,
};

export default CommentList;
