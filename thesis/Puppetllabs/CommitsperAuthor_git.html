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
<h1> Contributions/Authors per TimeZone - Puppet Labs; Github data </h1>
  <div id="viz"></div>
<script>
  var width = 1500;
  var height = 600;

   var t = textures.circles()
    .size(10)
    .radius(2)
    .fill("firebrick")
    .background("darkorange");

  var ext_color_domain = [10, 50, 100, 250]
  var legend_labels = ["<=10", "50+", "100+", "> 250"] 

  var d = [];

  var projection = d3.geo.winkel3();

  var path = d3.geo.path().projection(projection);

  var graticule = d3.geo.graticule();

 var color = d3.scale.threshold()
  .domain(ext_color_domain)
  .range(['rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)']);

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
   var com = data.authors;
   d.push(com);

  d3.json("data/timezones-topo2.json", function(json){

 var tzdata = topojson.feature(json, json.objects.timezones).features;

    for(var i = 0;i < data.tz.length;i++){

      var dataTZ = data.tz[i];

      var commitValue = parseInt(data.commits[i]);

      var authorValue = parseInt(data.authors[i]);

      var commitsByauthors;

       if(data.commits[i] == 0)
        commitsByauthors = 0;
      else
        commitsByauthors = parseFloat(data.commits[i]/data.authors[i]);
      console.log(commitsByauthors);

      for(var j = 0;j<tzdata.length;j++){

        var jsonTZ = tzdata[j].properties.tz;

        if(dataTZ == jsonTZ) {

          tzdata[j].properties.value = commitValue;
          tzdata[j].properties.authors = authorValue;
          tzdata[j].properties.div = commitsByauthors;

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
          console.log(d);
          var val = d.properties.div;
          if(val || val == 0){ return color(val); }
          else { return t.url(); }
                })
         .append("svg:title")
          .text(function(d, i) { return "Country: " + d.properties.Name +"\n" + "Commits: " + d.properties.value + "\n" + "Authors: " + d.properties.authors });

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