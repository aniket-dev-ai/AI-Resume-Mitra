import { use, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddProjectMutation } from "../Features/Api/ProjectApi";

const AddProject = () => {
  const navigate = useNavigate();
  const courseId = useParams().courseId; // Get courseId from URL params
  const [addProject, { isLoading, error }] = useAddProjectMutation();

  const [projectData, setprojectData] = useState({
    name: "",
    description: "",
    skills: "",
    githubLink: "",
    liveLink: "",
  });

  const handleChange = (e) => {
    setprojectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectData.name || !projectData.description || !projectData.skills) {
      alert("❌ Please fill all required fields");
      return;
    }

    try {
      await addProject({
        courseId, // Pass courseId to
        projectData,
      }).unwrap();
      navigate(-1); // ✅ Redirect after successful submission
    } catch (err) {
      console.error("Error adding project:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-600 to-yellow-500 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-4">
          🏗️ Add New Project
        </h2>
        {error && (
          <p className="text-red-500 text-center">
            {error.data?.message || "Something went wrong!"}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={projectData.skills}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              GitHub Link
            </label>
            <input
              type="url"
              name="githubLink"
              value={projectData.githubLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://github.com/username/project"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Live Link
            </label>
            <input
              type="url"
              name="liveLink"
              value={projectData.liveLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://yourproject.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
