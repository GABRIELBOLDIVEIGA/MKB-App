import React from "react";
import { createRoot } from "react-dom/client";
import AppProvider from "./AppProvider";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<AppProvider />);
