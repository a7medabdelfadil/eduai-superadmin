import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useFeaturesState = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedItemsCost, setSelectedItemsCost] = useState(0);

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

  return {
    selectedItems,
    selectedItemsCost,
    handleAddPermission,
    handleRemoveItem,
  };
};

describe("Features State", () => {
  test("should add permission correctly", () => {
    const { result } = renderHook(() => useFeaturesState());

    act(() => {
      result.current.handleAddPermission("Permission1", 100);
    });

    expect(result.current.selectedItems).toContain("Permission1");
    expect(result.current.selectedItemsCost).toBe(100);
  });

  test("should remove permission correctly", () => {
    const { result } = renderHook(() => useFeaturesState());

    act(() => {
      result.current.handleAddPermission("Permission1", 100);
    });
    act(() => {
      result.current.handleRemoveItem("Permission1", 100);
    });

    expect(result.current.selectedItems).not.toContain("Permission1");
    expect(result.current.selectedItemsCost).toBe(0);
  });
});