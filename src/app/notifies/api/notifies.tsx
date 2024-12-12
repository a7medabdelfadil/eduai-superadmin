import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notifiesSlice = createApi({
    reducerPath: "notifies",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: (token: string) => ({
                url: "/my-notification/all",
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        deleteNotification: builder.mutation({
            query: ({ token, notificationId }: { token: string, notificationId: string }) => ({
                url: `/my-notification/${notificationId}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        }),
        markAsRead: builder.mutation({
            query: ({ token, notificationId }: { token: string; notificationId: string }) => ({
              url: `/my-notification/${notificationId}/read`,
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          }),
    })
})

export const { useGetAllNotificationsQuery, useDeleteNotificationMutation, useMarkAsReadMutation} = notifiesSlice;
