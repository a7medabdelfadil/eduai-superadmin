import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useEditSchoolState = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  
  const handleNameChange = (newName: any) => {
    setName(newName);
  };

  const handleCodeChange = (newCode: any) => {
    setCode(newCode);
  };

  return {
    name,
    code,
    handleNameChange,
    handleCodeChange,
  };
};

describe("Edit School State", () => {
  test("should update name correctly", () => {
    const { result } = renderHook(() => useEditSchoolState());

    act(() => {
      result.current.handleNameChange("New School Name");
    });

    expect(result.current.name).toBe("New School Name");
  });

  test("should update code correctly", () => {
    const { result } = renderHook(() => useEditSchoolState());

    act(() => {
      result.current.handleCodeChange("12345");
    });

    expect(result.current.code).toBe("12345");
  });
});
