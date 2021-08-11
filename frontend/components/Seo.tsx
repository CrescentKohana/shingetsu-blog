import Head from "next/head"
import { useContext } from "react"
import { getMedia } from "../lib/media"
import { GlobalContext } from "../pages/_app"
import { Global, SeoData } from "../types/data"

interface SeoProps {
  seo: SeoData
}

const Seo = ({ seo }: SeoProps) => {
  const global: Global = useContext(GlobalContext)
  const seoWithDefaults: SeoData = {
    ...global.defaultSeo,
    ...seo,
  }

  // TODO: "Guides | undefined" in Discord preview (https://luukuton.fi/category/guides)
  const fullSeo = {
    ...seoWithDefaults,
    metaTitle: `${seoWithDefaults.metaTitle} | ${global.siteName}`,
    shareImage: seoWithDefaults.shareImage ? getMedia(seoWithDefaults.shareImage) : null,
  }

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}

export default Seo
