import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import rootReducer from './reducers/index'
import * as serviceWorker from './serviceWorker'


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#4f5b62',
      main: '#263238',
      dark: '#000a12',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffffff',
      main: '#cfd8dc',
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
