/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Cookies from "js-cookie"
import Spinner from '@/components/spinner';
import { useGetSchoolPlanQuery, useUpdateStatusOfSchoolPlanMutation } from '../api/SchoolPlans';
import Container from '@/components/Container';

const PlanSchoolDetails = () => {

    const { id } = useParams()
    const token = Cookies.get('token') || "";
    const { data: dataSchoolPlans, isSuccess, isLoading } = useGetSchoolPlanQuery({ token, id })
    return (

        isLoading ? (
            <div className='flex items-center justify-center h-[90vh]'>
                <Spinner />
            </div>
        ) : (
            isSuccess && (
                <Container className="md:px-2 relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen px-2">
                    <div className='mb-5'>
                        <div className='my-2'>
                            <span>Name: </span>
                            <span>{dataSchoolPlans.data.name}</span>
                        </div>
                        <div className='my-2'>
                            <span>Active: </span>
                            <span>{`${dataSchoolPlans.data.active}`}</span>
                        </div>
                        <div className='my-2'>
                            <span>Cost: </span>
                            <span>{dataSchoolPlans.data.cost}</span>
                        </div>
                        <div className='my-2'>
                            <span>Days Count: </span>
                            <span>{dataSchoolPlans.data.daysCount}</span>
                        </div>
                    </div>


                    {
                        dataSchoolPlans?.data.permissions.length > 0 && (<>
                            
                                <div className="overflow-auto relative shadow-md sm:rounded-lg">
                                    <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
                                        <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
                                            <tr className='text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white'>
                                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                                    Id
                                                </th>
                                                <th scope="col" className="px-6 py-3  whitespace-nowrap">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3  whitespace-nowrap">
                                                    Cost
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {dataSchoolPlans?.data?.permissions.map((item: any) => (
                                                <tr key={item.id} className="bg-white border-b  hover:bg-gray-50 card">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item.id}
                                                    </th>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-9 py-4 whitespace-nowrap">
                                                        {item.cost}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                        </>
                        )
                    }
                </Container>
            )
        )
    );
}

export default PlanSchoolDetails;