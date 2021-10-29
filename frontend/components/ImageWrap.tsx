import Image from "next/image"
import { getMedia } from "../lib/media"
import { Media } from "../types"

interface ImageProps {
  image: Media
  className: string
  priority?: boolean
}

const ImageWrap = ({ image, className, priority }: ImageProps) => {
  if (!image) {
    return null
  }

  if (image.width && image.height) {
    return (
      <Image
        src={getMedia(image)}
        alt={image.alternativeText || image.name}
        width={image.width}
        height={image.height}
        layout="responsive"
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={getMedia(image)}
      alt={image.alternativeText || image.name}
      layout="fill"
      className={className}
      priority={priority}
    />
  )
}

export default ImageWrap
