import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, createStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ThumbnailCard from '../ThumbnailCard/ThumbnailCard.component';
import youtube from '../../services/youtube';

const useStyles = makeStyles((theme) =>
  createStyles({
    divider: {
      paddingBottom: theme.spacing(1),
      borderBottom: '2px solid',
      borderBottomColor: 'rgba(0, 0, 0, 0.24)',
      marginBottom: theme.spacing(1),
    },
    nounderline: {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.8)',
    },
  })
);

const RelatedVideos = ({ videoId }) => {
  const classes = useStyles();
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const data = await youtube.get('search', {
        params: {
          relatedToVideoId: videoId,
          maxResults: 10,
        },
      });
      if (data && data.data && data.data.items) {
        setRelatedVideos(data.data.items);
      }
    };
    getVideos();
  }, [videoId]);

  return (
    <>
      <Typography variant="h3" component="h3" align="center" className={classes.divider}>
        Related Videos
      </Typography>
      <div>
        {relatedVideos.map((relatedVideo) => (
          <Link
            to={`/watch/${relatedVideo.id.videoId}`}
            key={relatedVideo.id.videoId}
            className={classes.nounderline}
          >
            <ThumbnailCard
              image={relatedVideo.snippet.thumbnails.default.url}
              imageAltText={relatedVideo.snippet.title}
              title={relatedVideo.snippet.title}
              description={relatedVideo.snippet.description}
            />
          </Link>
        ))}
      </div>
    </>
  );
};

export default RelatedVideos;
