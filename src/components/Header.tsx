import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import React from 'react'
import ButtonLogout from './ButtonLogout'

const Header = async () => {
    const user = await getCurrentUser()
    console.log(user)
    return (
    <header className='bg-blue-600 p-4'>
        <nav className='flex justify-between items-center max-w-4xl mx-auto'>
        <Link href='/' className='text-white text-2xl font-bold'>MyBlogs</Link>
        <ul className='flex space-x-4 items-center jus'>
            <li>
                <Link 
                href='/blogs'
                className='text-white hover:underline'
                >
                    Blogs
                </Link>
            </li>
            {user?.name ? (
                <ButtonLogout />
            ) : (     
            <li>
                <Link 
                href='/api/auth/signin'
                className='text-white hover:underline'
                >
                    Login
                </Link>
            </li>
            )}
            <li>
                {user?.image ? (
                    <img src={user?.image} alt="" className='rounded-full object-cover w-12 max-sm:block max-sm:mr-1 lg:absolute lg:top-2' />
                ) : (
                    null
                )}
            </li>
        </ul>
        </nav>
    </header>
  )
}

export default Header