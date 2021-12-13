import Image from "next/image"
import React, { ReactNode } from "react"
import { defaultPlaceholder, extractPixiv, getMedia, sauce } from "../lib/media"
import pixivSvg from "../public/icons/pixiv.svg"
import { Media, MediaFormat, SlideCategory } from "../types"

interface SlideProps {
  item: Media
  category: SlideCategory
}

interface Overlay {
  label: ReactNode | null
  source: ReactNode | null
}

const Slide = ({ item, category }: SlideProps) => {
  const originalUrl = getMedia(item)
  const pixivId = category === SlideCategory.art ? extractPixiv(item.caption) : null
  const overlay: Overlay = { label: null, source: null }

  if (item.caption || category === SlideCategory.art) {
    overlay.label = (
      <div style={{ padding: 10 }} className="uk-overlay uk-overlay-primary uk-position-bottom-left uk-position-small">
        <p style={{ color: "#fff", fontSize: 12 }}>{item.caption}</p>
      </div>
    )
  }

  if (category === SlideCategory.art) {
    overlay.source = (
      <div className="uk-position-top-left uk-position-small">
        {pixivId ? (
          <a target="_blank" rel="noopener noreferrer" href={`https://www.pixiv.net/en/artworks/${pixivId}`}>
            <Image alt="Lock" src={pixivSvg} height={40} width={40} />
          </a>
        ) : (
          <a target="_blank" rel="noopener noreferrer" href={sauce(originalUrl)} style={{ fontSize: 26 }}>
            🔎
          </a>
        )}
      </div>
    )
  }

  return (
    <>
      <div data-uk-lightbox="video-autoplay: true;">
        {category === SlideCategory.video ? (
          <a href={originalUrl} data-alt={item.alternativeText}>
            <video src={originalUrl} loop muted playsInline data-uk-cover uk-video="autoplay: inview"></video>
          </a>
        ) : (
          <a href={originalUrl} data-alt={item.alternativeText} data-caption={item.caption}>
            <Image
              src={getMedia(item, MediaFormat.large)}
              alt={item.alternativeText}
              layout="fill"
              objectFit="cover"
              placeholder={"blur"}
              blurDataURL={defaultPlaceholder}
            />
          </a>
        )}
      </div>
      {overlay.label}
      {overlay.source}
    </>
  )
}

export default Slide
