import type { AppProps } from 'next/app'
import { useState } from 'react'
import Head from "next/head"
import Link from "next/link"

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(true)



  return (
    <>
      <Component {...pageProps} />

      <Head>
        <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        body {
          background: ${isDark ? "#070B0B" : "antiquewhite"};
        }
      `}</style>
    </>
  )
}
