import React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <>
      <div className="sticky top-0">
        <LoadingBar />
      </div>
      <main className="container flex-1 flex justify-center items-center">
        <div
          className="w-80 p-4 flex flex-col justify-center gap-2
            bg-white border border-neutral-300 rounded-lg"
        >
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default AuthLayout;
