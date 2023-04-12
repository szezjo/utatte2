import React from 'react';
import { useTranslation } from "react-i18next";

type LanguageSelectProps = {
    setLanguage: (language: string) => void;
    applyLanguage: (language: string) => void;
}

const LanguageSelect = ({setLanguage, applyLanguage} : LanguageSelectProps) => {
    const languages = [
        {name: "English", code: "en", image: "./assets/flag-us.jpg"},
        {name: "Polski", code: "pl", image: "./assets/flag-pl.jpg"},
        {name: "日本語", code: "jp", image: "./assets/flag-jp.jpg"}
    ]

    const { t } = useTranslation();

    return (
        <><h1 className="text-3xl font-bold text-blue-100">{t('setup.selectLanguage')}</h1>
        <div className="flex flex-col flex-wrap justify-center items-center max-w-2xl p-6 rounded-lg shadow bg-slate-700 border-gray-700 md:flex-row">
            {languages.map((e) => (
            <div className="flex flex-col p-6 hover:bg-slate-600 rounded-lg" key={e.code} onMouseOver={() => setLanguage(e.code)} onClick={() => applyLanguage(e.code)}>
                <img className="rounded-full w-24" src={e.image} />
                <h5 className="text-xl text-center text-blue-100">{e.name}</h5>
            </div>
            ))}
        </div></>
    )
}

export default LanguageSelect;