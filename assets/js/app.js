// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 100,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select scatter, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from csv file
d3.csv("assets/data/data.csv").then(function(stateData) {
    //console.log(stateData);

// Cast the age value to a number for each piece of stateData
    stateData.forEach(function(data){
        data.age = +data.age;
        data.smokes = +data.smokes;
    });

// Scales for axis
var xScale = d3.scaleLinear()
.domain(d3.extent(stateData, d => d.age))
.range([0, chartWidth])
.nice();

var yScale = d3.scaleLinear()
.domain([6,d3.max(stateData, d => d.smokes)])
.range([chartHeight, 0])
.nice();

// Axis variables
var yAxis = d3.axisLeft(yScale);
var xAxis = d3.axisBottom(xScale);

// Set x to the bottom of the chart set y to y axis
chartGroup.append("g")
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(xAxis);

chartGroup.append("g")
  .call(yAxis);

 // Add plots
 chartGroup.selectAll("circle")
 .data(stateData)
 .enter()
 .append("circle")
   .attr("cx", d=>xScale(d.age))
   .attr("cy", d=>yScale(d.smokes))
   .attr("r", "10")
   .style("fill", "#69b3a2")

// Add texts for datapoints
   chartGroup.append("g")
   .selectAll('text')
   .data(stateData)
   .enter()
   .append("text")
   .text(d=>d.abbr)
   .attr("x",d=>xScale(d.age))
   .attr("y",d=>yScale(d.smokes))
   .classed(".stateText", true)
   .attr("font-family", "Arial")
   .attr("text-anchor", "middle")
   .attr("fill", "white")
   .attr("font-size", "10px")
   .style("font-weight", "bold")
   .attr("alignment-baseline", "central");

// Add axis titles
   chartGroup.append("text")
   .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 3})`)
   .attr("text-anchor", "middle")
   .attr("font-size", "16px")
   .attr("fill", "black")
   .style("font-weight", "bold")
   .text("Median Age");

   chartGroup.append("text")
   .attr("y", 0 - ((chartMargin.left / 2) + 2))
   .attr("x", 0 - (chartHeight / 2))
   .attr("text-anchor", "middle")
   .attr("font-size", "16px")
   .attr("fill", "black")
   .style("font-weight", "bold")
   .attr("transform", "rotate(-90)")
   .text("Smokers (%)");
    }).catch(function(error) {
    console.log(error);
});