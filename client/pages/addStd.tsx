import React, { useState } from 'react'
import Navbar from './components/navbar'
import router from 'next/router'


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
        const test = 'test'
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

function addStd(props: Props) {

    const [teachers, setTeachers] = useState<[Data]>(props.datas)

    const [stdID, setStdID] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('male')
    const [age, setAge] = useState('')
    const [adviser, setAdviser] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        // console.log(adviser)
        if (stdID && name && gender && age && adviser) {
            console.log(JSON.stringify({ stdID, name, gender, age, adviser }))
            try {

                let response = await fetch('http://localhost:8080/student/addStd', {
                    method: "Post",
                    body: JSON.stringify({
                        stdID, name, gender, age, adviser
                    }),
                    headers: {
                        Accept: "application/json , text/plain, */*",
                        "Content-Type": "application/json"
                    }
                })

                response = await response.json()

                setStdID("")
                setName("")
                setGender("")
                setAge("")
                setError("")
                setMessage("Post added successfully!!")

                router.push('/');


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
                                stdID
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="std01"
                                onChange={(e) => setStdID(e.target.value)}
                                value={stdID}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                Name
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="John"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                gender
                            </label>
                            <div className="relative">
                                <select
                                    onChange={(e) => setGender(e.target.value)}
                                    value={gender}
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option value="male" >Male</option>
                                    <option value="female">Female</option>
                                    <option value="other" >Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                Age
                            </label>
                            <input
                                onChange={(e) => setAge(e.target.value)}
                                value={age}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="number" placeholder="21" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-3/4 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" >
                                Adviser
                            </label>
                            <div className="relative">
                                <select
                                    onChange={(e) => setAdviser(e.target.value)}
                                    value={adviser}
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option >Select adviser</option>
                                    {teachers?.length > 0 ? (
                                        teachers.map((teacher, index) => {
                                            return (
                                                <option value={teacher._id}>{teacher.name}</option>
                                            )
                                        })
                                    ) : (
                                        <p>no teacher</p>
                                    )}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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


export default addStd