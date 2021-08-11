import { ReactNode } from "react"
import { Category } from "../types/page"
import Footer from "./Footer"
import Nav from "./Nav"

interface LayoutProps {
  children: ReactNode
  categories: Category[]
}

const Layout = ({ children, categories }: LayoutProps) => {
  return (
    <div className="custom-container">
      <Nav categories={categories} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
