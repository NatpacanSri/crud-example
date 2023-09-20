import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'

type Props = {
    datas: [Data]
}

type Data = {
    _id: string
    tchID: string,
    name: string,
    gender: string,
    age: number,
}

export const getServerSideProps = async () => {
    try {
        let response = await fetch('http://localhost:8080/teacher')
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

    const handleDelete = async (id: String) => {
        try {

            let response = await fetch('http://localhost:8080/teacher/deleteTch/' + id, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    "Content-Type": 'application/json'
                }
            })
            let data = await response.json()

            window.location.reload()

        } catch (e) {
            console.error('An error occured while deleting ', e)

        }
    }

    return (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">tchID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Gender</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Age</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {datas?.length > 0 ? (
                    datas.map((teacher, index) => {
                        return (
                            <tr >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{teacher.tchID}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{teacher.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{teacher.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{teacher.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-500 font-semibold text-white hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 mr-3"
                                        href={`./teacherPage/${teacher._id}`}>Edit</a>
                                    <button className="py-1.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                        onClick={()=>handleDelete(teacher._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <p className='text-white' >no teacher</p>
                )}
            </tbody>
        </table>
    )
}

export default function Home(props: Props) {

    const [teachers, setTeachers] = useState<[Data]>(props.datas)

    return (
        <div className='bg-gray-800 h-screen'>
            <Navbar />
            <div className='max-w-6xl m-auto mt-10'>
                <div className="grid grid-cols-2">
                    <div>
                        <h1 className='text-2xl font-bold text-white '>Teacher List</h1>
                        <p className='text-gray-400 mb-4'>There are <b>{teachers?.length > 0 ? (teachers.length) : ("No fucking")}</b> Teacher </p>
                    </div>
                    <div className='flex'>
                        <a href='./teacherPage/addTch' type="button" className=" ml-auto my-auto py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-m  dark:focus:ring-offset-gray-800"
                        >
                            + Add Teacher
                        </a>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden dark:border-gray-700">

                                <Table datas={teachers} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

