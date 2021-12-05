import Image from "next/image"
import { getMedia } from "../lib/media"
import { MediaWrap } from "../types"

interface ImageProps {
  imageData: MediaWrap
  className: string
  priority?: boolean
}

const ImageWrap = ({ imageData, className, priority }: ImageProps) => {
  if (!imageData?.data) {
    return null
  }

  const image = getMedia(false, imageData)

  if (image.width && image.height) {
    return (
      <Image
        className={className}
        src={image.url}
        alt={image.alternativeText || image.name}
        width={image.width}
        height={image.height}
        layout="responsive"
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
      layout="fill"
      priority={priority}
      placeholder={image.placeholder ? "blur" : "empty"}
      blurDataURL={image.placeholder}
    />
  )
}

export default ImageWrap
