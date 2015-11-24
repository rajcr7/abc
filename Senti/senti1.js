function drawSentiGraph(data){
	var data={"DATA":[
	{"ID":"100","MESSAGE":"Message text","SENTIMENCE":"POSITIVE","VALENCE":"2","AROUSAL":"2"},
	{"ID":"100","MESSAGE":"Message text","SENTIMENCE":"POSITIVE","VALENCE":"4","AROUSAL":"4"},
	{"ID":"100","MESSAGE":"Message text","SENTIMENCE":"POSITIVE","VALENCE":"6","AROUSAL":"6"},
	{"ID":"100","MESSAGE":"Message text","SENTIMENCE":"POSITIVE","VALENCE":"8","AROUSAL":"8"}]};
	
	data=data.DATA;
	//var data = [[1,3], [0,7], [5,4], [2,8]];
   
    var margin = {top: 20, right: 20, bottom: 20, left: 20}
      , width = 840 - margin.left - margin.right
      , height = 440 - margin.top - margin.bottom;
    
	
    var x = d3.scale.linear().domain([1, 9]).range([ 0, width-120 ]);
    
    var y = d3.scale.linear().domain([1, 9]).range([ height-120,0]);

    var chart = d3.select('.senti')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
	
	var colorgrd=main.append('defs').append('lineargradient')
	.attr('id', 'rainbow')
	.attr('gradientUnits', 'objectBoundingBox')
	.attr('x1', 0)
	.attr('y1', 1)	
	.attr('x2',1)
	.attr('y2',0)
	
	colorgrd.append('stop')
	.attr('offset', '0%')
	.attr('stop-color', '#ff0000')
	
	colorgrd.append('stop')
	.attr('offset', '100%')
	.attr('stop-color', '#ffff00')
	
    
	main.append('ellipse')
	.attr('cx', width/2)
	.attr('cy', height/2)
	.attr('rx', width/2)
	.attr('ry', height/2)	
	.style('fill','none')
	.style('stroke','red')
	.style('stroke-width','20')
	
	var emotions={};
	emotions[0]='Pleasant';
	emotions[1]='Contented';
	emotions[2]='Serene';
	emotions[3]='Related';
	emotions[4]='Calm';
	emotions[5]='Subdued';
	emotions[6]='Bored';
	emotions[7]='Depressed';
	emotions[8]='Unhappy';
	emotions[9]='Sad';
	emotions[10]='Unpleasant';
	emotions[11]='Upset';
	emotions[12]='Stressed';
	emotions[13]='Nervous';
	emotions[14]='Tense';
	emotions[15]='Active';
	emotions[16]='Alert';
	emotions[17]='Excited';
	emotions[18]='Elated';
	emotions[19]='Happy';	
	
	var degree = 360 / 20;
	
	for (var i = 0; i < 20; i++) {
	    var circlePosition = polarToCartesian(width / 2, height / 2, (width / 2)-10, (height / 2)-10, i * degree);       
	   main.append("text")
		   .attr("x", circlePosition.x)
           .attr("y", circlePosition.y)
		   .text(emotions[i]);
        }
		
    function polarToCartesian(centerX, centerY, radiusX, radiusY, angleInDegrees) {
        var angleInRadians = ((angleInDegrees-90)* Math.PI / 180.0);
            return {
                x: centerX + (radiusX * Math.cos(angleInRadians)),
                y: centerY + (radiusY * Math.sin(angleInRadians))
            };
        }
	
    // draw the x axis
    var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom');

	
    main.append('g')
	.attr('transform', 'translate(60,' + height/2 + ')')
	.attr('class', 'main axis date')
	//.call(xAxis);
	.append('path')
	.attr('class','domain')
	.attr('d','M0,0V0H680V0')
	

    // draw the y axis
   var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    main.append('g')
	.attr('transform', 'translate(' + width/2 + ',60)')
	.attr('class', 'main axis date')
	//.call(yAxis);
	.append('path')
	.attr('class','domain')
	.attr('d','M0,0H0V280H0')
	
    
    main.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
	  .attr('transform', 'translate(60,60)')
	  .attr("AROUSAL",function (d) { return y(d.AROUSAL); } )
	  .attr("VALENCE",function (d) { return y(d.VALENCE); } )
      .attr("cx", function (d) {
		  return x(d.VALENCE); 
		  } )
      .attr("cy", function (d) { return y(d.AROUSAL); } )
      .attr("r", 1)	  
}drawSentiGraph(data){	
var data = [[1,3], [0,7], [5,4], [2,8]];
	
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/* 
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */ 

// setup x 
var xValue = function(d) { return d.Calories;}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d["Protein (g)"];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");
	
// add the graph canvas to the body of the webpage
var svg = d3.select(".senti").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
// don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain(0,9);
  yScale.domain(0,9);

   // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)   

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)    
	  
	  // draw dots
  svg.selectAll(".dot")
      .data(data)
	  .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", "red") 
}   