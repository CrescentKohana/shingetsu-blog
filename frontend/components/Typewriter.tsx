import React, { useEffect, useState } from "react"

interface TypewriterProps {
  strings: string[]
  delay: number
}

const Typewriter = ({ strings, delay }: TypewriterProps) => {
  const [arrIndex, setArrIndex] = useState(0)
  const [strIndex, setStrIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [reverse, setReverse] = useState(false)

  // Typing
  useEffect(() => {
    if (arrIndex === strings.length) {
      return
    }

    if (strIndex === strings[arrIndex].length + 1 && arrIndex !== strings.length - 1 && !reverse) {
      setReverse(true)
      return
    }

    if (strIndex === 0 && reverse) {
      setReverse(false)
      setArrIndex((prev) => prev + 1)
      return
    }

    const timeout = setTimeout(() => {
      setStrIndex((prev) => prev + (reverse ? -1 : 1))
    }, delay)

    return () => clearTimeout(timeout)
  }, [strIndex, arrIndex, reverse, strings, delay])

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearTimeout(timeout2)
  }, [blink])

  // Hidden text to combat Cumulative Layout Shift (https://web.dev/cls)
  return (
    <>
      <span style={{ position: "absolute", paddingRight: "10px" }}>
        {`${strings[arrIndex].substring(0, strIndex)}${blink ? "|" : " "}`}
      </span>
      <span style={{ visibility: "hidden" }}>{strings[arrIndex]}</span>
    </>
  )
}

export default Typewriter
