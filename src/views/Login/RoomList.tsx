import React from 'react';
import { useTranslation } from 'react-i18next';
import { TScreen } from './Login';
import { Room } from '../../types';
import { useAppDispatch } from '../../hooks';
import { setRoomId } from '../../features/login';
import Button from '../../components/Button';
import AddIcon from '../../icons/AddIcon';
import Spinner from '../../components/Spinner';

type RoomListProps = {
  setScreen: (screen: TScreen) => void;
  data: Room[] | undefined;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
};

const RoomList = ({ setScreen, data, isSuccess, isError, isLoading }: RoomListProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleSelectRoom = (roomId: number) => {
    dispatch(setRoomId(roomId));
    setScreen('selectUser');
  };

  return (
    <div className="flex flex-1 mb-32 w-full justify-center md:items-center">
      {isSuccess && (
        <div className="block w-full max-w-screen md:max-w-3xl p-6 md:border md:bg-gray-800 md:border-gray-700 md:rounded-lg md:shadow">
          <div className="md:max-h-96 md:overflow-y-auto">
            {data!.map((e) => (
              <div
                className="w-full my-4 py-2 px-4 rounded-lg bg-slate-700 md:bg-transparent md:flex-row md:justify-between hover:bg-gray-700"
                onClick={() => handleSelectRoom(e.id)}
                key={e.id}
              >
                <h5 className="text-white text-lg">{e.name}</h5>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-4">
            <Button onClick={() => setScreen('createRoom')} icon={<AddIcon />}>{t('rooms.createRoom')}</Button>
          </div>
        </div>
      )}
      {isError && (
        <div className="text-white text-xl font-bold md:bg-gray-800 md:p-12 md:rounded-lg">
          {t('rooms.roomListFetchError')}
        </div>
      )}
      {isLoading && (
        <div role="status" className="md:bg-gray-800 md:p-12 md:pr-10 md:rounded-lg">
          <Spinner />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default RoomList;
