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

const useStyles = makeStyles({
  card: {
    height: 350,
  },
  image: {
    height: 140,
  },
  description: {
    width: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const VideoCard = ({ imageSrc, altText, videoTitle, videoDesc }) => {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.image} image={imageSrc} title={altText} />
          <CardContent>
            <Typography variant="h6" component="h2">
              {videoTitle}
            </Typography>
            <Typography
              className={classes.description}
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {videoDesc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default VideoCard;
