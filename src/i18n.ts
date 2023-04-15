import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
          connectionError: 'Connection error',
        },
        rooms: {
          selectRoom: 'Select a room',
          createRoom: 'Create new room',
          selectUser: 'Who are you?',
          createUser: 'Add a new user',
          multiUserDevice: 'Multi-user device',
          roomListFetchError: 'Unable to retrieve a list of rooms.',
          goBackToRooms: 'Return to rooms list',
          goBackToUsers: 'Choose an existing user',
          roomName: 'Room name',
          userName: 'Username',
          profilePicture: 'Profile picture',
          clickToUpload: 'Click to upload',
          orDragAndDrop: 'or drag and drop',
          pictureFileTypes: 'SVG, PNG, JPG or GIF',
        },
      },
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
          connectionError: 'Błąd połączenia',
        },
        rooms: {
          selectRoom: 'Wybierz pokój',
          createRoom: 'Utwórz pokój',
          selectUser: 'Kim jesteś?',
          createUser: 'Dodaj użytkownika',
          multiUserDevice: 'Wielu użytkowników',
          roomListFetchError: 'Nie można pobrać listy pokojów.',
          goBackToRooms: 'Wróć do listy pokojów',
          goBackToUsers: 'Wybierz istniejącego użytkownika',
          roomName: 'Nazwa pokoju',
          userName: 'Nazwa użytkownika',
          profilePicture: 'Grafika profilowa',
          clickToUpload: 'Kliknij, by wysłać grafikę',
          orDragAndDrop: 'lub upuść plik tutaj',
          pictureFileTypes: 'SVG, PNG, JPG lub GIF',
        },
      },
    },
    jp: {
      translation: {
        setup: {
          selectLanguage: '言葉を選んでください',
          selectDeviceType: 'ディバイスタイプを選んでください',
          deviceTypePlayer: 'プレイヤー',
          deviceTypeCompanion: 'ナビアプリ',
        },
        loading: {
          connecting: 'サーバーに接続中...',
          connectionError: '接続エラー',
        },
        rooms: {
          selectRoom: 'ルームを選んでください',
          createRoom: 'ルームを作る',
          selectUser: 'どなたですか？',
          createUser: 'ユーザーを追加する',
          multiUserDevice: 'マルチユーザデバイス',
          roomListFetchError: 'ルームのリストを取得できない。',
          goBackToRooms: '戻る',
          goBackToUsers: '戻る',
          roomName: 'ルームの名前',
          userName: 'ユーザー名',
          profilePicture: 'プロフィール画像',
          clickToUpload: 'クリックでアップロード、',
          orDragAndDrop: 'またはドラッグ＆ドロップ',
          pictureFileTypes: 'SVG、PNG、JPGまたはGIF',
        },
      },
    },
  },
});

export default i18n;
