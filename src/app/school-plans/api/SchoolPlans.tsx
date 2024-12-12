import { baseUrl } from "@/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const SchoolPlansApi = createApi({
    reducerPath: "schoolPlans",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ["schoolPlans"],
    endpoints: (builder) => ({
        getAllSchoolPlans: builder.query({
            query: ({ token, page }) => ({
                url: `management/school/plan/all?page=${page}&size=10&active`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["schoolPlans"]
        }),
        getSchoolPlan: builder.query({
            query: ({ token, id }) => ({
                url: `management/school/plan/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["schoolPlans"]
        }),
        // updateStatusOfSchoolPlan: builder.mutation({
        //     query: ({ token, schoolPlanId, status }) => ({
        //         url: `management/school/plan/${schoolPlanId}/activate?active=${status}`,
        //         method: "PUT",
        //         headers: {
        //             "Authorization": `Bearer ${token}`
        //         }
        //     }),
            
        //     invalidatesTags: ["schoolPlans"]
        // }),
        updateStatusOfSchoolPlan: builder.mutation({
            query: ({ token, schoolPlanId, status, data }) => ({
              url: `management/school/plan/${schoolPlanId}/activate?active=${status}`,
              method: "PUT",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: data,
            }),
            invalidatesTags: ["schoolPlans"],
          }),
          
        
    })
})


export const { useGetAllSchoolPlansQuery, useGetSchoolPlanQuery, useUpdateStatusOfSchoolPlanMutation } = SchoolPlansApi

