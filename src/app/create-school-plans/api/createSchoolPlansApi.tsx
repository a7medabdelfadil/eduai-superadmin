import { baseUrl } from "@/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const createSchoolPlanApi = createApi({
    reducerPath: "createSchoolPlans",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getPermissions: builder.query({
            query: (token: string) => ({
                url: "management/school/plan/permissions",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        addSchoolPlan: builder.mutation({
            query: ({ token, body }) => ({
                url: "management/school/plan",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
        })
    })
})


export const { useGetPermissionsQuery , useAddSchoolPlanMutation } = createSchoolPlanApi