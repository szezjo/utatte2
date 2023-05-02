import React, { useState } from 'react';
import { TScreen } from './Login';
import { useTranslation } from 'react-i18next';
import { useCreateRoomMutation } from '../../services/api';
import Button from '../../components/Button';
import BackIcon from '../../icons/BackIcon';
import ApplyIcon from '../../icons/ApplyIcon';

type RoomCreateProps = {
  setScreen: (screen: TScreen) => void;
  refetchRooms: () => void;
};

const RoomCreate = ({ setScreen, refetchRooms }: RoomCreateProps) => {
  const { t } = useTranslation();
  const [roomName, setRoomName] = useState('');
  const [sendRoomData, { isLoading }] = useCreateRoomMutation();

  const createNewRoom = async () => {
    if (!!roomName.length) {
      await sendRoomData(roomName);
      refetchRooms();
      setScreen('selectRoom');
    }
  };

  return (
    <div className="flex flex-1 mb-32 w-full justify-center md:items-center">
      <div className="block w-full max-w-screen md:max-w-3xl p-6 md:border md:bg-gray-800 md:border-gray-700 md:rounded-lg md:shadow">
        <div>
          <label htmlFor="room_name" className="block mb-2 text-sm font-medium text-white">
            {t('rooms.roomName')}
          </label>
          <input
            type="text"
            id="room_name"
            className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            required
          ></input>
        </div>
        <div className="flex justify-center md:justify-between mt-6">
          <Button onClick={() => setScreen('selectRoom')} icon={<BackIcon />}>{t('rooms.goBackToRooms')}</Button>
          <Button onClick={() => {
            setRoomName('');
            createNewRoom();
          }} icon={<ApplyIcon />}>{t('rooms.createRoom')}</Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCreate;
