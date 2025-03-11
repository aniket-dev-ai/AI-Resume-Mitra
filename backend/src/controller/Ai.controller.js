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
      name,
      phone,
      email,
      linkedIn,
      github,
      schoolName,
      schoolBoard,
      degree,
      collegeName,
      skills,
      hobbies,
      softSkills,
      certifications,
      projects,
      experience,
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
      ${
        projects?.length > 0
          ? projects
              .map((p, i) => `  ${i + 1}. ${p.title}: ${p.description}`)
              .join("\n")
          : "No projects provided"
      }

      🎯 **Your task:**  
      MAke My Resume ATS friendly and HR friendly.
      - Refine the resume content.
      - Make it **engaging, professional, and structured**.
      - Use **industry-specific key terms** and **HR-friendly language**.

      - Optimize the resume professionally.  
      - Return **ONLY valid JSON**.  
      - No extra text, comments, or explanations.  
      - If JSON can't be generated, return: \`{ "error": "Invalid Data" }\`.  
        1. **Refine the qualification** (50-80 words, engaging yet formal).  
      2. **Enhance skills & soft skills** (more structured & industry-relevant).  
      3. **Make experience sound impactful.**  
      4. **Highlight certifications & projects effectively.**  
      5. **Return JSON output in this exact format:**  
      6. **Give feedback on skills, projects & how to improve the resume feedback hinglish me dena  
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
      model: "gemini-1.5-flash",
      response_format: "json",
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
        return res
          .status(500)
          .json({ msg: "AI response format error", error: finalError.message });
      }
    }

    console.log("✅ AI Resume Parsed Successfully:", jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (error) {
    logError("Failed to enhance resume", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ AI-POWERED SKILLS-BASED INTERVIEW QUESTIONS
export const AISkillsBased30Questions = async (req, res) => {
  console.log("🔵 AI Interview Questions API hit");

  try {
    const { skill } = req.body;
    console.log("🔍 Skill received:", skill);
    // ✅ Input Validation
    if (!skill || typeof skill !== "string") {
      return res.status(400).json({ msg: "Invalid or missing skill input" });
    }

    // ✅ AI Prompt for Gemini
    const prompt = `
      You are an expert technical interviewer. Your task is to generate **30 interview questions** based on the given skill.
      
      Skill: **${skill}**

      🎯 **Your task:**  
      - Generate **30 best interview questions** related to "${skill}".  
      - Questions should be **diverse**, covering **basic, intermediate, and advanced** levels.  
      - The response must be in **JSON format** with **no extra text**.  
      - If the skill is invalid, return: \`{ "error": "Invalid Skill" }\`.  

      Example JSON output:
      \`\`\`json
      {
        "skill": "${skill}",
        "questions": [
          "Q 1 ":"What is ...?",
          "Q 2 ":"How does ... work?",
          "Q 3 ":"Explain ... in detail.",
          "... (total 30 questions)"
        ]
      }
      \`\`\`
    `;

    // ✅ Call Gemini AI with JSON Response
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      response_format: "json",
    });

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response.text();

    console.log("✅ Raw AI Response:", aiResponse);

    // ✅ Clean & Parse AI Response
    let cleanResponse = aiResponse.replace(/```json|```/g, "").trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("❌ AI JSON Parsing Failed. Attempting Cleanup...");

      try {
        cleanResponse = cleanResponse
          .replace(/\n/g, "") // Remove new lines
          .replace(/,\s*}/g, "}") // Fix trailing commas
          .replace(/,\s*\]/g, "]"); // Fix trailing commas in arrays

        jsonResponse = JSON.parse(cleanResponse);
      } catch (finalError) {
        logError("❌ FINAL JSON Parsing Failed", finalError);
        return res
          .status(500)
          .json({ msg: "AI response format error", error: finalError.message });
      }
    }

    console.log("✅ AI Questions Parsed Successfully:", jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (error) {
    logError("Failed to generate interview questions", error);
    res.status(500).json({ msg: "Server error" });
  }
};
export const AIHRFriendlyAnswer = async (req, res) => {
  console.log("🔵 AI Interview Answer API hit");

  try {
    const { question } = req.body;
    console.log("🔍 Question received:", question);

    // ✅ Input Validation
    if (!question || typeof question !== "string") {
      return res.status(400).json({ msg: "Invalid or missing question input" });
    }

    // ✅ Strict AI Prompt
    const prompt = `
You are an **HR-friendly AI interview assistant**. Your task is to return **only a valid JSON object** as an interview answer.

### 📌 **Rules**
- **Strictly return JSON only.** No markdown (\`\`\`json), no extra text.
- The answer must be **structured, professional, and formatted cleanly.**
Strictly answer to this question: "${question}" only
Strictly apni trf a question mt banana
- Answer **must not contain any code** (no Java, Python, etc.).
Strictly make text colorful and of different sizes
answer minimum 400 words and maximum 600 words.
so many heading and subheading and line changes and bullet points.
- Ensure the JSON **has no syntax errors** (e.g., extra commas, unescaped characters).

Return JSON in this format:
{
  "question": "${question}",
  "answer": "A detailed and structured explanation of the topic.",
  "htmlFormattedAnswer": "<div class='bg-gradient-to-b from-yellow-50 to-orange-100 p-6 rounded-lg shadow-lg text-gray-900'>A visually appealing HR-friendly answer.</div>"
}
`;

    // ✅ Call Gemini API
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      response_format: "json",
    });

    const result = await model.generateContent(prompt);
    let aiResponse = await result.response.text();

    console.log("📝 Raw AI Response:", aiResponse);

    // ✅ Step 1: Extract Valid JSON using Regex
    let jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("❌ No JSON found in AI response.");
      return res.status(500).json({ msg: "AI response format error" });
    }

    let cleanResponse = jsonMatch[0]; // Extracted pure JSON

    // ✅ Step 2: Final Cleanup (Remove Escape Characters)
    cleanResponse = cleanResponse
      .replace(/\n/g, " ") // Remove new lines
      .replace(/\t/g, " ") // Remove tabs
      .replace(/,\s*}/g, "}") // Remove trailing commas in objects
      .replace(/,\s*\]/g, "]") // Remove trailing commas in arrays
      .replace(/\\\"/g, '"') // Fix escaped quotes
      .replace(/\\n/g, " ") // Remove escaped new lines
      .replace(/\\t/g, " ") // Remove escaped tabs
      .replace(/\s+/g, " ") // Remove extra spaces
      .trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(cleanResponse);
    } catch (finalError) {
      console.error("❌ FINAL JSON Parsing Failed", finalError);
      return res
        .status(500)
        .json({ msg: "AI response format error", error: finalError.message });
    }

    console.log("✅ AI Answer Parsed Successfully:", jsonResponse);

    // ✅ Step 3: Validate JSON Structure
    if (!jsonResponse.question || !jsonResponse.answer || !jsonResponse.htmlFormattedAnswer) {
      console.error("❌ Missing Required JSON Fields!");
      return res.status(500).json({ msg: "Invalid AI JSON structure" });
    }

    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

 
 




