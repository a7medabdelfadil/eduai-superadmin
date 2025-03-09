import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useSearchState = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return {
    search,
    handleSearchChange,
  };
};

describe("SyllabusManagement Search", () => {
  test("should update search value correctly", () => {
    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handleSearchChange("syllabus");
    });

    expect(result.current.search).toBe("syllabus");
  });
});
