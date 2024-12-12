"use client"
import { Label, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"
import style from "./style.module.css"
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetCountryQuery } from '@/app/create-course/api/createCourseSlice';
import { useGetLanguagesQuery } from '@/app/add-new-school/api/createSchoolApi'
import { useGetEducationByIdQuery, useUpdateEduSystemMutation } from '../api/manageSystems'
import Container from '@/components/Container'

function Page() {

    const token = Cookies.get('token') || "";
    const lang = Cookies.get('lang') || "";

    const router = useRouter()
    const params = useParams()

    const { isSuccess: successLanguages, data: dataLanguages } = useGetLanguagesQuery(token)
    const { data: dataCountry, isSuccess: successCountry } = useGetCountryQuery(token)
    const [updateEduSystem, { isSuccess, error, isError }] = useUpdateEduSystemMutation()
    const { data: eduDetails, isSuccess: successEduDetails, refetch } = useGetEducationByIdQuery({ token, id: params.id })

    const [name, setName] = useState("")
    const [language, setLanguage] = useState("")
    const [countryId, setCountryId] = useState("")

    useEffect(() => {
        if (successEduDetails) {
            setName(eduDetails.data.name)
            setLanguage(eduDetails.data.language)
            setCountryId(eduDetails.data.countryId)
        }
    }, [successEduDetails , eduDetails])

    useEffect(() => {
        if (isError) {
            if (error && 'data' in error && (error as FetchBaseQueryError).data) {
                const errorData = (error as FetchBaseQueryError).data as any;
                if (errorData?.message) {
                    toast.error(errorData.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } else {
                toast.error("Something went wrong, please try again later", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }, [isError, error]);


    const handleSend = async () => {
        const obj = {
            name,
            language,
            countryId,
        };
        try {
            await updateEduSystem({ token, id: params.id, body: obj }).unwrap();
            refetch();
            toast.success("Education system updated successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.push("/education-system"); // redirect or reload
        } catch (error) {
            toast.error("Failed to update education system. Please try again later.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    

    return (
        <Container className="relative mt-5 overflow-x-auto  bg-transparent sm:rounded-lg px-2  min-h-screen">
            <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">Update Education System</h1>

            <div className='grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1 mb-10'>
                <div>
                    <div className="my-4 block">
                        <Label className='md:text-lg capitalize font-medium' htmlFor="name" value="name" />
                        <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                    </div>
                    <TextInput value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="name" required />
                </div>
                <div className='xl:mt-6'>
                    <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="country">country <span className='text-[#367AFF] text-xl'>*</span></label>
                    <Select value={countryId} onChange={(e) => setCountryId(e.target.value)} className={`${style.selectForm}`} id='country'>
                        {successCountry && (
                            <>
                                <option className='hidden'>Select country</option>
                                {dataCountry.data.content.map((item: any) => (
                                    <option key={item.id} value={item.id}>{lang === "english" && item.name_en || lang === "arabic" && item.name_ar || lang === "french" && item.name_fr}</option>
                                ))}
                            </>
                        )}

                    </Select>
                </div>
                <div>
                    <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="language">language <span className='text-[#367AFF] text-xl'>*</span></label>
                    <Select value={language} onChange={(e) => setLanguage(e.target.value)} className={`${style.selectForm}`} id='language'>
                        {successLanguages && (
                            <>
                                <option className='hidden'>Select language</option>
                                {Object.keys(dataLanguages.data).map((key: any) => (
                                    <option key={key} value={key}>{dataLanguages.data[key]}</option>
                                ))}
                            </>
                        )}
                    </Select>
                </div>
            </div>
            <div className="flex justify-center text-center">
                <button onClick={() => handleSend()} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[16px] w-[220px] ease-in duration-300">Update Education System</button>
            </div>
        </Container>
    )
}

export default Page
