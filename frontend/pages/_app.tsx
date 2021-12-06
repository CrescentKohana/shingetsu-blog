import { Provider } from "next-auth/client"
import App, { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { createContext } from "react"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
import "../styles/globals.css"
import { Global } from "../types"

export const GlobalContext = createContext({})

const Shingetsu = ({ Component, pageProps }: AppProps) => {
  const global: Global = pageProps

  return (
    <>
      <Head>{global.favicon && <link rel="shortcut icon" href={getMedia(global.favicon)} />}</Head>
      <div className="uk-light">
        <GlobalContext.Provider value={global}>
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </GlobalContext.Provider>
      </div>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, projects, tags, about and home pages still get SSG.
// Hopefully this can be replaced with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
Shingetsu.getInitialProps = async (context: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(context)
  const global = await fetchApi("/global?populate=favicon,seo.shareImage,footer.image")

  return { ...appProps, pageProps: global }
}

export default Shingetsu
