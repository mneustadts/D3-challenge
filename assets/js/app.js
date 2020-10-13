// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
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
    console.log(stateData);

// Cast the age value to a number for each piece of stateData
    stateData.forEach(function(data){
        data.age = +data.age;
    });

// Scales for axis
var xScale = d3.scaleLinear()
    .domain([0,50])
    .range([0,svgWidth]);

var yScale = d3.scaleLinear()
    .domain([0, 50])
    .range([svgHeight,0]);

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
 chartGroup.selectAll("#scatter")
 .data(stateData)
 .enter()
 .append("circle")
   .attr("cx", function (d) { return xAxis(d.age); } )
   .attr("cy", function (d) { return yAxis(d.smokes); } )
   .attr("r", 1.5)
   .style("fill", "#69b3a2")
}).catch(function(error) {
    console.log(error);
  });
  