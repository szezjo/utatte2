import React, { ChangeEvent, useCallback, useState } from 'react';
import { TScreen } from './Login';
import { useTranslation } from 'react-i18next';
import { useCreateRoomMutation, useCreateUserMutation } from '../../services/api';
import { useDropzone } from 'react-dropzone';
import Button from '../../components/Button';
import BackIcon from '../../icons/BackIcon';
import ApplyIcon from '../../icons/ApplyIcon';

type UserCreateProps = {
  setScreen: (screen: TScreen) => void;
  refetchUsers: () => void;
};

const UserCreate = ({ setScreen, refetchUsers }: UserCreateProps) => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarURL, setAvatarURL] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    const imgURL = URL.createObjectURL(acceptedFiles[0]);
    const img = new Image();
    img.src = imgURL;
    img.onload = () => {
      if (img.width != img.height || img.width > 400) return;
      setAvatarURL(imgURL);
      setAvatarFile(acceptedFiles[0]);
    };
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
    onDrop,
  });

  const [sendUserData, { isLoading }] = useCreateUserMutation();

  const createNewUser = async () => {
    if (!!userName.length && avatarFile) {
      const newUser = new FormData();
      newUser.append('name', userName);
      newUser.append('photo', avatarFile);
      await sendUserData(newUser);
      refetchUsers();
      setScreen('selectUser');
    }
  };

  return (
    <div className="flex flex-1 mb-32 w-full justify-center md:items-center">
      <div className="block w-full max-w-screen md:max-w-3xl p-6 md:border md:bg-gray-800 md:border-gray-700 md:rounded-lg md:shadow">
        <div>
          <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-white">
            {t('rooms.userName')}
          </label>
          <input
            type="text"
            id="user_name"
            className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            required
          ></input>
        </div>
        <div className="flex flex-col mt-6">
          <label htmlFor="dropzone-file" className="block mb-2 text-sm font-medium text-white">
            {t('rooms.profilePicture')}
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
              {...getRootProps()}
            >
              {avatarURL ? (
                <img src={avatarURL} className="w-48 h-48 rounded-lg" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">{t('rooms.clickToUpload')}</span> {t('rooms.orDragAndDrop')}
                  </p>
                  <p className="text-xs text-gray-400">{t('rooms.pictureFileTypes')}</p>
                </div>
              )}
              <input id="dropzone-file" type="file" className="hidden" {...getInputProps()} />
            </label>
          </div>
        </div>
        <div className="flex justify-center md:justify-between mt-6">
          <Button onClick={() => setScreen('selectUser')} icon={<BackIcon />}>{t('rooms.goBackToUsers')}</Button>
          <Button onClick={() => {
              setUserName('');
              createNewUser();
            }} icon={<ApplyIcon />}>{t('rooms.createUser')}</Button>
        </div>
      </div>
    </div>
  );
};

export default UserCreate;
