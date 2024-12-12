import { baseUrl } from "@/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const curriculumApis = createApi({
    reducerPath: "curriculumApis",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['curriculum'],
    endpoints: (builder) => ({

        getCurriculumPlanning: builder.query({
            query: (token) => ({
                url: "academic/curriculumPlanning",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ['curriculum']
        })
    })
})

export const { useGetCurriculumPlanningQuery} = curriculumApis