import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGenerateQuestionsMutation } from "../Features/Api/AiApi";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../Features/Slices/aiSlice";

const SkillsQna = () => {
  const { skill } = useParams();
  const dispatch = useDispatch();

  // Redux se stored questions fetch kar rahe hain
    const storedQuestions = useSelector((state) => state.ai.questions[skill] || []);
    

  // API call setup
  const [generateQuestions, { data: skillsQuestions, isLoading, isError }] =
    useGenerateQuestionsMutation();

  useEffect(() => {
    if (skill && storedQuestions.length === 0) {
      generateQuestions(skill );
    }
  }, [skill, storedQuestions.length, generateQuestions]);

  // ✅ API response aane par Redux me store karo
  useEffect(() => {
    if (skillsQuestions?.questions) {
      dispatch(setQuestions({ skill, questions: skillsQuestions.questions }));
    }
  }, [skillsQuestions, dispatch, skill]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-6">
          🧠 {skill} - Top 30 Interview Questions
        </h2>

        {/* ✅ Loading State */}
        {isLoading && storedQuestions.length === 0 && (
          <p className="text-center text-orange-500 text-lg animate-pulse">
            ⏳ Generating questions...
          </p>
        )}

        {/* ❌ Error Handling */}
        {isError && storedQuestions.length === 0 && (
          <p className="text-center text-red-500 text-lg">
            ❌ Failed to generate questions. Try again later.
          </p>
        )}

        {/* ✅ Show Questions */}
        {(storedQuestions.length > 0 || skillsQuestions?.questions) && (
          <ul className="space-y-4">
            {(storedQuestions.length > 0 ? storedQuestions : skillsQuestions.questions).map(
              (question, index) => (
                <li
                  key={index}
                  className="bg-white border border-orange-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <Link
                    to={`/Answer/${question}`}
                    className="text-orange-600 font-medium hover:text-orange-800 transition-colors duration-200"
                  >
                    {index + 1}. {question}
                  </Link>
                </li>
              )
            )}
          </ul>
        )}

        {/* 🔍 No Questions Found */}
        {storedQuestions.length === 0 &&
          skillsQuestions?.questions?.length === 0 && (
            <p className="text-center text-gray-600 text-lg">
              No questions found for {skill}.
            </p>
          )}
      </div>
    </div>
  );
};

export default SkillsQna;
