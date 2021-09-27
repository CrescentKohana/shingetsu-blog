// Fixed in Next.js 11.1.3-canary.7. Upgrade when it hits stable.
// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document"

// TODO: Possibly serve uikit scripts and stylesheets locally.

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"} />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Staatliches&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.7.2/dist/css/uikit.min.css" />
          <script async src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.7.2/js/uikit.min.js" />
          <script async src="https://cdn.jsdelivr.net/npm/uikit@3.7.2/dist/js/uikit-icons.min.js" />
          <script async src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.7.2/js/uikit.js" />
          <script async defer data-domain="luukuton.fi" src="https://plausible.luukuton.fi/js/plausible.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="shy pixel" src="https://shy.luukuton.fi/ingress/ffa329be-5da8-4509-b9fd-1fdd5f37c4dd/pixel.gif" />
          </noscript>
          <script defer src="https://shy.luukuton.fi/ingress/ffa329be-5da8-4509-b9fd-1fdd5f37c4dd/script.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
