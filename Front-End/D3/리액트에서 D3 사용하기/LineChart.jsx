import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./lineChart.css";

export default function LineChart() {
  const sampleData = [100, 10, 30, 50, 10, 70, 200, 90];
  const lineChart = useRef();

  useEffect(() => {
    const svg = d3.select(lineChart.current);
    sampleData.forEach((data, index) => {
      svg
        .append("rect")
        .attr("height", data)
        .attr("width", 30)
        .attr("x", 40 * index + 100) //막대 생성좌표 x 막대의 좌측
        .attr("y", 300 - data + 100); //막대 생성 좌표 y 막대의 윗부분
    });
  }, []);

  return (
    <div>
      <svg width="500" height="500" ref={lineChart} />
    </div>
  );
}
