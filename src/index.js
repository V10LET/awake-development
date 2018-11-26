import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import rootReducer from './reducers/index'
import * as serviceWorker from './serviceWorker'
import { setToken, setUser } from './actions/userAction'

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)

const token = localStorage.getItem('app-token')
store.dispatch(setToken(token))
if (token !== null) {
    getUserFetch()
}

async function getUserFetch() {
    let r = await fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    let data = await r.json()
    store.dispatch(setUser(data))
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#fffffb',
      main: '#d7ccc8',
      dark: '#a69b97',
      contrastText: '#000',
    },
    secondary: {
      light: '#6a4f4b',
      main: '#1b0000',
      dark: '#3e2723',
      contrastText: '#fff',
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
