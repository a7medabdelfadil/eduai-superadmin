import { renderHook } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

interface SchoolPlan {
  id: number;
  name: string;
  cost: number;
  daysCount: number;
  permissions: number;
  active: boolean;
}

const useSchoolPlansState = (initialPlans: SchoolPlan[]) => {
  const [schoolPlans, setSchoolPlans] = useState(initialPlans);
  return {
    schoolPlans,
  };
};

describe("School Plans State", () => {
  test("should display correct school plans", () => {
    const mockSchoolPlans = [
      {
        id: 1,
        name: "Basic Plan",
        cost: 100,
        daysCount: 30,
        permissions: 5,
        active: true,
      },
      {
        id: 2,
        name: "Advanced Plan",
        cost: 200,
        daysCount: 60,
        permissions: 10,
        active: false,
      },
    ];

    const { result } = renderHook(() => useSchoolPlansState(mockSchoolPlans));

    expect(result.current.schoolPlans).toHaveLength(2);
    expect(result.current.schoolPlans[0].name).toBe("Basic Plan");
    expect(result.current.schoolPlans[1].active).toBe(false);
  });
});
