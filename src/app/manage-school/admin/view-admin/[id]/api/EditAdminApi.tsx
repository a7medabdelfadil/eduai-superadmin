import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const editAdminApi = createApi({
    reducerPath: "editAdminApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        getAdmin: builder.query({
            query: ({ token, id }) => ({
                url: `management/school-admin/update/${id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
        }),
        employeeStatus: builder.query({
            query: (token) => ({
                url: `public/enumeration/employee-status`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })
        }),
        updateAdmin: builder.mutation({
            query: ({ token, id, body }) => ({
                url: `management/school-admin/${id}`,
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body
            })
        }),
    })
})


export const {
    useGetAdminQuery,
    useEmployeeStatusQuery,
    useUpdateAdminMutation

} = editAdminApi