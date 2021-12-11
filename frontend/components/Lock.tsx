import { useSession } from "next-auth/react"
import Link from "next/link"

const Lock = () => {
  const { data: session, status } = useSession()

  return (
    <>
      {status === "loading" ? (
        <Link href="#" passHref>
          <button disabled className="uk-icon-button" uk-icon="more"></button>
        </Link>
      ) : !session?.user ? (
        <Link href="/api/auth/signin" locale={false} passHref>
          <button className="uk-icon-button uk-button-default" uk-icon="lock"></button>
        </Link>
      ) : (
        <Link href="/api/auth/signout" locale={false} passHref>
          <button className="uk-icon-button uk-button-default" uk-icon="unlock"></button>
        </Link>
      )}
    </>
  )
}

export default Lock
