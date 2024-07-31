
import React from 'react'
import { Link } from 'react-router-dom'
import { constRoutes } from '../../../lib/paths'

export const Logo = () => {
  return (
    <Link to={constRoutes.HOME}>
      <div className="flex gap-2.5">
        <img
          src="../public/logo.svg"
          alt="Логотип"
          width={183}
          height={29}
        />
      </div>
    </Link>
  )
}

