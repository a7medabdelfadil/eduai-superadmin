"use client";
import Cookies from "js-cookie";
import {
  useGetAboutExpireQuery,
  useGetDemosQuery,
  useGetNoActionsQuery,
  useGetSubscriptionsQuery,
  useGetTotalSchoolsQuery,
} from "./api/dashboardApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const token = Cookies.get("token") || "";
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  const { data: dataTotalSchools, isLoading, isSuccess } = useGetTotalSchoolsQuery(token);
  console.log("👾 ~ Dashboard ~ isSuccess:", isSuccess)

  const { data: dataDemos } = useGetDemosQuery(token);
  const { data: dataSubscriptions } = useGetSubscriptionsQuery(token);
  const { data: dataNoActions } = useGetNoActionsQuery(token);
  const { data: dataAboutExpire } = useGetAboutExpireQuery(token);
 
  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        setIsVerified(true);
      } else {
        Cookies.remove("token");
        router.push("/login");
      }
    }
  }, [isLoading, isSuccess, router]);

  if (!isVerified) {
    return;
  }
  return (
    <>
        <div className="grid gap-8 mt-5 pr-8 max-[1024px]:pl-8 ">
          <div className="grid text-start">
            <h1 className="font-bold text-[28px] mb-2 font-sans text-[#041631] dark:text-white">
              Dashboard
            </h1>
            <p className="text-[#526484] font-sans text-[20px] max-[490px]:text-[18px]">
              Welcome to Learning Management Dashboard.
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4 max-[843px]:grid-cols-2 max-[525px]:grid-cols-1 ">
            <div className="grid p-4 bg-white rounded-lg card">
              <p className="text-[#526484] font-sans text-[18px] font-semibold">
                Total School
              </p>
              <h3 className="font-bold text-[20px] font-sans text-[#041631] dark:text-white">
                {dataTotalSchools?.data}
              </h3>
            </div>
            <div className="grid p-4 bg-white rounded-lg card">
              <p className="text-[#526484] font-sans text-[18px] font-semibold">
                Demo
              </p>
              <h3 className="font-bold text-[20px] font-sans text-[#041631] dark:text-white">
                {dataDemos?.data}
              </h3>
            </div>
            <div className="grid p-4 bg-white rounded-lg card">
              <p className="text-[#526484] font-sans text-[18px] font-semibold">
                Subscription
              </p>
              <h3 className="font-bold text-[20px] font-sans text-[#041631] dark:text-white">
                {dataSubscriptions?.data}
              </h3>
            </div>
            <div className="grid p-4 bg-white rounded-lg card">
              <p className="text-[#526484] font-sans text-[18px] whitespace-nowrap font-semibold">
                No Action
              </p>
              <h3 className="font-bold text-[20px] font-sans text-[#041631] dark:text-white">
                {dataNoActions?.data}
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[1599px]:grid-cols-1 overflow-x-hidden pb-8">
            <div className="  bg-white rounded-lg p-4 gap-6 w-full overflow-x-auto card">
              <h1 className="font-bold text-[20px] font-sans text-[#041631] dark:text-white">
                Feedback
              </h1>
              <div className="grid grid-cols-5 items-center mt-7 mb-5 w-[500px] md:w-full">
                <p className="text-[#041631] dark:text-white font-sans text-[18px] whitespace-nowrap font-semibold">
                  School
                </p>
                <p className="text-[#041631] dark:text-white font-sans text-[18px] whitespace-nowrap font-semibold">
                  Feedback
                </p>
                <span className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1ee0ac] mr-1"></div>
                  <p className="text-[#041631] dark:text-white font-sans text-[18px] font-semibold">
                    Solved
                  </p>
                </span>
                <span className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#f4bd0e] mr-1"></div>
                  <p className="text-[#041631] dark:text-white font-sans text-[18px] font-semibold">
                    Unsolved
                  </p>
                </span>
                <span className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#09c2de] mr-1"></div>
                  <p className="text-[#041631] dark:text-white font-sans text-[18px] font-semibold">
                    Discussion
                  </p>
                </span>
              </div>
              <div className="grid grid-cols-5 gap-9 w-[500px] md:w-full">
                <p className="text-[#526484] font-sans text-[16px]">Nahda</p>
                <p className="text-[#526484] font-sans text-[16px] ml-8">10</p>
                <p className="text-[#526484] font-sans text-[16px] ml-5">6</p>
                <p className="text-[#526484] font-sans text-[16px]">3</p>
                <p className="text-[#526484] font-sans text-[16px]">1</p>
              </div>
            </div>
            <div className="grid bg-white rounded-lg p-4 gap-6 card overflow-x-auto">
              <h1 className="font-bold text-[20px] font-sans text-[#041631] dark:text-white">
                Expired
              </h1>
              <p className="text-[#526484] font-sans text-[16px] whitespace-nowrap">
                About to expire
              </p>
              <div className="grid grid-cols-4 gap-4 items-center min-w-[500px] md:min-w-full">
                <p className="text-[#041631] dark:text-white font-sans text-[18px] whitespace-nowrap font-semibold">
                  School
                </p>
                <p className="text-[#041631] dark:text-white font-sans text-[18px] whitespace-nowrap font-semibold">
                  Expiration Date
                </p>
                <p className="text-[#041631] dark:text-white ml-8 font-sans text-[18px] font-semibold">
                  Days
                </p>
                <p className="text-[#041631] dark:text-white font-sans text-[18px] font-semibold text-center">
                  Status
                </p>
              </div>
              {dataAboutExpire?.data?.map((item: any) => (
                <div
                  key={item.schoolId}
                  className="grid grid-cols-4 gap-4 min-w-[500px] md:min-w-full w-full"
                >
                  <p className="text-[#526484] font-sans text-[14px] md:text-[16px]">
                    {item.schoolName}
                  </p>
                  <p className="text-[#526484] font-sans text-[14px] md:text-[16px]">
                    {
                      new Date(item.expirationDateTime)
                        .toISOString()
                        .split("T")[0]
                    }
                  </p>
                  <p className="text-[#526484] font-sans text-[14px] md:text-[16px]">
                    {item.daysCount}
                  </p>
                  <span
                    className={`flex items-center justify-center text-[14px] md:text-[16px] text-center font-semibold font-sans py-1.5 px-2 rounded-2xl ${
                      item.status === "DEMO" ? "bg-[#f4bd0e]" : "bg-[#34E4B5]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default Dashboard;
