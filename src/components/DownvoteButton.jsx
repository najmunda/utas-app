import React from 'react';
import { ThumbsDown } from 'lucide-react';
import PropTypes from 'prop-types';

function DownvoteButton({ handleClick, count, isVoted = false }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="group p-1 flex items-center gap-2 cursor-pointer"
    >
      <ThumbsDown
        size={20}
        className={`${isVoted ? 'stroke-red-500 stroke-3' : 'stroke-2'} rounded-md 
          group-hover:bg-red-300 group-hover:outline-8 group-hover:outline-red-300`}
      />
      <p>{count}</p>
    </button>
  );
}

DownvoteButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  isVoted: PropTypes.bool,
};

DownvoteButton.defaultProps = {
  isVoted: false,
};

export default DownvoteButton;
