import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import HomePage from '../../pages/Home';
import VideosProvider from '../../providers/Search';
import AuthProvider from '../../providers/Auth';
import VideoPage from '../../pages/VideoPage';
import NotFound from '../../pages/NotFound';
import LoginPage from '../../pages/Login/Login.page';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VideosProvider>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/watch/:videoId">
              <VideoPage />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </VideosProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
