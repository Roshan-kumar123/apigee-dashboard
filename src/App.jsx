/* eslint-disable react/prop-types */
// App.js
import {
  FiTrendingUp,
  FiAlertTriangle,
  FiClock,
  FiBook,
  FiSearch,
  // FiTarget,
  FiLayers,
} from "react-icons/fi";

function DashboardCard({ icon: Icon, title, value, subitems, footer }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white h-[300px]">
      <div className="flex justify-between items-center">
        <Icon className="text-gray-400 text-2xl" />
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      </div>
      <div className="text-2xl font-semibold text-gray-800 mt-2 flex justify-end">
        {value}
      </div>
      <hr className="my-2 border-gray-200" />
      <ul className="mt-2 text-sm text-blue-600">
        {subitems.map((item, index) => (
          <>
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.value}</span>
            </li>
            <hr className="my-2 border-gray-200" />
          </>
        ))}
      </ul>
      {footer && (
        <div className="mt-20 text-sm text-blue-500 cursor-pointer flex justify-center">
          {footer}
        </div>
      )}
    </div>
  );
}

function DashboardLinkCard({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center p-4 border rounded-lg bg-white shadow-sm h-[250px]">
      <Icon className="text-gray-400 text-3xl mb-2" />
      <span className="text-gray-500 font-medium">{title}</span>
      <p className="text-sm text-center text-gray-600 mt-2">{description}</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">API Monitoring</h1>
        <p className="text-gray-600 text-sm">
          Last hour for apigee-pinpoint:{" "}
          <span className="text-blue-500">prod</span>
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Cards */}
        <DashboardCard
          icon={FiTrendingUp}
          title="Total Traffic"
          value="136.486 TPS"
          subitems={[
            { name: "perfBenchmark_invalid_v1", value: "78.428" },
            { name: "perfBenchmark_v1", value: "46.387" },
          ]}
          footer="View all"
        />
        <DashboardCard
          icon={FiAlertTriangle}
          title="Error Rate"
          value="54.747%"
          subitems={[
            { name: "perfBenchmark_invalid_v1", value: "80.393" },
            { name: "perfBenchmark_v1", value: "0.020" },
          ]}
          footer="View all"
        />
        <DashboardCard
          icon={FiClock}
          title="Top Proxy Latency P99"
          value="114 ms"
          subitems={[
            { name: "perfBenchmark_invalid_v1", value: "114" },
            { name: "perfBenchmark_v1", value: "89" },
          ]}
          footer="View all"
        />
        <DashboardCard
          icon={FiAlertTriangle}
          title="Alerts"
          value="109"
          subitems={[
            { name: "Collection Alert", value: "20" },
            { name: "Test New Format of Alert", value: "10" },
          ]}
          footer="View all"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-6">
        {/* Bottom links */}
        <DashboardLinkCard
          icon={FiClock}
          title="Recent"
          description="Track anomalies for the last hour"
        />
        <DashboardLinkCard
          icon={FiBook}
          title="Timeline"
          description="View trends history for context"
        />
        <DashboardLinkCard
          icon={FiSearch}
          title="Investigate"
          description="Drilldown and diagnose from logs"
        />
        <DashboardLinkCard
          icon={FiAlertTriangle}
          title="Alerts"
          description="Configure alerts and get notified of issues"
        />
        <DashboardLinkCard
          icon={FiLayers}
          title="Collections"
          description="Create Collection to monitor group of proxies and targets"
        />
      </div>
    </div>
  );
}

export default Dashboard;
