import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Header from '../Header';
import VideoCard from '../VideoCard';

const App = () => {
  return (
    <>
      <Header />
      <Typography variant="h2" align="center">
        Welcome to Challenge!
      </Typography>
      <Grid container spacing={3}>
        <VideoCard
          imageSrc="https://i.ytimg.com/vi/rj7xMBxd5iY/hqdefault.jpg"
          altText="Surfing bro"
          videoTitle="BIG WAVE SURFING COMPILATION 2017"
          videoDesc="BIG WAVE SURFING COMPILATION 2017 ** REVISED **AMAZING FOOTAGE ** WITH 60-100FT- HUGE SURF Please Subscribe if You Would like to see More ..."
        />
      </Grid>
    </>
  );
};

export default App;
