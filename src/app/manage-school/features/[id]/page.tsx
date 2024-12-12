"use client";
import FeaturesList from "@/components/ExpandableList";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
import { useGetSchoolPermissionByIdQuery, useGetSchoolPermissionsQuery, useGetSchoolPlansQuery } from "./api/schoolPermissions";
import { useParams } from "next/navigation";
import { useGetSchoolByIdQuery } from "../../api/manageSchool";
import Container from "@/components/Container";

const Features = () => {
  const { id } = useParams();
  const token = Cookies.get("token") || "";
  const { isSuccess, data } = useGetSchoolPermissionsQuery(token);
  console.log("Permissions", data?.data);
  const features = data?.data || [];
  
  const [schoolPermissions, setSchoolPermissions] = useState<any[]>([]);
  
  // Fetching school permissions based on token and id
  const { data: schoolPermissionData } = useGetSchoolPermissionByIdQuery({ token, id });
  // const { data: schoolPermissions } = useGetSchoolPermissionByIdQuery({ token, id });
  console.log('schoolPermissionData', schoolPermissionData);
  useEffect(() => {
    // Assuming schoolPermissionData contains a 'data' property with permissions
    setSchoolPermissions(schoolPermissionData?.data || []);
  }, [schoolPermissionData]);
  console.log('schoolPermissions', schoolPermissions);
  
  // Filter the categories based on permissions that the user has
  const filteredCategories = features.map((feature: any) => {
    const filteredPermissions = feature.Permissions.filter((permission : any) =>
      schoolPermissions.some(schoolPermission => schoolPermission.name === permission.name)
  );
  
    return {
      category: feature.category,
      Permissions: filteredPermissions
    };
  });
  
  console.log('filteredCategories', filteredCategories);
  
  

  const { data: dataPlans } = useGetSchoolPlansQuery({token, id});
  console.log("dataPlans: ", dataPlans);

  const {data: schoolData} = useGetSchoolByIdQuery({token, id});
  // console.log("schoolData: ", schoolData);
  
  // const initialSchoolFeatures = schoolPermissions?.data;
  // console.log('initialSchoolFeatures', initialSchoolFeatures);
  

  return (
    <>
      <Container className="mt-[70px]">
      {features && features.length > 0 ? (
        <div className="rounded-xl pb-5">
          <div className="flex rounded-t-xl bg-blue-100 px-10 py-4 text-[18px] font-semibold">
            <div className="flex justify-between w-full text-black">
            <p>Edit {schoolData?.data?.name} features</p>
            <a href={`/manage-school/view-features/${id}`} className="text-blue-500 cursor-pointer">View Features</a>
            </div>
          </div>
          <div>
      {/* Add a check to ensure features are not undefined or null */}

        <FeaturesList features={features} checkedItems={filteredCategories} token={token} />
    </div>
        </div>
      ) : (
        <Spinner /> 
  )}
      </Container>
    </>
  );
};

export default Features;
