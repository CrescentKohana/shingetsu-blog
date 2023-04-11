import { ReactNode, useContext, useState } from "react"
import { getMoonPhase } from "../lib/moon"
import { GlobalContext } from "../pages/_app"
import { FooterImage, Global } from "../types"
import Footer from "./Footer"
import Nav from "./Nav"
import Spinner from "./Spinner"

interface LayoutProps {
  landing?: boolean
  children: ReactNode
}

const Layout = ({ landing, children }: LayoutProps) => {
  const global: Global = useContext(GlobalContext)
  const [imageIndex, setImgIndex] = useState(-1)
  const images = global.footer?.images ?? ([] as FooterImage[])

  const moonPhase = getMoonPhase(Date.now())

  return (
    <div className="stars" style={{ minHeight: "100%" }}>
      <div className={`cloudsRight ${landing ? "cloudsLanding" : "cloudsOther"}`} />
      <div className={`cloudsLeft ${landing ? "cloudsLanding" : "cloudsOther"}`} />
      <div className="twinkling">
        <div className="moonWrap">
          <div className="tsuki" />
          <div className={moonPhase} />
        </div>

        <div style={{ zIndex: 10, pointerEvents: "auto" }}>
          <Nav images={images} imageIndex={imageIndex} setImageIndex={setImgIndex} />
          <Spinner />
          {children}
          <Footer images={images} imageIndex={imageIndex} />
        </div>
      </div>
    </div>
  )
}

export default Layout
