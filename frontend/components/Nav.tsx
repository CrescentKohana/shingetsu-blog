import { useSession } from "next-auth/client"
import Link from "next/link"

const Nav = () => {
  const [session] = useSession()
  console.log("nav", session)

  return (
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
            {session?.user && (
              <li style={{ color: "#FF018A" }}>
                <Link as="/ecchi" href="/ecchi">
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
      </nav>
    </div>
  )
}

export default Nav
