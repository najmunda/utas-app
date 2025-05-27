import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ leaderboard, rank }) {
  const { user, score } = leaderboard;
  return (
    <div
      className="p-4 flex justify-between items-center gap-4
        bg-white border border-neutral-300 rounded-lg"
    >
      <p>
        {rank}
        .
      </p>
      <img src={user.avatar} alt="" className="size-20 rounded-full border border-neutral-300" />
      <h2 className="text-3xl font-medium line-clamp-2 text-ellipsis">{user.name}</h2>
      <p className="flex-1 text-right text-2xl">{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  leaderboard: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default LeaderboardItem;
