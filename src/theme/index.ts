import { createTheme } from "@mui/material/styles";
import { teal } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: teal[900],
    },
  },
});

export default theme;
