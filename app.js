d3.select("#reset")
    .on("click", function() {
      d3.selectAll("rect")
        .remove();
      d3.selectAll("text")
        .remove();

      d3.select("#phrase")
          .text("");

      d3.select("#count")
          .text("");
    });

d3.select("form")
    .on("submit", function() {
      d3.event.preventDefault();
      var input = d3.select("input");
      var text = input.property("value");
      var width = 600;
      var height = 300;
      var set = new Set(text);
      var numUniqeChar = set.size;
      var padding = 10;
      var charWidth = width / numUniqeChar - padding;

      var svg = d3.select("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .selectAll("rect")
                      .data(getFrequencies(text), function(d) {
                        return d.character;
                      });

      svg
          .attr("fill", "yellow")
        .exit()
        .remove();

      svg
        .enter()
        .append("rect")
          .attr("fill", "green")
        .merge(svg)
          .attr("x", (d, i)=>(charWidth  + padding)* i)
          .attr("y", (d)=>300 - d.count * 40)
          .attr("width", charWidth)
          .attr("height", function(d) {
            return d.count * 40;
          })
          


        var svgText = d3.select("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .selectAll("text")
                        .data(getFrequencies(text), function(d) {
                          return d.character;
                        });
        svgText
          .exit()
          .remove();
        
        svgText
          .enter()
          .append("text")
              .merge(svgText)
              .attr("x", (d, i)=>(charWidth  + padding )* i +charWidth/2.15)
              .attr("y", (d)=>300 - d.count * 40)
              .attr("width", charWidth)
              .text((d)=>d.character)
              .attr("stroke", "black")
              .attr("stroke-width", "1px")
              .attr("font-size", "2em")
              .attr("class","center")
              
        
          // .text(function(d) {
          //   return d.character;
          // });

      d3.select("#phrase")
          .text("Analysis of: " + text);

      d3.select("#count")
          .text("(New characters: " + svg.enter().nodes().length + ")");

      input.property("value", "");
    });

function getFrequencies(str) {
  var sorted = str.split("").sort();
  var data = [];
  for (var i = 0; i < sorted.length; i++) {
    var last = data[data.length - 1];
    if (last && last.character === sorted[i]) last.count++;
    else data.push({ character: sorted[i], count: 1 });
  }
  return data;
}
