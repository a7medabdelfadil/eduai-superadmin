import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

interface Notify {
  id: number;
  title: string;
  description: string;
}

const useNotifiesState = (initialNotifies: Notify[]) => {
  const [notifications, setNotifications] = useState(initialNotifies);

  return {
    notifications,
  };
};

describe("Notifies State", () => {
  test("should display correct notifications", () => {
    const mockNotifies = [
      { id: 1, title: "New Update", description: "A new update is available." },
      { id: 2, title: "System Alert", description: "Your system needs attention." },
    ];

    const { result } = renderHook(() => useNotifiesState(mockNotifies));

    expect(result.current.notifications).toHaveLength(2);
    expect(result.current.notifications[0].title).toBe("New Update");
    expect(result.current.notifications[1].title).toBe("System Alert");
  });
});
