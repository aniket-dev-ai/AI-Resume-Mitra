import { useState } from "react";
import { useEnhanceResumeMutation } from "../Features/Api/AiApi"; // API call

const ResumePreparation = () => {
  const [resumeText, setResumeText] = useState("");
  const [enhanceResume, { data, isLoading }] = useEnhanceResumeMutation();

  const handleSubmit = async () => {
    if (!resumeText) return alert("Enter resume text!");
    await enhanceResume({ text: resumeText });
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-lg text-center">
      <h2 className="text-xl font-semibold text-orange-600">Enhance Your Resume</h2>
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        className="mt-3 border p-2 w-full"
        placeholder="Paste your resume text here..."
      ></textarea>
      <button onClick={handleSubmit} className="mt-3 bg-orange-500 text-white px-4 py-2 rounded">
        Enhance Resume
      </button>
      {isLoading && <p>Enhancing...</p>}
      {data && <p className="mt-3 text-green-600">Enhanced Resume: {data.enhancedText}</p>}
    </div>
  );
};

export default ResumePreparation;
