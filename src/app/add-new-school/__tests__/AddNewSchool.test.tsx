import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useValidateInputs = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [about, setAbout] = useState("");
  const [theme, setTheme] = useState("");
  const [curriculum, setCurriculum] = useState("");
  const [type, setType] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [educations, setEducations] = useState<string[]>([]);
  const [regionId, setRegionId] = useState("");
  const [fallSemesterStartDate, setFallSemesterStartDate] = useState("");
  const [fallSemesterEndDate, setFallSemesterEndDate] = useState("");

  const validateInputs = () => {
    return !!(
      name &&
      code &&
      about &&
      theme &&
      curriculum &&
      type &&
      regionId &&
      languages.length &&
      levels.length &&
      educations.length &&
      fallSemesterStartDate &&
      fallSemesterEndDate
    );
  };

  return {
    name,
    setName,
    code,
    setCode,
    about,
    setAbout,
    theme,
    setTheme,
    curriculum,
    setCurriculum,
    type,
    setType,
    languages,
    setLanguages,
    levels,
    setLevels,
    educations,
    setEducations,
    regionId,
    setRegionId,
    fallSemesterStartDate,
    setFallSemesterStartDate,
    fallSemesterEndDate,
    setFallSemesterEndDate,
    validateInputs,
  };
};

describe("AddNewSchool Validation", () => {
  test("should return false when required fields are empty", () => {
    const { result } = renderHook(() => useValidateInputs());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when all required fields are filled", () => {
    const { result } = renderHook(() => useValidateInputs());

    act(() => {
      result.current.setName("Test School");
      result.current.setCode("12345");
      result.current.setAbout("A great school");
      result.current.setTheme("Modern");
      result.current.setCurriculum("International");
      result.current.setType("Private");
      result.current.setRegionId("Region1");
      result.current.setLanguages(["English"]);
      result.current.setLevels(["Primary"]);
      result.current.setEducations(["IB"]);
      result.current.setFallSemesterStartDate("2024-09-01");
      result.current.setFallSemesterEndDate("2024-12-15");
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
