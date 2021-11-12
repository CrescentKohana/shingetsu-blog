import { useSession } from "next-auth/client"
import Link from "next/link"
import styles from "../styles/Nav.module.css"

const Nav = () => {
  const [session] = useSession()

  return (
    <>
      <div id="offcanvas-usage" data-uk-offcanvas>
        <div className="uk-offcanvas-bar">
          <button className="uk-offcanvas-close" type="button" data-uk-close></button>
          <ul className="uk-nav uk-nav-default uk-nav-center" style={{ fontSize: 30 }}>
            <li className="nav-category">
              <Link as="/about" href="/about">
                <a className="uk-link-reset">About</a>
              </Link>
            </li>
            <li className="nav-category">
              <Link as="/blog" href="/blog">
                <a className="uk-link-reset">Blog</a>
              </Link>
            </li>
            <li className="nav-category">
              <Link as="/projects" href="/projects">
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
                {!session?.user ? (
                  <Link href="/api/auth/signin" passHref>
                    <button className="uk-button uk-button-default  uk-button-small">Unlock</button>
                  </Link>
                ) : (
                  <Link href="/api/auth/signout" passHref>
                    <button className="uk-button uk-button-default  uk-button-small">Lock</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              {session?.user ? (
                <li style={{ color: "#FF018A" }}>
                  <Link as="/ecchi" href="/ecchi">
                    <a className="uk-link-reset">Ecchi</a>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link as="/api/auth/signin" href="/api/auth/signin">
                    <a className="uk-link-reset">Ecchi</a>
                  </Link>
                </li>
              )}
              <li>
                <Link href="/">
                  <a className="uk-link-reset">Home</a>
                </Link>
              </li>
              <div className="uk-divider-vertical" style={{ height: "inherit" }} />
              <li>
                <a
                  data-uk-toggle="target: #offcanvas-usage"
                  className="uk-navbar-toggle"
                  data-uk-navbar-toggle-icon
                  href="#"
                >
                  {" "}
                </a>
              </li>
              <li className={`nav-category ${styles.hideItem}`}>
                <Link as="/about" href="/about">
                  <a className="uk-link-reset">About</a>
                </Link>
              </li>
              <li className={`nav-category ${styles.hideItem}`}>
                <Link as="/blog" href="/blog">
                  <a className="uk-link-reset">Blog</a>
                </Link>
              </li>
              <li className={`nav-category ${styles.hideItem}`}>
                <Link as="/projects" href="/projects">
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
