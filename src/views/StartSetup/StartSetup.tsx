import React from 'react';
import Spinner from '../../components/Spinner';
import { useCheckConnectionQuery } from '../../services/api';

const StartSetup = () => {
  const { data, error, isLoading } = useCheckConnectionQuery();

  return (
    <div className="min-h-screen flex flex-col space-y-12 justify-center items-center bg-slate-800">
      <img src="./utatteLogo.svg" className="logo" alt="Utatte logo" />
      {isLoading && (
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-3xl font-bold text-blue-100">Łączenie z serwerem...</h1>
          <Spinner />
        </div>
      )}
      {error && (
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1 className="text-3xl font-bold text-blue-100">Błąd połączenia</h1>
        </div>
      )}
    </div>
  );
};

export default StartSetup;
