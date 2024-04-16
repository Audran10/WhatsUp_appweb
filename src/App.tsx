import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './routes/AuthRoutes';

import HomePage from './pages/user/HomePage';
import ConversationPage from './pages/user/ConversationPage';
import RegisterPage from './pages/user/RegisterPage';
import LoginPage from './pages/user/LoginPage';
import ProfilePage from './pages/user/ProfilePage';

import { Provider } from 'react-redux';
import store from './store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const App: React.FC = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/" element={<AuthRoute element={<HomePage />} />} />
            <Route
              path="/:conversationId"
              element={<AuthRoute element={<ConversationPage />} />}
            />
            <Route
              path={'/profile'}
              element={<AuthRoute element={<ProfilePage />} />}
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
