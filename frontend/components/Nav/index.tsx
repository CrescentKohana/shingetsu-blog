import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction } from "react"
import englishSvg from "../../public/icons/en.svg"
import japaneseSvg from "../../public/icons/ja.svg"
import styles from "../../styles/Nav.module.css"
import { FooterImage } from "../../types"
import ImageSwitch from "./ImageSwitch"
import Lock from "./Lock"

interface Props {
  images: FooterImage[]
  imageIndex: number
  setImageIndex: Dispatch<SetStateAction<number>>
}

const Nav = ({ images, imageIndex, setImageIndex }: Props) => {
  const router = useRouter()
  const { pathname, asPath, query } = router
  const ja = router.locale === "ja"
  const { data: session } = useSession()

  const switchLocale = () => {
    router.push({ pathname, query }, asPath, { locale: ja ? "en" : "ja" })
  }

  return (
    <>
      <div id="offcanvas-usage" data-uk-offcanvas>
        <div className="uk-offcanvas-bar">
          <button className="uk-offcanvas-close" type="button" data-uk-close></button>
          <ul className="uk-nav uk-nav-default uk-nav-center" style={{ fontSize: 30 }}>
            <li className="nav-category">
              <Link href="/about">
                <a className="uk-link-reset">About</a>
              </Link>
            </li>
            <li className="nav-category">
              <Link href="/blog">
                <a className="uk-link-reset">Blog</a>
              </Link>
            </li>
            <li className="nav-category">
              <Link href="/projects">
                <a className="uk-link-reset">Projects</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <nav className="uk-navbar uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li style={{ paddingLeft: 10 }}>
                <button className="uk-icon-button uk-button-default" onClick={() => switchLocale()}>
                  {ja ? (
                    <Image alt="Japanese" src={japaneseSvg} height={30} width={30} priority />
                  ) : (
                    <Image alt="English" src={englishSvg} height={30} width={30} priority />
                  )}
                </button>
              </li>
              <li style={{ paddingLeft: 10 }}>
                <Lock />
              </li>
              <li style={{ paddingLeft: 10 }}>
                <ImageSwitch images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              {session?.user && (
                <li style={{ color: "#FF018A" }}>
                  <Link href="/ecchi">
                    <a className="uk-link-reset">Ecchi</a>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/">
                  <a className="uk-link-reset">Home</a>
                </Link>
              </li>
              <li className="uk-divider-vertical" style={{ height: "inherit" }} />
              <li>
                <button
                  aria-label="Mobile nav"
                  data-uk-toggle="target: #offcanvas-usage"
                  className={`uk-navbar-toggle ${styles.hideBtn}`}
                  data-uk-navbar-toggle-icon
                >
                  {" "}
                </button>
              </li>
              <li className={`nav-category ${styles.hideItem}`}>
                <Link href="/about">
                  <a className="uk-link-reset">About</a>
                </Link>
              </li>
              <li className={`nav-category ${styles.hideItem}`}>
                <Link href="/blog">
                  <a className="uk-link-reset">Blog</a>
                </Link>
              </li>
              <li className={`nav-category ${styles.hideItem}`}>
                <Link href="/projects">
                  <a className="uk-link-reset">Projects</a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Nav
