// /* eslint-disable react/prop-types */

// function DateRangeSelector({ setDateRange }) {
//   const ranges = [
//     { label: "1 hour", days: 0.041 },
//     { label: "3 hours", days: 0.125 },
//     { label: "6 hours", days: 0.25 },
//     { label: "12 hours", days: 0.5 },
//     { label: "1 day", days: 1 },
//     { label: "3 days", days: 3 },
//     { label: "7 days", days: 7 },
//     { label: "14 days", days: 14 },
//     { label: "Custom", days: null },
//   ];

//   const handleRangeSelect = (days) => {
//     if (days !== null) {
//       const endDate = new Date();
//       const startDate = new Date();
//       startDate.setDate(startDate.getDate() - days);
//       setDateRange({ startDate: startDate, endDate: endDate });
//     } else {
//       setDateRange({ startDate: null, endDate: null }); // For custom logic
//     }
//   };

//   return (
//     <div className="flex gap-4 mt-4">
//       {ranges.map((range) => (
//         <button
//           key={range.label}
//           onClick={() => handleRangeSelect(range.days)}
//           className="text-sm text-gray-600 px-3 py-1 border rounded hover:bg-gray-200"
//         >
//           {range.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default DateRangeSelector;

/* eslint-disable react/prop-types */
import { useState } from "react";

function DateRangeSelector({ setDateRange }) {
  const ranges = [
    { label: "1 hour", days: 0.041 },
    { label: "3 hours", days: 0.125 },
    { label: "6 hours", days: 0.25 },
    { label: "12 hours", days: 0.5 },
    { label: "1 day", days: 1 },
    { label: "3 days", days: 3 },
    { label: "7 days", days: 7 },
    { label: "14 days", days: 14 },
    { label: "Custom", days: null },
  ];

  const [activeRange, setActiveRange] = useState(null);

  const handleRangeSelect = (range) => {
    setActiveRange(range.label); // Track the selected range
    if (range.days !== null) {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - range.days);
      setDateRange({ startDate: startDate, endDate: endDate });
    } else {
      setDateRange({ startDate: null, endDate: null }); // For custom logic
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      {ranges.map((range) => (
        <button
          key={range.label}
          onClick={() => handleRangeSelect(range)}
          className={`text-sm px-3 py-1 border rounded transition-colors duration-200 ${
            activeRange === range.label
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}

export default DateRangeSelector;
