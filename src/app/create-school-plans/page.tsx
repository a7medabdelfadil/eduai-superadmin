/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinner from "@/components/spinner";

import {
  useAddSchoolPlanMutation,
  useGetPermissionsQuery,
} from "./api/createSchoolPlansApi";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import Container from "@/components/Container";

const CreateSchoolPlans = () => {
  const token = Cookies.get("token") || "";
  const router = useRouter();
  const [name, setName] = useState("");
  const [daysCount, setDaysCount] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  const [nameError, setNameError] = useState("");
  const [daysCountError, setDaysCountError] = useState("");
  const [permissionsError, setPermissionsError] = useState("");

  const [openPermissions, setOpenPermissions] = useState(false);
  const { data: permissionsData, isSuccess: permissionsSuccess } =
    useGetPermissionsQuery(token);
    console.log('permissionsData: ', permissionsData);
  const [addSchoolPlan, { data, isSuccess, isLoading, error, isError }] =
    useAddSchoolPlanMutation();

  const toggleDropdownPermissions = () => {
    setOpenPermissions(!openPermissions);
  };
  const handleCheckboxChangePermissions = (value: string) => {
    setPermissions((prev) =>
      prev.includes(value)
        ? prev.filter((level) => level !== value)
        : [...prev, value]
    );
  };

  const validateInputs = () => {
    let isValid = true;

    // Reset all error messages before validation
    setNameError("");
    setDaysCountError("");
    setPermissionsError("");

    // Validate name
    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    }

    // Validate days count
    if (daysCount.trim() === "") {
      setDaysCountError("Days count is required");
      isValid = false;
    } else {
      // Parse the daysCount and check if it's a valid number
      const parsedDaysCount = parseInt(daysCount, 10);
      if (isNaN(parsedDaysCount) || parsedDaysCount <= 0) {
        setDaysCountError("Days count must be a positive number");
        isValid = false;
      }
    }

    // Validate permissions
    if (permissions.length === 0) {
      setPermissionsError("At least one permission is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSend = async (e: any) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const body = {
      name,
      daysCount,
      permissions,
    };

    const res = await addSchoolPlan({ token, body }).unwrap();
    if (res.success) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/school-plans");
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

  return (
    <Container centered={true} className="mt-10">
      <form>
        <h1 className="font-bold text-[28px] mb-4 font-sans text-[#041631] dark:text-white">
          Add New School Plan
        </h1>
        <div className="p-10 bg-white card rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px]  gap-5 md:w-[600px] sm:w-[500px]">
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
            <h1 className="text-[22px] font-sans font-semibold">School Plan</h1>
          </div>
          <div className="grid grid-cols-2 my-7 gap-4 max-[1278px]:grid-cols-1">
            <div className="relative">
              {permissionsSuccess && (
                <>
                  <label
                    className="mb-3 inline-block md:text-lg capitalize font-medium"
                    htmlFor="Permissions"
                  >
                    Permissions{" "}
                    <span className="text-[#367AFF] text-xl">*</span>
                  </label>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdownPermissions();
                    }}
                    className="w-full p-2.5 flex justify-between items-center text-sm font-medium text-gray-500 bg-white dark:bg-slate-700 border border-gray-300 rounded-lg "
                  >
                    Select Permissions
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.707082 0.71057C0.316552 1.10108 0.316552 1.73428 0.707082 2.12478L5.59927 7.01218C6.38047 7.79258 7.64627 7.79228 8.42707 7.01158L13.3174 2.12118C13.708 1.73068 13.708 1.09748 13.3174 0.70696C12.9269 0.31643 12.2937 0.31643 11.9032 0.70696L7.71757 4.89258C7.32707 5.28318 6.69387 5.28308 6.30337 4.89258L2.12129 0.71057C1.73077 0.32004 1.0976 0.32004 0.707082 0.71057Z"
                        fill="#041631"
                      />
                    </svg>
                  </button>
                  {openPermissions && (
                    <ul className="absolute dark:bg-slate-700 max-h-[350px] overflow-auto z-10 w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg   ">
                      {permissionsData.data.map((item: any) => (
                        <li
                          key={item.id}
                          className="w-full select-none border-b border-gray-200 rounded-t-lg "
                        >
                          <div className="flex items-center ps-3">
                            <input
                              id={item.id}
                              type="checkbox"
                              value={item.id}
                              checked={permissions.includes(item.name)}
                              onChange={() =>
                                handleCheckboxChangePermissions(item.name)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "
                            />
                            <label
                              htmlFor={item.id}
                              className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              {item.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Error message for permissions */}
                  {permissionsError && (
                    <p className="mt-2 text-red-600 text-sm">
                      {permissionsError}
                    </p>
                  )}
                </>
              )}
            </div>

            <label
              htmlFor="name"
              className="grid text-[18px] font-sans font-semibold"
            >
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                className="w-full mt-2 py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]"
              />
              {nameError && (
                <span className="text-red-500 text-sm">{nameError}</span>
              )}
            </label>
            <label
              htmlFor="daysCount"
              className="grid text-[18px] font-sans font-semibold"
            >
              Days Count
              <input
                value={daysCount}
                onChange={(e) => setDaysCount(e.target.value)}
                id="daysCount"
                type="text"
                className="w-full mt-2 py-3 px-4 rounded-xl border border-zinc-300 dark:bg-slate-700 outline-none max-[471px]:w-[350px]"
              />
              {daysCountError && (
                <span className="text-red-500 text-sm">{daysCountError}</span>
              )}
            </label>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex justify-center text-center">
              <button
                onClick={(e) => handleSend(e)}
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white  text-[18px] w-[140px] ease-in duration-300"
              >
                Add plan
              </button>
            </div>
          )}
        </div>
      </form>
    </Container>
  );
};

export default CreateSchoolPlans;
