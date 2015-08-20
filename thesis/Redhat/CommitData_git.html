<!DOCTYPE html>
<html lang="en">
<meta charset="utf-8">
<title>Time Zone World Map</title>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://d3js.org/d3.geo.projection.v0.min.js"></script>
<script src="http://d3js.org/colorbrewer.v1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
<script src="textures.min.js"></script>
<link type="text/css" rel="stylesheet" href="colorbrewer.css"/>
<style>

#viz path {
  fill: none;
  stroke: #111;
}

.graticule {
  stroke: #aaa;
}

</style>
</head>
<body>
  <h1> Shaded as per Commits per TimeZone - Redhat; Github data </h1>
  <div id="viz"></div>
<script>
  var width = 1500;
  var height = 600;

  var t = textures.circles()
    .size(10)
    .radius(2)
    .fill("firebrick")
    .background("darkorange");

 // var color_domain = [1, 100, 500, 5000, 150000000, 300000000];
  var ext_color_domain = [100, 500, 5000, 50000, 500000]
  var legend_labels = ["< 100", "500+", "5000+", "50000+", "> 500000"] 

  var d = [];

  var projection = d3.geo.winkel3();

  var path = d3.geo.path().projection(projection);

  var graticule = d3.geo.graticule();

  var color = d3.scale.threshold()
  .domain(ext_color_domain)
  .range(['rgb(237,248,251)','rgb(204,236,230)','rgb(153,216,201)','rgb(102,194,164)','rgb(44,162,95)','rgb(0,109,44)']);

  var svg = d3.select("#viz").append("svg")
                          .attr("width",width)
                          .attr("height",height)
                          .call(d3.behavior.zoom().on("zoom",redraw))
                          .append("g");

  svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

  svg.call(t);

  function redraw() {
  var s = d3.event.scale;
  var t = d3.event.translate;

  svg.style("stroke-width", 1 / s).attr("transform", "translate(" + t + ")scale(" + s + ")");
}

  d3.json('data/scm-timezone.json', function(data){
   var com = data.commits;
   d.push(com);

  d3.json("data/timezones-topo2.json", function(json){

 var tzdata = topojson.feature(json, json.objects.timezones).features;
   console.log(tzdata);

    for(var i = 0;i < data.tz.length;i++){

      var dataTZ = data.tz[i];

      var commitValue = parseInt(data.commits[i]);

      var authorValue = parseInt(data.authors[i]);

      for(var j = 0;j<tzdata.length;j++){

        var jsonTZ = tzdata[j].properties.tz;
       
        if(dataTZ == jsonTZ) {

          tzdata[j].properties.value = commitValue;
          tzdata[j].properties.authors = authorValue;

        }
      }
    }
   
      var tz = svg.selectAll("path")
        .data(tzdata)
        .enter() 
        .insert("path")
        .attr("class", "tz")
        .attr("d",path)
        .attr("title", function(d,i) {return d.properties.Name;})
        .style("fill", function(d) {
          var val = d.properties.value;
          if(val || val == 0){ return color(val); }
          else { return t.url(); }
                })
         .append("svg:title")
          .text(function(d, i) { return "Country: " + d.properties.Name +"\n" + "Authors: " + d.properties.authors });

var legend = svg.selectAll("g.legend")
  .data(ext_color_domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 100, ls_h = 20;

  legend.append("rect")
  .attr("x", 1000)
  .attr("y", function(d, i){ return height - (i*ls_h) - 20*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d, i) { return color(d); })
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 1000)
  .attr("y", function(d, i){ return height - (i*ls_h) - 19*ls_h;})
  .text(function(d, i){ return legend_labels[i]; });

            });         

         });

    </script>
  </body>
</html>