import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const resumes_API = "https://ai-resume-mitra.onrender.com/api/resumes";

export const resumesApi = createApi({
  reducerPath: "resumesApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: resumes_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createresumes: builder.mutation({
      query: (formdata) => ({
        url: "/",
        method: "POST",
        body: formdata,
      }),
    }),
    updateresumes: builder.mutation({
      query: ({ ...updatedData }) => ({
        url: `/`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    getAllresumess: builder.query({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
    }),
    getresumesDetails: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateresumesMutation,
  useUpdateresumesMutation,
  useGetAllresumessQuery,
  useGetresumesDetailsQuery,
} = resumesApi;
