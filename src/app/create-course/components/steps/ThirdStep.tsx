// Lesson = Chapter Now
// Topic = Lesson Now
// TODO: change the name of variables to be more clear

import React, { useEffect, useState } from "react";
import { FileInput, Label, TextInput } from "flowbite-react";
import { useAddLessonMutation } from "../../api/createCourseSlice";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useGetAllLessonsQuery,
  useUpdateLessonMutation,
} from "@/app/resource-management/api/getCoursesSlice";

interface ThirdStepProps {
  handleNext: () => void;
  handlePrev: () => void;
  dataAddCourse: any;
}

const ThirdStep: React.FC<ThirdStepProps> = ({
  dataAddCourse,
  handleNext,
  handlePrev,
}) => {
  const router = useRouter();

  const token = Cookies.get("token") || "";
  const params = useParams();
  console.log("params: ", params);

  const [visibleIndex, setVisibleIndex] = useState(0);
  const [lessonNameEn, setLessonNameEn] = useState("");
  const [lessonNameAr, setLessonNameAr] = useState("");
  const [lessonNameFr, setLessonNameFr] = useState("");
  const [lessonGoalsEn, setLessonGoalsEn] = useState("");
  const [lessonGoalsAr, setLessonGoalsAr] = useState("");
  const [lessonGoalsFr, setLessonGoalsFr] = useState("");

  const [tutorials, setTutorials] = useState<File[]>([] as File[]);

  const [allTopics, setAllTopics] = useState([
    { name_en: "", name_ar: "", name_fr: "", videoUrls: [""] },
  ]);

  const { data: dataLesson } = useGetAllLessonsQuery({ token, id: params.id });
  console.log("dataLesson: ", dataLesson);

  console.log("alltopics", allTopics);
  const [addLesson, { data, error, isError, isSuccess }] =
    useAddLessonMutation();

  const [updateLesson, { data: dataUpdate }] = useUpdateLessonMutation();
  console.log("dataUpdate: ", dataUpdate);

  const handleSend = async () => {

    const reqObject = {
      courseId: dataAddCourse?.data?.id || params.id,
      name_en: lessonNameEn,
      name_ar: lessonNameAr,
      name_fr: lessonNameFr,
      goals_en: lessonGoalsEn,
      goals_ar: lessonGoalsAr,
      goals_fr: lessonGoalsFr,
      topics: allTopics,
    };

    const formData = new FormData();
    formData.append("request", JSON.stringify(reqObject));
    if (tutorials.length > 0) {
      tutorials.forEach((item) => {
        formData.append(`files`, item);
      });
    } else {
      formData.append("files", new Blob());
    }
    addLesson({ token, data: formData });
  };

  const addNewTopic = () => {
    setAllTopics([
      ...allTopics,
      { name_en: "", name_ar: "", name_fr: "", videoUrls: [""] },
    ]);
    setVisibleIndex(allTopics.length);
  };

  const updateTopic = (index: number, field: string, value: any) => {
    const updatedTopics = [...allTopics];
    updatedTopics[index] = { ...updatedTopics[index], [field]: value };
    setAllTopics(updatedTopics);
  };

  const addVideo = (topicIndex: number) => {
    const updatedTopics = [...allTopics];
    updatedTopics[topicIndex].videoUrls.push("");
    setAllTopics(updatedTopics);
  };

  const updateVideo = (
    topicIndex: number,
    videoIndex: number,
    value: string
  ) => {
    const updatedTopics = [...allTopics];
    updatedTopics[topicIndex].videoUrls[videoIndex] = value;
    setAllTopics(updatedTopics);
  };

  const deleteVideo = (topicIndex: number, videoIndex: number) => {
    const updatedTopics = [...allTopics];
    updatedTopics[topicIndex].videoUrls.splice(videoIndex, 1);
    setAllTopics(updatedTopics);
  };

  const addTutorial = (file: File) => {
    setTutorials((prevTutorials) => [...prevTutorials, file]);
  };

  const toggleVisibility = (index: number) => {
    setVisibleIndex(index);
  };

  const deleteTopic = (index: any) => {
    setTutorials((prevTutorials) =>
      prevTutorials.filter((_, i) => i !== index)
    );
    const updatedTopics = allTopics.filter((_, i) => i !== index);
    setAllTopics(updatedTopics);
  };

  useEffect(() => {
    if (isError) {
      if (error && "data" in error && (error as FetchBaseQueryError).data) {
        const errorData = (error as FetchBaseQueryError).data as any;
        if (errorData?.message) {
          toast.error(errorData.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        toast.error("Something went wrong, please try again later", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/resource-management");
    }
  }, [isSuccess, router]);

  return (
    <div className="bg-white card p-3 shadow-md rounded-md">
      <div>
        <h3 className="font-semibold mb-5 md:text-xl text-[#526484]">
          Chapter
        </h3>
        <div className="my-3">
          <div className="mb-4 block">
            <Label
              className="md:text-lg capitalize font-medium"
              htmlFor="LessonNameEn"
              value="Chapter Name English"
            />
          </div>
          <TextInput
            value={lessonNameEn || ""}
            onChange={(e) => setLessonNameEn(e.target.value)}
            id="LessonNameEn"
            type="text"
            placeholder="Enter Chapter Name"
          />
        </div>
        <div className="my-3">
          <div className="mb-4 block">
            <Label
              className="md:text-lg capitalize font-medium"
              htmlFor="LessonNameAr"
              value="Chapter Name Arabic"
            />
          </div>
          <TextInput
            value={lessonNameAr || ""}
            onChange={(e) => setLessonNameAr(e.target.value)}
            id="LessonNameAr"
            type="text"
            placeholder="Enter Chapter Name"
          />
        </div>
        <div className="my-3">
          <div className="mb-4 block">
            <Label
              className="md:text-lg capitalize font-medium"
              htmlFor="LessonNameFr"
              value="Chapter Name French"
            />
          </div>
          <TextInput
            value={lessonNameFr || ""}
            onChange={(e) => setLessonNameFr(e.target.value)}
            id="LessonNameFr"
            type="text"
            placeholder="Enter Chapter Name"
          />
        </div>
        <div className="my-3">
          <div className="mb-4 block">
            <Label
              className="md:text-lg capitalize font-medium"
              htmlFor="LessonGoalsEn"
              value="Chapter Goals English"
            />
          </div>
          <TextInput
            value={lessonGoalsEn || ""}
            onChange={(e) => setLessonGoalsEn(e.target.value)}
            id="LessonGoalsEn"
            type="text"
            placeholder="Enter Chapter Goals"
          />
        </div>
        <div className="my-3">
          <div className="mb-4 block">
            <Label
              className="md:text-lg capitalize font-medium"
              htmlFor="LessonGoalsAr"
              value="Chapter Goals Arabic"
            />
          </div>
          <TextInput
            value={lessonGoalsAr || ""}
            onChange={(e) => setLessonGoalsAr(e.target.value)}
            id="LessonGoalsAr"
            type="text"
            placeholder="Enter Chapter Goals"
          />
        </div>
        <div className="my-3">
          <div className="mb-4 block">
            <Label
              className="md:text-lg capitalize font-medium"
              htmlFor="LessonGoalsFr"
              value="Chapter Goals French"
            />
          </div>
          <TextInput
            value={lessonGoalsFr || ""}
            onChange={(e) => setLessonGoalsFr(e.target.value)}
            id="LessonGoalsFr"
            type="text"
            placeholder="Enter Chapter Goals"
          />
        </div>
        <h3 className="font-semibold my-5 md:text-xl text-[#526484]">Lesson</h3>

        {allTopics?.map((topic, index) => (
          <div key={index}>
            <div className="flex justify-between items-center py-2">
              <div className="text-lg font-medium text-gray-800 dark:text-white">
                Lesson .{index + 1}
              </div>
              <div className="flex items-center space-x-2">
                {allTopics.length > 1 && (
                  <button
                    className="hover:opacity-70"
                    onClick={() => deleteTopic(index)}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.09 1.8335C13.4748 1.8336 13.8498 1.95476 14.1619 2.17982C14.474 2.40488 14.7073 2.72243 14.8289 3.0875L15.3267 4.5835H18.3333C18.5764 4.5835 18.8096 4.68007 18.9815 4.85198C19.1534 5.02389 19.25 5.25705 19.25 5.50016C19.25 5.74328 19.1534 5.97644 18.9815 6.14834C18.8096 6.32025 18.5764 6.41683 18.3333 6.41683L18.3306 6.48191L17.5358 17.613C17.4862 18.3066 17.1757 18.9556 16.6669 19.4294C16.158 19.9033 15.4885 20.1667 14.7932 20.1668H7.20683C6.5115 20.1667 5.84202 19.9033 5.33314 19.4294C4.82426 18.9556 4.51377 18.3066 4.46417 17.613L3.66942 6.481C3.66776 6.45965 3.66684 6.43824 3.66667 6.41683C3.42355 6.41683 3.19039 6.32025 3.01849 6.14834C2.84658 5.97644 2.75 5.74328 2.75 5.50016C2.75 5.25705 2.84658 5.02389 3.01849 4.85198C3.19039 4.68007 3.42355 4.5835 3.66667 4.5835H6.67333L7.17108 3.0875C7.29272 2.72229 7.52623 2.40463 7.83851 2.17955C8.15078 1.95448 8.52598 1.8334 8.91092 1.8335H13.09ZM8.25 9.16683C8.02548 9.16686 7.80877 9.24929 7.64099 9.39849C7.47321 9.54768 7.36602 9.75327 7.33975 9.97625L7.33333 10.0835V15.5835C7.33359 15.8171 7.42306 16.0419 7.58344 16.2118C7.74383 16.3816 7.96304 16.4839 8.19628 16.4976C8.42952 16.5113 8.65918 16.4354 8.83835 16.2854C9.01751 16.1355 9.13266 15.9228 9.16025 15.6907L9.16667 15.5835V10.0835C9.16667 9.84038 9.07009 9.60722 8.89818 9.43532C8.72627 9.26341 8.49312 9.16683 8.25 9.16683ZM13.75 9.16683C13.5069 9.16683 13.2737 9.26341 13.1018 9.43532C12.9299 9.60722 12.8333 9.84038 12.8333 10.0835V15.5835C12.8333 15.8266 12.9299 16.0598 13.1018 16.2317C13.2737 16.4036 13.5069 16.5002 13.75 16.5002C13.9931 16.5002 14.2263 16.4036 14.3982 16.2317C14.5701 16.0598 14.6667 15.8266 14.6667 15.5835V10.0835C14.6667 9.84038 14.5701 9.60722 14.3982 9.43532C14.2263 9.26341 13.9931 9.16683 13.75 9.16683ZM13.09 3.66683H8.91L8.60475 4.5835H13.3953L13.09 3.66683Z"
                        fill="#E85347"
                      />
                    </svg>
                  </button>
                )}
                {visibleIndex === index ? (
                  <button
                    className="hover:opacity-70"
                    onClick={() => toggleVisibility(index)}
                  >
                    <svg
                      width="11"
                      height="9"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7558 7.21106C11.0814 6.83051 11.0814 6.21346 10.7558 5.83292L6.67783 1.07019C6.02664 0.309694 4.9715 0.309987 4.32064 1.07077L0.244196 5.83643C-0.081399 6.21697 -0.081399 6.83402 0.244196 7.21457C0.569708 7.59514 1.09753 7.59514 1.42304 7.21457L4.91206 3.13572C5.23757 2.75508 5.7654 2.75518 6.09091 3.13572L9.57699 7.21106C9.90252 7.59162 10.4303 7.59162 10.7558 7.21106Z"
                        fill="#526484"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="rotate-180 hover:opacity-70"
                    onClick={() => toggleVisibility(index)}
                  >
                    <svg
                      width="11"
                      height="9"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.7558 7.21106C11.0814 6.83051 11.0814 6.21346 10.7558 5.83292L6.67783 1.07019C6.02664 0.309694 4.9715 0.309987 4.32064 1.07077L0.244196 5.83643C-0.081399 6.21697 -0.081399 6.83402 0.244196 7.21457C0.569708 7.59514 1.09753 7.59514 1.42304 7.21457L4.91206 3.13572C5.23757 2.75508 5.7654 2.75518 6.09091 3.13572L9.57699 7.21106C9.90252 7.59162 10.4303 7.59162 10.7558 7.21106Z"
                        fill="#526484"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {visibleIndex === index && (
              <div className="collapse-content">
                <div className="my-3">
                  <div className="mb-4 block">
                    <Label
                      className="md:text-lg capitalize font-medium"
                      value="Lesson Name English"
                    />
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter Lesson Name "
                    value={topic.name_en || ""}
                    onChange={(e) =>
                      //   updateTopic(index, "name_en", e.target.value)
                      updateTopic(index, "name_en", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="my-3">
                  <div className="mb-4 block">
                    <Label
                      className="md:text-lg capitalize font-medium"
                      value="Lesson Name  Arabic"
                    />
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter Lesson Name "
                    value={topic.name_ar || ""}
                    onChange={(e) =>
                      updateTopic(index, "name_ar", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="my-3">
                  <div className="mb-4 block">
                    <Label
                      className="md:text-lg capitalize font-medium"
                      value="Lesson Name  French"
                    />
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter Lesson Name "
                    value={topic.name_fr || ""}
                    onChange={(e) =>
                      updateTopic(index, "name_fr", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="my-3">
                  <div className="mb-4 block">
                    <Label
                      className="md:text-lg capitalize font-medium"
                      value="Tutorial"
                    />
                  </div>
                  <FileInput
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        addTutorial(e.target.files[0] || null);
                      }
                    }}
                  />
                </div>

                <div className="my-5">
                  <div className="mb-4 flex justify-between items-center">
                    <Label
                      className="md:text-lg capitalize font-medium"
                      value="Video"
                    />
                    <button onClick={() => addVideo(index)}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.5 18C8.5 18.3978 8.65804 18.7794 8.93934 19.0607C9.22064 19.342 9.60218 19.5 10 19.5C10.3978 19.5 10.7794 19.342 11.0607 19.0607C11.342 18.7794 11.5 18.3978 11.5 18V11.5H18C18.3978 11.5 18.7794 11.342 19.0607 11.0607C19.342 10.7794 19.5 10.3978 19.5 10C19.5 9.60218 19.342 9.22064 19.0607 8.93934C18.7794 8.65804 18.3978 8.5 18 8.5H11.5V2C11.5 1.60218 11.342 1.22064 11.0607 0.93934C10.7794 0.658035 10.3978 0.5 10 0.5C9.60218 0.5 9.22064 0.658035 8.93934 0.93934C8.65804 1.22064 8.5 1.60218 8.5 2V8.5H2C1.60218 8.5 1.22064 8.65804 0.93934 8.93934C0.658035 9.22064 0.5 9.60218 0.5 10C0.5 10.3978 0.658035 10.7794 0.93934 11.0607C1.22064 11.342 1.60218 11.5 2 11.5H8.5V18Z"
                          fill="#3E5AF0"
                        />
                      </svg>
                    </button>
                  </div>

                  {topic.videoUrls.map((video, videoIndex) => (
                    <div
                      key={videoIndex}
                      className="flex items-center mb-2 relative"
                    >
                      <TextInput
                        type="text"
                        placeholder="Source video (Link URL)"
                        value={video || ""}
                        onChange={(e) =>
                          updateVideo(index, videoIndex, e.target.value)
                        }
                        required
                        className="flex-1"
                      />
                      {videoIndex !== 0 && (
                        <button
                          className="absolute right-2"
                          onClick={() => deleteVideo(index, videoIndex)}
                        >
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.09 0.833496C11.4748 0.833596 11.8498 0.954758 12.1619 1.17982C12.474 1.40488 12.7073 1.72243 12.8289 2.0875L13.3267 3.5835H16.3333C16.5764 3.5835 16.8096 3.68007 16.9815 3.85198C17.1534 4.02389 17.25 4.25705 17.25 4.50016C17.25 4.74328 17.1534 4.97644 16.9815 5.14834C16.8096 5.32025 16.5764 5.41683 16.3333 5.41683L16.3306 5.48191L15.5358 16.613C15.4862 17.3066 15.1757 17.9556 14.6669 18.4294C14.158 18.9033 13.4885 19.1667 12.7932 19.1668H5.20683C4.5115 19.1667 3.84202 18.9033 3.33314 18.4294C2.82426 17.9556 2.51377 17.3066 2.46417 16.613L1.66942 5.481C1.66776 5.45965 1.66684 5.43824 1.66667 5.41683C1.42355 5.41683 1.19039 5.32025 1.01849 5.14834C0.846577 4.97644 0.75 4.74328 0.75 4.50016C0.75 4.25705 0.846577 4.02389 1.01849 3.85198C1.19039 3.68007 1.42355 3.5835 1.66667 3.5835H4.67333L5.17108 2.0875C5.29272 1.72229 5.52623 1.40463 5.83851 1.17955C6.15078 0.954476 6.52598 0.833403 6.91092 0.833496H11.09ZM6.25 8.16683C6.02548 8.16686 5.80877 8.24929 5.64099 8.39849C5.47321 8.54768 5.36602 8.75327 5.33975 8.97625L5.33333 9.0835V14.5835C5.33359 14.8171 5.42306 15.0419 5.58344 15.2118C5.74383 15.3816 5.96304 15.4839 6.19628 15.4976C6.42952 15.5113 6.65918 15.4354 6.83835 15.2854C7.01751 15.1355 7.13266 14.9228 7.16025 14.6907L7.16667 14.5835V9.0835C7.16667 8.84038 7.07009 8.60722 6.89818 8.43532C6.72627 8.26341 6.49312 8.16683 6.25 8.16683ZM11.75 8.16683C11.5069 8.16683 11.2737 8.26341 11.1018 8.43532C10.9299 8.60722 10.8333 8.84038 10.8333 9.0835V14.5835C10.8333 14.8266 10.9299 15.0598 11.1018 15.2317C11.2737 15.4036 11.5069 15.5002 11.75 15.5002C11.9931 15.5002 12.2263 15.4036 12.3982 15.2317C12.5701 15.0598 12.6667 14.8266 12.6667 14.5835V9.0835C12.6667 8.84038 12.5701 8.60722 12.3982 8.43532C12.2263 8.26341 11.9931 8.16683 11.75 8.16683ZM11.09 2.66683H6.91L6.60475 3.5835H11.3953L11.09 2.66683Z"
                              fill="#E85347"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          onClick={addNewTopic}
          className="flex items-center my-5 hover:opacity-80"
        >
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2511_2483)">
              <path
                d="M8.75065 17.1666C8.75065 17.4981 8.88235 17.816 9.11677 18.0505C9.35119 18.2849 9.66913 18.4166 10.0007 18.4166C10.3322 18.4166 10.6501 18.2849 10.8845 18.0505C11.119 17.816 11.2507 17.4981 11.2507 17.1666V11.7499H16.6673C16.9988 11.7499 17.3168 11.6182 17.5512 11.3838C17.7856 11.1494 17.9173 10.8314 17.9173 10.4999C17.9173 10.1684 17.7856 9.85046 17.5512 9.61603C17.3168 9.38161 16.9988 9.24992 16.6673 9.24992H11.2507V3.83325C11.2507 3.50173 11.119 3.18379 10.8845 2.94937C10.6501 2.71495 10.3322 2.58325 10.0007 2.58325C9.66913 2.58325 9.35119 2.71495 9.11677 2.94937C8.88235 3.18379 8.75065 3.50173 8.75065 3.83325V9.24992H3.33398C3.00246 9.24992 2.68452 9.38161 2.4501 9.61603C2.21568 9.85046 2.08398 10.1684 2.08398 10.4999C2.08398 10.8314 2.21568 11.1494 2.4501 11.3838C2.68452 11.6182 3.00246 11.7499 3.33398 11.7499H8.75065V17.1666Z"
                fill="#526484"
              />
            </g>
            <rect
              x="0.5"
              y="1"
              width="19"
              height="19"
              rx="4.5"
              stroke="#526484"
            />
            <defs>
              <clipPath id="clip0_2511_2483">
                <rect y="0.5" width="20" height="20" rx="5" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="block text-[#526484] md:text-lg font-medium  ms-3">
            Add New Topics
          </span>
        </button>
      </div>
      <div className="my-4 flex justify-end">
        <button
          onClick={handlePrev}
          className="text-[#367AFF] font-medium border flex items-center md:text-lg py-1.5 ps-8 pe-5 rounded-lg hover:opacity-80 me-2"
        >
          <svg
            className="me-2"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28943 0.707204C6.89892 0.316674 6.26572 0.316674 5.87522 0.707204L0.987819 5.5994C0.207419 6.3806 0.20772 7.6464 0.98842 8.4272L5.87882 13.3175C6.26932 13.7081 6.90252 13.7081 7.29304 13.3175C7.68357 12.927 7.68357 12.2938 7.29304 11.9033L3.10742 7.7177C2.71682 7.3272 2.71692 6.69399 3.10742 6.30349L7.28943 2.12141C7.67996 1.73089 7.67996 1.09772 7.28943 0.707204Z"
              fill="#3E5AF0"
            />
          </svg>
          Previous
        </button>
        <button
          onClick={handleSend}
          className="text-white font-medium border border-[#367AFF] flex items-center bg-[#367AFF] md:text-lg py-1.5 px-8 rounded-lg hover:opacity-80"
        >
          Next
          <svg
            width="24"
            height="20"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2106 18.2928C10.6011 18.6833 11.2343 18.6833 11.6248 18.2928L16.5122 13.4006C17.2926 12.6194 17.2923 11.3536 16.5116 10.5728L11.6212 5.6825C11.2307 5.2919 10.5975 5.2919 10.207 5.6825C9.81643 6.073 9.81643 6.7062 10.207 7.0967L14.3926 11.2823C14.7832 11.6728 14.7831 12.306 14.3926 12.6965L10.2106 16.8786C9.82004 17.2691 9.82004 17.9023 10.2106 18.2928Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThirdStep;
