import { useEffect, useRef, useState } from "react"

import useRouteChange from "../lib/hooks/useRouteChange"

const Spinner = () => {
  const { routeChanging } = useRouteChange()
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false)

  const timer = useRef<NodeJS.Timeout>(null)

  useEffect(() => {
    if (routeChanging) {
      timer.current = setTimeout(() => setShouldShowSpinner(true), 100)
    } else {
      setShouldShowSpinner(false)

      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [routeChanging])

  if (!shouldShowSpinner) {
    return null
  }

  return <div style={{ zIndex: 10, position: "absolute", margin: "25px 0 0 50vw" }} data-uk-spinner></div>
}

export default Spinner
