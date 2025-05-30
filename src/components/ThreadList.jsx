import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadList({ users, threads, columnCount }) {
  const validColumnCount = columnCount > 0 && columnCount <= 3 ? columnCount : 1;
  const renderedThreads = threads
    .map((thread) => {
      const owner = users.find((user) => user.id === thread.ownerId);
      return {
        ...thread,
        owner,
      };
    }).reduce((array, thread, threadIndex) => {
      const columnIndex = threadIndex < validColumnCount ? threadIndex : threadIndex % validColumnCount;
      return array.map((column, index) => (index === columnIndex ? [...column, thread] : column));
    }, (new Array(validColumnCount)).fill([]));

  const columnClassName = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
  }[validColumnCount] ?? 'grid-cols-1';

  return (
    <div aria-label="thread-list" className={`grid ${columnClassName} gap-2`}>
      {renderedThreads.map((column, index) => (
        <div
          key={`${validColumnCount}${index}`}
          className="flex-1 flex flex-col gap-2 items-stretch"
        >
          {column.map((thread) => (
            <ThreadItem key={thread.id} data={thread} />
          ))}
        </div>
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  })).isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    totalComments: PropTypes.number.isRequired,
  })).isRequired,
  columnCount: PropTypes.number.isRequired,
};

export default ThreadList;
