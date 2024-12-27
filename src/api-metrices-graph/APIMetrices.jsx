/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const Graphs = ({ data }) => {
//   const lineChartRef = useRef();
//   const areaChartRef = useRef();

//   // Helper: Parse the data into proper Date objects
//   const parseData = () => {
//     return data.map((d) => ({
//       date: new Date(d.timestamp),
//       value: +d.value,
//     }));
//   };

//   // Render Line Chart (Average Transactions)
//   const renderLineChart = () => {
//     const parsedData = parseData();

//     const margin = { top: 20, right: 30, bottom: 30, left: 50 };
//     const width = 600 - margin.left - margin.right;
//     const height = 200 - margin.top - margin.bottom;

//     // Clear previous chart
//     d3.select(lineChartRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(lineChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3
//       .scaleTime()
//       .domain(d3.extent(parsedData, (d) => d.date))
//       .range([0, width]);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(parsedData, (d) => d.value)])
//       .nice()
//       .range([height, 0]);

//     const line = d3
//       .line()
//       .x((d) => x(d.date))
//       .y((d) => y(d.value));

//     // X Axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x));

//     // Y Axis
//     svg.append("g").call(d3.axisLeft(y));

//     // Line
//     svg
//       .append("path")
//       .datum(parsedData)
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-width", 2)
//       .attr("d", line);
//   };

//   // Render Area Chart (Traffic)
//   const renderAreaChart = () => {
//     const parsedData = parseData();

//     const margin = { top: 20, right: 30, bottom: 30, left: 50 };
//     const width = 600 - margin.left - margin.right;
//     const height = 200 - margin.top - margin.bottom;

//     // Clear previous chart
//     d3.select(areaChartRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(areaChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3
//       .scaleTime()
//       .domain(d3.extent(parsedData, (d) => d.date))
//       .range([0, width]);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(parsedData, (d) => d.value)])
//       .nice()
//       .range([height, 0]);

//     const area = d3
//       .area()
//       .x((d) => x(d.date))
//       .y0(height)
//       .y1((d) => y(d.value));

//     // X Axis
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x));

//     // Y Axis
//     svg.append("g").call(d3.axisLeft(y));

//     // Area
//     svg
//       .append("path")
//       .datum(parsedData)
//       .attr("fill", "lightblue")
//       .attr("d", area);

//     // Line on top of the area
//     const line = d3
//       .line()
//       .x((d) => x(d.date))
//       .y((d) => y(d.value));

//     svg
//       .append("path")
//       .datum(parsedData)
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-width", 2)
//       .attr("d", line);
//   };

//   // Render both graphs when component mounts
//   useEffect(() => {
//     renderLineChart();
//     renderAreaChart();
//   }, [data]);

//   return (
//     <div>
//       <h3>Average transactions per second (tps)</h3>
//       <div ref={lineChartRef}></div>
//       <h3>Traffic</h3>
//       <div ref={areaChartRef}></div>
//     </div>
//   );
// };

// export default Graphs;

// import { useEffect, useRef, useState } from "react";
// import * as d3 from "d3";

// // Tabs and Filters
// const TABS = [
//   "Average Transactions",
//   "Traffic",
//   "Error Rate",
//   "Latency",
//   "Success Rate",
// ];
// const FILTERS = ["1 Hour", "3 Hours", "6 Hours"];

// const APIMetrices = ({ data }) => {
//   const lineChartRef = useRef();
//   const areaChartRef = useRef();
//   const [activeTab, setActiveTab] = useState(TABS[0]); // Default active tab
//   const [activeFilter, setActiveFilter] = useState(FILTERS[0]); // Default active filter
//   const [filteredData, setFilteredData] = useState([]);

//   // Parse data and apply filters
//   const parseData = () => {
//     const filtered = data.filter((_, index) => {
//       if (activeFilter === "1 Hour") return index < 4;
//       if (activeFilter === "3 Hours") return index < 8;
//       if (activeFilter === "6 Hours") return index < 12;
//       return true;
//     });

//     return filtered.map((d) => ({
//       date: new Date(d.timestamp),
//       value: +d.value,
//     }));
//   };

//   // Function to render line chart
//   const renderLineChart = () => {
//     const parsedData = parseData();

//     const margin = { top: 20, right: 30, bottom: 30, left: 50 };
//     const width = 600 - margin.left - margin.right;
//     const height = 200 - margin.top - margin.bottom;

//     d3.select(lineChartRef.current).selectAll("*").remove();

//     const svg = d3
//       .select(lineChartRef.current)
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     const x = d3
//       .scaleTime()
//       .domain(d3.extent(parsedData, (d) => d.date))
//       .range([0, width]);

//     const y = d3
//       .scaleLinear()
//       .domain([0, d3.max(parsedData, (d) => d.value)])
//       .nice()
//       .range([height, 0]);

