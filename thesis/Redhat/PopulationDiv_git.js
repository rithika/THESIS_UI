function mapr7() {
  var width = 1500;
  var height = 600;

   var t = textures.circles()
    .size(10)
    .radius(2)
    .fill("firebrick")
    .background("darkorange");

  var ext_color_domain = [0.00070,0.00138,0.00207,0.00276]
  var legend_labels = ["0-0.00070", "0.00070-0.00138", "0.00138-0.00207", "0.00207>"] 

  var d = [];

  var projection = d3.geo.winkel3();

  var path = d3.geo.path().projection(projection);

  var graticule = d3.geo.graticule();

 var color = d3.scale.threshold()
  .domain(ext_color_domain)
  .range(['rgb(239,243,255)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)']);

  var svg = d3.select("#ctp4").append("svg")
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

  d3.json('thesis/Redhat/data/scm-timezone.json', function(data){
   var com = data.population;
   d.push(com);

  d3.json("thesis/Redhat/data/timezones-topo2.json", function(json){

 var tzdata = topojson.feature(json, json.objects.timezones).features;

    for(var i = 0;i < data.tz.length;i++){

      var dataTZ = data.tz[i];

      var commitValue = parseInt(data.commits[i]);

      var authorValue = parseInt(data.authors[i]);

      var commitsByauthors = parseFloat(data.commits[i]/data.authors[i]);

      var dataset = parseFloat(data.commits[i]/data.population[i]);


      for(var j = 0;j<tzdata.length;j++){

        var jsonTZ = tzdata[j].properties.tz;

        if(dataTZ == jsonTZ) {

          tzdata[j].properties.value = commitValue;
          tzdata[j].properties.authors = authorValue;
          tzdata[j].properties.div = commitsByauthors;
          tzdata[j].properties.popdiv = dataset;
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
          var val = d.properties.popdiv;
          if(val || val == 0){ return color(val); }
          else { return t.url(); }
                })
         .append("svg:title")
         .text(function(d, i) { return "Country: " + d.properties.Name +"\n" + "Commits/Population: " + d.properties.popdiv });

  var legend = svg.selectAll("g.legend")
  .data(ext_color_domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 100, ls_h = 20;

  legend.append("rect")
  .attr("x", 1000)
  .attr("y", function(d, i){ return height - (i*ls_h) - 20*ls_h;})
  .attr("width", ls_w+10)
  .attr("height", ls_h)
  .text("legend")
  .style("fill", function(d, i) { return color(d); })
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 1000)
  .attr("y", function(d, i){ return height - (i*ls_h) - 19*ls_h;})
  .text(function(d, i){ return legend_labels[i]; });


            });         

         });
}