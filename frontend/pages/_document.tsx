import Document, { Head, Html, Main, NextScript } from "next/document"

// TODO: Possibly serve these scripts and stylesheets locally.

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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
