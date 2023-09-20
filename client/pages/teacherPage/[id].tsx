import React, { useState } from 'react'
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import Navbar from '../components/navbar'
import router from 'next/router'
import { data } from 'autoprefixer'

type PageParams = {
    id: string
}
type ContentPageProps = {
    data: Data
}

type Data = {
    _id: string
    tchID: string,
    name: string,
    gender: string,
    age: number,
}

type ResponeFromServer = {
    _id: string
    tchID: string,
    name: string,
    gender: string,
    age: number,
}



export async function getServerSideProps({ params }
    : GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
    try {
        let response = await fetch('http://localhost:8080/teacher/oneTch/' + params?.id)
        let responeFromServer: ResponeFromServer = await response.json()
        console.log(responeFromServer)
        return {
            props: {
                data: {
                    _id: responeFromServer._id,
                    tchID: responeFromServer.tchID,
                    name: responeFromServer.name,
                    gender: responeFromServer.gender,
                    age: responeFromServer.age,
                },
            },
        }
    } catch (error) {
        console.error(error)
        return {
            props: {
                data: {
                    _id: '',
                    tchID: '',
                    name: '',
                    gender: '',
                    age: 0,
                },
            },
        }
    }
}


function editTch({ data: { _id, tchID, name, gender, age } }: ContentPageProps) {

    // const [teachers, setTeachers] = useState<[Data]>(props.datas)

    const [_tchID, setTchID] = useState(tchID)
    const [_name, setName] = useState(name)
    const [_gender, setGender] = useState(gender)
    const [_age, setAge] = useState(age)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // console.log(adviser)
        if (tchID && name && gender && age) {
            console.log(JSON.stringify({ _tchID, _name, _gender, _age }))
            try {

                let response = await fetch('http://localhost:8080/teacher/editTch/' + _id , {
                    method: "Put",
                    body: JSON.stringify({
                        tchID:_tchID, name:_name, gender:_gender, age:_age
                    }),
                    headers: {
                        Accept: "application/json , text/plain, */*",
                        "Content-Type": "application/json"
                    }
                })

                response = await response.json()

                // setTchID("")
                // setName("")
                // setGender("")
                // setAge("")
                // setError("")
                setMessage("Post added successfully!!")

                router.push('/teacherPage');


            } catch (error: any) {
                setError(error)
            }
        } else {
            return setError("All fields are required!! MotherFUcker idiot")
        }

    }

    return (
        <div className='bg-gray-800 h-screen'>
            <Navbar />
            <div className='max-w-6xl m-auto mt-10'>
                <h1 className='text-4xl font-bold text-white mb-10'>Add Student form</h1>
                <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                tchID
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="tch01"
                                onChange={(e) => setTchID(e.target.value)}
                                value={_tchID ? _tchID : ""}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="John"
                                onChange={(e) => setName(e.target.value)}
                                value={_name ? _name : ""}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="relative w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                gender
                            </label>
                            <select
                                onChange={(e) => setGender(e.target.value)}
                                value={_gender}
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option value="male" >Male</option>
                                <option value="female">Female</option>
                                <option value="other" >Other</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mr-3">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                Age
                            </label>
                            <input
                                onChange={(e) => setAge(parseInt(e.target.value))}
                                value={_age}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="21" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                ㅤ
                            </label>
                            <button type="submit" className="w-full py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-bold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-m  dark:focus:ring-offset-gray-800">
                                Submit
                            </button>
                        </div>
                    </div>
                    {message ? <div className="text-green-500">{message}</div> : null}
                    {error ? <div className="text-red-500">{error}</div> : null}
                </form>
            </div>
        </div>
    )
}


export default editTch