import React, { useState, useContext } from 'react';
import { MainContext } from '../context/MainContext';

const Login = () => {
  const { providerValue } = useContext(MainContext);
  const [user, setUser] = useState('');
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  if (!providerValue.users) return;

  providerValue.socket.on('ping', (value) => {
    providerValue.setUsers(value);
  });

  const loginClick = () => {
    providerValue.loginClick(user, pass1);
    if (pass1 !== pass2) return alert('Slaptazodziai nevienodi');
  };

  return (
    <div className='d-flex f-column w50 a-center'>
      <div className='d-flex f-column j-center'>
        <input
          onChange={(e) => setUser(e.target.value)}
          value={user}
          type='text'
          placeholder='User'
          className=''
        />
        <input
          onChange={(e) => setPass1(e.target.value)}
          value={pass1}
          type='password'
          placeholder='Slaptazodis 1'
        />
        <input
          onChange={(e) => setPass2(e.target.value)}
          value={pass2}
          type='password'
          placeholder='Slaptazodis 2'
        />
      </div>
      <div>
        <button onClick={loginClick}>LOGIN</button>
      </div>
      <div>
        <div>{providerValue.users.map((e) => e.userName)}</div>
      </div>
    </div>
  );
};

export default Login;
