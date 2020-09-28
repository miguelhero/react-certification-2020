import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import VideoCard from '../../components/VideoCard';
import { favoritesDb } from '../../data/favorites';

function FavoritesPage() {
  const [videos] = useState(favoritesDb.wizeline);

  return (
    <>
      <Typography variant="h2" align="center">
        Welcome to Challenge!
      </Typography>
      <Grid container spacing={3}>
        {videos.length === 0 ? (
          <h2>No favorites yet!</h2>
        ) : (
          videos.map((item) => (
            <VideoCard
              key={item.id.videoId}
              videoId={item.id.videoId}
              imageSrc={item.snippet.thumbnails.high.url}
              altText={item.snippet.title}
              videoTitle={item.snippet.title}
              videoDesc={item.snippet.description}
            />
          ))
        )}
      </Grid>
    </>
  );
}

export default FavoritesPage;
