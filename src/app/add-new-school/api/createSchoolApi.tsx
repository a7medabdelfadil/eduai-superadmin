import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/axios"


export const createSchoolSlice = createApi({
    reducerPath: "createSchoolApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getAllSchools: builder.query({
            query: (token: string) => ({
                url: "management/country/all?page=0&size=10",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getCurriculum: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/curriculum",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getType: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/school-type",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getLanguages: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/language",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getLevels: builder.query({
            query: (token: string) => ({
                url: "public/enumeration/study-stage",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getEducations: builder.query({
            query: (token: string) => ({
                url: "management/school/education-systems?size=100",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getRegion: builder.query({
            query: (token: string) => ({
                url: "management/region/all?size=1000000",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        addSchool: builder.mutation({
            query: ({ token, data }: { token: string, data: object }) => ({
                url: 'management/school',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: data,
            }),
        }),
       
    })
})


export const { useGetAllSchoolsQuery, useGetCurriculumQuery , useGetTypeQuery , useGetLanguagesQuery , useGetLevelsQuery , useGetEducationsQuery , useGetRegionQuery , useAddSchoolMutation } = createSchoolSlice