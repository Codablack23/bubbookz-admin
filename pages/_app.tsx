import 'antd/dist/antd.css'
import '../styles/style.scss'
import "bootstrap-icons/font/bootstrap-icons.css"
import type { AppProps } from 'next/app'
import AuthContextProvider from '~/contexts/authContext/AuthContext'
import {BookContextProvider } from '~/contexts/BookContext'
import { OrdersContextProvider } from '~/contexts/OrdersContext'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
    <BookContextProvider>
      <OrdersContextProvider>
      <Component {...pageProps} />
      </OrdersContextProvider>
    </BookContextProvider>
    </AuthContextProvider>
  )
}

export default MyApp
