import Image from "next/image"
import { getMedia } from "../lib/media"
import { Media } from "../types"

interface ImageProps {
  image: Media
  className: string
}

const ImageWrap = ({ image, className }: ImageProps) => {
  if (image.width && image.height) {
    return (
      <Image
        src={getMedia(image)}
        alt={image.alternativeText || image.name}
        width={image.width}
        height={image.height}
        layout="responsive"
        className={className}
      />
    )
  }

  return <Image src={getMedia(image)} alt={image.alternativeText || image.name} layout="fill" />
}

export default ImageWrap
