import { SessionProvider } from "next-auth/react"
import App, { AppContext, AppProps } from "next/app"
import Head from "next/head"
import { createContext } from "react"
// import "uikit/dist/css/uikit-core.min.css" // without the default theme
import "uikit/dist/css/uikit.min.css"
import "uikit/dist/js/uikit.min.js"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
import "../styles/globals.css"
import "../styles/yozora.css"
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
  const { data: global }: { data: Global } = await fetchApi(
    "/global?populate[0]=favicon&populate[seo][populate][1]=shareImage&populate[footer][populate][2]=image&populate[footer][populate][3]=images.image",
  )

  if (global.footer?.images) {
    for (const image of global.footer.images) {
      image.image.url = getMedia(image.image)
    }
    global.footer.images.sort((a, b) => a.sort - b.sort)
  }

  return { ...appProps, pageProps: global }
}

export default Shingetsu
