"use client"
import { Label, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useGetLanguagesQuery } from '../add-new-school/api/createSchoolApi';
import Cookies from "js-cookie"
import style from "./style.module.css"
import { useCreateEduSystemMutation } from '../education-system/api/manageSystems';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useGetCountryQuery } from '../create-course/api/createCourseSlice';
import Spinner from '@/components/spinner';
import Container from '@/components/Container';

function Page() {

    const token = Cookies.get('token') || "";
    const lang = Cookies.get('lang') || "";

    const router = useRouter()

    const { isSuccess: successLanguages, data: dataLanguages } = useGetLanguagesQuery(token)
    const { data: dataCountry, isSuccess: successCountry } = useGetCountryQuery(token)

    const [name, setName] = useState("")
    const [language, setLanguage] = useState("")
    const [countryId, setCountryId] = useState("")
    // Error Messages
    const [nameError, setNameError] = useState("");
    const [countryError, setCountryError] = useState("");
    const [languageError, setLanguageError] = useState("");
    const [createEduSystem, { data, isSuccess, error, isError, isLoading }] = useCreateEduSystemMutation()

    const validateInputs = () => {
        let isValid = true;
    
        // Reset error messages
        setNameError("");
        setCountryError("");
        setLanguageError("");
    
        // Validate name
        if (name.trim() === "") {
            setNameError("Name is required");
            isValid = false;
        }
    
        // Validate country
        if (!countryId) {
            setCountryError("Country is required");
            isValid = false;
        }
    
        // Validate language
        if (!language) {
            setLanguageError("Language is required");
            isValid = false;
        }
    
        return isValid;
    };


    const handleSend = async () => {
        const isValid = validateInputs();
        if (!isValid) {
            return;
        }

        const obj = {
            name,
            language,
            countryId
        };

        try {
            await createEduSystem({ token, body: obj }).unwrap();
            toast.success("Educational system created successfully!");
        } catch (error) {
            toast.error("Failed to create educational system: ");
        } 
    };


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

    useEffect(() => {
        if (isSuccess) {
            toast.success("Education created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.push("/education-system")
        }
    }, [isSuccess, router])


    return (
        <Container className="relative mt-5 overflow-x-auto  bg-transparent sm:rounded-lg px-2 min-h-screen">
            <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">Create Education System</h1>

            <div className='grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1 mb-10'>
                <div>
                    <div className="my-4 block">
                        <Label className='md:text-lg capitalize font-medium' htmlFor="name" value="name" />
                        <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                    </div>
                    <TextInput value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="name" required />
                    {/* Error message for name */}
                    {nameError && <p className="text-red-500 text-sm">{nameError}</p>} 
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
                    {/* Error message for country */}
                    {countryError && <p className="text-red-500 text-sm">{countryError}</p>} 
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
                    {/* Error message for language */}
                    {languageError && <p className="text-red-500 text-sm">{languageError}</p>} 
                </div>
            </div>
            {isLoading ? (
                <Spinner />
            ) : (

                <div className="flex justify-center text-center">
                    <button onClick={() => handleSend()} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[16px] w-[200px] ease-in duration-300">Add Education System</button>
                </div >
            )
            }
        </Container >
    )
}

export default Page
