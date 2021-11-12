import Image from "next/image"
import { getMedia } from "../lib/media"
import { Media } from "../types"

interface SlideshowProps {
  items: Media[]
  slideshowProps?: string
  slideshowClass?: string
  itemProps?: string
  nav?: boolean
}

const Slideshow = ({ items, slideshowProps, itemProps, slideshowClass, nav }: SlideshowProps) => {
  return (
    <div data-uk-slideshow={slideshowProps} className={slideshowClass}>
      <div className="uk-position-relative uk-visible-toggle" tabIndex={0}>
        <ul className="uk-slideshow-items">
          {items.map((item, i) => (
            <li key={i} className={itemProps}>
              <Image
                src={getMedia(item)}
                alt={item.alternativeText}
                layout="fill"
                objectFit="cover"
                priority={i === 0}
              />
              <div className="uk-overlay uk-overlay-primary uk-position-bottom-left uk-position-small uk-width-1-2">
                <p style={{ color: "#eee" }}>{item.caption}</p>
              </div>
            </li>
          ))}
        </ul>

        <a
          className="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          data-uk-slidenav-previous
          data-uk-slideshow-item="previous"
        ></a>
        <a
          className="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          data-uk-slidenav-next
          data-uk-slideshow-item="next"
        ></a>
      </div>

      {nav && <ul className="uk-slideshow-nav uk-dotnav uk-flex-center uk-margin"></ul>}
    </div>
  )
}

export default Slideshow
