import { useEffect } from "react";
import { useGetresumesDetailsQuery } from "../Features/Api/resumesApi";
import { useEnhanceResumeMutation } from "../Features/Api/AiApi";

const AIResumePage = () => {
  const { data, isError } = useGetresumesDetailsQuery();
  const [enhanceResume, { data: resume, isLoading: isEnhancing, error }] =
    useEnhanceResumeMutation();

  useEffect(() => {
    if (data) enhanceResume(data);
  }, [data]);

  useEffect(() => {
    if (resume) console.log("Enhanced Resume: ", resume);
  }, [resume]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-yellow-500 flex justify-center items-center px-4 py-6">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* 🛠 Handling States */}
        {isEnhancing && (
          <div className="flex justify-center items-center h-96 w-full">
            <p className="text-white text-xl md:text-2xl animate-pulse">Enhancing Resume... ⏳</p>
          </div>
        )}
        {(isError || error) && (
          <div className="flex justify-center items-center h-96 w-full">
            <p className="text-red-500 text-xl md:text-2xl">❌ Failed to enhance resume</p>
          </div>
        )}
        {!resume && !isEnhancing && (
          <p className="text-gray-500 text-lg md:text-xl p-6 text-center w-full">No resume data available.</p>
        )}

        {/* 📜 AI Enhanced Resume */}
        {resume && (
          <>
            <div className="bg-white shadow-md rounded-lg p-5 border border-gray-300 transition-all hover:scale-[1.02]">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 text-center mb-3">
                📜 AI Enhanced Resume
              </h2>
              <div className="space-y-3 text-gray-800 text-sm md:text-base">
                <p><strong>📛 Name:</strong> {resume?.name || "N/A"}</p>
                <p><strong>📧 Email:</strong> {resume?.contactDetails?.email || "N/A"}</p>
                <p><strong>📞 Phone:</strong> {resume?.contactDetails?.phone || "N/A"}</p>
                <p><strong>🎓 Education:</strong> {resume?.education?.degree || "N/A"} from {resume?.education?.university || "N/A"}</p>
                <p><strong>💡 Skills:</strong> {resume?.skills?.join(", ") || "N/A"}</p>
                <p><strong>🏢 Experience:</strong> {resume?.experience || "No experience"}</p>
              </div>
            </div>

            {/* 🤖 AI Analysis & Suggestions */}
            <div className="bg-white shadow-md rounded-lg p-5 border border-blue-400 transition-all hover:scale-[1.02]">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-3">
                🤖 AI Feedback & Score
              </h2>
              <div className="space-y-3 text-gray-800 text-sm md:text-base">
                <p><strong>📜 Summary:</strong> {resume?.summary || "No summary available"}</p>
                <p><strong>🔍 AI Feedback:</strong> <span className="text-orange-500 font-semibold">{resume?.feedback || "No feedback"}</span></p>
                <p><strong>🎯 Resume Score:</strong> <span className="font-bold text-green-600">{resume?.score || "N/A"}/10</span></p>
                <p><strong>💰 Salary Estimate:</strong> <span className="font-bold text-green-600">₹{resume?.salaryEstimate || "N/A"}</span></p>
              </div>
            </div>

            {/* 🚀 Projects Section */}
            <div className="bg-white shadow-md rounded-lg p-5 border border-gray-300">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-600 text-center mb-3">
                🚀 Projects Overview
              </h2>
              <div className="flex flex-col gap-4">
                {resume?.projects?.length > 0 ? (
                  resume.projects.map((project, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 hover:bg-yellow-100 transition-all">
                      <h3 className="text-lg font-bold text-orange-700">{project.title}</h3>
                      <p className="text-gray-700">{project.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center w-full">No projects available.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIResumePage;
