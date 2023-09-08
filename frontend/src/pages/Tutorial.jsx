import React from 'react'
import { Link } from 'react-router-dom'

function Tutorial() {
  return (
    <div className='flex flex-col items-center mt-10 text-2xl gap-10'>
      <h1>
        Confira abaixo como utilizar esse sistema de atualização de produtos da
        Shopper!!
      </h1>

      <Link className='text-blue-600 underline' to='/'>
        Atualizar Produtos
      </Link>
    </div>
  )
}

export default Tutorial
