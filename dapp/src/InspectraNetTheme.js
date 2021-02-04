import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export default function InspectraNetTheme(props) {
     const darkmode = useMediaQuery('(prefers-color-scheme: dark)');

     const theme = React.useMemo(() => createMuiTheme({

          typography: {

               fontFamily: [
                    //'Audiowide',
                    'Poppins',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    '"Noto Sans"',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
               ].join(','),

               fontSize: 13,


          },

          palette: {

               type: darkmode ? 'dark' : 'light',

               primary: {
                    light: '#3f51b5',
                    main: '#3f51b5',
                    dark: '#3f51b5',
               },

               /*secondary: {
                    light: '#00ffff',
                    main: '#0099ff',
                    dark: '#0000ff',
               },

               disabled: {
                    light: '#00ffff',
                    main: '#0099ff',
                    dark: '#0000ff',
               },

               contrastThreshold: 3,
               tonalOffset: 0.2,*/

               background: {
                    default: '#232b3e',
                    paper: '#1a202e',
               },

               text: {
                    primary: '#96a2b4',
                    secondary: '#96a2b4',
                    disabled: '#96a2b4',
               },

               /*
               action.active
               action.hover
               action.selected
               action.disabled
               action.disabledBackground

               divider
               */

          },

     }), [darkmode], );

     return (
          <ThemeProvider theme={theme}>
               <CssBaseline/>
               {props.children}
          </ThemeProvider>
     );

}

/*



:root {
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #fff;
    --gray: #6c757d;
    --gray-dark: #343a40;
    --primary: #007bff;
    --secondary: #6c757d;
    --success: #28a745;
    --info: #17a2b8;
    --warning: #ffc107;
    --danger: #dc3545;
    --light: #f8f9fa;
    --dark: #343a40;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    --font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
}
*/
