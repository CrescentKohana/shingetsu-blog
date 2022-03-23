import { ReactNode, useContext, useMemo, useState } from "react"
import { shuffle } from "../lib/helpers"
import { GlobalContext } from "../pages/_app"
import { FooterImage, Global } from "../types"
import Footer from "./Footer"
import Nav from "./Nav"
import Spinner from "./Spinner"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const global: Global = useContext(GlobalContext)
  const [imageIndex, setImgIndex] = useState(-1)

  // Shuffles images only on the first render.
  const images = useMemo(() => shuffle(global.footer?.images ?? []) as FooterImage[], [global.footer?.images])

  return (
    <div className="custom-container">
      <Nav images={images} imageIndex={imageIndex} setImageIndex={setImgIndex} />
      <Spinner />
      {children}
      <Footer images={images} imageIndex={imageIndex} />
    </div>
  )
}

export default Layout
