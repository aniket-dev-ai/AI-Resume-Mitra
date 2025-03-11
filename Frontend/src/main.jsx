import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ React Router for navigation
import { Provider } from "react-redux"; // ✅ Redux Provider
import { Toaster } from "react-hot-toast"; // ✅ Toaster for notifications
import store, { persistor } from "./app/Store"; // ✅ Import Redux store
import App from "./App";
import "./index.css"; // ✅ Tailwind CSS Import
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" reverseOrder={false} />{" "}
          {/* ✅ Toast notifications */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
