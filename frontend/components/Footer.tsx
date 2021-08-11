import Image from "next/image"
import { useRouter } from "next/router"
import React, { useContext } from "react"
import { getMedia } from "../lib/media"
import { GlobalContext } from "../pages/_app"
import styles from "../styles/Footer.module.css"
import { Global } from "../types/data"

const Footer = ({}) => {
  const global: Global = useContext(GlobalContext)
  const router = useRouter()
  const imgOpacity =
    router.pathname.includes("/article") || router.pathname.includes("/about") ? styles.fadedImg : styles.normalImg

  return (
    <footer>
      {global.footer && global.footer.image.width && global.footer.image.height && (
        <Image
          src={getMedia(global.footer.image)}
          alt={global.footer.image.alternativeText}
          width={global.footer.image.width}
          height={global.footer.image.height}
          layout="responsive"
          className={imgOpacity}
          priority
        />
      )}
    </footer>
  )
}

export default Footer
