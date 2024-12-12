"use client"

import Container from "@/components/Container";
import { useGetCurriculumPlanningQuery } from "../api/curriculumApi";
import Cookies from "js-cookie"

const CurriculumPlanning = () => {
  const token = Cookies.get('token') || "";

  const {data , error} = useGetCurriculumPlanningQuery(token)

  console.log(error);
  console.log(data);


  return (
    <>
      <Container className="mt-12">
        <div className="flex w-full justify-between px-5 text-center max-[502px]:grid max-[502px]:justify-center">
          <div className="mb-3">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="relative min-w-72 md:min-w-80">
              <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-4">
                <svg
                  className="size-4 flex-shrink-0 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                id="icon"
                name="icon"
                className="block w-full rounded-lg border-2 dark:bg-[#0D0D0D] dark:border-gray-800  border-gray-200 px-4 py-2 ps-11 text-sm outline-none focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="mb-5 mr-3 w-[180px] whitespace-nowrap rounded-xl bg-[#3E5AF0] px-4 py-2 text-[18px] font-semibold text-white duration-300 ease-in hover:bg-[#4a5cc5] hover:shadow-xl">
              6-Jun-2024
            </button>
          </div>
        </div>
        <div className="flex h-full w-full items-center justify-center overflow-hidden p-5">
          <div className="grid h-full w-full rounded-xl bg-white card">
            <div className="flex h-[60px] w-full items-center justify-evenly rounded-t-xl bg-[#DCEBFB] dark:bg-[#06203C] p-2 pl-8">
              <div className="w-full text-start">
                <p className="font-semibold">Subject Title::</p>
              </div>
              <div className="w-full text-center">
                <p className="font-semibold">Subject Number:</p>
              </div>
            </div>
            <div className="pl-8">
              <p className="font-semibold">Subject Description:</p>
            </div>
            <div className="overflow-auto">
              <div className="relative overflow-auto">
                <table className="w-full overflow-x-auto text-left bg-white card  text-sm text-gray-500 rtl:text-right">
                  <thead>
                    <tr className="font-semibold text-black ">
                      <th
                        scope="row"
                        className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 px-6 py-4 font-medium text-gray-900"
                      ></th>
                      <td className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 dark:text-white px-6 py-4">
                        Educational Delivery Methodologies
                      </td>
                      <td className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 dark:text-white px-6 py-4">
                        Evidence Of Mastery
                      </td>
                      <td className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 dark:text-white px-6 py-4">
                        Comments
                      </td>
                    </tr>
                  </thead>

                  <tbody className="bg-[#ebeef2] card text-xs uppercase text-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap border-2 dark:border-gray-800 border-[#dcebfb] px-6 py-3"
                      >
                        Standard :
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap border-2 dark:border-gray-800 border-[#dcebfb] px-6 py-3"
                      ></th>
                      <th
                        scope="col"
                        className="whitespace-nowrap border-2 dark:border-gray-800 border-[#dcebfb] px-6 py-3"
                      ></th>
                      <th
                        scope="col"
                        className="whitespace-nowrap border-2 dark:border-gray-800 border-[#dcebfb] px-6 py-3"
                      ></th>
                    </tr>
                  </tbody>
                  <tbody>
                    <tr className="bg-white card hover:bg-gray-50">
                      <th
                        scope="row"
                        className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        Cluster 1 :
                      </th>
                      <td className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 px-6 py-4"></td>
                      <td className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 px-6 py-4"></td>
                      <td className="whitespace-nowrap border-2 border-[#dcebfb] dark:border-gray-800 px-6 py-4"></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CurriculumPlanning;
