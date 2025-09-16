import Image from "next/image"
import { useRouter } from "next/router"

import type { FooterImage } from "../types"

import styles from "../styles/Footer.module.css"

interface Props {
  images: FooterImage[]
  imageIndex: number
}

const Footer = ({ images, imageIndex }: Props) => {
  const router = useRouter()

  if (imageIndex === -1 || images.length === 0) {
    return <footer></footer>
  }

  const item = images[imageIndex]
  const width = item.width ? item.width : "20vw"
  const maxWidth = item.maxWidth ? item.maxWidth : "50vh"
  const imgOpacity =
    router.pathname.includes("/article") || router.pathname.includes("/about") || router.pathname.includes("/ecchi")
      ? styles.fadedImg
      : styles.normalImg

  return (
    <footer style={{ width, maxWidth }}>
      {item.image && (
        <Image
          className={imgOpacity}
          src={item.image.url}
          alt={item.image.alternativeText}
          width={item.image.width}
          height={item.image.height}
          sizes="75vw"
          priority
        />
      )}
    </footer>
  )
}

export default Footer
