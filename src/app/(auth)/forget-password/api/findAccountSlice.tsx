import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/app/api/axios";


export const findAccountSlice = createApi({
    reducerPath: "findAccountSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        findAccount: builder.mutation({
            query: (body) => ({
                url: `auth/password/find-account?username=${body}`,
                method: "POST",
            })
        }),
        selectEmail: builder.mutation({
            query: (arg: any) => ({
                url: `auth/password/select-email?user-id=${arg.userid}&email=${arg.email}`,
                method: "POST",
            })
        })
    })
})

export const { useFindAccountMutation , useSelectEmailMutation } = findAccountSlice