import { getSession, GetSessionOptions } from "next-auth/client"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import Slideshow from "../components/Slideshow"
import { fetchApi } from "../lib/api"
import { shuffle } from "../lib/helpers"
import { getMedia } from "../lib/media"
import { Ecchi, Media } from "../types"

interface EcchiProps {
  ecchi: Ecchi
}

const defaultAnimation = "animation: fade; autoplay: true; min-height: 500; max-height: 500"

const Ecchi = ({ ecchi }: EcchiProps) => {
  const seo = {
    metaTitle: "Ecchi - えっち",
    metaDescription: "エッチ",
  }

  const horizontalArt = ecchi.art.filter((art) => !art.horizontal)
  const verticalArt = ecchi.art.filter((art) => art.horizontal)

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
          <div className="uk-child-width-1-4@s" data-uk-grid>
            <Slideshow
              items={shuffle(horizontalArt[0].media) as Media[]}
              slideshowProps={defaultAnimation}
              itemProps="uk-animation-kenburns uk-animation-reverse"
            />
            <Slideshow items={shuffle(ecchi.doujinshi[0].covers) as Media[]} slideshowProps={defaultAnimation} />
            <Slideshow items={shuffle(ecchi.doujinshi[1].covers) as Media[]} slideshowProps={defaultAnimation} />
            <Slideshow items={shuffle(ecchi.doujinshi[2].covers) as Media[]} slideshowProps={defaultAnimation} />
          </div>

          <div className="uk-child-width-1-1@s" data-uk-grid>
            <Slideshow
              items={shuffle(verticalArt[0].media) as Media[]}
              slideshowProps="animation: scale; autoplay: true; min-height: 1000; max-height: 1000"
            />
          </div>

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

  return {
    props: { ecchi, session: session },
  }
}

export default Ecchi
