import React, { useState } from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { asyncSetAuthedUser } from '../states/authedUser/action';
import InputText from '../components/InputText';
import TextButton from '../components/TextButton';

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailInput(e) {
    setEmail(e.currentTarget.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.currentTarget.value);
  }

  function handleFormSubmit(e) {
    dispatch(asyncSetAuthedUser({ email, password }));
    e.preventDefault();
  }

  return (
    <>
      <div className="size-16 bg-lime-400 rounded-lg" />
      <h1 className="text-5xl font-bold">Ribuan Utas, Satu Tempat.</h1>
      <br />
      {/* Branch changes here */}
      <p>Masuk dan mulai berdiskusi.</p>
      <br />
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <InputText
          type="email"
          value={email}
          onChange={handleEmailInput}
          placeholder="Surel..."
          name="email"
          id="email"
        />
        <InputText
          type="password"
          value={password}
          onChange={handlePasswordInput}
          placeholder="Sandi..."
          name="password"
          id="password"
          className="p-2 border border-neutral-300 rounded-lg"
        />
        <TextButton
          type="submit"
        >
          Masuk
        </TextButton>
      </form>
      <br />
      <p className="text-xs">
        Belum mempunyai akun? &nbsp;
        <Link to="/register" className="underline font-semibold">Buat baru!</Link>
      </p>
    </>
  );
}

export default Login;
