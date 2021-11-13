import Image from "next/image"
import { sauce } from "../lib/api"
import { getMedia } from "../lib/media"
import { Media, SlideCategory } from "../types"

interface SlideshowProps {
  items: Media[]
  category: SlideCategory
  slideshowProps?: string
  slideshowClass?: string
  itemProps?: string
  nav?: boolean
}

const Slideshow = ({ items, category, slideshowProps, itemProps, slideshowClass, nav }: SlideshowProps) => {
  console.log(category === SlideCategory.art)
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
              {(item.caption || category === SlideCategory.art) && (
                <div
                  style={{ padding: 15 }}
                  className="uk-overlay uk-overlay-primary uk-position-bottom-left uk-position-small"
                >
                  <p style={{ color: "#eee", fontSize: 12 }}>
                    {item.caption}{" "}
                    <a target="_blank" rel="noopener noreferrer" href={sauce(getMedia(item))} uk-icon="search" />
                  </p>
                </div>
              )}
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
