/* eslint-disable react/jsx-no-undef */
import Image from "next/image"
import { Dispatch, SetStateAction, useEffect } from "react"
import { shuffle } from "../../lib/helpers"
import { getValue, setValue, StorageKeys } from "../../lib/localStorage"
import imageSvg from "../../public/icons/uk-image.svg"
import { FooterImage } from "../../types"

interface Props {
  images: FooterImage[]
  imageIndex: number
  setImageIndex: Dispatch<SetStateAction<number>>
}

const ImageSwitch = ({ images, imageIndex, setImageIndex }: Props) => {
  useEffect(() => {
    if (imageIndex > -1 || images.length === 0) {
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

    const randomImage = shuffle(images)[0] as FooterImage
    const index = images.findIndex((image) => image.id === randomImage.id)
    setImageIndex(index)
    setValue(StorageKeys.FooterImage, randomImage.id)
  }, [images, imageIndex, setImageIndex])

  function nextFooterImage() {
    const next = imageIndex + 1
    setImageIndex(next >= images.length ? 0 : next)
  }

  return (
    <button className="uk-icon-button uk-button-default" onClick={() => nextFooterImage()}>
      <Image alt="Unlock" src={imageSvg} height={30} width={30} />
    </button>
  )
}

export default ImageSwitch
