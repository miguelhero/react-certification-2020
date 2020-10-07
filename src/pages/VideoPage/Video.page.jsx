import React, { useEffect, useState } from 'react';
import { Button, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos.component';
import { useAuth, STATE } from '../../providers/Auth';
import youtube from '../../services/youtube';
import { storage } from '../../utils/storage';

const useStyles = makeStyles((theme) =>
  createStyles({
    layout: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(4),
      marginLeft: theme.spacing(4),
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
      marginLeft: theme.spacing(2),
    },
    videoFrame: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
  })
);

const VideoPage = () => {
  const classes = useStyles();
  const { videoId } = useParams();
  const { state, dispatch } = useAuth();
  const [videoInfo, setVideoInfo] = useState(null);
  const isFav =
    state.favorites && state.favorites.some((item) => item.id.videoId === videoId);

  useEffect(() => {
    const getVideos = async () => {
      const data = await youtube.get('videos', {
        params: {
          id: videoId,
          maxResults: 1,
        },
      });
      setVideoInfo(data.data.items[0] || []);
    };
    getVideos();
    storage.set(STATE, { ...state });
  }, [state, videoId]);

  const handleFavorites = () => {
    if (isFav) {
      dispatch({ type: 'REMOVEFROMFAV', payload: { videoId } });
    } else {
      dispatch({
        type: 'ADDTOFAV',
        payload: { ...videoInfo, id: { videoId: videoInfo.id } },
      });
    }
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
          {videoInfo && videoInfo.snippet.title}
        </Typography>
      </div>
      {state.isAuthenticated && (
        <div className={classes.addFav}>
          {isFav ? (
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={handleFavorites}
            >
              - from Favorites
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              component="span"
              onClick={handleFavorites}
            >
              + to Favorites
            </Button>
          )}
        </div>
      )}
      <div className={classes.related}>
        <RelatedVideos videoId={videoId} />
      </div>
    </div>
  );
};

export default VideoPage;
