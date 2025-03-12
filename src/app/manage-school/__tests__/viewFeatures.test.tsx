import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

const useViewFeaturesState = () => {
  const [features, setFeatures] = useState([]);

  const setNewFeatures = (newFeatures: any) => {
    setFeatures(newFeatures);
  };

  return {
    features,
    setNewFeatures,
  };
};

describe("View Features State", () => {
  test("should update features correctly", () => {
    const { result } = renderHook(() => useViewFeaturesState());

    act(() => {
      result.current.setNewFeatures(["Feature1", "Feature2"]);
    });

    expect(result.current.features).toEqual(["Feature1", "Feature2"]);
  });
});