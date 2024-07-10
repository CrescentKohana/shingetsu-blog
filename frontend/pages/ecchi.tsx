import { getSession, GetSessionParams } from "next-auth/react"
import { MDXRemote } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Image from "next/image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SlideshowGrid from "../components/SlideshowGrid"
import { fetchApi } from "../lib/api"
import { getMedia } from "../lib/media"
import { MDXSerialized, type Ecchi } from "../types"

interface EcchiProps {
  ecchi: Ecchi
}

const Ecchi = ({ ecchi }: EcchiProps) => {
  const seo = {
    metaTitle: "Ecchi - えっち",
    metaDescription: "エッチ",
  }

  const overlay = ecchi.overlay[Math.floor(Math.random() * ecchi.overlay.length)]

  const content = ecchi.content as MDXSerialized
  const lowerContent = ecchi.lowerContent as MDXSerialized

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
            <div key={overlay.name} style={{ height: 200 }}>
              <Image
                src={getMedia(overlay)}
                alt={overlay.alternativeText}
                width={overlay.width}
                height={overlay.height}
                priority
              />
            </div>
            <MDXRemote {...content} />
          </div>

          <hr className="uk-divider-icon" />
          <SlideshowGrid sliders={ecchi.sliders} />
          <MDXRemote {...lowerContent} />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  const ecchi = await fetchApi(`/ecchi?token=${session.user?.name}&populate=header,overlay,sliders.media`)

  if (!ecchi) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }

  // TODO: Dynamically generate placeholders. Cannot be done here when SSR is used.
  // Switch to SSG, or even better, generate them in backend.

  const mdxSource = await serialize(ecchi.content)

  const mdxSource2 = await serialize(ecchi.lowerContent)

  return {
    props: { ecchi: { ...ecchi, content: mdxSource, lowerContent: mdxSource2 }, session: session },
  }
}

export default Ecchi
