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

export const { useGetAllBackupsQuery, useGetBackupQuery, useAddBackupMutation, useDeleteBackupMutation , useRestoreBackupMutation } = backupsApis