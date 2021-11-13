import { useEffect, useState } from "react"

// https://github.com/vercel/next.js/issues/7417#issuecomment-660241345
export default function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted
}
