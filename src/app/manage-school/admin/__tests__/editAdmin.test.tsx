import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useEditAdminState = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState("");

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleNidChange = (value: string) => {
    setNid(value);
  };

  return {
    username,
    email,
    nid,
    handleUsernameChange,
    handleEmailChange,
    handleNidChange,
  };
};

describe("Edit Admin State", () => {
  test("should update username correctly", () => {
    const { result } = renderHook(() => useEditAdminState());

    act(() => {
      result.current.handleUsernameChange("AdminUser");
    });

    expect(result.current.username).toBe("AdminUser");
  });

  test("should update email correctly", () => {
    const { result } = renderHook(() => useEditAdminState());

    act(() => {
      result.current.handleEmailChange("admin@example.com");
    });

    expect(result.current.email).toBe("admin@example.com");
  });

  test("should update nid correctly", () => {
    const { result } = renderHook(() => useEditAdminState());

    act(() => {
      result.current.handleNidChange("123456789");
    });

    expect(result.current.nid).toBe("123456789");
  });
});
