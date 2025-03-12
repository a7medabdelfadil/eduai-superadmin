import { renderHook } from "@testing-library/react";
import { useState } from "react";
import "@testing-library/jest-dom";

interface Topic {
  name_en: string;
  name_ar: string;
  name_fr: string;
  videoUrls: string[];
  file: File | null;
}

const useTopicState = (initialTopic: Topic) => {
  const [topic, setTopic] = useState(initialTopic);
  return {
    topic,
  };
};

describe("Topic State", () => {
  test("should display correct topic details", () => {
    const mockTopic = {
      name_en: "Introduction to AI",
      name_ar: "مقدمة في الذكاء الاصطناعي",
      name_fr: "Introduction à l'IA",
      videoUrls: ["https://example.com/video1", "https://example.com/video2"],
      file: null,
    };

    const { result } = renderHook(() => useTopicState(mockTopic));

    expect(result.current.topic.name_en).toBe("Introduction to AI");
    expect(result.current.topic.videoUrls).toHaveLength(2);
    expect(result.current.topic.videoUrls[0]).toBe("https://example.com/video1");
  });
});
