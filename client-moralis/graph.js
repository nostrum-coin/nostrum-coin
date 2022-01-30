const groupDatag = [
    { key: 'Time next election', values:
                                 [
                                   {grpName:'id1', grpValue:0, desc:'1 week'},
                                   {grpName:'id2', grpValue:0, desc:'4 weeks'},
                                   {grpName:'id3', grpValue:0, desc:'8 weeks'},
                                   {grpName:'id4', grpValue:0, desc:'26 weeks'},
                                   {grpName:'id5', grpValue:0, desc:'52 weeks'},
                                 ]
    },
    { key: 'Burn percentage', values:
                                 [
                                   {grpName:'id1', grpValue:0, desc:'0%'},
                                   {grpName:'id2', grpValue:0, desc:'0.1%'},
                                   {grpName:'id3', grpValue:0, desc:'0.5%'},
                                   {grpName:'id4', grpValue:0, desc:'1.0%'},
                                   {grpName:'id5', grpValue:0, desc:'2.0%'},
                                 ]
    },   
    { key: 'Stack percentage', values:
                                 [
                                   {grpName:'id1', grpValue:0, desc:'0%'},
                                   {grpName:'id2', grpValue:0, desc:'1%'},
                                   {grpName:'id3', grpValue:0, desc:'3%'},
                                   {grpName:'id4', grpValue:0, desc:'5%'},
                                   {grpName:'id5', grpValue:0, desc:'10%'},
                                 ]
    },                          
];


function drawGraph(groupData, widthBase, heightBase) {

    var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = widthBase - margin.left - margin.right,
    height = heightBase - margin.top - margin.bottom;

    var x0  = d3.scaleBand().rangeRound([0, width], .5);
    var x1  = d3.scaleBand();
    var y   = d3.scaleLinear().rangeRound([height, 0]);

    var xAxis = d3.axisBottom().scale(x0)
                    .tickValues(groupData.map(d=>d.key));

    var yAxis = d3.axisLeft().scale(y);

    const color = d3.scaleOrdinal(d3.schemeDark2);

    
    var svg = d3.select('#graphcanvas').append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 '+ (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var categoriesNames = groupData.map(function(d) { return d.key; });
    var rateNames       = groupData[0].values.map(function(d) { return d.grpName; });

    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
    y_max = d3.max(groupData, function(key) { return d3.max(key.values, function(d) { return d.grpValue; }); });
    y.domain([0, Math.max(y_max, 1)]);

    svg.append("g")
        .attr("class", "x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    svg.append("g")
        .attr("class", "y")
        .style('opacity','0')
        .call(yAxis)


    svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

    var slice = svg.selectAll(".slice")
        .data(groupData)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

    slice.selectAll("rect")
        .data(function(d) { return d.values; })
        .enter()
        .append("g")
        .attr("class", "gbar")
        .append("rect")
        .attr("width", x1.bandwidth())
        .attr("x", function(d) { return x1(d.grpName); })
        .style("fill", function(d) { return color(d.grpName) })
        .attr("y", function(d) { return y(0); })
        .attr("height", function(d) { return height - y(0); })
        .on("mouseover", function(d) {
            d3.select(this).style("fill", d3.rgb(color(d.grpName)).darker(2));
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", color(d.grpName));
        });


    slice.selectAll("rect")
        .transition()
        .delay(100)
        .duration(500)
        .attr("y", function(d) { return y(d.grpValue); })
        .attr("height", function(d) { return height - y(d.grpValue); });

    slice.selectAll(".gbar").append("text")
        .text(function(d) { return d.desc; })
        .attr("x", function(d){ return x1(d.grpName) + margin.right - 10;  })
        .attr("y", function(d){ return y(d.grpValue) - 5; })
        .attr("font-size" , "8px")
        .attr("fill" , "white")
        .attr("text-anchor", "middle");

    svg.select(".y")
        .selectAll(".tick")
        .selectAll("text")
        .attr("x", 10)
        .attr("y", -4)
        .attr("fill" , "white")
        .attr("font-size" , "5px")

    svg.select(".x")
        .selectAll(".tick")
        .selectAll("text")
        .attr("font-size" , "16px")
        .attr("fill" , "white")
}
