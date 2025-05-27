import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import LoadingBar from 'react-redux-loading-bar';
import Navigation from '../components/Navigation';
import { asyncUnsetAuthedUser } from '../states/authedUser/action';

function MainLayout() {
  const authedUser = useSelector((state) => state.authedUser) ?? null;
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(asyncUnsetAuthedUser());
  }

  // Masonry

  const [, setWindowWidth] = useState(window.innerWidth);
  const root = document.querySelector(':root');
  const style = window.getComputedStyle(root);
  const columnCount = Number.parseInt(style.getPropertyValue('--column'), 10);

  function resizeWindowHandler() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', resizeWindowHandler);
    return () => {
      window.removeEventListener('resize', resizeWindowHandler);
    };
  }, []);

  return (
    <>
      <div className="sticky top-0">
        <LoadingBar />
      </div>
      <div className="container self-center pb-2 flex-1 flex gap-2 overflow-y-scroll">
        <header className="w-50 flex flex-col justify-center gap-2">
          <Navigation handleLogout={handleLogout} authedUser={authedUser} />
          <div
            className="flex gap-2 items-center p-4 bg-white border border-neutral-300 rounded-lg"
          >
            <img src={authedUser?.avatar || ''} className="size-8 rounded-full" alt="" />
            <div className="flex-1 flex flex-col overflow-x-hidden">
              <p className="text-sm font-light">{authedUser?.name || ''}</p>
              <p className="text-xs font-light truncate">{authedUser?.email || ''}</p>
            </div>
          </div>
        </header>
        <Outlet context={{ authedUser, columnCount }} />
      </div>
    </>
  );
}

export default MainLayout;
