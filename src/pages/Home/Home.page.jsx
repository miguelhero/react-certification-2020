import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import VideoCard from '../../components/VideoCard';
import youtube from '../../services/youtube';
import { useSearch } from '../../providers/Search';

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [query] = useSearch();

  useEffect(() => {
    const getVideos = async () => {
      const data = await youtube.get('search', {
        params: {
          q: query,
        },
      });
      if (data && data.data && data.data.items) {
        setVideos(data.data.items);
      }
    };
    getVideos();
  }, [query]);

  return (
    <>
      <Box my="2rem">
        <Typography variant="h2" align="center">
          Final Challenge Delivery!
        </Typography>
      </Box>
      <Box m="2rem">
        <Grid container spacing={3}>
          {videos.length === 0 ? (
            <h2>No videos found!</h2>
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
      </Box>
    </>
  );
};

export default HomePage;
