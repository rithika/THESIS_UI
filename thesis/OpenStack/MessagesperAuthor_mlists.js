function mapo6() {
  var width = 1500;
  var height = 600;

   var t = textures.circles()
    .size(10)
    .radius(2)
    .fill("firebrick")
    .background("darkorange");

  var ext_color_domain = [5, 25, 100, 250]
  var legend_labels = ["0 - 5", "5-25", "25 -100", "> 100"] 

  var d = [];

  var projection = d3.geo.winkel3();

  var path = d3.geo.path().projection(projection);

  var graticule = d3.geo.graticule();

 var color = d3.scale.threshold()
  .domain(ext_color_domain)
  .range(['rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(49,130,189)','rgb(8,81,156)']);

  var svg = d3.select("#mpa2").append("svg")
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

  d3.json('thesis/OpenStack/data/mls-timezone.json', function(data){
   var com = data.authors;
   d.push(com);

  d3.json("thesis/OpenStack/data/timezones-topo2.json", function(json){

 var tzdata = topojson.feature(json, json.objects.timezones).features;

    for(var i = 0;i < data.tz.length;i++){

      var dataTZ = data.tz[i];

      var msgValue = parseInt(data.messages[i]);

      var authorValue = parseInt(data.authors[i]);

      var msgByauthors;

      if(data.messages[i] == 0)
        msgByauthors = 0;
      else
        msgByauthors = parseFloat(data.messages[i]/data.authors[i]);

      for(var j = 0;j<tzdata.length;j++){

        var jsonTZ = tzdata[j].properties.tz;

        if(dataTZ == jsonTZ) {

          tzdata[j].properties.value = msgValue;
          tzdata[j].properties.authors = authorValue;
          tzdata[j].properties.div = msgByauthors;

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
          var val = d.properties.div;
          if(val || val == 0){ return color(val); }
          else { return t.url(); }
                })
         .append("svg:title")
          .text(function(d, i) { return "Country: " + d.properties.Name +"\n" + "Messages/Authors: " + d.properties.div });

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
}