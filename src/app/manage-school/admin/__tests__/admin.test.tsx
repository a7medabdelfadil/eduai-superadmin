import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useAdminsState = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return {
    search,
    handleSearchChange,
  };
};

describe("Admins State", () => {
  test("should update search value correctly", () => {
    const { result } = renderHook(() => useAdminsState());

    act(() => {
      result.current.handleSearchChange("admin");
    });

    expect(result.current.search).toBe("admin");
  });
});