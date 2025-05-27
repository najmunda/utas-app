import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { asyncRegisterUser } from '../states/users/action';
import InputText from '../components/InputText';
import TextButton from '../components/TextButton';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNameInput(e) {
    setName(e.currentTarget.value);
  }

  function handleEmailInput(e) {
    setEmail(e.currentTarget.value);
  }

  function handlePasswordInput(e) {
    setPassword(e.currentTarget.value);
  }

  function handleFormSubmit(e) {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
    e.preventDefault();
  }

  return (
    <>
      <div className="size-16 bg-lime-400 rounded-lg" />
      <h1 className="text-5xl font-bold">Ribuan Utas, Satu Tempat.</h1>
      <br />
      <p>Buat akun baru, dan temukan ide.</p>
      <br />
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <InputText
          type="name"
          value={name}
          onChange={handleNameInput}
          placeholder="Nama..."
          name="name"
          id="name"
        />
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
        />
        <TextButton
          type="submit"
        >
          Daftar
        </TextButton>
      </form>
      <br />
      <p className="text-xs">
        Sudah mempunyai akun?&nbsp;
        <Link to="/" className="underline font-semibold">Masuk!</Link>
      </p>
    </>
  );
}

export default Register;
