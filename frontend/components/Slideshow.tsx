import { shuffle } from "../lib/helpers"
import styles from "../styles/Slideshow.module.css"
import { Media, SlideCategory } from "../types"
import Slide from "./Slide"

interface SlideshowProps {
  items: Media[]
  category: SlideCategory
  horizontal: boolean
  slideshowProps?: string
  slideshowClass?: string
  itemProps?: string
  nav?: boolean
}

const Slideshow = ({ items, category, horizontal, slideshowProps, itemProps, slideshowClass, nav }: SlideshowProps) => {
  const shuffled = shuffle(items) as Media[]
  return (
    <div data-uk-slideshow={slideshowProps} className={slideshowClass}>
      <div className="uk-position-relative uk-visible-toggle" tabIndex={-1}>
        <ul className={`uk-slideshow-items ${horizontal ? styles.landscape : styles.portrait}`}>
          {shuffled.map((item) => {
            return (
              <li key={item.name} className={itemProps}>
                <Slide item={item} category={category}></Slide>
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
