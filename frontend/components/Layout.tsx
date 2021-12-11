import { ReactNode } from "react"
import Footer from "./Footer"
import Nav from "./Nav"
import Spinner from "./Spinner"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="custom-container">
      <Nav />
      <Spinner />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
