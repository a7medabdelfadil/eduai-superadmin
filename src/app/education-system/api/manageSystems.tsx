import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const systemsApis = createApi({
    reducerPath: "systemsApis",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['systems'],
    endpoints: (builder) => ({
        getAllEducationSystem: builder.query({
            query: ({ token, page, search }: { token: string, page: number, search: string }) => ({
                url: `management/education-system/all?page=${page}&size=10${search !== "" ? `&search=${search}` : ""}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ["systems"]
        }),
        getEducationById: builder.query({
            query: ({ token, id }: { token: string, id: any }) => ({
                url: `management/education-system/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },

            }),
            providesTags: ["systems"]
        }),
        deleteEduSystem: builder.mutation({
            query: ({ token, id }: { token: string, id: number }) => ({
                url: `management/education-system/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["systems"]
        }),
        createEduSystem: builder.mutation({
            query: ({ token, body }: { token: string, body: any }) => ({
                url: `management/education-system/new`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: body
            }),
        }),
        updateEduSystem: builder.mutation({
            query: ({ token, id, body }: { token: string, id: any , body: any }) => ({
                url: `management/education-system/${id}`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: body
            }),
        }),
    })
})

export const { useGetAllEducationSystemQuery, useGetEducationByIdQuery, useDeleteEduSystemMutation, useCreateEduSystemMutation, useUpdateEduSystemMutation } = systemsApis