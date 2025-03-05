"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Spinner from "@/components/spinner";
import { useParams } from "next/navigation";
import Container from "@/components/Container";
import { MdEdit } from "react-icons/md";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; // أيقونة الحفظ والإلغاء
import {
  useGetSchoolPermissionByIdQuery,
  useGetSchoolPermissionsQuery,
} from "../features/[id]/api/schoolPermissions";
import { useUpdatePermissionCostMutation } from "../api/manageSchool";
import { toast } from "react-toastify";

interface Permission {
  name: string;
  cost: number;
}

interface Feature {
  category: string;
  Permissions: Permission[];
}

const EditFeatures = () => {
  const { id } = useParams<{ id: string }>();
  const token = Cookies.get("token") || "";
  const { data, refetch } = useGetSchoolPermissionsQuery(token);

  const [features, setFeatures] = useState<Feature[]>(data?.data || []);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [editingPermission, setEditingPermission] = useState<{
    category: string;
    name: string;
  } | null>(null);
  const [originalCost, setOriginalCost] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [updatePermissionCost] = useUpdatePermissionCostMutation();

  useEffect(() => {
    if (data?.data) {
      setFeatures(data.data);
    }
  }, [data]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleEditClick = (category: string, permission: Permission) => {
    setEditingPermission({ category, name: permission.name });
    setOriginalCost(permission.cost); // حفظ القيمة الأصلية قبل التعديل
  };

  const handleCancelEdit = () => {
    if (editingPermission) {
      setFeatures((prevFeatures) =>
        prevFeatures.map((feature) =>
          feature.category === editingPermission.category
            ? {
                ...feature,
                Permissions: feature.Permissions.map((permission) =>
                  permission.name === editingPermission.name
                    ? { ...permission, cost: originalCost || permission.cost }
                    : permission
                ),
              }
            : feature
        )
      );
    }
    setEditingPermission(null);
    setOriginalCost(null);
  };

  const handleCostChange = (
    category: string,
    permissionName: string,
    newCost: number
  ) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) =>
        feature.category === category
          ? {
              ...feature,
              Permissions: feature.Permissions.map((permission) =>
                permission.name === permissionName
                  ? { ...permission, cost: newCost }
                  : permission
              ),
            }
          : feature
      )
    );
  };

  const handleSaveEdit = async () => {
    if (!editingPermission) return;

    const { category, name } = editingPermission;
    const updatedFeature = features.find(
      (feature) => feature.category === category
    );
    const updatedPermission = updatedFeature?.Permissions.find(
      (permission) => permission.name === name
    );

    if (updatedPermission) {
      try {
        await updatePermissionCost({
          token,
          body: {
            permissionName: name,
            newCost: updatedPermission.cost,
          },
        }).unwrap();

        setFeatures((prevFeatures) =>
          prevFeatures.map((feature) =>
            feature.category === category
              ? {
                  ...feature,
                  Permissions: feature.Permissions.map((permission) =>
                    permission.name === name
                      ? { ...permission, cost: updatedPermission.cost }
                      : permission
                  ),
                }
              : feature
          )
        );

        toast.success("Permission cost updated successfully!");
      } catch (error) {
        toast.error("Failed to update permission cost. Please try again.");
      }
    }

    setEditingPermission(null);
    setOriginalCost(null);
  };

  const { data: schoolPermissionData } = useGetSchoolPermissionByIdQuery({
    token,
    id,
  });

  useEffect(() => {
    if (schoolPermissionData?.data) {
      setSelectedItems(
        schoolPermissionData.data.map(
          (permission: Permission) => permission.name
        )
      );
    }
  }, [schoolPermissionData]);

  return (
    <Container className="mt-[70px] px-4 sm:px-6 lg:px-8 min-h-screen">
      {features.length > 0 ? (
        <div className="rounded-xl pb-10 mb-10 bg-white p-4 dark:bg-black dark:text-white max-w-full">
          <div className="flex flex-wrap justify-between items-center rounded-t-xl pb-10 text-xl sm:text-2xl font-bold dark:text-white">
            <p className="w-full sm:w-auto">Edit The Features</p>
          </div>

          <div>
            {features.map((feature) => (
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
                    {feature.Permissions.map((permission) => (
                      <li
                        key={permission.name}
                        className="flex justify-between items-center mt-4 text-sm md:text-base"
                      >
                        <span className="font-bold">
                          {permission.name} 
                        </span>
                        <div className="flex items-center">
                          <span className="mr-1">(Cost: </span>
                          {editingPermission?.category === feature.category &&
                          editingPermission?.name === permission.name ? (
                            <>
                              <div className="flex items-center">
                                <input
                                  type="number"
                                  value={permission.cost}
                                  onChange={(e) =>
                                    handleCostChange(
                                      feature.category,
                                      permission.name,
                                      Number(e.target.value)
                                    )
                                  }
                                  className="w-24 text-center border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white mx-2"
                                />
                              <span>)</span>


                                <AiOutlineCheck
                                  size={22}
                                  className="ml-2 text-green-500 cursor-pointer"
                                  onClick={handleSaveEdit}
                                />

                                <AiOutlineClose
                                  size={22}
                                  className="ml-2 text-red-500 cursor-pointer"
                                  onClick={handleCancelEdit}
                                />
                                
                              </div>
                            </>
                          ) : (
                            <>
                            <div className="flex items-center">

                              <span>{permission.cost}</span>
                              <span>)</span>

                              <MdEdit
                                size={20}
                                className="ml-2 text-blue-500 cursor-pointer"
                                onClick={() =>
                                  handleEditClick(feature.category, permission)
                                }
                                />
                                </div>
                            </>
                          )}

                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
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

export default EditFeatures;
