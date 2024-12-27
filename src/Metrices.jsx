// import { useEffect, useState } from "react";
// import Tabs from "./graphs/Tab";
// import LineGraph from "./graphs/LineGraph";
// import AreaGraph from "./graphs/AreaGraph";
// import DateRangeSelector from "./graphs/DateRangeSelector";
// import "./index.css";

// // Import the JSON file with the request data
// import graphConfigs from "./metrices.json";

// function Metrices() {
//   const [activeTab, setActiveTab] = useState("API_PROXY");
//   const [selectedEnvironment, setSelectedEnvironment] = useState("test-env");
//   const [selectedProxy, setSelectedProxy] = useState("All");
//   const [dateRange, setDateRange] = useState({
//     startDate: null,
//     endDate: null,
//   });
//   const [apiData, setApiData] = useState([]);

//   const apiUrl = "http://18.214.146.236:9090/api/apigee/metrics";

//   // Helper function to format dates
//   const formatDate = (date) => {
//     if (!date) return null;
//     const d = new Date(date);
//     return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
//       .getDate()
//       .toString()
//       .padStart(2, "0")}/${d.getFullYear()} ${d
//       .getHours()
//       .toString()
//       .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
//       .getSeconds()
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   useEffect(() => {
//     const fetchGraphData = async () => {
//       try {
//         const formattedStartDate = formatDate(dateRange.startDate);
//         const formattedEndDate = formatDate(dateRange.endDate);

//         // Map activeTab values to corresponding config keys
//         const configMapping = {
//           API_PROXY: "apiProxy",
//           ERROR_CODE: "errorCode",
//           LATENCY: "latency",
//           CACHE: "cache",
//           TARGET: "target",
//         };

//         // Determine the current config based on the activeTab
//         const currentConfigKey =
//           configMapping[activeTab] || configMapping["API_PROXY"];
//         const currentConfigs = graphConfigs[currentConfigKey];

//         // Prepare request bodies dynamically
//         const updatedConfigs = currentConfigs?.map((config) => {
//           const updatedConfig = { ...config };
//           updatedConfig.requestBody = {
//             ...config.requestBody,
//             startDate: formattedStartDate || config.requestBody.startDate,
//             endDate: formattedEndDate || config.requestBody.endDate,
//           };
//           return updatedConfig;
//         });

//         // Fetch data for each configuration
//         const responses = await Promise.all(
//           updatedConfigs.map(async (config) => {
//             const response = await fetch(apiUrl, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization:
//                   "Bearer eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJwRG8xUFY4dzFJUmh0VVBiWTVKNUdvZWNKeHRjVnhOdmFhZFdVZ21XTzZ4cXRLa00iLCJpc3MiOiJodHRwczovLzM0LjguNDMuMjMyLm5pcC5pby9vYXV0aDItY2MiLCJleHAiOjE3MzQwOTU1MjIsImlhdCI6MTczNDA5MTkyMiwianRpIjoiODA3NzE2M2YtYzBjMS00ODY3LThlODUtZGYzYzk3MDZiYTFiIiwiY2xpZW50X2lkIjoicERvMVBWOHcxSVJodFVQYlk1SjVHb2VjSnh0Y1Z4TnZhYWRXVWdtV082eHF0S2tNIn0.u3JTNF-DPfaQKtYpxqS1ByaudfGJGy-tUrIyabLp67DUzkWxfLGqJ8UggqIkWLh7zR5gulJW4Sk-jEzr0RUh2RLgFgsyn_Uy_CbozwcsrAWnnumLlqtR5zTmOZEEzuIqzXZqRxZANGuvFc2xAnj94UASeccBT83ZfAM8hU3vnLXq1eWoHdmOKZvINf6oyse3imXMn7jEeDU0sdv1hrQcrlv639ja8vdquhD3FIv8TiqZ127ofhBMvP1gbB9ZT7OHm1nv4sYI2G3DHl7F8BUj7RLSQ7bwceL2UuEhlJHUK_7WYVEW4W4Op-CCNNOS_fMNwUSpIbN6iFNUuzDi5nyLnQ",
//               },
//               body: JSON.stringify(config.requestBody),
//             });
//             const json = await response.json();
//             return {
//               title: config.title,
//               visibility: config.visibility,
//               data:
//                 json?.environments?.[0]?.dimensions?.[0]?.metrics?.[0]
//                   ?.values || [],
//             };
//           })
//         );
//         setApiData(responses);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchGraphData();
//   }, [activeTab, dateRange]); // Re-run whenever dateRange changes

//   const renderContent = () => {
//     switch (activeTab) {
//       case "API_PROXY":
//         return apiData
//           .filter((config) => config.visibility)
//           .map((config, index) => (
//             <div key={index}>
//               <LineGraph title={config.title} data={config.data} />
//             </div>
//           ));
//       case "ERROR_CODE":
//         return apiData
//           .filter((config) => config.visibility)
//           .map((config, index) => (
//             <div key={index}>
//               <AreaGraph title="Error Traffic Analysis" data={config.data} />
//             </div>
//           ));
//       case "LATENCY":
//         return apiData
//           .filter((config) => config.visibility)
//           .map((config, index) => (
//             <div key={index}>
//               <AreaGraph title="Latency Traffic Analysis" data={config.data} />
//             </div>
//           ));
//       case "CACHE":
//         return apiData
//           .filter((config) => config.visibility)
//           .map((config, index) => (
//             <div key={index}>
//               <AreaGraph title="Cache Traffic Analysis" data={config.data} />
//             </div>
//           ));
//       case "TARGET":
//         return apiData
//           .filter((config) => config.visibility)
//           .map((config, index) => (
//             <div key={index}>
//               <AreaGraph title="Target Traffic Analysis" data={config.data} />
//             </div>
//           ));
//       default:
//         return <p>No data available</p>;
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">API Metrics</h1>
//       <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="flex gap-4 mt-4">
//         <div>
//           <label className="block text-gray-600 text-sm mb-1">
//             Environment or Hostname
//           </label>
//           <select
//             value={selectedEnvironment}
//             onChange={(e) => setSelectedEnvironment(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2"
//           >
//             <option value="test-env">test-env</option>
//             <option value="production">production</option>
//             <option value="staging">staging</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-gray-600 text-sm mb-1">Proxy</label>
//           <select
//             value={selectedProxy}
//             onChange={(e) => setSelectedProxy(e.target.value)}
//             className="border border-gray-300 rounded px-3 py-2"
//           >
//             <option value="All">All</option>
//             <option value="Proxy1">Proxy1</option>
//             <option value="Proxy2">Proxy2</option>
//           </select>
//         </div>
//       </div>

//       <DateRangeSelector setDateRange={setDateRange} />

//       <div className="bg-white p-4 shadow-md rounded-md mt-4">
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default Metrices;

// ------------------------- addd loader --------------------------------//

import { useEffect, useState } from "react";
import Tabs from "./graphs/Tab";
import LineGraph from "./graphs/LineGraph";
import AreaGraph from "./graphs/AreaGraph";
import DateRangeSelector from "./graphs/DateRangeSelector";
import "./index.css";

// Import the JSON file with the request data
import graphConfigs from "./metrices.json";

function Metrices() {
  const [activeTab, setActiveTab] = useState("API_PROXY");
  const [selectedEnvironment, setSelectedEnvironment] = useState("test-env");
  const [selectedProxy, setSelectedProxy] = useState("All");
  const [proxyList, setProxyList] = useState([]); // State for proxy list
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [apiData, setApiData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading for each graph
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://18.214.146.236:9090/api/apigee/metrics";

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, "0")}/${d
      .getDate()
      .toString()
      .padStart(2, "0")}/${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const formattedStartDate = formatDate(dateRange.startDate);
        const formattedEndDate = formatDate(dateRange.endDate);

        const configMapping = {
          API_PROXY: "apiProxy",
          ERROR_CODE: "errorCode",
          LATENCY: "latency",
          CACHE: "cache",
          TARGET: "target",
        };

        const currentConfigKey =
          configMapping[activeTab] || configMapping["API_PROXY"];
        const currentConfigs = graphConfigs[currentConfigKey];

        const updatedConfigs = currentConfigs?.map((config) => {
          const updatedConfig = { ...config };
          updatedConfig.requestBody = {
            ...config.requestBody,
            startDate: formattedStartDate || config.requestBody.startDate,
            endDate: formattedEndDate || config.requestBody.endDate,
          };
          return updatedConfig;
        });

        // Set loading state for each graph
        const initialLoadingStates = updatedConfigs.reduce(
          (acc, config, index) => {
            acc[index] = true;
            return acc;
          },
          {}
        );
        setLoadingStates(initialLoadingStates);

        const responses = await Promise.all(
          updatedConfigs.map(async (config, index) => {
            try {
              const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "Bearer eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJwRG8xUFY4dzFJUmh0VVBiWTVKNUdvZWNKeHRjVnhOdmFhZFdVZ21XTzZ4cXRLa00iLCJpc3MiOiJodHRwczovLzM0LjguNDMuMjMyLm5pcC5pby9vYXV0aDItY2MiLCJleHAiOjE3MzQwOTU1MjIsImlhdCI6MTczNDA5MTkyMiwianRpIjoiODA3NzE2M2YtYzBjMS00ODY3LThlODUtZGYzYzk3MDZiYTFiIiwiY2xpZW50X2lkIjoicERvMVBWOHcxSVJodFVQYlk1SjVHb2VjSnh0Y1Z4TnZhYWRXVWdtV082eHF0S2tNIn0.u3JTNF-DPfaQKtYpxqS1ByaudfGJGy-tUrIyabLp67DUzkWxfLGqJ8UggqIkWLh7zR5gulJW4Sk-jEzr0RUh2RLgFgsyn_Uy_CbozwcsrAWnnumLlqtR5zTmOZEEzuIqzXZqRxZANGuvFc2xAnj94UASeccBT83ZfAM8hU3vnLXq1eWoHdmOKZvINf6oyse3imXMn7jEeDU0sdv1hrQcrlv639ja8vdquhD3FIv8TiqZ127ofhBMvP1gbB9ZT7OHm1nv4sYI2G3DHl7F8BUj7RLSQ7bwceL2UuEhlJHUK_7WYVEW4W4Op-CCNNOS_fMNwUSpIbN6iFNUuzDi5nyLnQ",
                },
                body: JSON.stringify(config.requestBody),
              });
              const json = await response.json();

              // Update loading state for the specific graph
              setLoadingStates((prevState) => ({
                ...prevState,
                [index]: false,
              }));

              return {
                title: config.title,
                visibility: config.visibility,
                data:
                  json?.environments?.[0]?.dimensions?.[0]?.metrics?.[0]
                    ?.values || [],
              };
            } catch (error) {
              console.error(`Error fetching data for graph ${index}:`, error);

              // Still mark the graph as not loading to avoid indefinite loaders
              setLoadingStates((prevState) => ({
                ...prevState,
                [index]: false,
              }));

              return null;
            }
          })
        );

        setApiData(responses.filter(Boolean)); // Filter out null responses
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGraphData();
  }, [activeTab, dateRange]);

  // useEffect(() => {
  //   const fetchProxy = async () => {
  //     const proxyUrl = "http://18.214.146.236:9090/api/apigee/listProxies";
  //     try {
  //       const response = await fetch(proxyUrl, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization:
  //             "Bearer eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJwRG8xUFY4dzFJUmh0VVBiWTVKNUdvZWNKeHRjVnhOdmFhZFdVZ21XTzZ4cXRLa00iLCJpc3MiOiJodHRwczovLzM0LjguNDMuMjMyLm5pcC5pby9vYXV0aDItY2MiLCJleHAiOjE3MzUxOTgwNzMsImlhdCI6MTczNTE5NDQ3MywianRpIjoiOWY1YmVhYzAtMGZjOC00MzQzLTgwZGItMDg1YTE0N2Y1NDRlIiwiY2xpZW50X2lkIjoicERvMVBWOHcxSVJodFVQYlk1SjVHb2VjSnh0Y1Z4TnZhYWRXVWdtV082eHF0S2tNIn0.P89gZH9vj17VixY1NI0aA9kxfgSyo95bmd4l0nQHNehCBDdWaEx01AS0BTUtnSDMx9qJRFnHSQmWl-ulRdeLlNtKq7luqzrCDSlF5cFXs8dlECUm8y56grKYctCkbW5d1VOWo_vHIuQ8kxjg1U9qQnzg7QbMt5F-5PiFQ_G8BbdsLsyMpivzL9xqz5Js6WNRd1hcgGm_4mT9349V2It8_17xK1sukkwtUsxo9iWyHF0uiLYsFWvJUdpZKBQ4B1SApckI94V9_1F_BmkRIrlKhd_fvCvpNKsGEvvAIinsaZ7X2LDgnejwWP5EYBqHW8F8KEAJ1QkR-Ru8oMjdmerkRQ",
  //         },
  //       });
  //       const json = await response.json();
  //       console.log(json);
  //     } catch (e) {
  //       console.error("Error fetching proxy data:", e);
  //     }
  //   };
  //   fetchProxy();
  // }, []);

  const proxyApiUrl = "http://18.214.146.236:9090/api/apigee/listProxies";

  useEffect(() => {
    const fetchProxy = async () => {
      try {
        const response = await fetch(proxyApiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJwRG8xUFY4dzFJUmh0VVBiWTVKNUdvZWNKeHRjVnhOdmFhZFdVZ21XTzZ4cXRLa00iLCJpc3MiOiJodHRwczovLzM0LjguNDMuMjMyLm5pcC5pby9vYXV0aDItY2MiLCJleHAiOjE3MzUxOTgwNzMsImlhdCI6MTczNTE5NDQ3MywianRpIjoiOWY1YmVhYzAtMGZjOC00MzQzLTgwZGItMDg1YTE0N2Y1NDRlIiwiY2xpZW50X2lkIjoicERvMVBWOHcxSVJodFVQYlk1SjVHb2VjSnh0Y1Z4TnZhYWRXVWdtV082eHF0S2tNIn0.P89gZH9vj17VixY1NI0aA9kxfgSyo95bmd4l0nQHNehCBDdWaEx01AS0BTUtnSDMx9qJRFnHSQmWl-ulRdeLlNtKq7luqzrCDSlF5cFXs8dlECUm8y56grKYctCkbW5d1VOWo_vHIuQ8kxjg1U9qQnzg7QbMt5F-5PiFQ_G8BbdsLsyMpivzL9xqz5Js6WNRd1hcgGm_4mT9349V2It8_17xK1sukkwtUsxo9iWyHF0uiLYsFWvJUdpZKBQ4B1SApckI94V9_1F_BmkRIrlKhd_fvCvpNKsGEvvAIinsaZ7X2LDgnejwWP5EYBqHW8F8KEAJ1QkR-Ru8oMjdmerkRQ",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching proxies: ${response.statusText}`);
        }

        const data = await response.json();
        setProxyList(data.proxies || []); // Update state with proxies
      } catch (error) {
        console.error("Error fetching proxy data:", error);
      }
    };

    fetchProxy();
  }, []);

  const renderContent = () => {
    return apiData.map((config, index) => {
      if (loadingStates[index]) {
        // Render loader for graphs that are still loading
        return (
          <div key={index} className="flex justify-center items-center h-32">
            <div className="loader"></div>
          </div>
        );
      }

      if (!config.visibility) return null;

      // Render the graph based on the active tab
      switch (activeTab) {
        case "API_PROXY":
          return (
            <div key={index}>
              <LineGraph title={config.title} data={config.data} />
            </div>
          );
        case "ERROR_CODE":
        case "LATENCY":
        case "CACHE":
        case "TARGET":
          return (
            <div key={index}>
              <AreaGraph title={config.title} data={config.data} />
            </div>
          );
        default:
          return <p key={index}>No data available</p>;
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">API Metrices</h1>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex gap-4 mt-4">
        <div>
          <label className="block text-gray-600 text-sm mb-1">
            Environment or Hostname
          </label>
          <select
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="test-env">test-env</option>
            <option value="production">production</option>
            <option value="staging">staging</option>
          </select>
        </div>
        {/* <div>
          <label className="block text-gray-600 text-sm mb-1">Proxy</label>
          <select
            value={selectedProxy}
            onChange={(e) => setSelectedProxy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="All">All</option>
            <option value="Proxy1">Proxy1</option>
            <option value="Proxy2">Proxy2</option>
          </select>
        </div> */}
        <div>
          <label className="block text-gray-600 text-sm mb-1">Proxy</label>
          <select
            value={selectedProxy}
            onChange={(e) => setSelectedProxy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="All">All</option>
            {proxyList.map((proxy) => (
              <option key={proxy.name} value={proxy.name}>
                {proxy.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DateRangeSelector setDateRange={setDateRange} />

      <div className="bg-white p-4 shadow-md rounded-md mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="loader"></div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
}

export default Metrices;
