import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Gradient encoding</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# 2019 中央政府歲出（依功能別）

依照 2019 年中央政府總預算（2019app.csv），將各功能別的歲出總額以漸層色彩呈現在折線圖上；顏色與金額對應，讓較高的歲出金額一目了然。`
)}

function _2(Legend,chart){return(
Legend(chart.scales.color, {title: "預算金額（新臺幣元）"})
)}

function _chart(d3,data,DOM)
{
  // Specify the chart’s dimensions.
  const width = 1100;
  const height = 500;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 90;
  const marginLeft = 40;

  // Create the scales.
  const x = d3.scalePoint()
      .domain(data.map(d => d.category))
      .range([marginLeft, width - marginRight])
      .padding(0.5);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.amount)]).nice()
      .range([height - marginBottom, marginTop]);

  const color = d3.scaleSequential(y.domain(), d3.interpolateTurbo);

  // Create the path generator.
  const line = d3.line()
    .curve(d3.curveCatmullRom)
    .defined(d => !isNaN(d.amount))
    .x(d => x(d.category))
    .y(d => y(d.amount));
  
  const formatAmount = d3.format(".2s");
  
  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x))
     .call(g => g.selectAll("text")
        .attr("transform", "rotate(-40)")
        .attr("text-anchor", "end")
        .attr("dx", "-0.6em")
        .attr("dy", "0.2em"))
     .call(g => g.select(".domain").remove());

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).tickFormat(d => formatAmount(d).replace("G", "B")))
      .call(g => g.select(".domain").remove())
     .call(g => g.append("text")
        .attr("x", 0)
        .attr("y", marginTop - 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("預算金額（新臺幣元）"));

  // Append the color gradient.
  const gradient = DOM.uid();
  svg.append("linearGradient")
      .attr("id", gradient.id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height - marginBottom)
      .attr("x2", 0)
      .attr("y2", marginTop)
    .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
    .join("stop")
      .attr("offset", d => d)
      .attr("stop-color", color.interpolator());

  // Append the line.
  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", gradient)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  return Object.assign(svg.node(), {scales: {color}});
}


async function _data(FileAttachment,d3){return(
Object.assign(
  d3.rollups(
    await FileAttachment("2019app.csv").csv({typed: true}),
    v => d3.sum(v, d => d.amount),
    d => d.cat
  ).map(([category, amount]) => ({category, amount}))
   .sort((a, b) => d3.descending(a.amount, b.amount)),
  {description: "2019 中央政府歲出總額（功能別彙總）"}
)
)}

function _6(md){return(
md`資料來自中央政府總預算（2019app.csv），金額單位為新臺幣。圖表將 32 個功能別依歲出金額由大到小排序，便於比較。`
)}

function _7(Plot,data){return(
Plot.line(data, {x: "category", y: "amount", stroke: "amount", curve: "catmull-rom"}).plot({
  nice: true,
  width: 900,
  marginBottom: 80,
  x: {label: "功能別", tickRotate: -40},
  y: {grid: true, label: "預算金額（新臺幣元）"},
  color: {scheme: "turbo"}
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["2019app.csv", {url: new URL("./files/2019app.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["Legend","chart"], _2);
  main.variable(observer("chart")).define("chart", ["d3","data","DOM"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment","d3"], _data);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["Plot","data"], _7);
  return main;
}
