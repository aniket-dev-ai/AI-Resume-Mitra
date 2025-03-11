import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBeautifyAnswerMutation,
  useGenerateHRFriendlyAnswerMutation,
} from "../Features/Api/AiApi";

const Answer = () => {
  const navigate = useNavigate();
  const { Question } = useParams();

  const [generateHRFriendlyAnswer, { data: QNAData, isLoading, isError }] =
    useGenerateHRFriendlyAnswerMutation();

  useEffect(() => {
    if (Question) generateHRFriendlyAnswer(Question);
  }, [Question, generateHRFriendlyAnswer]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-yellow-50 to-orange-100 p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-8 border border-orange-300 transition-all duration-300 hover:shadow-2xl">
        
        {isLoading && (
          <p className="text-center text-orange-500 text-lg animate-pulse">
            ⏳ Generating HR-friendly answer...
          </p>
        )}

        {isError && (
          <p className="text-center text-red-500 text-lg">
            ❌ Failed to fetch answer. Try again later.
          </p>
        )}

        {QNAData?.htmlFormattedAnswer && (
          <>
            <h2 className="text-3xl font-bold text-orange-700 mb-4">
              📝 {QNAData?.question}
            </h2>
            <div
              className="text-gray-800 text-lg leading-relaxed border-l-4 border-orange-500 pl-4"
              dangerouslySetInnerHTML={{ __html: QNAData.htmlFormattedAnswer }}
            />
          </>
        )}

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-orange-500 text-white text-lg px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md"
        >
          🔙 Go Back
        </button>
      </div>
    </div>
  );
};

export default Answer;
