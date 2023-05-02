import React, { useEffect, useRef } from 'react';
import Spinner from '../../components/Spinner';
import { useCheckConnectionQuery } from '../../services/api';
import FirstTimeSetup from './subviews/FirstTimeSetup';
import autoAnimate from '@formkit/auto-animate';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/Logo';
import LoadingText from './components/LoadingText';

const StartSetup = () => {
  const { data, error, isLoading, isSuccess } = useCheckConnectionQuery();
  const { t } = useTranslation();

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div
      className="min-h-screen flex flex-col py-8 space-y-12 md:justify-center items-center bg-slate-800"
      ref={parent}
    >
      <Logo />
      <div className="flex flex-col justify-center items-center space-y-4">
        {isLoading && (
          <>
            <LoadingText>{t('loading.connecting')}</LoadingText>
            <Spinner />
          </>
        )}
        {error && <LoadingText>{t('loading.connectionError')}</LoadingText>}
      </div>
      {isSuccess && <FirstTimeSetup />}
    </div>
  );
};

export default StartSetup;
