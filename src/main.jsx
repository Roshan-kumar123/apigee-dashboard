// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import APIMetrices from "./api-metrices-graph/APIMetrices.jsx";

// const apiData = [
//   { timestamp: 1733702400000, value: "23.333333333333332" },
//   { timestamp: 1733616000000, value: "15.500000000000004" },
//   { timestamp: 1733443200000, value: "24.75" },
//   { timestamp: 1733356800000, value: "21.289473684210524" },
//   { timestamp: 1733270400000, value: "18.02857142857143" },
//   { timestamp: 1733184000000, value: "27.571428571428573" },
//   { timestamp: 1733097600000, value: "63.90909090909092" },
//   { timestamp: 1732579200000, value: "27.6" },
//   { timestamp: 1732492800000, value: "475.5" },
//   { timestamp: 1732233600000, value: "71.0" },
//   { timestamp: 1731974400000, value: "290.3333333333333" },
//   { timestamp: 1731542400000, value: "76.4" },
// ];

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//     <h1>API Metrics Visualization</h1>
//     <APIMetrices data={apiData} />
//   </StrictMode>
// );

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import APIMetrices from "./api-metrices-graph/APIMetrices.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//     <h1>API Metrics Visualization</h1>
//     <APIMetrices />
//   </StrictMode>
// );

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Metrices from "./Metrices.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/metrices" element={<Metrices />} />
      </Routes>
    </Router>
  </StrictMode>
);
