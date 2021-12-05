import { shuffle } from "../lib/helpers"
import useHasMounted from "../lib/hooks/hasMounted"
import { Slider } from "../types"
import Slideshow from "./Slideshow"

interface SlideshowGridProps {
  sliders: Slider[]
}

const ROW_SIZE = 2

const SlideshowGrid = ({ sliders }: SlideshowGridProps) => {
  // Without this, the grid will sometimes render improperly
  const hasMounted = useHasMounted()

  const verticalSliders = sliders.filter((slider) => !slider.horizontal)
  const horizontalSliders = sliders.filter((slider) => slider.horizontal)

  const verticalChunks = [...Array(Math.floor(verticalSliders.length / ROW_SIZE))].map((_, i) =>
    verticalSliders.slice(i * ROW_SIZE, i * ROW_SIZE + ROW_SIZE)
  )

  const shuffled = shuffle([...verticalChunks, ...horizontalSliders]) as [Slider | Slider[]]

  const blocks = shuffled.map((slider) => {
    if (slider instanceof Array) {
      return (
        <div
          className="uk-grid-collapse uk-child-width-1-1 uk-child-width-1-2@m"
          data-uk-grid
          style={{ marginTop: 20 }}
        >
          {slider.map((slider) => (
            <Slideshow
              key={slider.id}
              items={slider.media.data.map((media) => media.attributes)}
              category={slider.category}
              slideshowProps="animation: scale; autoplay: true; min-height: 490"
            />
          ))}
        </div>
      )
    } else {
      return (
        <div key={slider.id} style={{ marginTop: 20 }}>
          <Slideshow
            items={slider.media.data.map((media) => media.attributes)}
            category={slider.category}
            slideshowProps="animation: scale; autoplay: true; min-height: 490; max-height: 490"
          />
        </div>
      )
    }
  })

  return (
    <>
      {hasMounted && (
        <div className="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" data-uk-grid>
          {blocks}
        </div>
      )}
    </>
  )
}

export default SlideshowGrid
