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
  media: {
    height: 140,
  },
});

const VideoCard = ({ imageSrc, altText, videoTitle, videoDesc }) => {
  const classes = useStyles();
  return (
    <Grid item xs={3}>
      <Card>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageSrc} title={altText} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {videoTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {videoDesc}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default VideoCard;
