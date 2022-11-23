import React, { useContext } from 'react';
import { MainContext } from '../context/MainContext';

const ItemPage = () => {
  const { providerValue } = useContext(MainContext);

  console.log(providerValue);

  if (!providerValue.users) return;

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        Item page
        <div>
          <div>{providerValue.users.map((e) => e.userName)}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
