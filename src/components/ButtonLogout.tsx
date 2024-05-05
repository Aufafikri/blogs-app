'use client'

import { signOut } from "next-auth/react"

const ButtonLogout = () => {
  return (
    <div>
        <button onClick={() => signOut()} className="text-white hover:underline">Logout</button>
    </div>
  )
}

export default ButtonLogout