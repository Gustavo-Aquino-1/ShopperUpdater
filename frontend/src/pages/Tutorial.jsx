import React from 'react'
import tutorial from '../video/tutorial-sistema-de-atualizacao-shopper.mp4'
import { Link } from 'react-router-dom'

function Tutorial() {
  return (
    <div className='flex flex-col items-center mt-10 text-2xl gap-10'>
      <h1>Confira abaixo como utilizar esse sistema de atualização de produtos da Shopper!!</h1>
      <video className='p-5 bg-slate-800' width={1200} height={800} controls>
        <source src={tutorial} />
      </video>

      <Link className="text-blue-600 underline" to="/">Atualizar Produtos</Link>
    </div>
  )
}

export default Tutorial