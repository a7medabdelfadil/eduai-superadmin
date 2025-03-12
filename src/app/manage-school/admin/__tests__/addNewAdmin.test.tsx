import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useAddNewAdminState = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  return {
    username,
    email,
    password,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
  };
};

describe("Add New Admin State", () => {
  test("should update username correctly", () => {
    const { result } = renderHook(() => useAddNewAdminState());

    act(() => {
      result.current.handleUsernameChange("AdminUser");
    });

    expect(result.current.username).toBe("AdminUser");
  });

  test("should update email correctly", () => {
    const { result } = renderHook(() => useAddNewAdminState());

    act(() => {
      result.current.handleEmailChange("admin@example.com");
    });

    expect(result.current.email).toBe("admin@example.com");
  });

  test("should update password correctly", () => {
    const { result } = renderHook(() => useAddNewAdminState());

    act(() => {
      result.current.handlePasswordChange("SecureP@ss123");
    });

    expect(result.current.password).toBe("SecureP@ss123");
  });
});