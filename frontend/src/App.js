import React from 'react';
import { Main } from 'components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from 'components/Login';
import Register from 'components/Register';
import { NotFound } from 'components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import secrets from 'reducers/secrets';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    secrets: secrets.reducer
  });

  const store = configureStore({reducer});

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}