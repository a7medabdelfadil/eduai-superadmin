import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./axios"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (ReqBody) => ({
                url: "auth/login",
                method: "POST",
                body: ReqBody
            })
        }),
        
        getSchools: builder.query({
            query: (token) => ({
                // i'm waiting for the real endpoint
                url: "management/feedback/all",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        })
    })
})


export const {useLoginMutation , useGetSchoolsQuery} = apiSlice