'use client'

import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import axios from 'axios'
import { urlAPi } from '../../urlApi';


const QueryForElectrostaticTest = () => {
  // opções do select
  const [selectOptions, setSelectOptions] = useState<{ id: string, name: string, status: string, label: string, value: string }[]>([])
  // valor para pesquisa por funcionário
  const [collaborator, setCollaborator] = useState<{ id: string, name: string, status: string, label: string, value: string }[]>()

  // quando é selecionado algum colaborador
  const handleChangeCollaborator = (e: any) => {
    setCollaborator(e)
    setContentTable([e])
  }

  const hadleClickSelectedAllBtn = () => {
    setContentTable(selectOptions)
  }
  const [contentTable, setContentTable] = useState<{ id: string, name: string, status: string, label: string, value: string }[]>([])

  useEffect(() => {
    const teste = async () => {
      await axios.get(`${urlAPi}/get-results`).then((response) => {
        setContentTable(response.data)
        setSelectOptions(response.data)
      })
    }
    teste()
  }, [])
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center overflow-y-scroll'>
      <h1 className='text-3xl font-bold'>Consulta de teste de sapato</h1>
      <div className='flex justify-center items-center gap-4'>
        <Select
          value={collaborator}
          onChange={handleChangeCollaborator}
          options={selectOptions}
          className='mt-8 min-w-[420px]'
          placeholder='Pesquisar funcionário por nome'
        />
        <button
          className='bg-[#1446a0] text-white rounded-md h-[30px] w-[70px] font-bold mt-8'
          onClick={hadleClickSelectedAllBtn}
        >
          Todos
        </button>
      </div>
      <table className='w-[800px] mt-8 -ml-[19px] mb-1'>
        <thead className='bg-[#1446A0] text-white '>
          <tr className='strict top-fixed w-[800px] h-[40px] flex justify-between items-center'>
            <th className='border border-slate-300 w-5/12 h-full flex justify-center items-center'>Matrícula</th>
            <th className='border border-slate-300 w-full h-full flex justify-center items-center'>Nome completo</th>
            <th className='border border-slate-300 w-5/12 h-full flex justify-center items-center'>Status</th>
          </tr>
        </thead>
      </table>
      <div className='max-h-[410px] overflow-y-scroll min-w-[800px]'>
        <table className='min-w-full border border-slate-400'>
          <tbody>
            {
              contentTable.length > 0 ? (
                contentTable.map((collaborator, i) => (
                  <tr key={collaborator.id} className={`w-[800px] flex justify-between h-[40px] ${i % 2 === 0 ? 'bg-[#d9d9d9]' : ''}`}>
                    <td className='border border-slate-300 w-5/12 flex justify-center items-center'>{collaborator.id}</td>
                    <td className='border border-slate-300 w-full flex justify-center items-center'>{collaborator.name}</td>
                    <td
                      className={`
                        border  border-slate-300 w-5/12 flex justify-center items-center font-medium 
                        ${collaborator.status === 'OK' ? 'text-green-500' : ''}
                         ${collaborator.status === 'NG' ? 'text-red-500' : ''}
                        `}

                    >
                      {collaborator.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='border border-slate-300 w-full p-2 text-center' colSpan={3}>Nenhum resultado encontrado</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QueryForElectrostaticTest