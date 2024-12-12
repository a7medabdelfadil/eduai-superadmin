"use client"
import React, { useEffect, useState } from 'react'
import { useAddBackupMutation } from '../api/backupsApis'
import Cookies from "js-cookie"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';

function Page() {
    const token = Cookies.get('token') || "";
    const router = useRouter()

    const [addBackup, { data , isSuccess , error , isError  }] = useAddBackupMutation()

    console.log(data);

    const handleSend = async (e: any) => {
        e.preventDefault()
        addBackup({ token, name }).unwrap()
    }


    const [name, setName] = useState("")


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
            toast.success("Backup created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.push("/backups")
        }
    }, [isSuccess, router])


    return (
        <Container centered={true} className='mt-10'>

            <form>
                <h1 className="font-bold text-[28px] mb-4 font-sans text-[#041631] dark:text-white">Add New Backup</h1>

                <div className=" p-10 bg-white card rounded-xl xl:w-[1000px] lg:w-[750px]  gap-5 md:w-[600px] sm:w-[500px]">
                    <div className="gap-4 ">
                        <label htmlFor="name" className="text-[18px] font-sans font-semibold">
                            Name
                            <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" className="w-full mt-2 py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px] " />
                        </label>
                    </div>
                    <div className="flex justify-center text-center mt-5">
                        <button onClick={(e) => handleSend(e)} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white text-[18px] w-[140px] ease-in duration-300">Add backup</button>
                    </div>
                </div>
            </form>
        </Container>
    )
}

export default Page
