import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

// Validation Hook (Extracted from `Page`)
const useValidateBackup = () => {
  const [name, setName] = useState("");

  const validateInputs = () => {
    return !!name.trim();
  };

  return {
    name,
    setName,
    validateInputs,
  };
};

// Unit Test for the Validation Hook
describe("Backup Validation", () => {
  test("should return false when required fields are empty", () => {
    const { result } = renderHook(() => useValidateBackup());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when all required fields are filled", () => {
    const { result } = renderHook(() => useValidateBackup());

    act(() => {
      result.current.setName("Test Backup");
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
