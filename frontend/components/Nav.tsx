import Link from "next/link"
import React from "react"

const Nav = () => {
  return (
    <div>
      <nav className="uk-navbar uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            <li>
              <Link as="/about" href="/about">
                <a className="uk-link-reset">About</a>
              </Link>
            </li>
            <div className="uk-divider-vertical" style={{ height: "inherit" }} />
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
