import React from "react";
import { useTranslation } from "react-i18next";

const RoomSelector = () => {
    const { t } = useTranslation();
    return <h1 className="text-red-200">{t('setup.deviceTypePlayer')}</h1>
}

export default RoomSelector;