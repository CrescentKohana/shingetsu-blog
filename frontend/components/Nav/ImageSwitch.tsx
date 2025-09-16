import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import type { Dispatch, SetStateAction } from "react"
import { useEffect } from "react"

import { getValue, setValue, StorageKeys } from "../../lib/localStorage"
import imageSvg from "../../public/icons/uk-image.svg"
import type { FooterImage } from "../../types"

interface Props {
  images: FooterImage[]
  imageIndex: number
  setImageIndex: Dispatch<SetStateAction<number>>
}

const ImageSwitch = ({ images, imageIndex, setImageIndex }: Props) => {
  useEffect(() => {
    if (images.length === 0) {
      return
    }
    if (imageIndex > -1) {
      setValue(StorageKeys.FooterImage, images[imageIndex].id)
      return
    }

    const cachedID = getValue(StorageKeys.FooterImage)
    if (cachedID) {
      const index = images.findIndex((image) => image.id === cachedID)
      if (index !== -1) {
        setImageIndex(index)
        return
      }
    }

    setImageIndex(0)
  }, [images, imageIndex, setImageIndex])

  function nextFooterImage() {
    const next = imageIndex + 1
    setImageIndex(next >= images.length ? 0 : next)
  }

  return (
    <button className="uk-icon-button uk-button-default" onClick={() => nextFooterImage()}>
      <Image alt="Unlock" src={imageSvg as StaticImport} height={30} width={30} />
    </button>
  )
}

export default ImageSwitch
