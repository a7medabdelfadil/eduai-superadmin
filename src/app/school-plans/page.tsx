/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import EmptyAdmins from "../manage-school/admin/[id]/components/EmptyAdmins";
import {
  useGetAllSchoolPlansQuery,
  useUpdateStatusOfSchoolPlanMutation,
} from "./api/SchoolPlans";
import ReactPaginate from "react-paginate";
import { ToggleSwitch } from "flowbite-react";
import EmptySchoolPlans from "./EmptySchoolPlans";
import Spinner from "@/components/spinner";
import Container from "@/components/Container";

const PlanSchool = () => {
  const token = Cookies.get("token") || "";
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: dataSchoolPlans,
    isSuccess,
    isLoading,
  } = useGetAllSchoolPlansQuery({ token, page: currentPage });
  const [updateStatusOfSchoolPlan, { data }] =
    useUpdateStatusOfSchoolPlanMutation();

  const handlePageClick = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleUpdateStatus = async ({
    schoolPlanId,
    status,
  }: {
    schoolPlanId: any;
    status: any;
  }) => {
    updateStatusOfSchoolPlan({
      token,
      schoolPlanId,
      status: status ? "false" : "true",
    }).unwrap();
  };

  const [search, setSearch] = useState("");

  return isLoading ? (
    <div className="flex items-center justify-center h-[90vh]">
      <Spinner />
    </div>
  ) : isSuccess && dataSchoolPlans?.data.content.length > 0 ? (
    <>
      <Container className="md:px-2 relative mt-10 overflow-x-auto bg-transparent sm:rounded-lg max-[1200px]:w-screen h-screen">
        <h1 className="font-bold text-[28px] mb-3 font-sans text-[#041631] dark:text-white">
          School Plans
        </h1>
        <div className="flex justify-between max-[502px]:grid max-[502px]:justify-center text-center">
          <div className="my-3">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="relative min-w-72 md:min-w-80">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                <svg
                  className="flex-shrink-0 size-4 text-gray-400"
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                id="icon"
                name="icon"
                className="py-2 dark:bg-[#0D0D0D] dark:border-gray-800 outline-none border-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href={`/create-school-plans`}
              className="px-4 py-2 whitespace-nowrap rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl mb-5 text-white text-[16px] ease-in font-medium duration-300"
            >
              + Create School Plan
            </Link>
          </div>
        </div>
        <div className="overflow-auto relative shadow-md sm:rounded-lg">
          <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-[#daeafb] ">
              <tr className="text-gray-700 uppercase bg-[#daeafb] dark:bg-[#06203C] dark:text-white">
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  cost
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center whitespace-nowrap"
                >
                  daysCount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center whitespace-nowrap"
                >
                  permissions
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center whitespace-nowrap"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSchoolPlans?.data?.content.map((item: any) => (
                <tr
                  key={item.id}
                  className="bg-white border-b  hover:bg-gray-50 card"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap">{item.cost}</td>
                  <td className="px-12 py-4 text-center whitespace-nowrap">
                    {item.daysCount}
                  </td>
                  <td className="px-12 py-4 text-center whitespace-nowrap">
                    <Link
                      className="hover:underline text-blue-500 underline-offset-4 font-bold"
                      href={`school-plans/${item.id}`}
                    >
                      {item.permissions.length}
                    </Link>
                  </td>
                  <td className="px-6 py-4 flex justify-center whitespace-nowrap">
                    <ToggleSwitch
                      className="me-2"
                      checked={item.active}
                      onChange={() =>
                        handleUpdateStatus({
                          schoolPlanId: item.id,
                          status: item.active,
                        })
                      }
                    />
                    {item.active ? "Active" : "Deactivate"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dataSchoolPlans?.data?.totalElementsCount > 10 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={dataSchoolPlans?.data?.totalPagesCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeClassName="active"
          />
        )}
      </Container>
    </>
  ) : (
    <EmptySchoolPlans />
  );
};

export default PlanSchool;
