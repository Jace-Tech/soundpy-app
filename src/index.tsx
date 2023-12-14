import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme'
import { Provider } from 'react-redux'
import store from './store'
import GlobalContextProvider from './context'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <GlobalContextProvider>
          <App />
        </GlobalContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
)
