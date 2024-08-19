import Link from 'next/link'
import React from 'react'
import styles from './header.module.css'
import Navbar from './Navbar'
import  {cookies} from 'next/headers'
import { verifyTokenForPage } from '@/utils/verifyToken';
import LougoutButton from './LougoutButton'


const Header = () => {
  const token = cookies().get('authToken')?.value || ''

  const payload = verifyTokenForPage(token)

  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin}/>
      <div className={styles.right}>
        {payload ? (
          <>
            <strong className="text-blue-800 md:text-xl capitalize">
              {payload?.username}
            </strong>
            <LougoutButton />
          </>
        ) : (
          <>
            <Link className={styles.btn} href="/login">
              Login
            </Link>
            <Link className={styles.btn} href="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header