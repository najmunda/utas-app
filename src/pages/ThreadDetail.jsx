import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext, useParams, useSearchParams } from 'react-router';
import parse from 'html-react-parser';
import {
  asyncDownvoteThreadDetail,
  asyncReceiveThreadDetail,
  asyncUnvoteThreadDetail,
  asyncUpvoteThreadDetail,
} from '../states/threadDetail/action';
import CategoryItem from '../components/CategoryItem';
import CommentButton from '../components/CommentButton';
import UpvoteButton from '../components/UpvoteButton';
import DownvoteButton from '../components/DownvoteButton';
import CommentList from '../components/CommentList';

function ThreadDetail() {
  const { authedUser, columnCount } = useOutletContext();
  const threadDetail = useSelector((state) => state.threadDetail);
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    title = '',
    body = '',
    category = '',
    owner = {},
    upVotesBy = [],
    downVotesBy = [],
    comments = [],
  } = threadDetail;

  function handleUpVoteButton() {
    if (upVotesBy.includes(authedUser.id)) {
      dispatch(asyncUnvoteThreadDetail(id));
    } else {
      dispatch(asyncUpvoteThreadDetail(id));
    }
  }

  function handleDownVoteButton() {
    if (downVotesBy.includes(authedUser.id)) {
      dispatch(asyncUnvoteThreadDetail(id));
    } else {
      dispatch(asyncDownvoteThreadDetail(id));
    }
  }

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  // Handle comment button
  const [searchParams] = useSearchParams();
  const commentParam = searchParams.get('comment') ?? 'false';
  const isCommentFormFocus = commentParam === 'true';

  if (threadDetail?.id === id) {
    const createdAt = new Date(threadDetail.createdAt);
    return (
      <main className="pr-2 flex-1 flex flex-col gap-2 overflow-y-scroll">
        <div className="p-4 flex flex-col gap-4 bg-white border border-neutral-300 rounded-lg">
          <h1 className="text-5xl break-normal font-bold">
            {title}
          </h1>
          <br />
          <div className="flex gap-2 items-center">
            <img src={owner.avatar} alt="" className="size-7 rounded-full" />
            <p>{owner.name}</p>
            <p>pada</p>
            <p>{`${createdAt.getDay()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`}</p>
          </div>
          <CategoryItem category={category} />
          <p className="break-normal">{parse(body)}</p>
          <div className="flex gap-2 justify-end items-center text-sm">

            <br />
            <CommentButton count={comments.length} />
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
        <CommentList
          threadId={id}
          isCommentFormFocus={isCommentFormFocus}
          comments={comments}
          columnCount={columnCount}
        />
      </main>
    );
  }
  return null;
}

export default ThreadDetail;
