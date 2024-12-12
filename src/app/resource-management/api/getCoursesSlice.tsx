// getCoursesSlice.js
import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AllCoursesSlice = createApi({
    reducerPath: "getCourses",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['courses'],
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: ({token , page , search} : {token: string , page: number , search: string}) => ({
                url: `management/course/all?size=10&page=${page}${search !== "" ? `&search=${search}` : ""}`,
                method: "GET",
                headers: {
                    "Authorization":`Bearer ${token}`
                },
            }),
            providesTags: ["courses"]
        }),
        getCourseById: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/course/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ["courses"]
        }),
        getLeasson: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/lesson/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ["courses"]
        }),
        getAllLessons: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/lesson/all?page=0&size=1000000&courseId=${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ["courses"]
        }),
        getTopic: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/lesson-topic/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ["courses"]
        }),
        getLessonFiles: builder.query({
            query: ({token , id} : {token: string , id: any}) => ({
                url: `management/lesson/files?courseId=${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ["courses"]
        }),
        deleteCourse: builder.mutation({
            query: ({token , id } : {token: string , id: number}) => ({
                url: `management/course/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["courses"]
        }),
        updateCourse: builder.mutation({
            query: ({ token, data, id }: { token: string, data: object, id: string | string[] }) => ({
                url: `management/course/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: data,
            }),
            invalidatesTags: ["courses"],
        }),
        updateLesson: builder.mutation({
            query: ({ token, data, id }: { token: string, data: object, id: number }) => ({
                url: `management/lesson/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            }),
            invalidatesTags: ["courses"],
        }),
        updateTopicFile: builder.mutation({
            query: ({ token, data, id }: { token: string, data: File | null, id: number }) => {
              const formData = new FormData();
              if (data) {
                formData.append('file', data);
              } else {
                formData.append('files', new Blob());
              }
          
              return {
                url: `management/lesson-topic/${id}/file`,
                method: 'PUT',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              };
            },
            invalidatesTags: ["courses"],
          }),          
          AddTopic: builder.mutation({
            query: ({ token, data }: { token: string, data: FormData }) => ({
                url: `management/lesson-topic`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            }),
        }),
    })
});

export const {
  useGetAllCoursesQuery, 
  useGetLeassonQuery, 
  useGetAllLessonsQuery, 
  useGetTopicQuery, 
  useDeleteCourseMutation, 
  useGetCourseByIdQuery,
  useUpdateCourseMutation, 
  useUpdateLessonMutation,
  useGetLessonFilesQuery,
  useUpdateTopicFileMutation,
  useAddTopicMutation
} = AllCoursesSlice;
