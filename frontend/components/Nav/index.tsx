import { useSession } from "next-auth/react"
import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import type { Dispatch, SetStateAction } from "react"
import { useEffect, useState } from "react"
import Switch from "react-switch"

import englishSvg from "../../public/icons/en.svg"
import japaneseSvg from "../../public/icons/ja.svg"
import styles from "../../styles/Nav.module.css"
import type { FooterImage } from "../../types"
import ImageSwitch from "./ImageSwitch"
import Lock from "./Lock"

interface Props {
  images: FooterImage[]
  imageIndex: number
  setImageIndex: Dispatch<SetStateAction<number>>
}

const Nav = ({ images, imageIndex, setImageIndex }: Props) => {
  const router = useRouter()
  const { data: session } = useSession()

  const { pathname, asPath, query } = router
  const ja = router.locale === "ja"

  // The data-uk-close attribute causes hydration errors in React 18. This fixes it.
  // TODO: Check for React 19+
  const [isSSR, setIsSSR] = useState(true)
  useEffect(() => {
    setIsSSR(false)
  }, [])

  const switchLocale = async () => {
    await router.push({ pathname, query }, asPath, { locale: ja ? "en" : "ja" })
  }

  const jpFlag = <Image alt="Japanese" src={japaneseSvg as StaticImport} height={40} width={40} priority />
  const ukFlag = <Image alt="English" src={englishSvg as StaticImport} height={40} width={40} priority />

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
            <ul className="uk-navbar-nav" style={{ paddingLeft: 30 }}>
              <li>
                <Switch
                  checked={ja}
                  onChange={() => void switchLocale()}
                  handleDiameter={40}
                  offColor="#010617"
                  onColor="#010617"
                  offHandleColor="#010617"
                  onHandleColor="#010617"
                  height={40}
                  width={80}
                  uncheckedIcon={<span style={{ filter: "grayscale(100%)" }}>{jpFlag}</span>}
                  checkedIcon={<span style={{ filter: "grayscale(100%)" }}>{ukFlag}</span>}
                  uncheckedHandleIcon={ukFlag}
                  checkedHandleIcon={jpFlag}
                />
              </li>
              <li>
                <ImageSwitch images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} />
              </li>
              <li>
                <Lock />
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
                <li className={styles.hideBtn}>
                  <button
                    style={{ paddingRight: 20 }}
                    aria-label="Mobile navigation toggle"
                    data-uk-toggle="target: #offcanvas-usage"
                    className="uk-navbar-toggle"
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
