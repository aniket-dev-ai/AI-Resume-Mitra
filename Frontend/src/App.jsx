import { Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Components/HomePage";
import ResumeSubmit from "./Components/ResumeSubmit";
import ShowResumePage from "./Components/ShowResumePage";
import ResumePreparation from "./Components/ResumePreparation";
import AuthSection from "./Components/AuthSection"; 
import AIResumePage from "./Components/AiResume"; 
import AddProject from "./Components/AddProjectPage";
import SkillsQna from "./Components/SKillsQna"; 
import Answer from "./Components/Answer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Auth" element={<AuthPage />} />
      <Route path="/SubmitResume" element={<ResumeSubmit />} />
      <Route path="/ResumePreparation" element={<ResumePreparation />} /> 
      <Route path="/ShowResumePage" element={<ShowResumePage />} />
      <Route path="/AuthSection" element={<AuthSection />} />
      <Route path="/ai-resume" element={<AIResumePage />} />
      <Route path="/add-project/:courseId" element={<AddProject />} />
      <Route path="/Qna/:skill" element={<SkillsQna/>} />
      <Route path="/Answer/:Question" element={<Answer/>} />
    </Routes>
  );
}

export default App;
