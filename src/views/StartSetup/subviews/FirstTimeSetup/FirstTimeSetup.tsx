import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { markFirstTimeSetupAsDone, setPlayerMode, setLanguage } from '../../../../features/setup';
import { useNavigate } from 'react-router-dom';
import DeviceTypeSelect from './components/DeviceTypeSelect';
import i18n from '../../../../i18n';
import LanguageSelect from './components/LanguageSelect';
import autoAnimate from '@formkit/auto-animate';
import { setDisplayRomanizedTitles } from '../../../../features/settings';

type TScreen = 'NoScreen' | 'LanguageScreen' | 'DeviceTypeScreen';

const FirstTimeSetup = () => {
  const [screen, setScreen] = useState<TScreen>('NoScreen');
  const isSetup = useAppSelector((state) => state.setup.isSetup);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  useEffect(() => {
    if (isSetup) {
      return navigate('rooms/');
    }
    setTimeout(() => {
      setScreen('LanguageScreen');
    }, 1500);
  }, []);

  const setLanguageOnHover = (language: string) => {
    i18n.changeLanguage(language);
  };

  const applyLanguage = (language: string) => {
    i18n.changeLanguage(language);
    dispatch(setLanguage(language));
    if (language == "jp") dispatch(setDisplayRomanizedTitles(false));
    setScreen('DeviceTypeScreen');
  };

  const setDeviceType = (playerMode: boolean) => {
    dispatch(setPlayerMode(playerMode));
    dispatch(markFirstTimeSetupAsDone());
    return navigate('rooms/');
  };

  return !!screen ? (
    <div className="min-w-full flex flex-col justify-center items-center space-y-6" ref={parent}>
      {screen === 'LanguageScreen' && <LanguageSelect setLanguage={setLanguageOnHover} applyLanguage={applyLanguage} />}
      {screen === 'DeviceTypeScreen' && <DeviceTypeSelect setDeviceType={setDeviceType} />}
    </div>
  ) : (
    <></>
  );
};

export default FirstTimeSetup;
