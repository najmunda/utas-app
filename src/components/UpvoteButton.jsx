import React from 'react';
import { ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';

function UpvoteButton({ handleClick, count, isVoted = false }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="group p-1 flex items-center gap-2 cursor-pointer"
    >
      <ThumbsUp
        size={20}
        className={`${isVoted ? 'stroke-green-500 stroke-3' : 'stroke-2'} rounded-md 
          group-hover:bg-green-300 group-hover:outline-8 group-hover:outline-green-300`}
      />
      <p>{count}</p>
    </button>
  );
}

UpvoteButton.propTypes = {
  /** Function that triggered on vote click, assign on onClick */
  handleClick: PropTypes.func.isRequired,
  /** Count of the up vote */
  count: PropTypes.number.isRequired,
  /** Boolean indicate either authed user is up voted or not */
  isVoted: PropTypes.bool,
};

UpvoteButton.defaultProps = {
  isVoted: false,
};

export default UpvoteButton;
