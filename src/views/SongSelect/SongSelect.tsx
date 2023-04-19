import React, { useEffect, useRef, useState } from 'react';
import { useGetQueueEntriesQuery, useGetSongsQuery } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetLoginData } from '../../features/login';
import { useTranslation } from 'react-i18next';

const SongSelect = () => {
  const address = import.meta.env.VITE_SERVER_ADDRESS;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { roomId, userId, userName } = useAppSelector((state) => state.login);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const {
    data: songs,
    isSuccess: songsIsSuccess,
    isError: songsIsError,
    isLoading: songsIsLoading,
  } = useGetSongsQuery();
  const {
    data: queueEntries,
    isSuccess: queueIsSuccess,
    isError: queueIsError,
    isLoading: queueIsLoading,
  } = useGetQueueEntriesQuery(roomId);

  useEffect(() => {
    if (songsIsSuccess && queueIsSuccess) {
      console.log(songs);
      console.log(queueEntries);
    }
  }, [songsIsSuccess, queueIsSuccess]);

  const handleLogout = () => {
    dispatch(resetLoginData());
  };

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef(null);
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (!e.target) return;
        const target = e.target as HTMLImageElement;
        if (target.contains(ref.current) && e.target !== ref.current) callback();
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);

    return ref;
  };

  const ref = useOutsideClick(() => setIsProfileDropdownVisible(false));

  return (
    <>
      <nav>
        <div className="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex flex-row space-x-2">
            <div className="relative">
              <img
                ref={ref}
                className={`w-10 h-10 ring ${
                  isProfileDropdownVisible ? 'ring-gray-400' : 'ring-transparent'
                } hover:ring-gray-100 rounded transition-shadow`}
                src={`${address}/getUsersProfilePicture/${userId}`}
                onClick={() => setIsProfileDropdownVisible(!isProfileDropdownVisible)}
              />
              <div
                className={`${
                  isProfileDropdownVisible ? 'opacity-100 visible' : 'opacity-0 collapse'
                } transition-all duration-75 z-[1000] absolute float-left mt-2 -ml-1 min-w-max list-none overflow-hidden divide-y divide-gray-600 rounded shadow w-44 bg-gray-700`}
              >
                <ul className="py-2 text-sm text-gray-200" aria-labelledby="profileDropdownBtn">
                  <li>
                    <p className="block px-4 py-2 font-bold">{userName}</p>
                  </li>
                  <li>
                    <a onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                      {t('menu.switchUser')}
                    </a>
                  </li>
                </ul>
                <ul className="py-2 text-sm text-gray-200" aria-labelledby="profileDropdownBtn">
                  <li>
                    <a onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                      {t('menu.settings')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div><img src="/utatteLogo.svg" className="w-24 hidden lg:block" alt="Utatte logo" /></div>
        </div>
      </nav>
    </>
  );
};

export default SongSelect;
