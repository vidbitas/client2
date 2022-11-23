import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const { providerValue } = useContext(MainContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const isAuth = providerValue.user.active;

  useEffect(() => {
    if (isAuth) {
      toast('Conected');
    }
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  const handleSubmit = () => {
    // try {
    //   dispatch(registerUser({ username, password }));
    //   setPassword('');
    //   setUsername('');
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (!providerValue.users) return;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='w-1/4 h-60 mx-auto mt-40'
    >
      <h1 className='text-lg text-white text-center'>Registration</h1>
      <label className='text-xs text-gray-400'>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <label className='text-xs text-gray-400'>
        Password:
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>

      <div className='flex gap-8 justify-center mt-4'>
        <button
          type='submit'
          onClick={handleSubmit}
          className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
        >
          Confirm
        </button>
        <Link
          to='/login'
          className='flex justify-center items-center text-xs text-white'
        >
          Already registered?
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