//     const line = d3
//       .line()
//       .x((d) => x(d.date))
//       .y((d) => y(d.value));

//     // X and Y Axes
//     svg
//       .append("g")
//       .attr("transform", `translate(0,${height})`)
//       .call(d3.axisBottom(x));
//     svg.append("g").call(d3.axisLeft(y));

//     // Line Path
//     svg
//       .append("path")
//       .datum(parsedData)
//       .attr("fill", "none")
//       .attr("stroke", "steelblue")
//       .attr("stroke-width", 2)
//       .attr("d", line);
//   };

//   // Updates chart based on tab or filter
//   useEffect(() => {
//     renderLineChart();
//   }, [activeTab, activeFilter]);

//   return (
//     <div className="p-4 bg-gray-100">
//       {/* Tab Navigation */}
//       <div className="flex mb-4">
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 border-b-2 ${
//               activeTab === tab
//                 ? "border-blue-500 text-blue-500"
//                 : "border-transparent text-gray-500"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex mb-4 space-x-4">
//         {FILTERS.map((filter) => (
//           <button
//             key={filter}
//             onClick={() => setActiveFilter(filter)}
//             className={`px-4 py-1 rounded ${
//               activeFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>

//       {/* Graph Container */}
//       <div>
//         <h3 className="text-lg font-semibold mb-2">{activeTab}</h3>
//         <div ref={lineChartRef}></div>
//       </div>
//     </div>
//   );
// };

// export default APIMetrices;

import { useEffect, useRef } from "react";
import * as d3 from "d3";

const apiData = [
  { timestamp: 1733702400000, value: "23.333333333333332" },
  { timestamp: 1733616000000, value: "15.500000000000004" },
  { timestamp: 1733443200000, value: "24.75" },
  { timestamp: 1733356800000, value: "21.289473684210524" },
  { timestamp: 1733270400000, value: "18.02857142857143" },
  { timestamp: 1733184000000, value: "27.571428571428573" },
  { timestamp: 1733097600000, value: "63.90909090909092" },
  { timestamp: 1732579200000, value: "27.6" },
  { timestamp: 1732492800000, value: "475.5" },
  { timestamp: 1732233600000, value: "71.0" },
  { timestamp: 1731974400000, value: "290.3333333333333" },
  { timestamp: 1731542400000, value: "76.4" },
];

const APIMetrics = () => {
  const graphRef = useRef(null);
  const trafficRef = useRef(null);

  // Convert data to a D3-friendly format
  const parsedData = apiData.map((d) => ({
    date: new Date(d.timestamp),
    value: +d.value,
  }));

  useEffect(() => {
    drawGraph(
      graphRef.current,
      parsedData,
      "Average transactions per second (tps)"
    );
    drawTraffic(trafficRef.current, parsedData);
  }, []);

  const drawGraph = (container, data, title) => {
    d3.select(container).selectAll("*").remove();

    const width = 800;
    const height = 200;
    const margin = { top: 30, right: 30, bottom: 30, left: 50 };

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(d.date))
      .y((d) => y(d.value));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#1E90FF")
      .attr("stroke-width", 2)
      .attr("d", line);

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );

    // Y-axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Title
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.top / 2)
      .attr("fill", "black")
      .text(title);
  };

  const drawTraffic = (container, data) => {
    drawGraph(container, data, "Traffic");
  };

  return (
    <div className="p-4 bg-gray-100">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-gray-800">API Metrics</h1>
        <button className="text-blue-500 hover:underline">REFRESH</button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <div className="px-4 py-2 text-blue-500 border-b-2 border-blue-500 font-medium cursor-pointer">
          API PROXY PERFORMANCE
        </div>
        <div className="px-4 py-2 text-gray-500 cursor-pointer">
          ERROR CODE ANALYSIS
        </div>
        <div className="px-4 py-2 text-gray-500 cursor-pointer">
          LATENCY ANALYSIS
        </div>
        <div className="px-4 py-2 text-gray-500 cursor-pointer">
          CACHE PERFORMANCE
        </div>
        <div className="px-4 py-2 text-gray-500 cursor-pointer">
          TARGET PERFORMANCE
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Environment or Hostname
          </label>
          <select className="border p-2 rounded w-48">
            <option>test-env</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Proxy
          </label>
          <select className="border p-2 rounded w-48">
            <option>All</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          {[
            "1 hour",
            "3 hours",
            "6 hours",
            "12 hours",
            "1 day",
            "3 days",
            "7 days",
            "14 days",
          ].map((label) => (
            <button
              key={label}
              className="border px-3 py-1 rounded text-gray-600 hover:bg-gray-200"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Graphs */}
      <div className="bg-white p-4 shadow rounded mb-4">
        <div ref={graphRef}></div>
      </div>
      <div className="bg-white p-4 shadow rounded">
        <div ref={trafficRef}></div>
      </div>
    </div>
  );
};

export default APIMetrics;
