"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { useParams } from "next/navigation";
import { FileInput, Label, TextInput } from "flowbite-react";
import { toast } from "react-toastify"; // استيراد toast من react-toastify
import { useAddTopicMutation } from "../../api/getCoursesSlice";
import Container from "@/components/Container";

interface Topic {
    name_en: string;
    name_ar: string;
    name_fr: string;
    videoUrls: string[];
    file: File | null;
}

const AddTopic: React.FC = () => {
    const params = useParams();
    const token = Cookies.get('token') || "";
    const [addTopic] = useAddTopicMutation();
    const [topic, setTopic] = useState<Topic>({
        name_en: '',
        name_ar: '',
        name_fr: '',
        videoUrls: [''],
        file: null,
    });

    const updateTopic = (key: keyof Topic, value: string | File | null) => {
        setTopic((prevTopic) => ({ ...prevTopic, [key]: value }));
    };

    const addVideo = () => {
        setTopic((prevTopic) => ({
            ...prevTopic,
            videoUrls: [...prevTopic.videoUrls, ''],
        }));
    };

    const updateVideo = (videoIndex: number, value: string) => {
        const updatedVideos = [...topic.videoUrls];
        updatedVideos[videoIndex] = value;
        setTopic((prevTopic) => ({ ...prevTopic, videoUrls: updatedVideos }));
    };

    const deleteVideo = (videoIndex: number) => {
        const updatedVideos = topic.videoUrls.filter((_, index) => index !== videoIndex);
        setTopic((prevTopic) => ({ ...prevTopic, videoUrls: updatedVideos }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        updateTopic('file', file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
    
        // إنشاء كائن request يتضمن جميع البيانات
        const requestData = {
            lessonId: params.lessonId,
            name_en: topic.name_en,
            name_ar: topic.name_ar,
            name_fr: topic.name_fr,
            videoUrls: topic.videoUrls,
        };
    
        // إضافة كائن request إلى formData
        formData.append("request", JSON.stringify(requestData));
    
        // إضافة الملف إذا كان موجودًا
        if (topic.file) {
            formData.append("file", topic.file);
        }
    
        try {
            await addTopic({ token, data: formData }).unwrap();
            toast.success("Topic added successfully");
            // إعادة تعيين الحالة بعد الإضافة
            setTopic({
                name_en: '',
                name_ar: '',
                name_fr: '',
                videoUrls: [''],
                file: null,
            });
        } catch (error) {
            toast.error("Failed to add topic");
        }
    };
    

    return (
        <>
            <Container>
            <h1 className="text-2xl font-semibold mb-4">Add New Topic</h1>
                <div className="collapse-content">
                    <div className="my-3">
                        <Label className="md:text-lg capitalize font-medium" value="Lesson Name  English" />
                        <TextInput
                            type="text"
                            placeholder="Enter Lesson Name "
                            value={topic.name_en}
                            onChange={(e) => updateTopic('name_en', e.target.value)}
                            required
                        />
                    </div>
                    <div className="my-3">
                        <Label className="md:text-lg capitalize font-medium" value="Lesson Name  Arabic" />
                        <TextInput
                            type="text"
                            placeholder="Enter Lesson Name "
                            value={topic.name_ar}
                            onChange={(e) => updateTopic('name_ar', e.target.value)}
                            required
                        />
                    </div>
                    <div className="my-3">
                        <Label className="md:text-lg capitalize font-medium" value="Lesson Name  French" />
                        <TextInput
                            type="text"
                            placeholder="Enter Lesson Name "
                            value={topic.name_fr}
                            onChange={(e) => updateTopic('name_fr', e.target.value)}
                            required
                        />
                    </div>

                    {/* هنا يتم إضافة عنصر الإدخال للملف */}
                    <div className="my-3">
                        <Label className="md:text-lg capitalize font-medium" value="Upload File" />
                        <FileInput
                            onChange={handleFileChange} // تعيين الدالة عند تغيير الملف
                            accept="*/*" // يمكنك تحديد أنواع الملفات المقبولة
                        />
                    </div>

                    <div className="my-3">
                        <Label className="md:text-lg capitalize font-medium" value="Video" />
                        <button onClick={addVideo}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 18C8.5 18.3978 8.65804 18.7794 8.93934 19.0607C9.22064 19.342 9.60218 19.5 10 19.5C10.3978 19.5 10.7794 19.342 11.0607 19.0607C11.342 18.7794 11.5 18.3978 11.5 18V11.5H18C18.3978 11.5 18.7794 11.342 19.0607 11.0607C19.342 10.7794 19.5 10.3978 19.5 10C19.5 9.60218 19.342 9.22064 19.0607 8.93934C18.7794 8.65804 18.3978 8.5 18 8.5H11.5V2C11.5 1.60218 11.342 1.22064 11.0607 0.93934C10.7794 0.658035 10.3978 0.5 10 0.5C9.60218 0.5 9.22064 0.658035 8.93934 0.93934C8.65804 1.22064 8.5 1.60218 8.5 2V8.5H2C1.60218 8.5 1.22064 8.65804 0.93934 8.93934C0.658035 9.22064 0.5 9.60218 0.5 10C0.5 10.3978 0.658035 10.7794 0.93934 11.0607C1.22064 11.342 1.60218 11.5 2 11.5H8.5V18Z" fill="#3E5AF0" />
                            </svg>
                        </button>
                    </div>

                    {topic.videoUrls.map((video, videoIndex) => (
                        <div key={videoIndex} className="flex items-center mb-2 relative">
                            <TextInput
                                type="text"
                                placeholder="Source video (Link URL)"
                                value={video}
                                onChange={(e) => updateVideo(videoIndex, e.target.value)}
                                required
                                className="flex-1"
                            />
                            {videoIndex !== 0 && (
                                <button
                                    className="absolute right-2"
                                    onClick={() => deleteVideo(videoIndex)}
                                >
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.09 0.833496C11.4748 0.833596 11.8498 0.954758 12.1619 1.17982C12.474 1.40488 12.7073 1.72243 12.8289 2.0875L13.3267 3.5835H16.3333C16.5764 3.5835 16.8096 3.68007 16.9815 3.85198C17.1534 4.02389 17.25 4.25705 17.25 4.50016C17.25 4.74328 17.1534 4.97644 16.9815 5.14834C16.8096 5.32025 16.5764 5.41683 16.3333 5.41683L16.3306 5.48191L15.5358 16.613C15.4862 17.3066 15.1757 17.9556 14.6669 18.4294C14.158 18.9033 13.4885 19.1667 12.7932 19.1668H5.20683C4.5115 19.1667 3.84202 18.9033 3.33314 18.4294C2.82426 17.9556 2.51377 17.3066 2.46417 16.613L1.66942 5.481C1.66776 5.45965 1.66684 5.43824 1.66667 5.41683C1.42355 5.41683 1.19039 5.32025 1.01849 5.14834C0.846577 4.97644 0.75 4.74328 0.75 4.50016C0.75 4.25705 0.846577 4.02389 1.01849 3.85198C1.19039 3.68007 1.42355 3.5835 1.66667 3.5835H4.67333L5.17108 2.0875C5.29272 1.72229 5.52623 1.40463 5.83851 1.17955C6.15078 0.954476 6.52598 0.833403 6.91092 0.833496H11.09ZM9 2.8335H8.5V3.8335H9V2.8335ZM9 5.8335H8.5V10.8335H9V5.8335ZM9 12.8335H8.5V16.8335H9V12.8335Z" fill="#3E5AF0" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={handleSubmit} // تحديث هنا لاستدعاء دالة الإرسال
                        >
                            Add Topic
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default AddTopic;
