import Document, { Head, Html, Main, NextScript } from "next/document"

const env = process.env.NODE_ENV

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300&family=Staatliches&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {env == "production" && (
            <>
              <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="shy pixel"
                  src="https://shy.luukuton.fi/ingress/ffa329be-5da8-4509-b9fd-1fdd5f37c4dd/pixel.gif"
                />
              </noscript>
              <script
                defer
                src="https://shy.luukuton.fi/ingress/ffa329be-5da8-4509-b9fd-1fdd5f37c4dd/script.js"
              ></script>
            </>
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
