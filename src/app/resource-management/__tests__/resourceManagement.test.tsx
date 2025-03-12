import { renderHook } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

interface Course {
  code: string;
  countryId: string;
  level: string;
  registrationType: string;
  language: string;
  eduSystemId: string;
  name_en: string;
  name_ar: string;
  name_fr: string;
  description_en: string;
  description_ar: string;
  description_fr: string;
  prerequisites: string[];
}

const useCourseState = (initialCourse: Course) => {
  const [course, setCourse] = useState(initialCourse);
  return {
    course,
  };
};

describe("Course State", () => {
  test("should display correct course details", () => {
    const mockCourse = {
      code: "CS101",
      countryId: "1",
      level: "Beginner",
      registrationType: "Open",
      language: "English",
      eduSystemId: "SYS123",
      name_en: "Computer Science 101",
      name_ar: "علوم الحاسب 101",
      name_fr: "Informatique 101",
      description_en: "Introduction to Computer Science",
      description_ar: "مقدمة في علوم الحاسب",
      description_fr: "Introduction à l'informatique",
      prerequisites: ["Math Basics", "Logic"]
    };

    const { result } = renderHook(() => useCourseState(mockCourse));

    expect(result.current.course.code).toBe("CS101");
    expect(result.current.course.name_en).toBe("Computer Science 101");
    expect(result.current.course.prerequisites).toContain("Math Basics");
  });
});
