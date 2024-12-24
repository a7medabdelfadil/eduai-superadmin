"use client";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useGetSchoolByIdQuery } from "../../api/manageSchool";
import { useGetSchoolPermissionByIdQuery } from "../../features/[id]/api/schoolPermissions";
import Container from "@/components/Container";

const ViewFeatures = () => {
  const { id } = useParams();
  const token = Cookies.get("token") || "";
  const { data: schoolData } = useGetSchoolByIdQuery({ token, id });
  const { data: schoolPermissions } = useGetSchoolPermissionByIdQuery({ token, id });
  const features = schoolPermissions?.data || [];

  return (
    <Container className="flex flex-col p-6 mx-3 mt-[70px] bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {schoolData?.data?.name} Features
      </h1>
      <div className="flex flex-col items-start gap-3">
        {features.length > 0 ? (
          features.map((feature: any, index: any) => (
            <div
              key={index}
              className="text-secondary bg-gray-100 dark:bg-gray-700 p-3 rounded-md w-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {index + 1}. {feature.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-lg font-semibold">
            No features available.
          </p>
        )}
      </div>
    </Container>
  );
};

export default ViewFeatures;
