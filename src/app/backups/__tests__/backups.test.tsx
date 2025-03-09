import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

// Validation Hook (مستخرج من `BackUp`)
const useSearchAndPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    handlePageChange,
  };
};

describe("BackUp Search and Pagination", () => {
  test("should update search value correctly", () => {
    const { result } = renderHook(() => useSearchAndPage());

    act(() => {
      result.current.setSearch("test backup");
    });

    expect(result.current.search).toBe("test backup");
  });

  test("should update current page correctly", () => {
    const { result } = renderHook(() => useSearchAndPage());

    act(() => {
      result.current.handlePageChange({ selected: 2 });
    });

    expect(result.current.currentPage).toBe(2);
  });
});
