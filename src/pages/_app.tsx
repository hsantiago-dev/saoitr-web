import { UserProvider } from '@/context/user.provider';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Cabin as Sans, Ubuntu_Mono as Mono } from 'next/font/google'
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const sans = Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: [ "400", "500", "600", "700"],
});

const mono = Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Head>
        <title>SAOITR Web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
      <style jsx global>
        {`
          :root {
            --font-sans: ${sans.style.fontFamily};
            --font-mono: ${mono.style.fontFamily};
          }
        `}
      </style>
    </UserProvider>
  )
}


