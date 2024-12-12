"use client"
import React, { useState } from 'react'
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import style from "./style.module.css"
import { useGetCountryQuery, useGetEduSystemQuery, useGetLanguageQuery, useGetRegistrationTypeQuery, useGetStudyLevelQuery } from '../../api/createCourseSlice';
import Cookies from "js-cookie"
import { toast } from 'react-toastify';

interface FirstStepProps {
  handleNext: () => void;
  code: string
  setCode: (code: string) => void;
  countryId: string;
  setCountryId: (countryId: string) => void;
  eduSystemId: string;
  setEduSystemId: (eduSystemId: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  registrationType: string;
  setRegistrationType: (registrationType: string) => void;
  level: string;
  setLevel: (level: string) => void;
  name_en: string;
  setName_en: (name_en: string) => void;
  name_ar: string;
  setName_ar: (name_ar: string) => void;
  name_fr: string;
  setName_fr: (name_fr: string) => void;
  description_en: string;
  setDescription_en: (description_en: string) => void;
  description_ar: string;
  setDescription_ar: (description_ar: string) => void;
  description_fr: string;
  setDescription_fr: (description_fr: string) => void;
}

const FirstStep: React.FC<FirstStepProps> = ({
  handleNext,
  code,
  setCode,
  countryId,
  setCountryId,
  eduSystemId,
  setEduSystemId,
  language,
  setLanguage,
  registrationType,
  setRegistrationType,
  level,
  setLevel,
  name_en,
  setName_en,
  name_ar,
  setName_ar,
  name_fr,
  setName_fr,
  description_en,
  setDescription_en,
  description_ar,
  setDescription_ar,
  description_fr,
  setDescription_fr,

}) => {

  const token = Cookies.get('token') || "";
  const { data: dataCountry, isSuccess: successCountry } = useGetCountryQuery(token)
  const { data: dataEdu, isSuccess: successEduSystem } = useGetEduSystemQuery(token)
  const { data: dataLang, isSuccess: successLanguage } = useGetLanguageQuery(token)
  const { data: dataRegistrationType, isSuccess: successRegistrationType } = useGetRegistrationTypeQuery(token)
  const { data: dataStudyLevel, isSuccess: successStudyLevel } = useGetStudyLevelQuery(token)
  console.log('dataCountry', dataCountry);
  // Error Messages
  const [countryError, setCountryError] = useState("");
  const [eduSystemError, setEduSystemError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [registrationTypeError, setRegistrationTypeError] = useState("");
  const [levelError, setLevelError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [nameEnError, setNameEnError] = useState("");
  const [nameArError, setNameArError] = useState("");
  const [nameFrError, setNameFrError] = useState("");
  const [descriptionEnError, setDescriptionEnError] = useState("");
  const [descriptionArError, setDescriptionArError] = useState("");
  const [descriptionFrError, setDescriptionFrError] = useState("");
  const validateFields = () => {
    let isValid = true;

    // Reset error messages
    setCountryError("");
    setEduSystemError("");
    setLanguageError("");
    setRegistrationTypeError("");
    setLevelError("");
    setCodeError("");
    setNameEnError("");
    setNameArError("");
    setNameFrError("");
    setDescriptionEnError("");
    setDescriptionArError("");
    setDescriptionFrError("");

    if (!countryId) {
      setCountryError("Country is required");
      isValid = false;
    } else {
      setCountryError("");
    }
    if (!eduSystemId) {
      setEduSystemError("Education System is required");
      isValid = false;
    } else {
      setEduSystemError("");
    }

    if (!language) {
      setLanguageError("Language is required");
      isValid = false;
    } else {
      setLanguageError("");
    }

    if (!registrationType) {
      setRegistrationTypeError("Registration type is required");
      isValid = false;
    } else {
      setRegistrationTypeError("");
    }

    if (!level) {
      setLevelError("Grade Level is required");
      isValid = false;
    } else {
      setLevelError("");
    }

    if (!code) {
      setCodeError("Code is required");
      isValid = false;
    } else {
      setCodeError("");
    }

    if (!name_en) {
      setNameEnError("Course name in English is required");
      isValid = false;
    } else {
      setNameEnError("");
    }

    if (!name_ar) {
      setNameArError("Course name in Arabic is required");
      isValid = false;
    } else {
      setNameArError("");
    }

    if (!name_fr) {
      setNameFrError("Course name in French is required");
      isValid = false;
    } else {
      setNameFrError("");
    }

    if (!description_en) {
      setDescriptionEnError("Course description in English is required");
      isValid = false;
    } else {
      setDescriptionEnError("");
    }

    if (!description_ar) {
      setDescriptionArError("Course description in Arabic is required");
      isValid = false;
    } else {
      setDescriptionArError("");
    }

    if (!description_fr) {
      setDescriptionFrError("Course description in French is required");
      isValid = false;
    } else {
      setDescriptionFrError("");
    }

    return isValid;
  };

  const lang = Cookies.get("lang") || "english"
  return (
    <form className='bg-white card p-3 shadow-md shadow-[#00000040] rounded-md' onSubmit={(e) => {
      e.preventDefault();

      const isValid = validateFields();
      
      if (isValid) {
        handleNext();
      } else {
        toast.warning("Please fill all required fields", {
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
    }}>
      <div className='grid md:grid-cols-2 gap-10 '>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="country">country <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select required value={countryId} onChange={(e) => setCountryId(e.target.value)} className={`${style.selectForm}`} id='country'>
            {successCountry && (
              <>
                <option className='hidden'>Select country</option>
                {dataCountry.data.content.map((item: any) => (
                  <option key={item.id} value={item.id}>{lang === "english" && item.name_en || lang === "arabic" && item.name_ar || lang === "french" && item.name_fr}</option>
                ))}
              </>
            )}
          </Select>
          {countryError && <p className="text-red-500 text-xs italic">{countryError}</p>}

        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="eduSystem">eduSystem <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select required value={eduSystemId} onChange={(e) => setEduSystemId(e.target.value)} className={`${style.selectForm}`} id='eduSystem'>
            {successEduSystem && (
              <>
                <option className='hidden'>Select EduSystem</option>
                {dataEdu.data.content.map((item: any) => (
                  <option value={item.id} key={item.id}>{item.name}</option>
                ))}
              </>
            )}
          </Select>
          {eduSystemError && <p className="text-red-500 text-xs italic">{eduSystemError}</p>}
        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="language">language <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select required value={language} onChange={(e) => setLanguage(e.target.value)} className={`${style.selectForm}`} id='language'>
            {successLanguage && (
              <>
                <option className='hidden'>Select Language</option>
                {Object.keys(dataLang.data).map((key: any) => (
                  <option key={key} value={key}>
                    {dataLang.data[key]}
                  </option>
                ))}
              </>
            )}
          </Select>
          {languageError && <p className="text-red-500 text-xs italic">{languageError}</p>}
        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="registrationType">registration type <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select required value={registrationType} onChange={(e) => setRegistrationType(e.target.value)} className={`${style.selectForm}`} id='registrationType'>
            {successRegistrationType && (
              <>
                <option className='hidden'>Select registration type</option>
                {Object.keys(dataRegistrationType.data).map((key: any) => (
                  <option key={key} value={key}>
                    {dataRegistrationType.data[key]}
                  </option>
                ))}
              </>
            )}
          </Select>
          {registrationTypeError && <p className="text-red-500 text-xs italic">{registrationTypeError}</p>}
        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="grade">Grade Level <span className='text-[#367AFF] text-xl'>*</span></label>
          <Select required value={level} onChange={(e) => setLevel(e.target.value)} className={`${style.selectForm}`} id='grade'>
            {successStudyLevel && (
              <>
                <option className='hidden'>Select Grade Level</option>
                {Object.keys(dataStudyLevel.data).map((key) => (
                  <option key={key} value={key}>
                    {dataStudyLevel.data[key]}
                  </option>
                ))}
              </>
            )}
          </Select>
          {levelError && <p className="text-red-500 text-xs italic">{levelError}</p>}
        </div>
        <div>
          <label className='mb-3 inline-block md:text-lg capitalize font-medium' htmlFor="code">Code <span className='text-[#367AFF] text-xl'>*</span></label>
          <TextInput value={code} onChange={(e) => setCode(e.target.value)} id="code" type="text" placeholder="Enter code" />
          {codeError && <p className="text-red-500 text-xs italic">{codeError}</p>}
        </div>
      </div>
      <h3 className='font-semibold my-5 md:text-xl text-[#526484]'>Category</h3>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseNameEn" value="Course name English" />
        <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <TextInput value={name_en} onChange={(e) => setName_en(e.target.value)} id="courseNameEn" type="text" placeholder="Enter course name" />
          {nameEnError && <p className="text-red-500 text-xs italic">{nameEnError}</p>}
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseNameAr" value="Course name Arabic" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <TextInput value={name_ar} onChange={(e) => setName_ar(e.target.value)} id="courseNameAr" type="text" placeholder="Enter course name" />
        {nameArError && <p className="text-red-500 text-xs italic">{nameArError}</p>}
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseNameFr" value="Course name French" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <TextInput value={name_fr} onChange={(e) => setName_fr(e.target.value)} id="courseNameFr" type="text" placeholder="Enter course name" />
        {nameFrError && <p className="text-red-500 text-xs italic">{nameFrError}</p>}  
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseDescriptionEn" value="course description English" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <Textarea value={description_en} onChange={(e) => setDescription_en(e.target.value)} rows={7} id="courseDescriptionEn" placeholder="Write course description" />
        {descriptionEnError && <p className="text-red-500 text-xs italic">{descriptionEnError}</p>}
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseDescriptionAr" value="course description Arabic" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <Textarea value={description_ar} onChange={(e) => setDescription_ar(e.target.value)} rows={7} id="courseDescriptionAr" placeholder="Write course description" />
        {descriptionArError && <p className="text-red-500 text-xs italic">{descriptionArError}</p>}
      </div>
      <div>
        <div className="my-4 block">
          <Label className='md:text-lg capitalize font-medium' htmlFor="courseDescriptionFr" value="course description French" />
          <span className='text-[#367AFF] text-2xl ms-1'>*</span>
        </div>
        <Textarea value={description_fr} onChange={(e) => setDescription_fr(e.target.value)} rows={7} id="courseDescriptionFr" placeholder="Write course description" />
        {descriptionFrError && <p className="text-red-500 text-xs italic">{descriptionFrError}</p>}
      </div>
      <div className='my-4 flex justify-end'>
        <button className='text-white flex items-center bg-[#367AFF] md:text-lg py-1.5 px-8 rounded-md hover:opacity-80' >Next
          <svg width="24" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2106 18.2928C10.6011 18.6833 11.2343 18.6833 11.6248 18.2928L16.5122 13.4006C17.2926 12.6194 17.2923 11.3536 16.5116 10.5728L11.6212 5.6825C11.2307 5.2919 10.5975 5.2919 10.207 5.6825C9.81643 6.073 9.81643 6.7062 10.207 7.0967L14.3926 11.2823C14.7832 11.6728 14.7831 12.306 14.3926 12.6965L10.2106 16.8786C9.82004 17.2691 9.82004 17.9023 10.2106 18.2928Z" fill="white" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default FirstStep
