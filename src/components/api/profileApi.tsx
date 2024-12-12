import { baseUrl } from "@/app/api/axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApis = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['profile'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: ( token ) => ({
                url: `my-account/profile/user/update`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            }),
            providesTags: ['profile'],
        }),
    }),
})

export const { useGetProfileQuery } = profileApis