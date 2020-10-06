import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import VideoCard from '../../components/VideoCard';
import { useAuth } from '../../providers/Auth';

function FavoritesPage() {
  const { state } = useAuth();

  return (
    <>
      <Box my="2rem">
        <Typography variant="h2" align="center">
          {`${state.token.name} Favorites`}
        </Typography>
      </Box>
      <Box m="2rem">
        <Grid container spacing={3}>
          {!state.favorites || state.favorites.length === 0 ? (
            <h2>No favorites yet!</h2>
          ) : (
            state.favorites.map((item) => (
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
      </Box>
    </>
  );
}

export default FavoritesPage;
