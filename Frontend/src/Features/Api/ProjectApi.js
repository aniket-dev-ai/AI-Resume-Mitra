import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PROJECT_API = "https://ai-resume-mitra.onrender.com/api/projects";

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: PROJECT_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: ({ courseId, projectData }) => ({
        url: `/add/${courseId}`,
        method: "POST",
        body: projectData,
      }),
    }),
    editProject: builder.mutation({
      query: ({ projectId, updatedData }) => ({
        url: `/edit/${projectId}`,
        method: "PUT",
        body: updatedData,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/delete/${projectId}`,
        method: "DELETE",
      }),
    }),
    getProject: builder.query({
      query: (projectId) => ({
        url: `/get/${projectId}`,
        method: "GET",
      }),
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useGetAllProjectsQuery,
} = projectApi;
