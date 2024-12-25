import { baseUrl } from "@/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const getTokenFromCookie = () => {
  return getCookie("token");
};

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: headers => {
      const token = getTokenFromCookie();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log(`Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getAllNotifications: builder.query({
      query: ({size, page}) => `my-notification/all?size=${size}&page=${page}`,
    }),
    putNotifiRead: builder.mutation({
      query: id => ({
        url: `my-notification/${id}/read`,
        method: "POST",
      }),
    }),
    deleteNotification: builder.mutation({
      query: id => ({
        url: `my-notification/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  usePutNotifiReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
