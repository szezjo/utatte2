import React, { useState } from 'react';
import { TScreen } from './Login';
import { useTranslation } from 'react-i18next';
import { useCreateRoomMutation } from '../../services/api';

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
          <button
            type="button"
            className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
            onClick={() => setScreen('selectRoom')}
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
                d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
              />
            </svg>
            {t('rooms.goBackToRooms')}
          </button>
          <button
            type="button"
            className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
            onClick={() => {
              setRoomName('');
              createNewRoom();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 -ml-1"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {t('rooms.createRoom')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCreate;
