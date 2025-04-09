import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backupsApis = createApi({
    reducerPath: "backupsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['Backups'],
    endpoints: (builder) => ({
        getAllBackups: builder.query({
            query: ({ token, page, search }: { token: string, page: number, search: string }) => ({
                url: `management/backup/all?page=${page}&size=10${search !== "" ? `&search=${search}` : ""}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ['Backups'],
        }),
        getAllVideos: builder.query({
            query: (token) => ({
                url: `/landing-page/public/all_videos`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ['Backups'],
        }),
        getBackup: builder.query({
            query: ({ token, id }: { token: string, id: any }) => ({
                url: `management/backup/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ['Backups'],
        }),
        addBackup: builder.mutation({
            query: ({ token, name }: { token: string, name: string }) => ({
                url: `management/backup?name=${name}`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            invalidatesTags: ['Backups'],
        }),
        uploadVideo: builder.mutation({
            query: ({ token, formData }) => ({
                url: `/landing-page/upload-video`,
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            }),
            invalidatesTags: ['Backups'],
        }),
        deleteBackup: builder.mutation({
            query: ({ token, id }: { token: string, id: number }) => ({
                url: `management/backup/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Backups'],
        }),
        deleteVideo: builder.mutation({
            query: ({ token, id }: { token: string, id: number }) => ({
                url: `/landing-page/delete-video/${id}`,
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Backups'],
        }),
        restoreBackup: builder.mutation({
            query: ({ token, id }: { token: string, id: any }) => ({
                url: `management/backup/${id}/restore`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Backups'],
        }),
    }),
})

export const { useGetAllBackupsQuery, useUploadVideoMutation, useGetAllVideosQuery, useDeleteVideoMutation, useGetBackupQuery, useAddBackupMutation, useDeleteBackupMutation , useRestoreBackupMutation } = backupsApis