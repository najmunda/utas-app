import React from 'react';
import { Link, useOutletContext } from 'react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  asyncDownvoteThread,
  asyncUnvoteThread,
  asyncUpvoteThread,
} from '../states/threads/action';
import CategoryItem from './CategoryItem';
import CommentButton from './CommentButton';
import UpvoteButton from './UpvoteButton';
import DownvoteButton from './DownvoteButton';

function ThreadItem({ data }) {
  const dispatch = useDispatch();
  const { authedUser } = useOutletContext();
  const {
    id, title, body, category, totalComments, owner, upVotesBy, downVotesBy,
  } = data;
  const createdAt = new Date(data.createdAt);

  function handleUpVoteButton() {
    if (upVotesBy.includes(authedUser.id)) {
      dispatch(asyncUnvoteThread(id));
    } else {
      dispatch(asyncUpvoteThread(id));
    }
  }

  function handleDownVoteButton() {
    if (downVotesBy.includes(authedUser.id)) {
      dispatch(asyncUnvoteThread(id));
    } else {
      dispatch(asyncDownvoteThread(id));
    }
  }

  return (
    <div
      className="p-4 flex flex-col items-stretch gap-2 bg-white
        border border-neutral-300 rounded-lg hover:shadow-lg"
    >
      <Link
        to={`/${id}`}
        className="text-2xl break-normal font-bold hover:underline hover:text-lime-400"
      >
        {title}
        <span className="ml-2 font-light text-sm text-black">
          {`${createdAt.getDay()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`}
        </span>
      </Link>
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <img src={owner.avatar} alt="" className="size-8 rounded-full" />
          <p className="font-medium truncate">{owner.name}</p>
        </div>
      </div>
      <p className="break-normal line-clamp-4">{body.replaceAll(/<\/?[a-z]+>/ig, '')}</p>
      <CategoryItem category={category} />
      <div className="flex-1 flex gap-2 items-center justify-end">
        <CommentButton to={`/${id}?comment=true`} count={totalComments} />
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

ThreadItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    totalComments: PropTypes.number.isRequired,
  }).isRequired,
};

export default ThreadItem;
