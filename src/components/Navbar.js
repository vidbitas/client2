import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { toast } from 'react-toastify';

export const Navbar = () => {
  const { providerValue } = useContext(MainContext);
  const navigate = useNavigate();

  // const [loginUserName, setLoginUserName] = useState(true);
  // const [isAuth, setIsAuth] = useState(true);

  if (!providerValue.users) return;

  const loginUserName = providerValue.user.name;
  const isAuth = providerValue.user.active;

  const activeStyles = {
    color: 'white',
  };

  const logoutHandler = async () => {
    // window.localStorage.removeItem(loginUserName._id);
    // window.localStorage.removeItem('user');
    toast('You are logged out');
    sessionStorage.removeItem('user');
    const outUser = { active: false, name: null };
    providerValue.setUser(outUser);
    // const newArr = providerValue.users.filter(
    //   (x) => x.userName !== loginUserName
    // );

    // console.log('logoutHandler === ', providerValue, newArr);

    // providerValue.setUsers(newArr);
    // providerValue.socket.on('out', loginUserName);
    await providerValue.socket.on('out', (value) => {
      providerValue.setUsers(value);
      console.log('Navbar value === ', value);
    });
    providerValue.socket.emit('out', loginUserName);
    navigate('/');
  };

  return (
    <div className='flex py-4 justify-between items-center px-4'>
      <span className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        VidBitas
      </span>

      <ul className='flex gap-8'>
        <li>
          <NavLink
            to={'/'}
            href='/'
            className='text-xs text-gray-400 hover:text-white'
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Home
          </NavLink>
        </li>
        {isAuth && (
          <div className='flex gap-8'>
            <li>
              <NavLink
                to={'/posts'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                My posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/new'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Add post
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/'}
                href='/'
                className='text-xs text-gray-400 hover:text-white'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Auction
              </NavLink>
            </li>
          </div>
        )}
      </ul>

      <div>
        <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-20 py-2'>
          {isAuth ? (
            <button onClick={logoutHandler}>Sign Out</button>
          ) : (
            <Link to={'/login'}> Sign In </Link>
          )}
        </div>
        {loginUserName && (
          <div className='text-xs text-white '>
            <p>Connecting: {loginUserName}</p>
          </div>
        )}
      </div>
    </div>
  );
};
