import { ReactNode } from "react"
import Footer from "./Footer"
import Nav from "./Nav"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="custom-container">
      <Nav />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
