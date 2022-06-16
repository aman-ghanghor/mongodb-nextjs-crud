import '../styles/globals.css'
import {Head} from "next/head" ;

import 'bootstrap/dist/css/bootstrap.min.css' ;
import 'bootstrap-icons/font/bootstrap-icons.css' ;

import {AppProvider} from "/context.js" ;


function MyApp({ Component, pageProps }) {
  return <>
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </> 
}


export default MyApp
