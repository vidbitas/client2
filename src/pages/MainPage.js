import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

const MainPage = () => {
  const { providerValue } = useContext(MainContext);

  console.log(providerValue);

  if (!providerValue.users || !providerValue.user.active) return;

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        Main page
        <div>
          <div>{providerValue.users.map((e) => e.userName)}</div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

// import React, { useContext } from 'react';
// import { MainContext } from '../context/MainContext';

// const MainPage = () => {
//   const { providerValue } = useContext(MainContext);
//   if (!providerValue.users) return;

//   providerValue.socket.on('ping', (value) => {
//     providerValue.setUsers(value);
//   });

//   return (
//     <div>
//       <div>{providerValue?.users.map((e) => e.userName)}</div>
//     </div>
//   );
// };

// export default MainPage;
