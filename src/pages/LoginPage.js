import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MainContext } from '../context/MainContext';

const LoginPage = () => {
  const { providerValue } = useContext(MainContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { status } = useSelector((state) => state.auth);

  const isAuth = providerValue.user.active;

  useEffect(() => {
    if (isAuth) toast('Registered');
    if (isAuth) navigate('/');
  }, [isAuth, navigate]);

  if (!providerValue.users) return;

  const handleSubmit = () => {
    // try {
    //   dispatch(loginUser({ username, password }));
    // } catch (error) {
    //   console.log(error);
    // }
    providerValue.loginClick(username, password);
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className='w-1/4 h-60 mx-auto mt-40'
    >
      <h1 className='text-lg text-white text-center'>Authorization</h1>
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
          Sign
        </button>
        <Link
          to='/register'
          className='flex justify-center items-center text-xs text-white'
        >
          No account ?
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
