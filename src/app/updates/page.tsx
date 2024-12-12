"use client"

import Container from "@/components/Container";

const Updates = () => {

    return (
        <>
            <Container className="md:px-2 relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">
                <h1 className="font-bold text-[28px] mb-3 font-sans text-[#041631] dark:text-white">Updates</h1>

                <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
                    <div className="my-3">
                        <label htmlFor="icon" className="sr-only">Search</label>
                        <div className="relative min-w-72 md:min-w-80">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                <svg className="flex-shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            </div>
                            <input type="text" id="icon" name="icon" className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800 dark:text-white  outline-none border-2 px-4 ps-11 block w-full border-gray-200  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search" />
                        </div>
                    </div>
                </div>
                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white">
                            <tr>

                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Name School
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    Code
                                </th>
                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                    About
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white border-b card hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap ">
                                    Nahda
                                </th>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    C45121
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    This is text
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </>
    );
}

export default Updates;
