import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const selectEmailSlice = createApi({
    reducerPath: "selectEmailSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        validateCode: builder.mutation({
            query: (arg : any) => ({
                url : `auth/password/validate-code?email=${arg.email}&code=${arg.code}`,
                method: "POST",
            })
        })
    })
})

export const {useValidateCodeMutation} = selectEmailSlice