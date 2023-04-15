import React from 'react';
import { TScreen } from './Login';
import { User } from '../../types';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks';
import { setLoginState, setMultiUserDeviceState, setUserId } from '../../features/login';
import { useNavigate } from 'react-router-dom';

type UserListProps = {
  setScreen: (screen: TScreen) => void;
  data: User[] | undefined;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
};

const UserList = ({ setScreen, data, isSuccess, isError, isLoading }: UserListProps) => {
  const address = import.meta.env.VITE_SERVER_ADDRESS;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSelectUser = (userId: number) => {
    dispatch(setUserId(userId));
    dispatch(setLoginState(true));
    return navigate('/songs/');
  }

  const handleMultiUser = () => {
    dispatch(setMultiUserDeviceState(true));
    dispatch(setLoginState(true));
    return navigate('/songs/');
  }

  return (
    <div className="flex flex-1 mb-32 w-full justify-center md:items-center">
      {isSuccess && (
        <div className="flex flex-col flex-wrap md:justify-center items-center w-full max-w-2xl p-6 rounded-lg shadow md:border md:bg-gray-800 md:border-gray-700 md:rounded-lg md:shadow">
          <div className="max-h-96 overflow-y-auto flex flex-row flex-wrap justify-center">
            {data!.map((e) => (
              <div className="flex flex-col p-6 hover:bg-slate-600 rounded-lg" key={e.id} onClick={() => handleSelectUser(e.id)}>
                <img className="rounded-lg w-24" src={`${address}/getUsersProfilePicture/${e.id}`} />
                <h5 className="text-xl text-center text-blue-100">{e.name}</h5>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-4">
            <button
              type="button"
              className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
              onClick={() => setScreen('createUser')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2 -ml-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              {t('rooms.createUser')}
            </button>
            <button
              type="button"
              className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
              onClick={() => handleMultiUser()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-2 -ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
              </svg>
              {t('rooms.multiUserDevice')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
