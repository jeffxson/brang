import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import { Provider } from "react-redux"
import { QueryClientProvider, QueryClient } from "react-query"
import { store } from "./store"

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { theme } from "theme"

import "./styles/responsive.css"
import "./styles/custom.css"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: 600_000,
    },
  },
})

const app = (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </QueryClientProvider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
