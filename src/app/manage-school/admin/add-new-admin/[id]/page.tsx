"use client"

import { Label, Select, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useAddAdminMutation, useGetEmployeeTypeQuery, useGetGanderQuery, useGetNationalityQuery, useGetQualificationQuery, useGetRegionsQuery, useGetReligionQuery } from "../../api/adminApis";
import Cookies from "js-cookie"
import style from "./style.module.css"
import { useParams, useRouter } from "next/navigation";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import Spinner from "@/components/spinner";
import Container from "@/components/Container";

const AddNewAdmin = () => {
    const token = Cookies.get('token') || "";
    const lang = Cookies.get('lang') || "";

    const params = useParams()
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nid, setNid] = useState("")
    const [gender, setGender] = useState("")
    const [religion, setReligion] = useState("")
    const [nationality, setNationality] = useState("")
    const [employeeType, setEmployeeType] = useState("")
    const [qualification, setQualification] = useState("")
    const [regionId, setRegionId] = useState("")
    const [birthDate, setBirthDate] = useState('');
    const [number, setNumber] = useState("");
    const [name_en, setName_en] = useState("");
    const [name_ar, setName_ar] = useState("");
    const [name_fr, setName_fr] = useState("");
    const [about, setAbout] = useState("");

    const { data: ganderData, isSuccess: successGander } = useGetGanderQuery(token)
    const { data: religionData, isSuccess: successReligion } = useGetReligionQuery(token)
    const { data: nationalityData, isSuccess: successNationality } = useGetNationalityQuery(token)
    const { data: employeeTypeData, isSuccess: successEmployeeType } = useGetEmployeeTypeQuery(token)
    const { data: qualificationData, isSuccess: successQualification } = useGetQualificationQuery(token)
    const { data: regionData, isSuccess: successRegion } = useGetRegionsQuery(token)

    const [addAdmin, { data, isError, error, isSuccess, isLoading }] = useAddAdminMutation()

    const handleSend = async (e: any) => {
        e.preventDefault()
        const obj = {
            username,
            email,
            password,
            nid,
            gender,
            religion,
            nationality,
            employeeType,
            qualification,
            regionId,
            birthDate,
            number,
            name_en,
            name_ar,
            name_fr,
            about,
            schoolId: params.id
        }
        if (
            username
            && email
            && password
            && nid
            && gender
            && religion
            && nationality
            && employeeType
            && qualification
            && regionId
            && birthDate
            && number
            && name_en
            && name_ar
            && name_fr &&
            about
        ) {
            addAdmin({ token, body: obj }).unwrap()
        }
        else {
            toast.error("Please fill the input", {
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
            toast.success("Admin created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.push(`/manage-school/admin/${params.id}`)
        }
    }, [isSuccess, router, params.id])






    return (
        <>
        <Container centered={true} className="mt-10">
                <form>
                    <div className=" p-10 bg-white card rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] gap-5 md:w-[600px] sm:w-[500px] overflow-auto">
                        <div className="flex items-center justify-start gap-2">
                            <svg className="h-6 w-6 font-bold card text-[#000000] group-hover:text-[#3e5af0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h1 className="text-[22px] font-sans font-semibold">Admin Information</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1 my-7">
                            <div>
                                <div className="my-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="name" value="User Name" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={username} onChange={(e) => setUsername(e.target.value)} id="name" type="text" placeholder="User Name" required />
                            </div>
                            <div>
                                <div className="my-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="email" value="email" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="email" required />
                            </div>
                            <div>
                                <div className="my-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="password" value="password" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="password" required />
                            </div>
                            <div>
                                <div className="my-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="nid" value="nid" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={nid} onChange={(e) => setNid(e.target.value)} id="nid" type="text" placeholder="nid" required />
                            </div>
                            <div className='xl:mt-3'>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="gender">gender <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={gender} onChange={(e) => setGender(e.target.value)} className={`${style.selectForm}`} id='gender'>
                                    {successGander && (
                                        <>
                                            <option className='hidden'>Select Gender</option>
                                            {Object.keys(ganderData.data).map((key: any) => (
                                                <option key={key} value={key}>{ganderData.data[key]}</option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </div>
                            <div className='xl:mt-3'>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="religion">religion <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={religion} onChange={(e) => setReligion(e.target.value)} className={`${style.selectForm}`} id='religion'>
                                    {successReligion && (
                                        <>
                                            <option className='hidden'>Select religion</option>
                                            {Object.keys(religionData.data).map((key: any) => (
                                                <option key={key} value={key}>{religionData.data[key]}</option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </div>
                            <div className='xl:mt-3'>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="nationality">nationality <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={nationality} onChange={(e) => setNationality(e.target.value)} className={`${style.selectForm}`} id='nationality'>
                                    {successNationality && (
                                        <>
                                            <option className='hidden'>Select nationality</option>
                                            {Object.keys(nationalityData.data).map((key: any) => (
                                                <option key={key} value={key}>{nationalityData.data[key]}</option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </div>
                            <div className='xl:mt-3'>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="employeeType">employee Type <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={employeeType} onChange={(e) => setEmployeeType(e.target.value)} className={`${style.selectForm}`} id='employeeType'>
                                    {successEmployeeType && (
                                        <>
                                            <option className='hidden'>Select employeeType</option>
                                            {Object.keys(employeeTypeData.data).map((key: any) => (
                                                <option key={key} value={key}>{employeeTypeData.data[key]}</option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </div>
                            <div className='xl:mt-3'>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="qualification">qualification <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={qualification} onChange={(e) => setQualification(e.target.value)} className={`${style.selectForm}`} id='qualification'>
                                    {successQualification && (
                                        <>
                                            <option className='hidden'>Select qualification</option>
                                            {Object.keys(qualificationData.data).map((key: any) => (
                                                <option key={key} value={key}>{qualificationData.data[key]}</option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </div>
                            <div className='xl:mt-3'>
                                <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="region">region <span className='text-[#367AFF] text-xl'>*</span></label>
                                <Select value={regionId} onChange={(e) => setRegionId(e.target.value)} className={`${style.selectForm}`} id='region'>
                                    {successRegion && (
                                        <>
                                            <option>Select region</option>
                                            {regionData.data.content.map((item: any) => (
                                                <option key={item.id} value={item.id}>{lang === "english" && item.name_en || lang === "arabic" && item.name_ar || lang === "french" && item.name_fr}</option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                            </div>
                            <div className='xl:mt-3'>
                                <label htmlFor="birthDate" className="text-[18px] font-sans font-semibold">
                                    Birthday
                                </label>
                                <input
                                    value={birthDate}
                                    id="birthDate"
                                    type="date"
                                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </div>
                            <div className="xl:mt-1">
                                <div className="mb-3 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="number" value="number" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={number} onChange={(e) => setNumber(e.target.value)} id="number" type="number" placeholder="number" required />
                            </div>
                            <div>
                                <div className="mb-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="name_en" value="name english" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={name_en} onChange={(e) => setName_en(e.target.value)} id="name_en" type="text" placeholder="name english" required />
                            </div>
                            <div>
                                <div className="mb-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="name_ar" value="name arabic" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={name_ar} onChange={(e) => setName_ar(e.target.value)} id="name_ar" type="text" placeholder="name arabic" required />
                            </div>
                            <div>
                                <div className="mb-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="name_fr" value="name french" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <TextInput value={name_fr} onChange={(e) => setName_fr(e.target.value)} id="name_fr" type="text" placeholder="name french" required />
                            </div>

                            <div className="col-span-2">
                                <div className="mb-4 block">
                                    <Label className='md:text-lg capitalize font-medium' htmlFor="about" value="about" />
                                    <span className='text-[#367AFF] text-2xl ms-1'>*</span>
                                </div>
                                <Textarea className="min-h-40" value={about} onChange={(e) => setAbout(e.target.value)} id="about" placeholder="about" required />
                            </div>
                        </div>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <div className="flex justify-center text-center">
                                <button onClick={(e) => handleSend(e)} type="submit" className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[18px] w-[140px] ease-in duration-300">Add  Admin</button>
                            </div>
                        )
                        }
                    </div>
                </form>
            </Container>
        </>
    );
}

export default AddNewAdmin;