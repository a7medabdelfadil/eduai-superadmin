import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const dashboardSlice = createApi({
    reducerPath: "dashboard",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getTotalSchools: builder.query({
            query: (token: string) => ({
                url: "super-admin/dashboard/total-schools",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getDemos: builder.query({
            query: (token: string) => ({
                url: "super-admin/dashboard/demos",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getSubscriptions: builder.query({
            query: (token: string) => ({
                url: "super-admin/dashboard/subscriptions",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getNoActions: builder.query({
            query: (token: string) => ({
                url: "super-admin/dashboard/no-actions",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        getAboutExpire: builder.query({
            query: (token: string) => ({
                url: "super-admin/dashboard/about-to-expire-schools",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
    })
})


export const { useGetTotalSchoolsQuery , useGetDemosQuery , useGetSubscriptionsQuery , useGetNoActionsQuery , useGetAboutExpireQuery } = dashboardSlice