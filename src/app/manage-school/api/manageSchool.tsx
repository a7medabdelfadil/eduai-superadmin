import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const schoolsApis = createApi({
    reducerPath: "schoolsApis",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['schools'],
    endpoints: (builder) => ({
        getAllSchools: builder.query({
            query: ({ token, page, search }: { token: string, page: number, search: string }) => ({
                // url: `public/school/basic-info?name=${search !== "" ? `&search=${search}` : ""}&page=${page}&size=10`,
                url: `management/school/all?page=${page}&size=10${search !== "" ? `&search=${search}` : ""}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }),
            providesTags: ["schools"]
        }),
        getAllSchoolsWithSearch: builder.query({
            query: ({ token, page, search }: { token: string, page: number, search: string }) => ({
                url: `public/school/basic-info?name=${search}&size=10&page=${page}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }),
            providesTags: ["schools"]
        }),
        getSchoolById: builder.query({
            query: ({ token, id }: { token: string, id: any }) => ({
                url: `management/school/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }),
            providesTags: ["schools"]
        }),
        updateSchool: builder.mutation({
            query: ({ token, id , body }: { token: string, id: any  , body: any}) => ({
                url: `management/school/${id}`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: body
            }),
            invalidatesTags: ["schools"]
        }),
       
    })
})

export const { useGetAllSchoolsQuery, useGetAllSchoolsWithSearchQuery , useGetSchoolByIdQuery , useUpdateSchoolMutation } = schoolsApis