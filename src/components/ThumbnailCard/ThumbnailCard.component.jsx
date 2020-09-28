import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  content: {
    flex: '1 0 auto',
  },
  videoThumbnail: {
    width: 151,
    height: 90,
  },
  relatedCard: {
    display: 'flex',
  },
  truncateLongText: {
    width: 250,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const ThumbnailCard = ({ image, imageAltText, title, description }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea className={classes.relatedCard}>
        <CardMedia
          className={classes.videoThumbnail}
          image={image}
          title={imageAltText}
        />
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.truncateLongText}>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.truncateLongText}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ThumbnailCard;
