import React, { useEffect, useState } from "react"

interface TypewriterProps {
  strings: string[]
  delay: number
}

const Typewriter = ({ strings, delay }: TypewriterProps) => {
  const [arrIndex, setArrIndex] = useState(0)
  const [stringIndex, setStringIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [reverse, setReverse] = useState(false)

  // Typing
  useEffect(() => {
    if (arrIndex === strings.length) {
      return
    }

    if (stringIndex === strings[arrIndex].length + 1 && arrIndex !== strings.length - 1 && !reverse) {
      setReverse(true)
      return
    }

    if (stringIndex === 0 && reverse) {
      setReverse(false)
      setArrIndex((prev) => prev + 1)
      return
    }

    const timeout = setTimeout(() => {
      setStringIndex((prev) => prev + (reverse ? -1 : 1))
    }, delay)

    return () => clearTimeout(timeout)
  }, [stringIndex, arrIndex, reverse, strings, delay])

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev)
    }, 500)
    return () => clearTimeout(timeout2)
  }, [blink])

  return <span>{`${strings[arrIndex].substring(0, stringIndex)}${blink ? "|" : " "}`}</span>
}

export default Typewriter
