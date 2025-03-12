import { renderHook } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

interface Update {
  id: number;
  schoolName: string;
  code: string;
  about: string;
}

const useUpdatesState = (initialUpdates: Update[]) => {
  const [updates, setUpdates] = useState(initialUpdates);
  return {
    updates,
  };
};

describe("Updates State", () => {
  test("should display correct updates", () => {
    const mockUpdates = [
      {
        id: 1,
        schoolName: "Nahda",
        code: "C45121",
        about: "This is text",
      },
      {
        id: 2,
        schoolName: "Future Academy",
        code: "F12345",
        about: "Another update text",
      },
    ];

    const { result } = renderHook(() => useUpdatesState(mockUpdates));

    expect(result.current.updates).toHaveLength(2);
    expect(result.current.updates[0].schoolName).toBe("Nahda");
    expect(result.current.updates[1].code).toBe("F12345");
  });
});
