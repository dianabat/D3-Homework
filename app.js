// @TODO: YOUR CODE HERE!

d3.csv("/assets/data/data.csv").then(function(data) {

    data.forEach(function(d) {
      d.abbr = +d.abbr;
      d.age = +d.age;
      d.smokes = +d.smokes;
    });
    console.log(data);
    console.log( data[1].age );
 

// size and margins for the chart
var margin = {top: 20, right: 15, bottom: 60, left: 60}
, width = 960 - margin.left - margin.right
, height = 500 - margin.top - margin.bottom;

// x and y scales, I've used linear here but there are other options
// the scales translate data values to pixel values for you
var x = d3.scaleLinear()
        .domain([25, 50])  // the range of the values to plot
        .range([ 0, width ]);        // the pixel range of the x-axis

var y = d3.scaleLinear()
        .domain([5, 40])
        .range([ height, 0 ]);

// the chart object, includes all margins
var chart = d3.select('body')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart')

// the main object where the chart and axis will be drawn
var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main')   

// draw the x axis
var xAxis = d3.axisBottom(x);

main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

// draw the y axis
var yAxis = d3.axisLeft(y);

main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

// draw the graph object
var g = main.append("svg:g"); 

g.selectAll("#scatter")
  .data( data )
  .enter().append("svg:circle")  // create a new circle for each value
    .attr("cy", function (data) { return y(data.smokes); } ) // translate y value to a pixel
    .attr("cx", function (data) { return x(data.age); } ) // translate x value
    .attr("r", 10) // radius of circle
    .text(function(data) { return data.abbr; } )
    .style("opacity", 0.6); // opacity of circle

});   