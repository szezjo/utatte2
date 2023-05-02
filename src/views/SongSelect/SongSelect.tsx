import React, { useEffect, useRef, useState } from 'react';
import { useGetQueueEntriesQuery } from '../../services/api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetLoginData } from '../../features/login';
import { useTranslation } from 'react-i18next';
import Card from './Card';
import SongsWindow from './SongsWindow';
import Logo from '../../components/Logo';

const SongSelect = () => {
  const address = import.meta.env.VITE_SERVER_ADDRESS;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { roomId, userId, userName } = useAppSelector((state) => state.login);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  
  const {
    data: queueEntries,
    isSuccess: queueIsSuccess,
    isError: queueIsError,
    isLoading: queueIsLoading,
  } = useGetQueueEntriesQuery(roomId);

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
    <div className="bg-gray-800 md:bg-login-bg md:bg-cover min-h-screen">
      <nav className="bg-gray-850 shadow-lg md:bg-darkHT">
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
          <div><Logo className="w-24 hidden shadow lg:block" /></div>
        </div>
      </nav>

      <div className="lg:grid max-w-screen w-full lg:gap-4 lg:grid-cols-3 md:p-4">
          <SongsWindow />
          <div className="flex-col flex-initial hidden lg:flex lg:col-span-1">
            <Card cover={`${address}/getCoverImage/1`} name="again" artist="YUI" />
          </div>  
      </div>
    </div>
  );
};

export default SongSelect;
