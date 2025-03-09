import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useSearchState = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    search,
    handleSearchChange,
    currentPage,
    handlePageChange,
  };
};

describe("FeedBack Search and Pagination", () => {
  test("should update search value correctly", () => {
    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handleSearchChange("feedback");
    });

    expect(result.current.search).toBe("feedback");
  });

  test("should update current page correctly", () => {
    const { result } = renderHook(() => useSearchState());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
  });
});
