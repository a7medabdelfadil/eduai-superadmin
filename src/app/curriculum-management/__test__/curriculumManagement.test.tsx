import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useBooleanState = () => {
  const [booleanValue, setBooleanValue] = useState(false);

  const toggleBooleanValue = () => {
    setBooleanValue(prev => !prev);
  };

  return {
    booleanValue,
    setBooleanValue,
    toggleBooleanValue,
  };
};

describe("CurriculumManagement Boolean Toggle", () => {
  test("should return false initially", () => {
    const { result } = renderHook(() => useBooleanState());
    expect(result.current.booleanValue).toBe(false);
  });

  test("should toggle the boolean value", () => {
    const { result } = renderHook(() => useBooleanState());

    act(() => {
      result.current.toggleBooleanValue();
    });

    expect(result.current.booleanValue).toBe(true);

    act(() => {
      result.current.toggleBooleanValue();
    });

    expect(result.current.booleanValue).toBe(false);
  });
});
