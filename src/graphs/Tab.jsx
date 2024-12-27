/* eslint-disable react/prop-types */

function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "API_PROXY", name: "API Proxy Performance" },
    { id: "ERROR_CODE", name: "Error Code Analysis" },
    { id: "LATENCY", name: "Latency Analysis" },
    { id: "CACHE", name: "Cache Performance" },
    { id: "TARGET", name: "Target Performance" },
  ];

  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 ${
            activeTab === tab.id
              ? "text-blue-500 border-b-2 border-blue-500 font-semibold"
              : "text-gray-600"
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
