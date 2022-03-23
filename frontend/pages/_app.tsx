import { SessionProvider } from "next-auth/react"
import App, { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { createContext } from "react"
// import "uikit/dist/css/uikit-core.min.css" // without the default theme
import "uikit/dist/css/uikit.min.css"
// Uncomment when https://github.com/uikit/uikit/issues/4592 is fixed. Also remove the <script> tag from <Head>.
// import "uikit/dist/js/uikit.min.js"
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
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
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
  const global: Global = await fetchApi("/global?populate=favicon,seo.shareImage,footer.images.image")

  if (global.footer?.images) {
    for (const image of global.footer.images) {
      image.image.url = getMedia(image.image)
    }
  }

  return { ...appProps, pageProps: global }
}

export default Shingetsu
