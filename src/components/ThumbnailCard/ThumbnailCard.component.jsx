import React from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      flex: '1 0 auto',
    },
    videoThumbnail: {
      width: 151,
      height: 90,
    },
    relatedCard: {
      display: 'flex',
      marginBottom: theme.spacing(1),
    },
    truncateLongText: {
      width: 250,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
);

const ThumbnailCard = ({ image, imageAltText, title, description }) => {
  const classes = useStyles();
  return (
    <Card square>
      <CardActionArea className={classes.relatedCard}>
        <CardMedia
          className={classes.videoThumbnail}
          image={image}
          title={imageAltText}
        />
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6" className={classes.truncateLongText}>
            {title}
          </Typography>
          <Typography
            variant="body2"
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
