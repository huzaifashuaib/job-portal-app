import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { shadesOfPurple } from "@clerk/themes";

const PUBLISHER_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHER_KEY) {
  throw new Error("Missing Publisher Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHER_KEY}
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
