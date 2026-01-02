import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import GlassButton from "./components/ui/GlassButton";
import GlassInput from "./components/ui/GlassInput";
import GlassCard from "./components/ui/GlassCard";
import { cn } from "./utils/utils";
import { Button } from "./components/ui/Button";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
