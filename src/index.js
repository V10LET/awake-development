import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import rootReducer from './reducers/index'
import * as serviceWorker from './serviceWorker'
import { setToken } from './actions/userAction'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.dispatch(setToken(localStorage.getItem('app-token')))

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      // light: '#4f5b62',
      light: '#fffffb',
      // main: '#263238',
      // main: '#ffae7c',
      main: '#d7ccc8',
      // dark: '#000a12',
      dark: '#a69b97',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffff',
      // main: '#cfd8dc',
      main: '#1b0000',
      dark: '#9ea7aa',
      contrastText: '#000',
    },
  }
})

ReactDOM.render(
    <Provider store={ store }>
        <MuiThemeProvider theme={ theme }>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
)
serviceWorker.unregister()
