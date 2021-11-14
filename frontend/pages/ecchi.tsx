import { getSession, GetSessionOptions } from "next-auth/client"
import { getPlaiceholder } from "plaiceholder"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SlideshowGrid from "../components/SlideshowGrid"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
import { Ecchi, Media, SlideCategory, Slider } from "../types"

interface EcchiProps {
  ecchi: Ecchi
}

const Ecchi = ({ ecchi }: EcchiProps) => {
  const seo = {
    metaTitle: "Ecchi - えっち",
    metaDescription: "エッチ",
  }

  return (
    <Layout>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <div className="uk-child-width-1-2@s" data-uk-grid>
            <div>
              <div
                id="eresh-target"
                className="uk-background-cover uk-flex uk-flex-top"
                uk-parallax="bgy: 500"
                style={{ backgroundImage: `url('${getMedia(ecchi.header)}')`, height: 700 }}
              >
                <h2
                  className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical"
                  uk-parallax="target: #eresh-target; y: 200,100; rotate: 20; blur: 10;"
                >
                  えっち
                </h2>
              </div>
            </div>
            <div>
              <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{ecchi.content}</Markdown>
            </div>
          </div>

          <hr className="uk-divider-icon" />
          {<SlideshowGrid sliders={ecchi.sliders} />}

          <Markdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{ecchi.lowerContent}</Markdown>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context: GetSessionOptions) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  const ecchi = await fetchApi(`/h?token=${session.user?.name}`)

  if (!ecchi) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  const slidersWithPlaceholders = await Promise.all(
    ecchi.sliders.map(async (slider: Slider) => {
      if (slider.category !== SlideCategory.video) {
        const media: Media[] = await Promise.all(
          slider.media.map(async (item: Media) => {
            const { base64 } = await getPlaiceholder(getMedia(item))
            return { ...item, placeholder: base64 }
          })
        )

        return { ...slider, media }
      }

      return slider
    })
  )

  return {
    props: { ecchi: { ...ecchi, sliders: slidersWithPlaceholders }, session: session },
  }
}

export default Ecchi
