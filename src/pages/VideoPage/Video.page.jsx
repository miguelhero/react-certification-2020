import React from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos.component';
import { useAuth } from '../../providers/Auth';
import { favoritesDb } from '../../data/favorites';

const useStyles = makeStyles({
  layout: {
    display: 'grid',
    gridTemplateColumns: '3fr 3fr 3fr 3fr',
    gridTemplateRows: '2fr 2fr 0.5fr 2fr 2fr',
    gridTemplateAreas: `'video video video related'
       'video video video related'
       'title title addfav related'
       'none none none related'
       'none none none related'`,
  },
  videoDisplay: {
    gridArea: 'video',
    height: 450,
  },
  title: {
    gridArea: 'title',
  },
  addFav: {
    gridArea: 'addfav',
    justifySelf: 'end',
    alignSelf: 'center',
  },
  related: {
    gridArea: 'related',
  },
  videoFrame: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
});

const VideoPage = () => {
  const classes = useStyles();
  const { videoId } = useParams();
  const { state } = useAuth();

  const videoInFavs = () => {
    const username = state.token.name.toLowerCase();
    const res = favoritesDb[username].filter((item) => item.id.videoId === videoId);
    if (res.length > 0) return true;
    return false;
  };

  return (
    <div className={classes.layout}>
      <div className={classes.videoDisplay}>
        <iframe
          title={`video-${videoId}`}
          className={classes.videoFrame}
          src={`https://www.youtube.com/embed/${videoId}`}
          scrolling="no"
          frameBorder="no"
        />
      </div>
      <div className={classes.title}>
        <Typography variant="h3" component="h3">
          Video Title
        </Typography>
      </div>
      {state.isAuthenticated && (
        <div className={classes.addFav}>
          <Button variant="contained" color="primary" component="span">
            {videoInFavs ? `Remove from Favorites` : `Add to Favorites`}
          </Button>
        </div>
      )}
      <div className={classes.related}>
        <RelatedVideos videoId={videoId} />
      </div>
    </div>
  );
};

export default VideoPage;
