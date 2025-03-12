import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

interface EditingPermission {
  category: string;
  name: string;
}

const useEditFeaturesState = () => {
  const [editingPermission, setEditingPermission] = useState<EditingPermission | null>(null);
  const [originalCost, setOriginalCost] = useState<number | null>(null);

  const handleEditClick = (category: any, name: any, cost: any) => {
    setEditingPermission({ category, name });
    setOriginalCost(cost);
  };

  const handleCancelEdit = () => {
    setEditingPermission(null);
    setOriginalCost(null);
  };

  return {
    editingPermission,
    originalCost,
    handleEditClick,
    handleCancelEdit,
  };
};

describe("Edit Features State", () => {
  test("should set editing permission correctly", () => {
    const { result } = renderHook(() => useEditFeaturesState());

    act(() => {
      result.current.handleEditClick("Category1", "Permission1", 100);
    });

    expect(result.current.editingPermission).toEqual({
      category: "Category1",
      name: "Permission1",
    });
    expect(result.current.originalCost).toBe(100);
  });

  test("should reset editing state on cancel", () => {
    const { result } = renderHook(() => useEditFeaturesState());

    act(() => {
      result.current.handleEditClick("Category1", "Permission1", 100);
    });
    act(() => {
      result.current.handleCancelEdit();
    });

    expect(result.current.editingPermission).toBeNull();
    expect(result.current.originalCost).toBeNull();
  });
});