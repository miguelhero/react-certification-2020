import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useAuth } from '../../providers/Auth';
import loginApi from '../../services/login.api';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      padding: theme.spacing(5),
      height: '70vh',
    },
    formItem: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  })
);

function LoginPage() {
  const classes = useStyles();
  const { dispatch } = useAuth();
  const initialState = {
    username: '',
    password: '',
    isSubmitting: false,
    errorMessage: null,
  };
  const [data, setData] = useState(initialState);
  const history = useHistory();

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    loginApi(data.username, data.password)
      .then((resJson) => {
        console.log('response', resJson);
        dispatch({
          type: 'LOGIN',
          payload: resJson,
        });
        history.push('/');
      })
      .catch((error) => {
        console.log('error', error);
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText,
        });
      });
  };

  return (
    <section className={classes.container}>
      <form onSubmit={handleFormSubmit}>
        <Typography variant="h3" component="h3" color="textPrimary">
          Login
        </Typography>
        <TextField
          className={classes.formItem}
          label="username"
          name="username"
          variant="outlined"
          type="text"
          value={data.username}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          className={classes.formItem}
          label="password"
          name="password"
          variant="outlined"
          type="password"
          value={data.password}
          onChange={handleInputChange}
          fullWidth
          required
        />
        {data.errorMessage && <h4>Incorrect username or password</h4>}
        <Box mt={2} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            disabled={data.isSubmitting}
            type="submit"
          >
            {data.isSubmitting ? (
              <CircularProgress style={{ color: '#ffffff' }} size={20} />
            ) : (
              'Login'
            )}
          </Button>
        </Box>
      </form>
    </section>
  );
}

export default LoginPage;
