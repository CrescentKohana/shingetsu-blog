/* eslint-disable react/jsx-no-undef */
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const Lock = () => {
  const { data: session, status } = useSession()

  return (
    <>
      {status === "loading" ? (
        <Link href="#" passHref>
          <button disabled className="uk-icon-button">
            <Image alt="loading" src="/icons/loading.svg" height={30} width={30} unoptimized />
          </button>
        </Link>
      ) : !session?.user ? (
        <Link href="/api/auth/signin" locale={false} passHref>
          <button className="uk-icon-button uk-button-default">
            <Image alt="Unlock" src="/icons/uk-locked.svg" height={30} width={30} unoptimized />
          </button>
        </Link>
      ) : (
        <Link href="/api/auth/signout" locale={false} passHref>
          <button className="uk-icon-button uk-button-default">
            <Image alt="Lock" src="/icons/uk-unlocked.svg" height={30} width={30} unoptimized />
          </button>
        </Link>
      )}
    </>
  )
}

export default Lock
