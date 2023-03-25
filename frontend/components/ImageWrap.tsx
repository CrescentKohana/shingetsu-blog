import Image from "next/image"
import { getMedia } from "../lib/media"
import { Media } from "../types"

interface ImageProps {
  image: Media
  className: string
  priority?: boolean
  sizes?: string
}

const ImageWrap = ({ image, className, priority, sizes }: ImageProps) => {
  if (!image) {
    return null
  }

  if (image.width && image.height) {
    return (
      <Image
        className={className}
        src={getMedia(image)}
        alt={image.alternativeText || image.name}
        width={image.width}
        height={image.height}
        priority={priority}
        placeholder={image.placeholder ? "blur" : "empty"}
        blurDataURL={image.placeholder}
      />
    )
  }

  return (
    <Image
      className={className}
      src={image.url}
      alt={image.alternativeText || image.name}
      style={{ objectFit: "cover" }}
      sizes={sizes}
      priority={priority}
      placeholder={image.placeholder ? "blur" : "empty"}
      blurDataURL={image.placeholder}
    />
  )
}

export default ImageWrap
