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
  const [loged, setLoged] = useState(false);
  const [user, setUser] = useState({
    active: false,
    name: null,
  });

  const loginClick = async (userName, pass) => {
    await socket.emit('ping', userName, pass);
    await socket.on('ping', (value) => {
      if (!value.active) {
        console.log('value.active  1 === ', value);
        setUser(value);
      } else {
        setUsers(value);
      }
      console.log('value === ', value);
      // if (!value.active) setLoged(true);
      // if (value.loged) setLoged(true);
      // });
      // console.log('loged ===', loged);
      console.log('value.active  1 === ', value);
      if (!value.active) {
        console.log('neprisijunges');
        const newUser = { active: true, name: userName };
        setUser(newUser);
        setUsers([...users, newUser]);
        sessionStorage.setItem('user', userName);
        // window.localStorage.setItem('user', userName);
      } else {
        toast('This user is loged');
        console.log('jau prisijunges');
      }
      console.log('loginClick providerValue ===', providerValue);
    });
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
