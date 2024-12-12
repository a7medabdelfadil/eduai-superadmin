"use client";
import React, { useState } from "react";
import FirstStep from "./components/steps/FirstStep";
import SecoundStep from "./components/steps/SecoundStep";
import ThirdStep from "./components/steps/ThirdStep";
import { useAddCourseMutation } from "./api/createCourseSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Container from "@/components/Container";

function Page() {
  const [activeStep, setActiveStep] = useState(0);

  const [code, setCode] = useState("");
  const [countryId, setCountryId] = useState("");
  const [level, setLevel] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [language, setLanguage] = useState("");
  const [eduSystemId, setEduSystemId] = useState("");
  const [name_en, setName_en] = useState("");
  const [name_ar, setName_ar] = useState("");
  const [name_fr, setName_fr] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [description_fr, setDescription_fr] = useState("");
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);

  const token = Cookies.get("token") || "";

  const [addCourse, { data, originalArgs, error }] = useAddCourseMutation();
  const handleNext = () => {
    setActiveStep((cur) => cur + 1);
  };
  const handlePrev = () => {
    setActiveStep((cur) => cur - 1);
  };
  const handleSend = async () => {
    const objectReq = {
      countryId: countryId, // Get possible values from /api/v1/management/country/all
      code: code,
      level: level, // Get possible values from: /api/v1/public/enumeration/study-level
      registrationType: registrationType, // Get possible values from: /api/v1/public/enumeration/registration-type
      language: language, // Get possible values from: /api/v1/public/enumeration/language
      eduSystemId: eduSystemId,
      name_en: name_en,
      name_ar: name_ar,
      name_fr: name_fr,
      description_en: description_en,
      description_ar: description_ar,
      description_fr: description_fr,
      prerequisiteIds: prerequisites, // list of courses ids, can be an empty list
      // coefficient: 2, // optional
      // semesterName: "FALL", // optional // Get possible values from: /api/v1/public/enumeration/semester-name
      // secondarySchoolDepartment: "SCIENTIFIC", // optional // Get possible values from: /api/v1/public/enumeration/secondary-school-department
      // subDepartment: "PHYSICAL_SCIENCES", // optional // Get possible values from: /api/v1/public/enumeration/secondary-school-sub-department
    };
  
    try {
      // Await the promise returned by addCourse
      const response = await addCourse({ token, data: objectReq }).unwrap();
      toast.success("Course added successfully!");
    } catch (error) {
      toast.error("Error adding course: ");
    }
  
  };
  

  const steps = [
    {
      step: 1,
      about: "Course Information",
      ele: (
        <FirstStep
          handleNext={handleNext}
          code={code}
          setCode={setCode}
          countryId={countryId}
          setCountryId={setCountryId}
          language={language}
          eduSystemId={eduSystemId}
          setEduSystemId={setEduSystemId}
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
      ),
    },
    {
      step: 2,
      about: "Course Option",
      ele: (
        <SecoundStep
          handleNext={handleNext}
          handlePrev={handlePrev}
          prerequisites={prerequisites}
          setPrerequisites={setPrerequisites}
          handleSend={handleSend}
        />
      ),
    },
    {
      step: 3,
      about: "Course Content",
      ele: (
        <ThirdStep
          dataAddCourse={data}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      ),
    },
  ];

  return (
    <Container className="relative mt-5 overflow-x-auto bg-transparent sm:rounded-lg px-2 min-h-screen">
      <h1 className="font-bold text-[28px] font-sans text-[#041631] dark:text-white">
        Create Course
      </h1>
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="md:col-span-2">
          <div className=" h-full ">{steps[activeStep].ele}</div>
        </div>
        <div>
          <div className="flex flex-col">
            {steps.map((item, index) => (
              <div className="flex items-center" key={index}>
                <div
                  className={`cursor-pointer transition-all duration-300 font-medium text-lg my-5 p-1.5 px-4 rounded-full shadow-md shadow-[#00000040] ${
                    activeStep >= index
                      ? "bg-[#3E5AF0] text-white"
                      : "bg-[#F9F9F9] text-black"
                  }`}
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
  );
}

export default Page;
