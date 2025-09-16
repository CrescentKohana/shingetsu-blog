import { useSession } from "next-auth/react"
import type { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import Link from "next/link"

import lockedSvg from "../../public/icons/uk-locked.svg"
import unlockedSvg from "../../public/icons/uk-unlocked.svg"

const Lock = () => {
  const { data: session, status } = useSession()

  return (
    <span>
      {status === "loading" ? (
        <Link href="#" passHref>
          <button disabled className="uk-icon-button uk-button-default">
            …
          </button>
        </Link>
      ) : !session?.user ? (
        <Link href="/api/auth/signin" locale={false} passHref>
          <button className="uk-icon-button uk-button-default">
            <Image alt="Unlock" src={lockedSvg as StaticImport} height={30} width={30} />
          </button>
        </Link>
      ) : (
        <Link href="/api/auth/signout" locale={false} passHref>
          <button className="uk-icon-button uk-button-default">
            <Image alt="Lock" src={unlockedSvg as StaticImport} height={30} width={30} />
          </button>
        </Link>
      )}
    </span>
  )
}

export default Lock
