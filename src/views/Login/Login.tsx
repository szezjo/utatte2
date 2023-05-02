import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoomList from './RoomList';
import RoomCreate from './RoomCreate';
import { useGetRoomsQuery, useGetUsersQuery } from '../../services/api';
import UserList from './UserList';
import UserCreate from './UserCreate';
import { useAppDispatch } from '../../hooks';
import { resetLoginData } from '../../features/login';
import Logo from '../../components/Logo';

export type TScreen = 'selectRoom' | 'createRoom' | 'selectUser' | 'createUser';

const Login = () => {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] = useState<TScreen>('selectRoom');
  const {
    data: roomData,
    isError: roomIsError,
    isSuccess: roomIsSuccess,
    isLoading: roomIsLoading,
    refetch: roomRefetch,
  } = useGetRoomsQuery();
  const {
    data: userData,
    isError: userIsError,
    isSuccess: userIsSuccess,
    isLoading: userIsLoading,
    refetch: userRefetch,
  } = useGetUsersQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetLoginData());
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:justify-center items-center md:bg-login-bg md:bg-cover">
      <div className="flex-none h-32 flex flex-col justify-center items-center">
        <Logo className="scale-75" />
        <h1 className="text-2xl text-white font-bold">{t(`rooms.${currentScreen}`)}</h1>
      </div>
      {currentScreen === 'selectRoom' && (
        <RoomList
          setScreen={setCurrentScreen}
          data={roomData}
          isError={roomIsError}
          isSuccess={roomIsSuccess}
          isLoading={roomIsLoading}
        />
      )}
      {currentScreen === 'createRoom' && <RoomCreate setScreen={setCurrentScreen} refetchRooms={roomRefetch} />}
      {currentScreen === 'selectUser' && (
        <UserList
          setScreen={setCurrentScreen}
          data={userData}
          isError={userIsError}
          isSuccess={userIsSuccess}
          isLoading={userIsLoading}
        />
      )}
      {currentScreen === 'createUser' && <UserCreate setScreen={setCurrentScreen} refetchUsers={userRefetch} />}
    </div>
  );
};

export default Login;
