import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/axios"

export const courseSlice = createApi({
    reducerPath: "courseAndCountry",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getCountry: builder.query({
            query: (token: string) => ({
                url: "management/country/all?page=0&size=100",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getEduSystem: builder.query({
            query: (token: string) => ({
                url: "management/education-system/all?size=100&page=0",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getLanguage: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/language",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getRegistrationType: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/registration-type",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getStudyLevel: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/study-level",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getEducationLevel: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/study-stage",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        // getSemester: builder.query({
        //     query: (token: string) => ({
        //         url: "public/enumeration/semester-name",
        //         method: "GET",
        //         headers: {
        //             "Authorization": `Bearer ${token}`
        //         }
        //     })
        // }),
        
        addCourse: builder.mutation({
            query: ({ token, data }: { token: string, data: object }) => ({
                url: 'management/course',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: data,
            }),
        }),
        addLesson: builder.mutation({
            query: ({ token, data }: { token: string, data: FormData }) => ({
                url: 'management/lesson',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            }),
        }),
    })
})


export const { useGetCountryQuery, useGetLanguageQuery , useGetRegistrationTypeQuery , useGetEducationLevelQuery , useGetEduSystemQuery , useAddCourseMutation , useAddLessonMutation , useGetStudyLevelQuery} = courseSlice


