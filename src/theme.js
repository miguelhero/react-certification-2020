import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    fontFamily: `"Lato", sans-serif`,
    fontSize: 16,
    h1: {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: `2rem`,
      fontWeight: `normal`,
      lineHeight: `40px`,
    },
    h2: {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: `1.9rem`,
      fontWeight: `normal`,
    },
    h3: {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: `1.8rem`,
      fontWeight: `normal`,
    },
    h4: {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: `1.5rem`,
      fontWeight: `normal`,
      lineHeight: `32px`,
    },
    h5: {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: `1.125rem`,
      fontWeight: `normal`,
    },
    h6: {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: `1rem`,
      fontWeight: `normal`,
    },
    body1: {
      fontSize: '14px',
    },
    body2: {
      fontSize: '12px',
    },
  },
  palette: {
    primary: {
      main: '#E63946',
    },
    secondary: {
      main: '#F1FAEE',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FEFEFE',
    },
  },
  overrides: {
    MuiSvgIcon: {
      root: {
        color: 'white',
      },
    },
    MuiInputBase: {
      input: {
        font: `"Lato", sans-serif`,
      },
    },
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom: `1px solid rgba(255, 255, 255, 0.5)`,
        },
        '&:after': {
          borderBottom: `2px solid rgba(255, 255, 255, 0.7)`,
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `2px solid rgba(255, 255, 255, 1)`,
        },
      },
    },
    MuiButtonBase: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(0, 59, 128, 0.04)',
        },
      },
    },
  },
});

export default theme;
