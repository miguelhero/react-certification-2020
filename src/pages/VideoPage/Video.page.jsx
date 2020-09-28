import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';

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
  iframe: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  relatedCard: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  videoThumbnail: {
    width: 151,
    height: 90,
  },
});

const VideoPage = () => {
  const classes = useStyles();
  const { videoId } = useParams();
  return (
    <div className={classes.layout}>
      <div className={classes.videoDisplay}>
        <iframe
          title={`video-${videoId}`}
          className={classes.iframe}
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
      <div className={classes.addFav}>
        <Button variant="contained" color="primary" component="span">
          Add to Favorites
        </Button>
      </div>
      <div className={classes.related}>
        <Typography variant="h5" component="h5" align="center">
          Related Videos
        </Typography>
        <Card>
          <CardActionArea className={classes.relatedCard}>
            <CardMedia
              className={classes.videoThumbnail}
              image="https://i.ytimg.com/vi/hwLo7aU1Aas/default.jpg"
              title="altText"
            />
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Video Title
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Description
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default VideoPage;
