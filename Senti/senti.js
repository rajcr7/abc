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
	
	/*var colorgrd=main.append('defs').append('lineargradient')
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
	*/
	
	main.append("linearGradient")
      .attr("id", "temperature-gradient")	  
      .attr("gradientUnits", "userSpaceOnUse")//objectBoundingBox
      .attr('x1', 0)
	  .attr('y1', -300)	
	  .attr('x2',900)
	  .attr('y2',0)
      .selectAll("stop")
      .data([//#ECA4B0 -- pink,FFCF00--yellow,79DBE8--skyblue,3A88D2---blue
        {offset: "0%", color: "#3A88D2"},
		{offset: "25%", color: "#3A88D2"},
		{offset: "35%", color: "#FFCF00"},
		{offset: "50%", color: "#ECA4B0"},
        {offset: "65%", color: "#FFCF00"},
        {offset: "75%", color: "#79DBE8"},
		{offset: "100%", color: "#3A88D2"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });
	
    
	main.append('ellipse')
	.attr('class', 'e_area')
	.attr('cx', width/2)
	.attr('cy', height/2)
	.attr('rx', width/2)
	.attr('ry', height/2)	
	
	var emotions={};
	emotions[0]='Active';
	emotions[1]='Alert';
	emotions[2]='Excited';
	emotions[3]='Elated';
	emotions[4]='Happy';	
	emotions[5]='Pleasant';
	emotions[6]='Contented';
	emotions[7]='Serene';
	emotions[8]='Related';
	emotions[9]='Calm';
	emotions[10]='Subdued';
	emotions[11]='Bored';
	emotions[12]='Depressed';
	emotions[13]='Unhappy';
	emotions[14]='Sad';
	emotions[15]='Unpleasant';
	emotions[16]='Upset';
	emotions[17]='Stressed';
	emotions[18]='Nervous';
	emotions[19]='Tense';
	
	var degree = 360 / 20;
	
	for (var i = 0; i < 20; i++) {
	    var circlePosition = polarToCartesian((width / 2), (height / 2), (width / 2)-30, (height / 2)-30, i * degree);       
	   main.append("text")
		   .attr("x", circlePosition.x)
           .attr("y", circlePosition.y)
		   .attr("text-anchor", "middle")
		   .text(emotions[i]);
        }
		
    function polarToCartesian(centerX, centerY, radiusX, radiusY, angleInDegrees) {
        var angleInRadians = ((angleInDegrees-90)* Math.PI / 180.0);
            return {
                x: centerX + (radiusX * Math.cos(angleInRadians)),
                y: centerY + (radiusY * Math.sin(angleInRadians))
            };
        }
	
    main.append('g')
	.attr('transform', 'translate(60,' + height/2 + ')')
	.attr('class', 'main axis date')
	.append('path')
	.attr('class','domain')
	.attr('d','M0,0V0H680V0')

    main.append('g')
	.attr('transform', 'translate(' + width/2 + ',60)')
	.attr('class', 'main axis date')
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
      .attr("r", 10)	  
}