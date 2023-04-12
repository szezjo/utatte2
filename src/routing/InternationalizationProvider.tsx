import React, { useEffect } from "react";
import i18n from '../i18n';
import { I18nextProvider } from "react-i18next";
import { useAppSelector } from "../hooks";

type InternalizationProviderProps = {
    children: JSX.Element,
}

const InternalizationProvider = ({children} : InternalizationProviderProps) => {
    const lang = useAppSelector((state) => state.setup.lang);
    useEffect(() => {
        i18n.changeLanguage(lang);
    }, [])

    return (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    )
}

export default InternalizationProvider;