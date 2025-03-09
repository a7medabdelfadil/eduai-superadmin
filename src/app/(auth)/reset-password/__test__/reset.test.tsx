import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useValidateResetPassword = () => {
  const [firstPassword, setFirstPassword] = useState("");
  const [secoundPassword, setSecoundPassword] = useState("");

  const validateInputs = () => {
    return firstPassword === secoundPassword && !!firstPassword.trim() && !!secoundPassword.trim();
  };

  return {
    firstPassword,
    setFirstPassword,
    secoundPassword,
    setSecoundPassword,
    validateInputs,
  };
};

describe("ResetPassword Validation", () => {
  test("should return false when passwords do not match or are empty", () => {
    const { result } = renderHook(() => useValidateResetPassword());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when passwords match and are filled", () => {
    const { result } = renderHook(() => useValidateResetPassword());

    act(() => {
      result.current.setFirstPassword("newPassword123");
      result.current.setSecoundPassword("newPassword123");
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
