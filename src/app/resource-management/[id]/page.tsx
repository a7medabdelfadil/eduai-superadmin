"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useGetCourseByIdQuery, useUpdateCourseMutation } from '../api/getCoursesSlice';
import Cookies from "js-cookie"
import ThirdStepUpdate from '../components/steps/ThirdStepUpdate';
import FirstStep from '@/app/create-course/components/steps/FirstStep';
import SecoundStep from '@/app/create-course/components/steps/SecoundStep';
import FourthStep from '@/app/create-course/components/steps/FourthStep';
import { toast } from 'react-toastify';
import Container from '@/components/Container';

function Page() {
    const [activeStep, setActiveStep] = useState(0);
    const params = useParams()
    const token = Cookies.get('token') || "";
    const {data} = useGetCourseByIdQuery({token , id:params.id})
    const [code, setCode] = useState("")
    const [countryId, setCountryId] = useState("")
    const [level, setLevel] = useState("")
    const [registrationType, setRegistrationType] = useState("")
    const [language, setLanguage] = useState("")
    const [eduSystemId, setEduSystemId] = useState("")
    const [name_en, setName_en] = useState("")
    const [name_ar, setName_ar] = useState("")
    const [name_fr, setName_fr] = useState("")
    const [description_en, setDescription_en] = useState("")
    const [description_ar, setDescription_ar] = useState("")
    const [description_fr, setDescription_fr] = useState("")
    const [prerequisites, setPrerequisites] = useState<string[]>([""]);
    console.log(data);

    useEffect(() => {
        if(data){
            setLevel(data.data.level)
            setCode(data.data.code)
            setCountryId(data?.data.countryId)
            setRegistrationType(data.data.registrationType)
            setLanguage(data.data.language)
            setEduSystemId(data.data.eduSystemId)
            setName_en(data.data.name_en)
            setName_ar(data.data.name_ar)
            setName_fr(data.data.name_fr)
            setDescription_en(data.data.description_en)
            setDescription_ar(data.data.description_ar)
            setDescription_fr(data.data.description_fr)
        }
    },[data])

    const [updateCourse, { data : dataAdded}] = useUpdateCourseMutation();
    console.log('dataAdded', dataAdded);
    const handleNext = () => {
        setActiveStep((cur) => cur + 1)
    }

    const handlePrev = () => {
        setActiveStep((cur) => cur - 1)
    }

    const handleSend = async () => {
        const objectReq = {
            code: code.toUpperCase(),
            countryId: countryId,
            level: level,
            registrationType: registrationType,
            language: language,
            eduSystemId: eduSystemId,
            name_en: name_en,
            name_ar: name_ar,
            name_fr: name_fr,
            description_en: description_en,
            description_ar: description_ar,
            description_fr: description_fr,
            prerequisiteIds: prerequisites,
            // "coefficient": 2, // optional
            // "semesterName": "FALL", // optional
            // "secondarySchoolDepartment": "SCIENTIFIC", // optional
            // "subDepartment": "PHYSICAL_SCIENCES" // optional
        };
    
        try {
            // Await the promise returned by updateCourse
            const response = await updateCourse({ token, data: objectReq, id: params.id }).unwrap();

            // Show success toast notification
            toast.success("Course updated successfully!");
        } catch (error) {
            // Show error toast notification
            toast.error("Error updating course");
        }
    };
    
 
    const steps = [
        {
            step: 1,
            about: "Course Information",
            ele: <FirstStep
                handleNext={handleNext}
                code={code}
                setCode={setCode}
                countryId={countryId}
                setCountryId={setCountryId}
                eduSystemId={eduSystemId}
                setEduSystemId={setEduSystemId}
                language={language}
                setLanguage={setLanguage}
                registrationType={registrationType}
                setRegistrationType={setRegistrationType}
                level={level}
                setLevel={setLevel}
                name_en={name_en}
                setName_en={setName_en}
                name_ar={name_ar}
                setName_ar={setName_ar}
                name_fr={name_fr}
                setName_fr={setName_fr}
                description_en={description_en}
                setDescription_en={setDescription_en}
                description_ar={description_ar}
                setDescription_ar={setDescription_ar}
                description_fr={description_fr}
                setDescription_fr={setDescription_fr}
            />
        },
        {
            step: 2,
            about: "Course Option",
            ele: <SecoundStep
                handleNext={handleNext}
                handlePrev={handlePrev}
                prerequisites={prerequisites}
                setPrerequisites={setPrerequisites}
                handleSend={handleSend}
            />
        },
        {
            step: 3,
            about: "Course Content",
            ele: <ThirdStepUpdate dataAddCourse={dataAdded} handleNext={handleNext} handlePrev={handlePrev} />
        },
        {
            step: 4,
            about: "Course Preview",
            ele: <FourthStep handleNext={handleNext} handlePrev={handlePrev} />
        }
    ];

    return (
        <Container className="relative mt-5 overflow-x-auto  bg-transparent sm:rounded-lg px-2  min-h-screen">
            <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">Update Course</h1>
            <div className='grid md:grid-cols-3 gap-8 mt-16'>
                <div className='md:col-span-2'>
                    <div className=' h-full '>
                        {steps[activeStep].ele}
                    </div>
                </div>
                <div>
                    <div className='flex flex-col'>
                        {steps.map((item, index) => (
                            <div className='flex items-center' key={index}>
                                <div className={`cursor-pointer transition-all duration-300 font-medium text-lg my-5 p-1.5 px-4 rounded-full shadow-md shadow-[#00000040] ${activeStep >= index
                                    ? 'bg-[#3E5AF0] text-white'
                                    : 'bg-[#F9F9F9] text-black'
                                    }`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    {item.step}
                                </div>
                                <span className="ms-3 text-[#526484]">{item.about}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default Page
