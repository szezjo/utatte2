import React from 'react';
import { TScreen } from './Login';
import { User } from '../../types';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks';
import { setLoginState, setMultiUserDeviceState, setUser } from '../../features/login';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import AddIcon from '../../icons/AddIcon';
import MultiUserIcon from '../../icons/MultiUserIcon';

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

  const handleSelectUser = (userId: number, userName: string) => {
    dispatch(setUser({ id: userId, name: userName }));
    dispatch(setLoginState(true));
    return navigate('/songs/');
  };

  const handleMultiUser = () => {
    dispatch(setMultiUserDeviceState(true));
    dispatch(setLoginState(true));
    return navigate('/songs/');
  };

  return (
    <div className="flex flex-1 mb-32 w-full justify-center md:items-center">
      {isSuccess && (
        <div className="flex flex-col flex-wrap md:justify-center items-center w-full max-w-2xl p-6 rounded-lg shadow md:border md:bg-gray-800 md:border-gray-700 md:rounded-lg md:shadow">
          <div className="max-h-96 overflow-y-auto flex flex-row flex-wrap justify-center">
            {data!.map((e) => (
              <div
                className="flex flex-col p-6 hover:bg-slate-600 rounded-lg"
                key={e.id}
                onClick={() => handleSelectUser(e.id, e.name)}
              >
                <img className="rounded-lg w-24" src={`${address}/getUsersProfilePicture/${e.id}`} />
                <h5 className="text-xl text-center text-blue-100">{e.name}</h5>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-4">
            <Button onClick={() => setScreen('createUser')} icon={<AddIcon />}>{t('rooms.createUser')}</Button>
            <Button onClick={() => handleMultiUser()} icon={<MultiUserIcon />}>{t('rooms.multiUserDevice')}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
