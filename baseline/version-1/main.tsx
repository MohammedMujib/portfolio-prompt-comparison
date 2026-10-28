import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Version1Page } from "./version1/Version1Page";
import "./base.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Version1Page />
  </StrictMode>,
);
