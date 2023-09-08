import React, { useState } from 'react'
import papa from 'papaparse'
import { AiFillCheckCircle } from 'react-icons/ai'
import { BiSolidError } from 'react-icons/bi'
import { Link } from 'react-router-dom'
// import '../index.css'

function UpdateProduct() {
  const [file, setFile] = useState([])
  const [canUpdate, setCanUpdate] = useState(false)
  const [errors, setErrors] = useState({})
  const [products, setProducts] = useState([])
  const [isValidated, setIsValidated] = useState(false)

  const clear = () => {
    setFile([])
    setErrors([])
    setIsValidated(false)
    setCanUpdate(false)
  }

  const handleFile = (e) => {
    setProducts([])
    setErrors({})
    setIsValidated(false)
    try {
      const file = e.target.files[0]
      papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => {
          setFile(res.data)
        },
      })
    } catch (error) {
      setFile([])
      setProducts([])
      setCanUpdate(false)
    }
  }

  const update = async () => {
    if (!file) return alert('Please, select csv file')

    const response = await fetch('http://localhost:3001/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(file),
    })

    if (response.status === 200) {
      const responseUpdate = await fetch('http://localhost:3001/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(file),
      })
      if (responseUpdate.status === 204) {
        alert('Atualização realizada com sucesso!!')
        clear()
      } else {
        alert(
          'Houve algum erro durante a atualização, tente novamente mais tarde!',
        )
      }
      return
    }

    alert('Erro na validação!!')
  }

  const validateUpdate = async () => {
    if (!file.length) return alert('Please, select csv file')
    if (isValidated) return

    const response = await fetch('http://localhost:3001/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(file),
    })

    const data = await response.json()
    if (!data[1]) {
      alert(
        "Campos faltantes ou em formato incorreto no arquivo csv " +
        "veja em 'Como utilizar' para mandar o arquivo corretamente"
      )
      return
    }

    const [findErrors, products] = data
    if (response.status === 200) {
      setProducts(products)
      setIsValidated(true)
      setCanUpdate(true)
      return
    }

    setErrors(findErrors)
    setProducts(products)
    setCanUpdate(false)
    setIsValidated(true)
  }

  return (
    <div className='h-full h-screen p-5 flex flex-col center'>
      <div className='flex justify-between'>
        <h1 className='pb-2 text-3xl text-emerald-800 font-light'>
          Shopper - Atualização produtos
        </h1>
        <Link
          className='pb-2 text-3xl mb-7 text-emerald-800 font-light mr-3'
          to='/tutorial'
        >
          Como Utilizar ?
        </Link>
      </div>

      <div>
        <input type='file' accept='.csv' onChange={handleFile} />
      </div>

      <div className='flex justify-center mb-20'>
        <button className='btn_app bg-emerald-800' onClick={validateUpdate}>
          Validate
        </button>

        <button
          onClick={update}
          disabled={!canUpdate}
          className='btn_app bg-blue-950'
        >
          Update
        </button>
      </div>

      {isValidated && (
        <div className='flex flex-col gap-10 w-[80%] self-center pb-20'>
          {products?.map((e) => (
            <div
              className='flex border-gray-400 border-2 border rounded max-md:block'
              key={e.code}
            >
              <div
                className='flex text-lg flex-col gap-8 bg-emerald-600 w-[100%] text-white p-5'
                id='infos'
              >
                <h1 className='text-2xl font-bold'>Informações</h1>
                <p>Codigo - {e.code}</p>
                <p>Nome - {e.name}</p>
                <p>Preço Atual - {e.salesPrice}</p>
                <p>
                  Novo Preço -
                  {
                    file.find(
                      (el) => Number(el.product_code) === Number(e.code),
                    ).new_price
                  }
                </p>
              </div>

              <div className='bg-emerald-100 w-full p-5' id='errors'>
                {errors[String(e.code)]?.length ? (
                  <div className='flex flex-col justify-end'>
                    <p className='flex items-center self-center text-2xl'>
                      Erro na validação {<BiSolidError color='orange' />}
                    </p>
                    <ul className='max-w-[300px] text-justify mt-5 self-center text-lg'>
                      {errors[String(e.code)].map((e, i) => (
                        <li className='list-disc' key={i}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className='flex items-center justify-center text-2xl'>
                    Tudo certo {<AiFillCheckCircle color='green' />}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UpdateProduct
