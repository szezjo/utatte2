import React from 'react';
import OptionCard from './OptionCard';
import { useTranslation } from 'react-i18next';

type DeviceTypeSelectProps = {
  setDeviceType: (playerMode: boolean) => void;
};

const DeviceTypeSelect = ({ setDeviceType }: DeviceTypeSelectProps) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-100">{t('setup.selectDeviceType')}</h1>
      <div className="min-w-full flex flex-col space-y-12 justify-center items-center md:flex-row md:space-x-12 md:space-y-0">
        <OptionCard text={t('setup.deviceTypePlayer')} image="./assets/tv.png" onClick={() => setDeviceType(true)} />
        <OptionCard
          text={t('setup.deviceTypeCompanion')}
          image="./assets/tablet.png"
          onClick={() => setDeviceType(false)}
        />
      </div>
    </>
  );
};

export default DeviceTypeSelect;
