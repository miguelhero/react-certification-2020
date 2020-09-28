import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../providers/Auth';
import loginApi from '../../services/login.api';

function LoginPage() {
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
    <section className="login">
      <form onSubmit={handleFormSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">
            <strong>username </strong>
            <input
              required
              type="text"
              id="username"
              name="username"
              value={data.username}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <strong>password </strong>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
            />
          </label>
        </div>
        {data.errorMessage && <h4>Incorrect username or password</h4>}
        <button type="submit" disabled={data.isSubmitting}>
          {data.isSubmitting ? 'Loading...' : 'Login'}
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
