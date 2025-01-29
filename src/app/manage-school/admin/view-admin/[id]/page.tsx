"use client";

import { Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import Spinner from "@/components/spinner";
import {
  useGetEmployeeTypeQuery,
  useGetGanderQuery,
  useGetNationalityQuery,
  useGetQualificationQuery,
  useGetRegionsQuery,
  useGetReligionQuery,
} from "../../api/adminApis";
import { useGetAdminQuery } from "./api/EditAdminApi";
import Container from "@/components/Container";

interface AdminDetails {
  username: string;
  email: string;
  nid: string;
  gender: string;
  religion: string;
  nationality: string;
  employeeType: string;
  qualification: string;
  regionId: string;
  birthDate: string;
  about: string;
}

const ViewAdmin = () => {
  const token = Cookies.get("token") || "";
  const lang = Cookies.get("lang") || "english";
  const params = useParams();

  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);

  const { data: ganderData, isSuccess: successGander } = useGetGanderQuery(token);
  const { data: religionData, isSuccess: successReligion } = useGetReligionQuery(token);
  const { data: nationalityData, isSuccess: successNationality } = useGetNationalityQuery(token);
  const { data: employeeTypeData, isSuccess: successEmployeeType } = useGetEmployeeTypeQuery(token);
  const { data: qualificationData, isSuccess: successQualification } = useGetQualificationQuery(token);
  const { data: regionData, isSuccess: successRegion } = useGetRegionsQuery(token);
  const { data: adminDetailsData, isSuccess: adminDetailsSuccess } = useGetAdminQuery({
    token,
    id: params.id as string,
  });

  useEffect(() => {
    if (adminDetailsSuccess && adminDetailsData) {
      setAdminDetails(adminDetailsData.data as AdminDetails);
    }
  }, [adminDetailsSuccess, adminDetailsData]);

  if (!adminDetails) {
    return <Spinner />;
  }

  const getRegionName = () => {
    if (!successRegion || !regionData?.data?.content) return "";
    const region = regionData.data.content.find((region: any) => region.id === adminDetails.regionId);
    if (!region) return "";
    return lang === "english"
      ? region.name_en
      : lang === "arabic"
      ? region.name_ar
      : region.name_fr;
  };

  return (
    <Container centered={true} className="mt-10">
      <div className="p-10 bg-white card rounded-xl items-center justify-center xl:w-[1000px] lg:w-[750px] gap-5 md:w-[600px] sm:w-[500px] overflow-auto">
        <div className="flex items-center justify-start gap-2">
          <svg
            className="h-6 w-6 font-bold card text-[#000000] group-hover:text-[#3e5af0]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h1 className="text-[22px] font-sans font-semibold">Admin Information</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-4 my-7">
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="name" value="User Name" />
            <TextInput value={adminDetails.username} id="name" type="text" readOnly />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="email" value="Email" />
            <TextInput value={adminDetails.email} id="email" type="email" readOnly />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="nid" value="NID" />
            <TextInput value={adminDetails.nid} id="nid" type="text" readOnly />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="gender" value="Gender" />
            <TextInput
              value={successGander ? ganderData.data[adminDetails.gender] : ""}
              id="gender"
              type="text"
              readOnly
            />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="religion" value="Religion" />
            <TextInput
              value={successReligion ? religionData.data[adminDetails.religion] : ""}
              id="religion"
              type="text"
              readOnly
            />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="nationality" value="Nationality" />
            <TextInput
              value={successNationality ? nationalityData.data[adminDetails.nationality] : ""}
              id="nationality"
              type="text"
              readOnly
            />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="employeeType" value="Employee Type" />
            <TextInput
              value={successEmployeeType ? employeeTypeData.data[adminDetails.employeeType] : ""}
              id="employeeType"
              type="text"
              readOnly
            />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="qualification" value="Qualification" />
            <TextInput
              value={successQualification ? qualificationData.data[adminDetails.qualification] : ""}
              id="qualification"
              type="text"
              readOnly
            />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="region" value="Region" />
            <TextInput value={getRegionName()} id="region" type="text" readOnly />
          </div>
          <div>
            <Label className="md:text-lg capitalize font-medium" htmlFor="birthDate" value="Birth Date" />
            <TextInput value={adminDetails.birthDate} id="birthDate" type="date" readOnly />
          </div>
          <div className="md:col-span-2">
            <Label className="md:text-lg capitalize font-medium" htmlFor="about" value="About" />
            <Textarea value={adminDetails.about} id="about" readOnly className="min-h-40" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewAdmin;
