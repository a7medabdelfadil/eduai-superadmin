"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
import {
  useGetSchoolPermissionByIdQuery,
  useGetSchoolPermissionsQuery,
  useSetSchoolPermissionByIdMutation,
} from "./api/schoolPermissions";
import { useParams, useRouter } from "next/navigation";
import { useGetSchoolByIdQuery } from "../../api/manageSchool";
import Container from "@/components/Container";
import { toast } from "react-toastify";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const Features = () => {
  const router = useRouter();
  const { id } = useParams();
  const token = Cookies.get("token") || "";
  const { data } = useGetSchoolPermissionsQuery(token);
  const features = data?.data || [];

  const [openCategories, setOpenCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemsCost, setSelectedItemsCost] = useState<number>(0);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleAddPermission = (permissionName: string, cost: number) => {
    if (!selectedItems.includes(permissionName)) {
      setSelectedItems((prev) => [...prev, permissionName]);
      setSelectedItemsCost((prev) => prev + cost); 
    }
  };

  const handleRemoveItem = (itemName: string, cost: number) => {
    setSelectedItems((prev) => prev.filter((item) => item !== itemName));
    setSelectedItemsCost((prev) => prev - cost); 
  };

  const { data: schoolPermissionData, refetch } =
    useGetSchoolPermissionByIdQuery({
      token,
      id,
    });

  useEffect(() => {
    if (schoolPermissionData?.data) {
      const initialSelectedItems = schoolPermissionData.data.map(
        (permission: any) => permission.name
      );
      setSelectedItems(initialSelectedItems);

      const totalCost = schoolPermissionData.data.reduce(
        (sum: number, permission: any) => sum + permission.cost,
        0
      );
      setSelectedItemsCost(totalCost);
    }
  }, [schoolPermissionData]);

  const [setSchoolPermissionById] = useSetSchoolPermissionByIdMutation();

  const handleSend = async () => {
    const body = { permissions: selectedItems };
    try {
      await setSchoolPermissionById({ token, id, body }).unwrap();
      toast.success("Permissions updated successfully!");
      refetch();
      router.push(`/manage-school/view-features/${id}`);
    } catch (err) {
      toast.error("Failed to update permissions");
    }
  };

  const handleCancel = () => {
    router.push(`/manage-school`);
    toast.success("Operation cancelled");
  };



  const { data: schoolData } = useGetSchoolByIdQuery({ token, id });
  const handleEditFeatures = () => {
    router.push("/manage-school/edit-features");
  };
  return (
    <Container className="mt-[70px] px-4 sm:px-6 lg:px-8 min-h-screen">
      {features && features.length > 0 ? (
        <div className="rounded-xl pb-10 mb-10 bg-white p-4 dark:bg-black dark:text-white max-w-full">
          <div className="flex flex-wrap justify-between items-center rounded-t-xl pb-10 text-xl sm:text-2xl font-bold dark:text-white">
            <p className="w-full sm:w-auto">{`Edit ${schoolData?.data?.name} Features`}</p>
            <button
        onClick={handleEditFeatures}
        className="px-4 py-2.5 rounded-xl bg-[#3E5AF0] hover:bg-[#4a5cc5] hover:shadow-xl text-white font-bold text-[16px] sm:text-[18px] w-fit mt-4 sm:mt-0 ease-in duration-300"
      >
        Edit The Features
      </button>
          </div>

          <div>
            {features.map((feature: any) => (
              <div key={feature.category} className="mb-4">
                <div
                  className="flex justify-between items-center cursor-pointer bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-md"
                  onClick={() => toggleCategory(feature.category)}
                >
                  <h2 className="text-lg sm:text-xl font-bold text-gray-700 dark:text-white">
                    {feature.category}
                  </h2>
                  <span className="text-gray-500 dark:text-gray-400">
                    {openCategories[feature.category] ? "▲" : "▼"}
                  </span>
                </div>

                {openCategories[feature.category] && (
                  <ul className="ml-4 mt-2 list-disc text-gray-600 dark:text-gray-300">
                    {feature.Permissions.map((permission: any) => (
                      <li
                        key={permission.name}
                        className="flex justify-between mt-4 text-sm md:text-base"
                      >
                        <span>{`${permission.name} (Cost: ${permission.cost})`}</span>
                        <button
                          onClick={() =>
                            handleAddPermission(
                              permission.name,
                              permission.cost
                            )
                          }
                          className={`px-2 py-1 rounded-md text-sm md:text-base transition ${
                            selectedItems.includes(permission.name)
                              ? "bg-gray-500 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600"
                          } text-white`}
                          disabled={selectedItems.includes(permission.name)}
                        >
                          <IoMdAdd size={20} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-12">
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm sm:text-base"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 transition text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-white">
              Selected Items:
            </h3>
            <ul className="ml-4 mt-2 list-disc text-gray-600 dark:text-gray-300">
              {selectedItems.length > 0 ? (
                selectedItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mt-4 text-sm md:text-base"
                  >
                    <span className="flex-1 truncate">
                      {index + 1}. {item}
                    </span>
                    <button
                      onClick={() => {
                        const permission = features
                          .flatMap((feature: any) => feature.Permissions)
                          .find((permission: any) => permission.name === item);
                        handleRemoveItem(item, permission?.cost || 0);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition text-sm md:text-base"
                    >
                      <IoMdRemove size={20} />
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No items selected.</p>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-white">
              Total Cost: ${selectedItemsCost}
            </h3>
          </div>
        </div>
      ) : (
        <div className="h-[75vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </Container>
  );
};

export default Features;
