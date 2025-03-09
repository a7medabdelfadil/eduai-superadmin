import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useValidateLogin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    return !!userName.trim() && !!password.trim();
  };

  return {
    userName,
    setUserName,
    password,
    setPassword,
    validateInputs,
  };
};

describe("Login Validation", () => {
  test("should return false when username or password is empty", () => {
    const { result } = renderHook(() => useValidateLogin());
    expect(result.current.validateInputs()).toBe(false);
  });

  test("should return true when both username and password are filled", () => {
    const { result } = renderHook(() => useValidateLogin());

    act(() => {
      result.current.setUserName("testUser");
      result.current.setPassword("testPassword");
    });

    expect(result.current.validateInputs()).toBe(true);
  });
});
