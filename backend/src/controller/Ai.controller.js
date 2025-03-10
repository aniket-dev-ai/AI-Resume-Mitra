import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Error Logger Function
const logError = (msg, error) => {
  console.error(`❌ ERROR: ${msg}`, error);
};

// ✅ AI-POWERED RESUME ENHANCEMENT
export const enhanceResume = async (req, res) => {
  console.log("🔵 AI Resume Enhancer API hit");

  try {
    const {
      name, phone, email, linkedIn, github,
      schoolName, schoolBoard, degree, collegeName,
      skills, hobbies, softSkills, certifications,
      projects, experience
    } = req.body;

    // ✅ Validate Input Data
    if (!name || !email || !phone || !degree || !collegeName || !skills) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // ✅ Properly formatted prompt for Gemini AI
    const prompt = `
      You are an expert HR professional and interview coach. Your task is to refine and optimize a resume for the best HR and interview results.
      Here is the candidate's raw data:

      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      LinkedIn: ${linkedIn || "Not provided"}
      GitHub: ${github || "Not provided"}

      Education:
      - School: ${schoolName} (${schoolBoard})
      - Degree: ${degree}
      - College: ${collegeName}

      Skills: ${skills.join(", ")}
      Soft Skills: ${softSkills?.join(", ") || "None"}
      Certifications: ${certifications?.join(", ") || "None"}
      Hobbies: ${hobbies?.join(", ") || "None"}

      Experience: ${experience || "No experience provided"}

      Projects:
      ${projects?.length > 0 ? projects.map((p, i) => `  ${i + 1}. ${p.title}: ${p.description}`).join("\n") : "No projects provided"}

      🎯 **Your task:**  
      - Optimize the resume professionally.  
      - Return **ONLY valid JSON**.  
      - No extra text, comments, or explanations.  
      - If JSON can't be generated, return: \`{ "error": "Invalid Data" }\`.  
        1. **Refine the qualification** (50-80 words, engaging yet formal).  
      2. **Enhance skills & soft skills** (more structured & industry-relevant).  
      3. **Make experience sound impactful.**  
      4. **Highlight certifications & projects effectively.**  
      5. **Return JSON output in this exact format:**  
      6. **Give feedback on skills, projects & how to improve the resume.**  
      7. **Judge the resume and give a score out of 10.**  
      8. **Give a professional summary of the resume.**  
      9. **Summarize projects & skills.**  
      10. **Estimate the expected salary in INR.**  

      Example JSON:
      \`\`\`json
      {
        "name": "...",
        "contactDetails": {
          "phone": "...",
          "email": "...",
          "linkedIn": "...",
          "github": "..."
        },
        "ContactDetailssummary": "...",
        "qualification": "...",
        "education": "...",
        "skills": [...],
        "softSkills": [...],
        "certifications": [...],
        "hobbies": [...],
        "experience": "...",
        "projects": [
          {
            "title": "...",
            "description": "..."
          }
        ],
        "feedback": "...",
        "score": "...",
        "summary": "...",
        "projectsSummary": "...",
        "skillsSummary": "...",
        "salaryEstimate": "..."
      }
      \`\`\`
    `;

    // ✅ Gemini API Call
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      response_format: "json"
    });

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response.text();

    console.log("✅ Raw AI Response:", aiResponse);

    // ✅ Clean & Parse AI Response
    let cleanResponse = aiResponse
      .replace(/```json|```/g, "") // Remove unnecessary markdown formatting
      .trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("❌ AI JSON Parsing Failed. Attempting Cleanup...");

      try {
        cleanResponse = cleanResponse
          .replace(/\n/g, "") // Remove new lines
          .replace(/,\s*}/g, "}") // Fix trailing commas in objects
          .replace(/,\s*\]/g, "]"); // Fix trailing commas in arrays

        jsonResponse = JSON.parse(cleanResponse);
      } catch (finalError) {
        logError("❌ FINAL JSON Parsing Failed", finalError);
        return res.status(500).json({ msg: "AI response format error", error: finalError.message });
      }
    }

    console.log("✅ AI Resume Parsed Successfully:", jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (error) {
    logError("Failed to enhance resume", error);
    res.status(500).json({ msg: "Server error" });
  }
};
