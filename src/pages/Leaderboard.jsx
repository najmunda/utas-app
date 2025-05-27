import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardList from '../components/LeaderboardList';

function Leaderboard() {
  const leaderboards = useSelector((state) => state.leaderboards) ?? [];
  const dispatch = useDispatch();
  const { columnCount } = useOutletContext();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <main
      className={`flex-1 grid grid-cols-${columnCount > 2 ? 2 : columnCount}
        gap-2 overflow-y-auto`}
    >
      <LeaderboardList leaderboards={leaderboards} />
    </main>
  );
}

export default Leaderboard;
