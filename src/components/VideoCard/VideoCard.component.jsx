import React from 'react';
import {
  Grid,
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    backgroundColor: 'white',
    height: 350,
    '&:hover': {
      backgroundColor: 'rgba(0, 59, 128, 0.08)',
    },
  },
  image: {
    height: 140,
  },
  nounderline: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.8)',
  },
});

const VideoCard = ({ videoId, imageSrc, altText, videoTitle, videoDesc }) => {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Card className={classes.card}>
        <Link to={`/watch/${videoId}`} className={classes.nounderline}>
          <CardActionArea>
            <CardMedia className={classes.image} image={imageSrc} title={altText} />
            <CardContent>
              <Typography variant="h6" component="h2">
                {videoTitle}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {videoDesc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
};

export default VideoCard;
