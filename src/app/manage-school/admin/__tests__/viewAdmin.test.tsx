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

interface AdminData {
  username: string;
  email: string;
  nid: string;
}

const useViewAdminState = (initialData: AdminData) => {
  const [adminDetails, setAdminDetails] = useState(initialData);

  return {
    adminDetails,
  };
};

describe("View Admin State", () => {
  test("should display correct admin details", () => {
    const mockAdminData = {
      username: "AdminUser",
      email: "admin@example.com",
      nid: "123456789",
    };

    const { result } = renderHook(() => useViewAdminState(mockAdminData));

    expect(result.current.adminDetails.username).toBe("AdminUser");
    expect(result.current.adminDetails.email).toBe("admin@example.com");
    expect(result.current.adminDetails.nid).toBe("123456789");
  });
});