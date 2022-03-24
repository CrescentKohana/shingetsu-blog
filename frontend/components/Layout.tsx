import { ReactNode, useContext, useState } from "react"
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
  const images = global.footer?.images ?? ([] as FooterImage[])

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
