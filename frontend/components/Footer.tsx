import Image from "next/image"
import { useRouter } from "next/router"
import { useContext } from "react"
import { getMedia } from "../lib/media"
import { GlobalContext } from "../pages/_app"
import styles from "../styles/Footer.module.css"
import { Global } from "../types"

const Footer = () => {
  const global: Global = useContext(GlobalContext)
  const router = useRouter()
  const imgOpacity =
    router.pathname.includes("/article") || router.pathname.includes("/about") || router.pathname.includes("/ecchi")
      ? styles.fadedImg
      : styles.normalImg

  const image = global?.footer?.image

  return (
    <footer>
      {image && image.width && image.height && (
        <Image
          className={imgOpacity}
          src={getMedia(image)}
          alt={image.alternativeText}
          width={image.width}
          height={image.height}
          layout="responsive"
          sizes="25vw"
          priority
        />
      )}
    </footer>
  )
}

export default Footer
