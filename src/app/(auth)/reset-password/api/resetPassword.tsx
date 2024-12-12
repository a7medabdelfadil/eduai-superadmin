import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/app/api/axios";


export const ResetPassword = createApi({
    reducerPath: "ResetPassword",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    endpoints: (builder) => ({
        resetPassword: builder.mutation({
            query: ({email , code , password}) => ({
                url: `auth/password/reset-password?email=${email}&code=${code}&password=${password}`,
                method: "POST",
            })
        }),
       
    })
})

export const { useResetPasswordMutation  } = ResetPassword