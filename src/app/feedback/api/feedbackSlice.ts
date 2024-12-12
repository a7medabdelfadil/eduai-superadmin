import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/axios"

export const feedbackSlice = createApi({
    reducerPath: "feedbackApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['feedbacksVariable'],
    endpoints: (builder) => ({
        getAllFeedback: builder.query({
            query: ({ token, page, search }) => ({
                url: `management/feedback/all?size=10&page=${page}&deleted=false${search !== "" ? `&search=${search}` : ""} `,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["feedbacksVariable"]
        }),
        getFeedback: builder.query({
            query: ({ token, id }) => ({
                url: `management/feedback/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            providesTags: ["feedbacksVariable"]
        }),
        deleteFeedback: builder.mutation({
            query: ({ token, id }) => ({
                url: `management/feedback/${id}`,
                method: "Delete",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ["feedbacksVariable"]
        }),

    })
})


export const { useGetAllFeedbackQuery, useGetFeedbackQuery, useDeleteFeedbackMutation } = feedbackSlice
