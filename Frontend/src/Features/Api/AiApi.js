import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AI_API = "https://ai-resume-mitra.onrender.com/api/ai";

export const aiApi = createApi({
  reducerPath: "aiApi",
  baseQuery: fetchBaseQuery({
    credentials: "include",
    baseUrl: AI_API,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    enhanceResume: builder.mutation({
      query: (resumeData) => ({
        url: "/enhance",
        method: "POST",
        body: resumeData,
      }),
    }),
    generateQuestions: builder.mutation({
      query: (skill) => ({
        url: "/Questions",
        method: "POST",
        body: { skill },
      }),
    }),
    generateHRFriendlyAnswer: builder.mutation({
      query: (question) => ({
        url: "/QnA",
        method: "POST",
        body: { question },
      }),
    }),
    beautifyAnswer: builder.mutation({
      query: (answer) => ({
        url: "/beautify",
        method: "POST",
        body: {answer},
      }),
    }),
  }),
});

export const {
  useEnhanceResumeMutation,
  useGenerateQuestionsMutation,
  useGenerateHRFriendlyAnswerMutation,
  useBeautifyAnswerMutation,
} = aiApi;
