import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import io from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainContext } from './context/MainContext';
import MainPage from './pages/MainPage';
import ItemPage from './pages/ItemPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Navbar } from './components/Navbar';

const App = () => {
  const socket = io.connect('http://localhost:5000');
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState({
    active: false,
    name: null,
  });

  const loginClick = (userName, pass) => {
    const rez = providerValue.users.filter((x) => x.userName === userName);
    console.log('rez === ', rez);
    if (rez.length > 0) {
      toast('This user is logged');
      return;
    }

    socket.emit('ping', userName, pass);
    socket.on('ping', (value) => {
      console.log('value === ', value);
      if (!value.active) {
        const newUser = { active: true, name: userName };
        setUser(newUser);
        setUsers(value);
        // setUsers(...users, value);
        sessionStorage.setItem('user', userName);
      } else {
        // const newUser = { active: false, name: null };
        // setUser(newUser);
        // console.log('value.active  1 === ', value);
        // setUsers(value);
        // console.log('jau prisijunges');
      }
    });
    console.log(providerValue);
  };

  const providerValue = {
    socket: socket,
    users: users,
    setUsers: setUsers,
    user: user,
    setUser: setUser,
    loginClick: loginClick,
  };

  useEffect(() => {
    console.log('efecct === ', providerValue, sessionStorage.getItem('user'));

    // const userStorage = window.localStorage.getItem('user');
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      setUser({
        active: true,
        name: userSession,
      });
    }
    socket.emit('start');
    socket.on('start', (value) => {
      setUsers(value);
    });
  }, []);

  if (!providerValue.users) return;

  return (
    <MainContext.Provider value={{ providerValue }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='posts' element={<ItemPage />} />
          {/*<Route path=':id' element={<PostPage />} />
          <Route path=':id/edit' element={<EditPostPage />} />
          <Route path='new' element={<AddPostPage />} /> */}
          <Route path='register' element={<RegisterPage />} />
          <Route path='login' element={<LoginPage />} />
        </Routes>
        <ToastContainer position='bottom-center' />
      </BrowserRouter>
    </MainContext.Provider>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:5000');

// function App() {
//   const [data, setData] = useState([]);
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [lastPong, setLastPong] = useState(null);

//   useEffect(() => {
//     socket.on('connect', () => {
//       setIsConnected(true);
//     });

//     socket.on('disconnect', () => {
//       setIsConnected(false);
//     });

//     socket.on('pong', () => {
//       setLastPong(new Date().toISOString());
//     });

//     return () => {
//       socket.off('connect');
//       socket.off('disconnect');
//       socket.off('pong');
//     };
//   }, []);

//   const sendPing = () => {
//     socket.emit('ping');

//     socket.on('ping', (value) => {
//       setData(value);
//     });
//     console.log('users:', data);
//   };

//   return (
//     <div>
//       <p>Connected: {'' + isConnected}</p>
//       <p>Last pong: {lastPong || '-'}</p>
//       <button onClick={sendPing}>Send ping</button>
//       <div>{data.map((e) => e)}</div>
//     </div>
//   );
// }
