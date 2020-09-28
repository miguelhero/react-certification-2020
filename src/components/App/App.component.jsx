import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../Header';
import HomePage from '../../pages/Home';
import VideosProvider from '../../providers/Search';
import VideoPage from '../../pages/VideoPage';
import NotFound from '../../pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <VideosProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/watch/:videoId">
            <VideoPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </VideosProvider>
    </BrowserRouter>
  );
};

export default App;
