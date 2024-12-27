/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import * as d3 from "d3";

function LineGraph({ title, data }) {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 50 };

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.timestamp)))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => x(new Date(d.timestamp)))
      .y((d) => y(+d.value));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [data]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <svg ref={chartRef} width="600" height="200"></svg>
    </div>
  );
}

export default LineGraph;
