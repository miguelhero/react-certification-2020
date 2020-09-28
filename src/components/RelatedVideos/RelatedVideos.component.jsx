import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import ThumbnailCard from '../ThumbnailCard/ThumbnailCard.component';
import youtube from '../../services/youtube';

const RelatedVideos = ({ videoId }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const data = await youtube.get('search', {
        params: {
          relatedToVideoId: videoId,
          maxResults: 10,
        },
      });
      setRelatedVideos(data.data.items || []);
    };
    getVideos();
  }, [videoId]);

  return (
    <>
      <Typography variant="h5" component="h5" align="center">
        Related Videos
      </Typography>
      {relatedVideos.map((relatedVideo) => (
        <ThumbnailCard
          key={relatedVideo.id.videoId}
          image={relatedVideo.snippet.thumbnails.default.url}
          imageAltText={relatedVideo.snippet.title}
          title={relatedVideo.snippet.title}
          description={relatedVideo.snippet.description}
        />
      ))}
    </>
  );
};

export default RelatedVideos;
