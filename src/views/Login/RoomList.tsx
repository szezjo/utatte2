import React from 'react';
import { useTranslation } from 'react-i18next';
import { TScreen } from './Login';
import { Room } from '../../types';
import { useAppDispatch } from '../../hooks';
import { setRoomId } from '../../features/login';

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
            <button
              type="button"
              className="focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 focus:ring-blue-800"
              onClick={() => setScreen('createRoom')}
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
              {t('rooms.createRoom')}
            </button>
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
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default RoomList;
