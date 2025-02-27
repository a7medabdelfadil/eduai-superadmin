import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

// Validation Hook (Extracted from `Page`)
const useValidateCourse = () => {
  const [code, setCode] = useState("");
  const [countryId, setCountryId] = useState("");
  const [level, setLevel] = useState("");
  const [registrationType, setRegistrationType] = useState("");
  const [language, setLanguage] = useState("");
  const [eduSystemId, setEduSystemId] = useState("");
  const [name_en, setName_en] = useState("");
  const [name_ar, setName_ar] = useState("");
  const [name_fr, setName_fr] = useState("");
  const [description_en, setDescription_en] = useState("");
  const [description_ar, setDescription_ar] = useState("");
  const [description_fr, setDescription_fr] = useState("");
  const [prerequisites, setPrerequisites] = useState<string[]>([""]);

  const validateInputs = () => {
    return !!(
      code.trim() &&
      countryId &&
      level &&
      registrationType &&
      language &&
      eduSystemId &&
      name_en.trim() &&
      name_ar.trim() &&
      name_fr.trim() &&
      description_en.trim() &&
      description_ar.trim() &&
      description_fr.trim() &&
      prerequisites.length
    );
  };

  return {
    code,
    setCode,
    countryId,
    setCountryId,
    level,
    setLevel,
    registrationType,
    setRegistrationType,
    language,
    setLanguage,
    eduSystemId,
    setEduSystemId,
    name_en,
    setName_en,
    name_ar,
    setName_ar,
    name_fr,
    setName_fr,
    description_en,
    setDescription_en,
    description_ar,
    setDescription_ar,
    description_fr,
    setDescription_fr,
    prerequisites,
    setPrerequisites,
    validateInputs,
  };
};

// Unit Test for the Validation Hook
describe("Course Validation", () => {
  test("should return false when required fields are empty", () => {
    const { result } = renderHook(() => useValidateCourse());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when all required fields are filled", () => {
    const { result } = renderHook(() => useValidateCourse());

    act(() => {
      result.current.setCode("C001");
      result.current.setCountryId("Country1");
      result.current.setLevel("Beginner");
      result.current.setRegistrationType("Online");
      result.current.setLanguage("English");
      result.current.setEduSystemId("EduSystem1");
      result.current.setName_en("English Name");
      result.current.setName_ar("Arabic Name");
      result.current.setName_fr("French Name");
      result.current.setDescription_en("English Description");
      result.current.setDescription_ar("Arabic Description");
      result.current.setDescription_fr("French Description");
      result.current.setPrerequisites(["Course1"]);
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
