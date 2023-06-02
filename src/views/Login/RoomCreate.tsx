import React, { useState } from 'react';
import { TScreen } from './Login';
import { useTranslation } from 'react-i18next';
import { useCreateRoomMutation } from '../../services/api';
import Button from '../../components/Button';
import BackIcon from '../../icons/BackIcon';
import ApplyIcon from '../../icons/ApplyIcon';
import TextInput from '../../components/TextInput';

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
        <TextInput id="room_name" label={t('rooms.roomName')} value={roomName} setValue={setRoomName} required />
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
