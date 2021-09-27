import Link from "next/link"
import React from "react"
import { Category } from "../types"

interface NavProps {
  categories: Category[]
}

const Nav = ({ categories }: NavProps) => {
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
              <Link as={`/about`} href="/about">
                <a className="uk-link-reset">About</a>
              </Link>
            </li>
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link as={`/category/${category.slug}`} href="/category/[slug]">
                    <a className="uk-link-reset">{category.name}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
