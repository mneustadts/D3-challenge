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
// Cast th age value to a number for each piece of stateData
    stateData.forEach(function(data){
        data.age = +data.age;
    })
});
// Scales for axis
var xScale = d3.scaleLinear()
    .domain([0,50])
    .range([0,1000]);

var yScale = d3.scaleLinear()
    .domain([0,50])
    .range([0,1000]);