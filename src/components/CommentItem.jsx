import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useOutletContext } from 'react-router';
import {
  asyncDownvoteComment,
  asyncUnvoteComment,
  asyncUpvoteComment,
} from '../states/threadDetail/action';
import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';

function CommentItem({ data, threadId }) {
  const dispatch = useDispatch();
  const { authedUser } = useOutletContext();
  const {
    id, content, upVotesBy, downVotesBy, owner,
  } = data;
  const createdAt = new Date(data.createdAt);

  function handleUpVoteButton() {
    if (upVotesBy.includes(authedUser.id)) {
      dispatch(asyncUnvoteComment(threadId, id));
    } else {
      dispatch(asyncUpvoteComment(threadId, id));
    }
  }

  function handleDownVoteButton() {
    if (downVotesBy.includes(authedUser.id)) {
      dispatch(asyncUnvoteComment(threadId, id));
    } else {
      dispatch(asyncDownvoteComment(threadId, id));
    }
  }

  return (
    <div
      className="p-4 flex flex-col gap-2 bg-white
        border border-neutral-300 rounded-lg hover:shadow-lg"
    >
      <div className="flex gap-2 items-center">
        <img src={owner.avatar} alt="" className="size-8 rounded-full" />
        <p className="font-bold truncate">{owner.name}</p>
        <p className="ml-2 font-light text-sm">
          {`${createdAt.getDay()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`}
        </p>
      </div>
      <p className="break-normal">{parse(content)}</p>
      <div className="flex gap-2 justify-end items-center">
        <UpvoteButton
          handleClick={handleUpVoteButton}
          count={upVotesBy.length}
          isVoted={upVotesBy.includes(authedUser.id)}
        />
        <DownvoteButton
          handleClick={handleDownVoteButton}
          count={downVotesBy.length}
          isVoted={downVotesBy.includes(authedUser.id)}
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  data: PropTypes.shape({
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
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
