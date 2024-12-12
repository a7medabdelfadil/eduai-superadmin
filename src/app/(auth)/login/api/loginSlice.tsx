import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginSlice = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (ReqBody) => ({
                url: "auth/login",
                method: "POST",
                body: ReqBody
            })
        }),
    })
})


export const { useLoginMutation  } = loginSlice