import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import StartSetup from './views/StartSetup';
import Login from './views/Login';
import Guard from './routing/Guard';
import InternalizationProvider from './routing/InternationalizationProvider';
import Root from './views';
import SongSelect from './views/SongSelect';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <StartSetup />,
      },
      {
        path: 'rooms/',
        element: <Guard authType="SetupDefined" component={<Login />} redirectPath="/" />,
      },
      {
        path: 'songs/',
        element: <Guard authType="LoggedIn" component={<SongSelect />} redirectPath="/" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InternalizationProvider>
          <div className="bg-slate-800">
            <RouterProvider router={router} />
          </div>
        </InternalizationProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
