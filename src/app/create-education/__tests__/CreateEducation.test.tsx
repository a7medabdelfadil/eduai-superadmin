import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

// Validation Hook (Extracted from `CreateEducation`)
const useValidateEducationSystem = () => {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("");
  const [countryId, setCountryId] = useState("");

  const validateInputs = () => {
    return !!(name.trim() && language && countryId);
  };

  return {
    name,
    setName,
    language,
    setLanguage,
    countryId,
    setCountryId,
    validateInputs,
  };
};

// Unit Test for the Validation Hook
describe("Education System Validation", () => {
  test("should return false when required fields are empty", () => {
    const { result } = renderHook(() => useValidateEducationSystem());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when all required fields are filled", () => {
    const { result } = renderHook(() => useValidateEducationSystem());

    act(() => {
      result.current.setName("Test Education");
      result.current.setLanguage("English");
      result.current.setCountryId("Country1");
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
