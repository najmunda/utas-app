import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter, Navigate, Routes, Route,
} from 'react-router';
import AuthLayout from './pages/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import ThreadDetail from './pages/ThreadDetail';
import Leaderboard from './pages/Leaderboard';
import { asyncPreload } from './states/isPreload/action';

function App() {
  const authedUser = useSelector((state) => state.authedUser) ?? null;
  const isPreload = useSelector((state) => state.isPreload) ?? true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreload());
  }, [dispatch]);

  return isPreload ? null : (
    <BrowserRouter>
      <Routes>
        {!authedUser ? (
          <Route element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/:id" element={<ThreadDetail />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
