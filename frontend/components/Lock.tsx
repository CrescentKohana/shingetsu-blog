import { useSession } from "next-auth/react"
import Link from "next/link"

const Lock = () => {
  const { data: session, status } = useSession()

  return (
    <>
      {status === "loading" ? (
        <Link href="#" passHref>
          <button className="uk-button uk-button-default uk-button-small" disabled>
            ⌛
          </button>
        </Link>
      ) : !session?.user ? (
        <Link href="/api/auth/signin" locale={false} passHref>
          <button className="uk-button uk-button-default uk-button-small">🔒</button>
        </Link>
      ) : (
        <Link href="/api/auth/signout" locale={false} passHref>
          <button className="uk-button uk-button-default uk-button-small">🔓</button>
        </Link>
      )}
    </>
  )
}

export default Lock
