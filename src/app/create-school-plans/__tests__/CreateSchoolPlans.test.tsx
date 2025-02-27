import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

// Validation Hook (Extracted from `CreateSchoolPlans`)
const useValidateSchoolPlan = () => {
  const [name, setName] = useState("");
  const [daysCount, setDaysCount] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  const validateInputs = () => {
    return !!(name.trim() && daysCount.trim() && permissions.length);
  };

  return {
    name,
    setName,
    daysCount,
    setDaysCount,
    permissions,
    setPermissions,
    validateInputs,
  };
};

// Unit Test for the Validation Hook
describe("School Plan Validation", () => {
  test("should return false when required fields are empty", () => {
    const { result } = renderHook(() => useValidateSchoolPlan());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when all required fields are filled", () => {
    const { result } = renderHook(() => useValidateSchoolPlan());

    act(() => {
      result.current.setName("Test Plan");
      result.current.setDaysCount("5");
      result.current.setPermissions(["ADMIN"]);
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
