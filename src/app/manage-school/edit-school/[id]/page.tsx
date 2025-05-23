"use client";
import { Select } from "flowbite-react";
import style from "./style.module.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useGetEducationLevelQuery } from "../../../create-course/api/createCourseSlice";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAllCurrenciesQuery,
  useGetCurriculumQuery,
  useGetEducationsQuery,
  useGetLanguagesQuery,
  useGetRegionQuery,
  useGetTypeQuery,
} from "@/app/add-new-school/api/createSchoolApi";
import {
  useGetSchoolByIdQuery,
  useUpdateSchoolMutation,
} from "../../api/manageSchool";
import Spinner from "@/components/spinner";
import Container from "@/components/Container";

const EditSchool = () => {
  const router = useRouter();
  const params = useParams();
  const token = Cookies.get("token") || "";
  const lang = Cookies.get("lang") || "";
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [about, setAbout] = useState("");
  const [theme, setTheme] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [type, setType] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [educations, setEducations] = useState<string[]>([]);
  const [regionId, setRegionId] = useState("");
  const [fallSemesterStartDate, setFallSemesterStartDate] = useState("");
  const [fallSemesterEndDate, setFallSemesterEndDate] = useState("");
  const [springSemesterStartDate, setSpringSemesterStartDate] = useState("");
  const [springSemesterEndDate, setSpringSemesterEndDate] = useState("");
  const [summerSemesterStartDate, setSummerSemesterStartDate] = useState("");
  const [summerSemesterEndDate, setSummerSemesterEndDate] = useState("");
  const [established, setEstablished] = useState("");
  const [workDayStartTime, setWorkDayStartTime] = useState("");
  const [workDayEndTime, setWorkDayEndTime] = useState("");
  const [numberOfLegalAbsenceDays, setNumberOfLegalAbsenceDays] = useState("");
  const [currencyForSalaries, setCurrencyForSalaries] = useState("");
  const [currencyForInvoices, setCurrencyForInvoices] = useState("");

  const { isSuccess: successCurriculum, data: dataCurriculum } =
    useGetCurriculumQuery(token);
  const { isSuccess: successType, data: dataType } = useGetTypeQuery(token);
  const { isSuccess: successLanguages, data: dataLanguages } =
    useGetLanguagesQuery(token);
  const { isSuccess: successLevels, data: dataLevels } =
    useGetEducationLevelQuery(token);
  const { isSuccess: successEducations, data: dataEducations } =
    useGetEducationsQuery(token);
  const { isSuccess: successRegions, data: dataRegions } =
    useGetRegionQuery(token);
  const { isSuccess: successSchool, data: dataSchool } = useGetSchoolByIdQuery({
    token,
    id: params.id,
  });
  const { data: dataCurrencies } = useGetAllCurrenciesQuery(token);
  const [updateSchool, { error, isError, isSuccess, isLoading }] =
    useUpdateSchoolMutation();
  const [openLanguages, setOpenLanguages] = useState(false);
  const [openLevels, setOpenLevels] = useState(false);
  const [openEducations, setOpenEducations] = useState(false);
  useEffect(() => {
    if (successSchool && dataSchool?.data) {
      setName(dataSchool.data.name || "");
      setCode(dataSchool.data.code || "");
      setAbout(dataSchool.data.about || "");
      setTheme(dataSchool.data.theme || "");
      setCurriculum(dataSchool.data.curriculum || "");
      setType(dataSchool.data.type || "");
      setLanguages(dataSchool.data.languages || []);
      setLevels(dataSchool.data.stages || []);
      setEducations(dataSchool.data.educationSystemsIds || []);
      setRegionId(dataSchool.data.regionId || "");
      setFallSemesterStartDate(
        dataSchool.data.semesterDate?.fallSemesterStartDate || ""
      );
      setFallSemesterEndDate(
        dataSchool.data.semesterDate?.fallSemesterEndDate || ""
      );
      setSpringSemesterStartDate(
        dataSchool.data.semesterDate?.springSemesterStartDate || ""
      );
      setSpringSemesterEndDate(
        dataSchool.data.semesterDate?.springSemesterEndDate || ""
      );
      setSummerSemesterStartDate(
        dataSchool.data.semesterDate?.summerSemesterStartDate || ""
      );
      setSummerSemesterEndDate(
        dataSchool.data.semesterDate?.summerSemesterEndDate || ""
      );
      setEstablished(dataSchool.data.established || "");
      setWorkDayStartTime(dataSchool.data.workDayStartTime || "");
      setWorkDayEndTime(dataSchool.data.workDayEndTime || "");
      setNumberOfLegalAbsenceDays(
        dataSchool.data.numberOfLegalAbsenceDays?.toString() || ""
      );
      setCurrencyForSalaries(dataSchool.data.currencyForSalaries || "");
      setCurrencyForInvoices(dataSchool.data.currencyForInvoices || "");

      // setEducations(["1"]); // TODO: remove it
    }
  }, [successSchool, dataSchool]);

  // Error Messages
  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [aboutError, setAboutError] = useState("");
  const [themeError, setThemeError] = useState("");
  const [curriculumError, setCurriculumError] = useState("");
  const [typeError, setTypeError] = useState("");
  const [languagesError, setLanguagesError] = useState("");
  const [levelsError, setLevelsError] = useState("");
  const [educationsError, setEducationsError] = useState("");
  const [errorFallSemesterStartDate, setErrorFallSemesterStartDate] =
    useState("");
  const [errorFallSemesterEndDate, setErrorFallSemesterEndDate] = useState("");
  const [errorSpringSemesterStartDate, setErrorSpringSemesterStartDate] =
    useState("");
  const [errorSpringSemesterEndDate, setErrorSpringSemesterEndDate] =
    useState("");
  const [errorSummerSemesterStartDate, setErrorSummerSemesterStartDate] =
    useState("");
  const [errorSummerSemesterEndDate, setErrorSummerSemesterEndDate] =
    useState("");
  const [errorEstablished, setErrorEstablished] = useState("");
  const [errorWorkDayStartTime, setErrorWorkDayStartTime] = useState("");
  const [errorWorkDayEndTime, setErrorWorkDayEndTime] = useState("");
  const [errorRegionId, setErrorRegionId] = useState("");
  const [errorNumberOfLegalAbsenceDays, setErrorNumberOfLegalAbsenceDays] =
    useState("");
  const [currencyForSalariesError, setCurrencyForSalariesError] = useState("");
  const [currencyForInvoicesError, setCurrencyForInvoicesError] = useState("");

  const validateInputs = () => {
    // Reset all error messages
    setNameError("");
    setCodeError("");
    setAboutError("");
    setThemeError("");
    setCurriculumError("");
    setTypeError("");
    setLanguagesError("");
    setLevelsError("");
    setEducationsError("");
    setErrorFallSemesterStartDate("");
    setErrorFallSemesterEndDate("");
    setErrorSpringSemesterStartDate("");
    setErrorSpringSemesterEndDate("");
    setErrorSummerSemesterStartDate("");
    setErrorSummerSemesterEndDate("");
    setErrorEstablished("");
    setErrorWorkDayStartTime("");
    setErrorWorkDayEndTime("");
    setErrorRegionId("");
    setErrorNumberOfLegalAbsenceDays("");

    let isValid = true;

    // Perform validations
    if (name.trim() === "") {
      setNameError("Name School is required");
      isValid = false;
    }

    if (code.trim() === "") {
      setCodeError("Code is required");
      isValid = false;
    }

    if (about.trim() === "") {
      setAboutError("About is required");
      isValid = false;
    }

    if (theme.trim() === "") {
      setThemeError("Theme is required");
      isValid = false;
    }

    if (!curriculum) {
      setCurriculumError("Curriculum is required");
      isValid = false;
    }

    if (!type) {
      setTypeError("Type is required");
      isValid = false;
    }

    if (languages.length === 0) {
      setLanguagesError("At least one language is required");
      isValid = false;
    }

    if (levels.length === 0) {
      setLevelsError("At least one level is required");
      isValid = false;
    }

    if (educations.length === 0) {
      setEducationsError("At least one education system is required");
      isValid = false;
    }

    if (!fallSemesterStartDate) {
      setErrorFallSemesterStartDate("This field is required");
      isValid = false;
    }
    if (!fallSemesterEndDate) {
      setErrorFallSemesterEndDate("This field is required");
      isValid = false;
    }
    if (!springSemesterStartDate) {
      setErrorSpringSemesterStartDate("This field is required");
      isValid = false;
    }
    if (!springSemesterEndDate) {
      setErrorSpringSemesterEndDate("This field is required");
      isValid = false;
    }
    if (!summerSemesterStartDate) {
      setErrorSummerSemesterStartDate("This field is required");
      isValid = false;
    }
    if (!summerSemesterEndDate) {
      setErrorSummerSemesterEndDate("This field is required");
      isValid = false;
    }
    if (!established) {
      setErrorEstablished("This field is required");
      isValid = false;
    }
    if (!workDayStartTime) {
      setErrorWorkDayStartTime("This field is required");
      isValid = false;
    }
    if (!workDayEndTime) {
      setErrorWorkDayEndTime("This field is required");
      isValid = false;
    }
    if (!regionId) {
      setErrorRegionId("This field is required");
      isValid = false;
    }

    if (!currencyForSalaries) {
      setCurrencyForSalariesError("This field is required");
      isValid = false;
    }
    if (!currencyForInvoices) {
      setCurrencyForInvoicesError("This field is required");
      isValid = false;
    }

    // Parse the number for validation
    const parsedNumberOfLegalAbsenceDays = parseFloat(numberOfLegalAbsenceDays);

    if (!numberOfLegalAbsenceDays) {
      setErrorNumberOfLegalAbsenceDays("This field is required");
      isValid = false;
    } else if (isNaN(parsedNumberOfLegalAbsenceDays)) {
      setErrorNumberOfLegalAbsenceDays("Must be a number");
      isValid = false;
    }

    // Date validations
    if (new Date(fallSemesterStartDate) >= new Date(fallSemesterEndDate)) {
      setErrorFallSemesterEndDate("End date must be greater than start date");
      isValid = false;
    }
    if (new Date(springSemesterStartDate) >= new Date(springSemesterEndDate)) {
      setErrorSpringSemesterEndDate("End date must be greater than start date");
      isValid = false;
    }
    if (new Date(summerSemesterStartDate) >= new Date(summerSemesterEndDate)) {
      setErrorSummerSemesterEndDate("End date must be greater than start date");
      isValid = false;
    }
    if (new Date(workDayStartTime) >= new Date(workDayEndTime)) {
      setErrorWorkDayEndTime("End time must be greater than start time");
      isValid = false;
    }

    return isValid;
  };

  const toggleDropdown = () => {
    setOpenLanguages(!openLanguages);
    setOpenLevels(false);
    setOpenEducations(false);
  };
  const toggleDropdownLevels = () => {
    setOpenLevels(!openLevels);
    setOpenEducations(false);
    setOpenLanguages(false);
  };
  const toggleDropdownEducations = () => {
    setOpenEducations(!openEducations);
    setOpenLanguages(false);
    setOpenLevels(false);
  };

  // const handleCheckboxChange = (value: string) => {
  //   setLanguages((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((lang) => lang !== value)
  //       : [...prev, value]
  //   );
  // };

  const handleCheckboxChangeLevels = (value: string) => {
    setLevels((prev) =>
      prev.includes(value)
        ? prev.filter((level) => level !== value)
        : [...prev, value]
    );
  };
  const handleCheckboxChangeEducations = (value: string) => {
    setEducations((prev) =>
      prev.includes(value)
        ? prev.filter((education) => education !== value)
        : [...prev, value]
    );
  };

  const formatDate = (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `--${month}-${day}`;
    }
    return "";
  };

  const handleSend = async (e: any) => {
    e.preventDefault();

    if (!validateInputs()) {
      // Show error toast if inputs are invalid
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const data = {
      name: name,
      about: about,
      code: code,
      theme: theme,
      curriculum: curriculum,
      type: type,
      languages: languages,
      stages: levels,
      educationSystemsIds: educations,
      semesterDate: {
        fallSemesterStartDate: fallSemesterStartDate,
        fallSemesterEndDate: fallSemesterEndDate,
        springSemesterStartDate: springSemesterStartDate,
        springSemesterEndDate: springSemesterEndDate,
        summerSemesterStartDate: summerSemesterStartDate,
        summerSemesterEndDate: summerSemesterEndDate,
      },
      established: established,
      numberOfLegalAbsenceDays: numberOfLegalAbsenceDays,
      workDayStartTime: workDayStartTime,
      workDayEndTime: workDayEndTime,
      regionId: regionId,
      currencyForSalaries,
      currencyForInvoices,
    };

    try {
      await updateSchool({ token, id: params.id, body: data }).unwrap();

      // Show success toast on successful update
      toast.success("School information updated successfully!");
    } catch (error) {
      // Show error toast if there's an issue with the update
      toast.error("Failed to update school information. Please try again.");
    }
  };

  useEffect(() => {
    if (isError) {
      if (error && "data" in error && (error as FetchBaseQueryError).data) {
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
      toast.success("School Updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/manage-school");
    }
  }, [isSuccess, router]);

  return (
    <>
      {successSchool && (
        <Container centered={true} className="mt-10 pl-4">
          <form>
            <h1 className="font-bold text-[28px] mb-4 font-sans text-[#041631] dark:text-white">
              Update School
            </h1>

            <div className="grid p-10 bg-white card rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px]  gap-5 md:w-[600px] sm:w-[500px]">
              <div className="flex items-center justify-start gap-2">
                <svg
                  className="h-6 w-6 font-bold text-[#526484] group-hover:text-[#3e5af0]"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <line x1="3" y1="21" x2="21" y2="21" />{" "}
                  <line x1="3" y1="10" x2="21" y2="10" />{" "}
                  <polyline points="5 6 12 3 19 6" />{" "}
                  <line x1="4" y1="10" x2="4" y2="21" />{" "}
                  <line x1="20" y1="10" x2="20" y2="21" />{" "}
                  <line x1="8" y1="14" x2="8" y2="17" />{" "}
                  <line x1="12" y1="14" x2="12" y2="17" />{" "}
                  <line x1="16" y1="14" x2="16" y2="17" />
                </svg>
                <h1 className="text-[22px] font-sans font-semibold">
                  School Information
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-4 max-[1278px]:grid-cols-1">
                <label
                  htmlFor="name"
                  className="grid text-[18px] font-sans font-semibold"
                >
                  <div className="flex gap-2">
                    <div>Name School</div>
                    <div className="text-[#367AFF] text-xl">*</div>
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    type="text"
                    className="w-full mt-3 py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]"
                  />
                  {nameError && (
                    <span className="text-red-600 text-sm">{nameError}</span>
                  )}
                </label>
                <label
                  htmlFor="code"
                  className="grid text-[18px] font-sans font-semibold"
                >
                  <div className="flex gap-2">
                    <div>Code</div>
                    <div className="text-[#367AFF] text-xl">*</div>
                  </div>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    id="code"
                    type="text"
                    className="w-full mt-3 py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]"
                  />
                  {codeError && (
                    <span className="text-red-600 text-sm">{codeError}</span>
                  )}
                </label>
                <label
                  htmlFor="about"
                  className="grid text-[18px] font-sans font-semibold"
                >
                  <div className="flex gap-2">
                    <div>About</div>
                    <div className="text-[#367AFF] text-xl">*</div>
                  </div>
                  <input
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    id="about"
                    type="text"
                    className="w-full mt-3 py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]"
                  />
                  {aboutError && (
                    <span className="text-red-600 text-sm">{aboutError}</span>
                  )}
                </label>
                <label
                  htmlFor="theme"
                  className="grid text-[18px] font-sans font-semibold"
                >
                  <div className="flex gap-2">
                    <div>Theme</div>
                    <div className="text-[#367AFF] text-xl">*</div>
                  </div>
                  <input
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    id="theme"
                    type="text"
                    className="w-full mt-3 py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]"
                  />
                  {themeError && (
                    <span className="text-red-600 text-sm">{themeError}</span>
                  )}
                </label>
                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="curriculum"
                  >
                    curriculum <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    className={`${style.selectForm} `}
                    id="curriculum"
                  >
                    {successCurriculum && (
                      <>
                        <option className="hidden">Select curriculum</option>
                        {Object.values(dataCurriculum?.data).map(
                          (value: any) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          )
                        )}
                      </>
                    )}
                  </Select>
                  {curriculumError && (
                    <span className="text-red-600 text-sm">
                      {curriculumError}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="type"
                  >
                    type <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className={`${style.selectForm}`}
                    id="type"
                  >
                    {successType && (
                      <>
                        <option className="hidden">Select type</option>
                        {Object.values(dataType?.data).map((value: any) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </>
                    )}
                  </Select>
                  {typeError && (
                    <span className="text-red-600 text-sm">{typeError}</span>
                  )}
                </div>
                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="type"
                  >
                    Languages <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={languages[0] || ""}
                    onChange={(e) => setLanguages([e.target.value])}
                    className={`${style.selectForm}`}
                    id="type"
                  >
                    <option className="hidden">Select language</option>
                    {dataLanguages?.data ? (
                      Object.keys(dataLanguages.data).map((key) => (
                        <option key={key} value={key}>
                          {dataLanguages.data[key]}
                        </option>
                      ))
                    ) : (
                      <option>Loading...</option>
                    )}
                  </Select>

                  {languagesError && (
                    <span className="text-red-600 text-sm">
                      {languagesError}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="type"
                  >
                    Stages <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={levels[0] || ""}
                    onChange={(e) => setLevels([e.target.value])}
                    className={`${style.selectForm}`}
                    id="type"
                  >
                    <option className="hidden">Select Stages</option>
                    {Object.keys(dataLevels?.data).map((key) => (
                      <option key={key} value={key}>
                        {dataLevels?.data[key]}
                      </option>
                    ))}
                  </Select>

                  {levelsError && (
                    <span className="text-red-600 text-sm">{levelsError}</span>
                  )}
                </div>
                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="type"
                  >
                    Education Systems{" "}
                    <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={educations[0] || ""}
                    onChange={(e) => setEducations([e.target.value])}
                    className={`${style.selectForm}`}
                    id="type"
                  >
                    <option className="hidden">Select Education System</option>
                    {dataEducations?.data?.content
                      .filter((education: any) => !education.deleted) // Filter out deleted items
                      .map((education: any) => (
                        <option key={education.id} value={education.id}>
                          {education.name}
                        </option>
                      ))}
                  </Select>

                  {educationsError && (
                    <span className="text-red-600 text-sm">
                      {educationsError}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fallSemesterStartDate"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Fall Semester Start Date</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="fallSemesterStartDate"
                    type="date"
                    value={""}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    onChange={(e) =>
                      setFallSemesterStartDate(formatDate(e.target.value))
                    }
                  />
                  <p className="w-1/2 z-10 relative bg-white -mt-[42px] ml-2 py-2 px-2 rounded-xl dark:bg-slate-700">
                    {fallSemesterStartDate}
                  </p>
                  {errorFallSemesterStartDate && (
                    <p className="text-red-600">{errorFallSemesterStartDate}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fallSemesterEndDate"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Fall Semester End Date</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="fallSemesterEndDate"
                    type="date"
                    value={""}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    onChange={(e) =>
                      setFallSemesterEndDate(formatDate(e.target.value))
                    }
                  />
                  <p className="w-1/2 z-10 relative bg-white -mt-[42px] ml-2 py-2 px-2 rounded-xl dark:bg-slate-700">
                    {fallSemesterEndDate}
                  </p>

                  {errorFallSemesterEndDate && (
                    <p className="text-red-600">{errorFallSemesterEndDate}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="springSemesterStartDate"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Spring Semester Start Date</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="springSemesterStartDate"
                    type="date"
                    value={""}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    onChange={(e) =>
                      setSpringSemesterStartDate(formatDate(e.target.value))
                    }
                  />
                  <p className="w-1/2 z-10 relative bg-white -mt-[42px] ml-2 py-2 px-2 rounded-xl dark:bg-slate-700">
                    {springSemesterStartDate}
                  </p>
                  {errorSpringSemesterStartDate && (
                    <p className="text-red-600">
                      {errorSpringSemesterStartDate}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="springSemesterEndDate"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Spring Semester End Date</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="springSemesterEndDate"
                    type="date"
                    value={""}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    onChange={(e) =>
                      setSpringSemesterEndDate(formatDate(e.target.value))
                    }
                  />
                  <p className="w-1/2 z-10 relative bg-white -mt-[42px] ml-2 py-2 px-2 rounded-xl dark:bg-slate-700">
                    {springSemesterEndDate}
                  </p>
                  {errorSpringSemesterEndDate && (
                    <p className="text-red-600">{errorSpringSemesterEndDate}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="summerSemesterStartDate"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Summer Semester Start Date</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="summerSemesterStartDate"
                    type="date"
                    value={""}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    onChange={(e) =>
                      setSummerSemesterStartDate(formatDate(e.target.value))
                    }
                  />
                  <p className="w-1/2 z-10 relative bg-white -mt-[42px] ml-2 py-2 px-2 rounded-xl dark:bg-slate-700">
                    {summerSemesterStartDate}
                  </p>
                  {errorSummerSemesterStartDate && (
                    <p className="text-red-600">
                      {errorSummerSemesterStartDate}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="summerSemesterEndDate"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Summer Semester End Date</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="summerSemesterEndDate"
                    type="date"
                    value={""}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    onChange={(e) =>
                      setSummerSemesterEndDate(formatDate(e.target.value))
                    }
                  />
                  <p className="w-1/2 z-10 relative bg-white -mt-[42px] ml-2 py-2 px-2 rounded-xl dark:bg-slate-700">
                    {summerSemesterEndDate}
                  </p>

                  {errorSummerSemesterEndDate && (
                    <p className="text-red-600">{errorSummerSemesterEndDate}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="established"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Established</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="established"
                    type="date"
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    value={established}
                    onChange={(e) => setEstablished(e.target.value)}
                  />
                  {errorEstablished && (
                    <p className="text-red-600">{errorEstablished}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="workDayStartTime"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Work Day Start Time</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="workDayStartTime"
                    type="time"
                    step={2}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    value={workDayStartTime}
                    onChange={(e) => setWorkDayStartTime(e.target.value)}
                  />
                  {errorWorkDayStartTime && (
                    <p className="text-red-600">{errorWorkDayStartTime}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="workDayEndTime"
                    className="text-[18px] font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Work Day End Time</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    id="workDayEndTime"
                    type="time"
                    step={2}
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                    value={workDayEndTime}
                    onChange={(e) => setWorkDayEndTime(e.target.value)}
                  />
                  {errorWorkDayEndTime && (
                    <p className="text-red-600">{errorWorkDayEndTime}</p>
                  )}
                </div>
                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="region"
                  >
                    region <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={regionId}
                    onChange={(e) => setRegionId(e.target.value)}
                    className={`${style.selectForm}`}
                    id="region"
                  >
                    {successRegions && (
                      <>
                        <option className="hidden">Select region</option>
                        {dataRegions.data.content.map((item: any) => (
                          <option key={item.id} value={item.id}>
                            {(lang === "english" && item.name_en) ||
                              (lang === "arabic" && item.name_ar) ||
                              (lang === "french" && item.name_fr)}
                          </option>
                        ))}
                      </>
                    )}
                  </Select>
                  {errorRegionId && (
                    <p className="text-red-600">{errorRegionId}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="numberOfLegalAbsenceDays"
                    className="text-[18px]  font-sans font-semibold"
                  >
                    <div className="flex gap-2">
                      <div>Number Of Legal Absence Days</div>
                      <div className="text-[#367AFF] text-xl">*</div>
                    </div>
                  </label>
                  <input
                    value={numberOfLegalAbsenceDays}
                    onChange={(e) =>
                      setNumberOfLegalAbsenceDays(e.target.value)
                    }
                    id="numberOfLegalAbsenceDays"
                    type="text"
                    className="w-full mt-2 py-2.5 px-4 rounded-xl border dark:bg-slate-700 border-zinc-300 outline-none max-[471px]:w-[350px]"
                  />
                  {errorNumberOfLegalAbsenceDays && (
                    <p className="text-red-600">
                      {errorNumberOfLegalAbsenceDays}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="currencyForSalaries"
                  >
                    Currency for Salaries{" "}
                    <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={currencyForSalaries}
                    onChange={(e) => setCurrencyForSalaries(e.target.value)}
                    className={`${style.selectForm}`}
                    id="currencyForSalaries"
                  >
                    <option className="hidden">Select Currency</option>
                    {dataCurrencies &&
                      Object.entries(dataCurrencies?.data || {}).map(
                        ([code, name]) => (
                          <option key={code} value={code}>
                            {name as string}
                          </option>
                        )
                      )}
                  </Select>
                  {currencyForSalariesError && (
                    <p className="text-red-600">{currencyForSalariesError}</p>
                  )}
                </div>

                <div>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="currencyForInvoices"
                  >
                    Currency for Invoices{" "}
                    <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <Select
                    value={currencyForInvoices}
                    onChange={(e) => setCurrencyForInvoices(e.target.value)}
                    className={`${style.selectForm}`}
                    id="currencyForInvoices"
                  >
                    <option className="hidden">Select Currency</option>
                    {dataCurrencies &&
                      Object.entries(dataCurrencies?.data || {}).map(
                        ([code, name]) => (
                          <option key={code} value={code}>
                            {name as string}
                          </option>
                        )
                      )}
                  </Select>
                  {currencyForInvoicesError && (
                    <p className="text-red-600">{currencyForInvoicesError}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center text-center">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <button
                    onClick={(e) => handleSend(e)}
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white text-[18px] w-[160px] ease-in duration-300"
                  >
                    Update school
                  </button>
                )}
              </div>
            </div>
          </form>
        </Container>
      )}
    </>
  );
};

export default EditSchool;
