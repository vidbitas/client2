// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// export const socket = io.connect('http://localhost:5001');

// const store = configureStore({
// // const [users, setUsers] = useState(null);

// const loginClick = (userName, pass) => {
//   socket.emit('ping', userName, pass);
//   socket.on('ping', (value) => {
//     setUsers(value);
//   });
// };

// const providerValue = {
//   socket: socket,
//   users: users,
//   setUsers: setUsers,
//   loginClick: loginClick,
// };

// useEffect(() => {
//   socket.emit('start');
//   socket.on('start', (value) => {
//     setUsers(value);
//     // providerValue.users.push(value);
//   });
// }, []);

// })

// export loginClick = store.loginClick
// export default store
