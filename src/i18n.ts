import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                setup: {
                    selectLanguage: 'Choose a language',
                    selectDeviceType: 'Choose a device type',
                    deviceTypePlayer: 'Player',
                    deviceTypeCompanion: 'Companion app',
                },
                loading: {
                    connecting: 'Connecting to the server...',
                    connectionError: 'Connection error'
                }
            }
        },
        pl: {
            translation: {
                setup: {
                    selectLanguage: 'Wybierz język',
                    selectDeviceType: 'Wybierz typ urządzenia',
                    deviceTypePlayer: 'Odtwarzacz',
                    deviceTypeCompanion: 'Aplikacja towarzysząca',
                },
                loading: {
                    connecting: 'Łączenie z serwerem...',
                    connectionError: 'Błąd połączenia'
                }
            }
        },
        jp: {
            translation: {
                setup: {
                    selectLanguage: '言葉を選ぶ',
                    selectDeviceType: 'ディバイスタイプを選ぶ',
                    deviceTypePlayer: 'プレイヤー',
                    deviceTypeCompanion: 'ナビアプリ',
                },
                loading: {
                    connecting: 'サーバーに接続中...',
                    connectionError: '接続エラー'
                }
            }
        }
    }
});

export default i18n;