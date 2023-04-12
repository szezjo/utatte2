import React, {useEffect, useRef} from 'react';
import Spinner from '../../components/Spinner';
import { useCheckConnectionQuery } from '../../services/api';
import FirstTimeSetup from './FirstTimeSetup';
import autoAnimate from '@formkit/auto-animate';
import { useTranslation } from 'react-i18next';

const StartSetup = () => {
  const { data, error, isLoading, isSuccess } = useCheckConnectionQuery();
  const { t } = useTranslation();

  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  return (
    <div className="min-h-screen flex flex-col space-y-12 justify-center items-center bg-slate-800" ref={parent}>
      <img src="./utatteLogo.svg" className="logo" alt="Utatte logo" />
      <div className="flex flex-col justify-center items-center space-y-4">
        {isLoading && (
          <>
            <h1 className="text-3xl font-bold text-blue-100">{t('loading.connecting')}</h1>
            <Spinner />
          </>
        )}
        {error && <h1 className="text-3xl font-bold text-blue-100">{t('loading.connectionError')}</h1>}
      </div>
      {isSuccess && <FirstTimeSetup />}
    </div>
  );
};

export default StartSetup;
