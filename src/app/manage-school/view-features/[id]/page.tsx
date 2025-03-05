"use client";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetSchoolByIdQuery } from "../../api/manageSchool";
import { useGetSchoolPermissionByIdQuery } from "../../features/[id]/api/schoolPermissions";
import Container from "@/components/Container";

const ViewFeatures = () => {
  const router = useRouter();
  const { id } = useParams();
  const token = Cookies.get("token") || "";
  const { data: schoolData } = useGetSchoolByIdQuery({ token, id });
  const { data: schoolPermissions } = useGetSchoolPermissionByIdQuery({
    token,
    id,
  });
  const features = schoolPermissions?.data || [];

  const handleViewFeatures = () => {
    router.push("/manage-school/features/" + id);
  };

  return (
    <Container className="flex flex-col p-6 mx-3 mt-[70px] bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-full">
      <div className="flex justify-between mb-8 items-center">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white sm:text-xl md:text-2xl">
        {schoolData?.data?.name} Features
      </h1>
      <button
        onClick={handleViewFeatures}
        className="px-4 py-2.5 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[16px] sm:text-[18px] w-fit mt-4 sm:mt-0 ease-in duration-300"
      >
        Edit School Features
      </button>
      </div>
      <div className="flex flex-col items-start gap-3 w-full">
        {features.length > 0 ? (
          features.map((feature: any, index: any) => (
            <div
              key={index}
              className="text-secondary bg-gray-100 dark:bg-gray-700 p-3 rounded-md w-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              <p className="text-lg font-medium text-gray-800 dark:text-white sm:text-base md:text-lg">
                {index + 1}. {feature.name}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-lg font-semibold sm:text-base">
            No features available.
          </p>
        )}
      </div>
    </Container>
  );
};

export default ViewFeatures;
