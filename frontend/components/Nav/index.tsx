import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
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

  // The data-uk-close attribute causes hydration errors in React 18. This fixes it.
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => {
    setIsSSR(false)
  }, [])

  const switchLocale = () => {
    router.push({ pathname, query }, asPath, { locale: ja ? "en" : "ja" })
  }

  return (
    <>
      <div id="offcanvas-usage" data-uk-offcanvas>
        <div className="uk-offcanvas-bar">
          <button className="uk-offcanvas-close" type="button" />
          <ul className="uk-nav uk-nav-default uk-nav-center" style={{ fontSize: 30 }}>
            <li className="nav-category">
              <Link href="/about" className="uk-link-reset">
                About
              </Link>
            </li>
            <li className="nav-category">
              <Link href="/blog" className="uk-link-reset">
                Blog
              </Link>
            </li>
            <li className="nav-category">
              <Link href="/projects" className="uk-link-reset">
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <nav className="uk-navbar uk-navbar-container" data-uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav" style={{ paddingLeft: 10 }}>
              <li>
                <button className="uk-icon-button uk-button-default" onClick={() => switchLocale()}>
                  {ja ? (
                    <Image alt="Japanese" src={japaneseSvg} height={30} width={30} priority />
                  ) : (
                    <Image alt="English" src={englishSvg} height={30} width={30} priority />
                  )}
                </button>
              </li>
              <li>
                <Lock />
              </li>
              <li>
                <ImageSwitch images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              {session?.user && (
                <li style={{ color: "#FF018A" }}>
                  <Link href="/ecchi" className="uk-link-reset">
                    Ecchi
                  </Link>
                </li>
              )}
              <li>
                <Link href="/" className="uk-link-reset">
                  Home
                </Link>
              </li>
              <li className="uk-divider-vertical" style={{ height: "inherit" }} />
              {!isSSR && (
                <li>
                  <button
                    style={{ paddingRight: 20 }}
                    aria-label="Mobile nav"
                    data-uk-toggle="target: #offcanvas-usage"
                    className={`uk-navbar-toggle ${styles.hideBtn}`}
                    data-uk-navbar-toggle-icon
                  />
                </li>
              )}
              <li className={`nav-category ${styles.hideItem}`}>
                <Link href="/about" className="uk-link-reset">
                  About
                </Link>
              </li>
              <li className={`nav-category ${styles.hideItem}`}>
                <Link href="/blog" className="uk-link-reset">
                  Blog
                </Link>
              </li>
              <li className={`nav-category ${styles.hideItem}`} style={{ paddingRight: 20 }}>
                <Link href="/projects" className="uk-link-reset">
                  Projects
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
