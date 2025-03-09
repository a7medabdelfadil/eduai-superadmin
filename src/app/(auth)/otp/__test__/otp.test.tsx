import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useValidateOtp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const validateInputs = () => {
    return otp.every(value => !!value.trim());
  };

  return {
    otp,
    setOtp,
    validateInputs,
  };
};

describe("OTP Validation", () => {
  test("should return false when OTP fields are empty", () => {
    const { result } = renderHook(() => useValidateOtp());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when all OTP fields are filled", () => {
    const { result } = renderHook(() => useValidateOtp());

    act(() => {
      result.current.setOtp(['1', '2', '3', '4', '5', '6']);
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
