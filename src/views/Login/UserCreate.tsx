import React, { ChangeEvent, useCallback, useState } from 'react';
import { TScreen } from './Login';
import { useTranslation } from 'react-i18next';
import { useCreateRoomMutation, useCreateUserMutation } from '../../services/api';
import { useDropzone } from 'react-dropzone';
import Button from '../../components/Button';
import BackIcon from '../../icons/BackIcon';
import ApplyIcon from '../../icons/ApplyIcon';
import TextInput from '../../components/TextInput';
import ImageDropzone from '../../components/ImageDropzone';

type UserCreateProps = {
  setScreen: (screen: TScreen) => void;
  refetchUsers: () => void;
};

const UserCreate = ({ setScreen, refetchUsers }: UserCreateProps) => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatarURL, setAvatarURL] = useState('');

  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   if (!acceptedFiles.length) return;
  //   const imgURL = URL.createObjectURL(acceptedFiles[0]);
  //   const img = new Image();
  //   img.src = imgURL;
  //   img.onload = () => {
  //     if (img.width != img.height || img.width > 400) return;
  //     setAvatarURL(imgURL);
  //     setAvatarFile(acceptedFiles[0]);
  //   };
  //   console.log(acceptedFiles);
  // }, []);

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] },
  //   onDrop,
  // });

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
        <TextInput id="user_name" label={t('rooms.userName')} value={userName} setValue={setUserName} required />
        <ImageDropzone setURL={setAvatarURL} setFile={setAvatarFile} currentURL={avatarURL} label={t('rooms.profilePicture')} />
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
