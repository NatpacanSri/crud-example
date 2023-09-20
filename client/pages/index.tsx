import React, { useEffect, useState } from 'react'
import Navbar from './components/navbar'

type Props = {
  datas: [Data]
}

type Data = {
  _id: string
  stdID: string,
  name: string,
  gender: string,
  age: number,
  adviser: {
    name: string
  }
}

export const getServerSideProps = async () => {
  try {
    let response = await fetch('http://localhost:8080/student/avs')
    let datas = await response.json()

    return {
      props: { datas: JSON.parse(JSON.stringify(datas)) }
    }
  } catch (error) {
    console.error(error)
    return {
      props: { datas: [] },
    }
  }
}


function Table({ datas }: Props) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">stdID</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Name</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Gender</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Age</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Adviser</th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {datas?.length > 0 ? (
          datas.map((student, index) => {
            return (
              <tr >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{student.stdID}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{student.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{student.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{student.adviser.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a className="text-blue-500 hover:text-blue-700" href="#">Delete</a>
                </td>
              </tr>
            )
          })
        ) : (
          <p className='text-white p-4'>no student in class</p>
        )}
      </tbody>
    </table>
  )
}

export default function Home(props: Props) {

  const [students, setStudents] = useState<[Data]>(props.datas)

  return (
    <div className='bg-gray-800 h-screen'>
      <Navbar />
      <div className='max-w-6xl m-auto mt-10'>
        <div className='grid grid-cols-2'>
          <div>
            <h1 className='text-2xl font-bold text-white '>Student List</h1>
            <p className='text-gray-400 mb-4'>There are <b>{students?.length > 0 ? (students.length) : ("No fucking")}</b> in class. </p>
          </div>
          <div className='flex'>
            <a href='./addStd' type="button" className=" ml-auto my-auto py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-m  dark:focus:ring-offset-gray-800"
            >
              + Add Student
            </a>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg overflow-hidden dark:border-gray-700">

                <Table datas={students} />

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

