import Image from "next/image"
import { sauce } from "../lib/api"
import { shuffle } from "../lib/helpers"
import { defaultPlaceholder, getMedia } from "../lib/media"
import styles from "../styles/Slideshow.module.css"
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
  const shuffled = shuffle(items) as Media[]
  return (
    <div data-uk-slideshow={slideshowProps} className={slideshowClass}>
      <div className="uk-position-relative uk-visible-toggle" tabIndex={-1}>
        <ul className={`uk-slideshow-items ${styles.forceAspectRatio}`}>
          {shuffled.map((item, i) => {
            return (
              <li key={i} className={itemProps}>
                {category === SlideCategory.video ? (
                  <video src={getMedia(item)} loop muted playsInline data-uk-cover uk-video="autoplay: inview"></video>
                ) : (
                  <Image
                    src={getMedia(item)}
                    alt={item.alternativeText}
                    layout="fill"
                    objectFit="cover"
                    priority={i === 0}
                    placeholder={"blur"}
                    blurDataURL={defaultPlaceholder}
                  />
                )}
                {(item.caption || category === SlideCategory.art) && (
                  <div
                    style={{ padding: 15 }}
                    className="uk-overlay uk-overlay-primary uk-position-bottom-left uk-position-small"
                  >
                    <p style={{ color: "#eee", fontSize: 12 }}>
                      {item.caption}{" "}
                      {category === SlideCategory.art && (
                        <a target="_blank" rel="noopener noreferrer" href={sauce(item.url)} uk-icon="search">
                          🔎
                        </a>
                      )}
                    </p>
                  </div>
                )}
              </li>
            )
          })}
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
