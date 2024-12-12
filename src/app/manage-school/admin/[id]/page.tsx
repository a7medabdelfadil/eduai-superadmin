/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import Cookies from "js-cookie"
import EmptyAdmins from './components/EmptyAdmins';
import { useGetAllAdminsQuery } from '../api/adminApis';
import Container from '@/components/Container';

const Admins = () => {

    const token = Cookies.get('token') || "";
    const params = useParams()

    const { data, isSuccess } = useGetAllAdminsQuery({ token, id: params.id })

    const [search, setSearch] = useState("")

    return (
        isSuccess && data?.data.length > 0 ? (<>
            <Container className="md:px-2 relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">
                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                    <div className="my-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" id="icon" name="icon" className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800 outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link href={`add-new-admin/${params.id}`} className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 mr-3 text-white text-[18px] w-[180px] ease-in font-semibold duration-300">+ Add new Admin</Link>
                    </div>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                            <tr className='text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white'>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    username
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    nationality
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Religion
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Plan
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Actions
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((item: any) => (
                                <tr key={item.id} className="bg-white border-b  hover:bg-gray-50 card">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.username}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.nationality}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.gender}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.phoneNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.religion}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link className='flex items-center' href={`/manage-school/plan-school/${params.id}`}>
                                            <svg
                                                width="30"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="fill-current text-black dark:text-white"
                                            >
                                                <g clipPath="url(#clip0_2844_3402)">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M4 12.001V12C4.003 11.984 4.017 11.896 4.095 11.723C4.181 11.532 4.32 11.292 4.519 11.015C4.917 10.462 5.512 9.823 6.264 9.217C7.777 7.996 9.812 7 12 7C14.188 7 16.223 7.996 17.736 9.216C18.488 9.822 19.083 10.461 19.481 11.014C19.681 11.291 19.819 11.531 19.905 11.722C19.983 11.895 19.997 11.983 20 11.999V12C19.997 12.016 19.983 12.104 19.905 12.277C19.819 12.468 19.68 12.708 19.481 12.985C19.083 13.538 18.488 14.177 17.736 14.783C16.224 16.004 14.189 17 12 17C9.812 17 7.777 16.004 6.264 14.784C5.512 14.178 4.917 13.539 4.519 12.986C4.35491 12.7644 4.2129 12.5273 4.095 12.278C4.05129 12.1902 4.01935 12.0971 4 12.001ZM12 5C9.217 5 6.752 6.254 5.009 7.659C4.132 8.365 3.409 9.133 2.896 9.846C2.639 10.202 2.425 10.559 2.271 10.901C2.123 11.23 2 11.611 2 12C2 12.388 2.123 12.771 2.27 13.099C2.425 13.441 2.64 13.799 2.896 14.154C3.409 14.867 4.132 15.634 5.009 16.341C6.752 17.746 9.217 19 12 19C14.783 19 17.248 17.746 18.991 16.341C19.868 15.635 20.591 14.867 21.104 14.154C21.361 13.798 21.575 13.441 21.729 13.099C21.877 12.771 22 12.389 22 12C22 11.612 21.877 11.229 21.73 10.901C21.5567 10.5295 21.347 10.1761 21.104 9.846C20.591 9.133 19.868 8.366 18.991 7.659C17.248 6.254 14.783 5 12 5ZM11 12C11 11.7348 11.1054 11.4804 11.2929 11.2929C11.4804 11.1054 11.7348 11 12 11C12.2652 11 12.5196 11.1054 12.7071 11.2929C12.8946 11.4804 13 11.7348 13 12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                                                    />
                                                </g>
                                            </svg>

                                            <span className='ms-0.5'>View</span>

                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={`edit-admin/${item.id}`} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </>

        ) : (
            <EmptyAdmins schoolId={params.id} />
        )

    );
}

export default Admins;