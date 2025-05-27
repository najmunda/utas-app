import React from 'react';
import { House, LogOut, Medal } from 'lucide-react';
import { NavLink } from 'react-router';
import PropTypes from 'prop-types';

function Navigation({ handleLogout }) {
  return (
    <nav
      className="flex flex-col gap-2 items-stretch font-medium text-2xl p-4
        bg-white border border-neutral-300 rounded-lg"
    >
      <div className="size-16 bg-lime-400 rounded-lg" />
      <br />
      <NavLink to="/" className="flex items-center gap-2">
        <House />
        Beranda
      </NavLink>
      <br />
      <NavLink to="/leaderboard" className="flex items-center gap-2">
        <Medal />
        Peringkat
      </NavLink>
      <br />
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 cursor-pointer"
      >
        <LogOut />
        {' '}
        Keluar
      </button>
    </nav>
  );
}

Navigation.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default Navigation;
