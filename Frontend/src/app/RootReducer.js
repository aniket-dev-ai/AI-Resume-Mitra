import { combineReducers } from "redux";
import authReducer from "../feature/authSlice";
import resumeReducer from "../feature/resumeSlice";
import aiReducer from "../Features/Slices/aiSlice"; // ✅ Changed "Ai" to "ai"

const rootReducer = combineReducers({
  auth: authReducer,
  resume: resumeReducer,
  ai: aiReducer,
});

export default rootReducer;
