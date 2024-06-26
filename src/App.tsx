import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './routes/AuthRoutes';
import AuthAdminRoute from './routes/AuthAdminRoutes';
import AnonymousRoute from './routes/AnonymousRoute';

import HomePage from './pages/user/HomePage';
import ConversationPage from './pages/user/ConversationPage';
import RegisterPage from './pages/user/RegisterPage';
import LoginPage from './pages/user/LoginPage';

import AdminPage from './pages/admin/AdminPage';

import { Provider } from 'react-redux';
import store from './store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Layout from './components/user/layout/Layout';

import i18n from './locales/i18n';
import { initReactI18next } from 'react-i18next';

initReactI18next.init(i18n);
import { ShowDetailsGroupProvider } from './provider/ShowDetailsGroupProvider';

const App: React.FC = () => {
  const persistor = persistStore(store);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('locale');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ShowDetailsGroupProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/register"
                element={<AnonymousRoute element={<RegisterPage />} />}
              />
              <Route
                path="/login"
                element={<AnonymousRoute element={<LoginPage />} />}
              />

              <Route path="/" element={<AuthRoute element={<Layout />} />}>
                <Route index element={<HomePage />} />
                <Route path="/:conversationId" element={<ConversationPage />} />
              </Route>

              <Route
                path="admin"
                element={<AuthAdminRoute element={<AdminPage />} />}
              />
            </Routes>
          </BrowserRouter>
        </ShowDetailsGroupProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
