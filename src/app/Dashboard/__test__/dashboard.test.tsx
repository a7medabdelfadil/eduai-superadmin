import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useVerifyState = () => {
  const [isVerified, setIsVerified] = useState(false);

  const verifyUser = (isSuccess: boolean) => {
    if (isSuccess) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  return {
    isVerified,
    verifyUser,
  };
};

describe("Dashboard Verification", () => {
  test("should update isVerified value correctly", () => {
    const { result } = renderHook(() => useVerifyState());

    expect(result.current.isVerified).toBe(false);

    act(() => {
      result.current.verifyUser(true);
    });

    expect(result.current.isVerified).toBe(true);

    act(() => {
      result.current.verifyUser(false);
    });

    expect(result.current.isVerified).toBe(false);
  });
});
