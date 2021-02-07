var input = d3.select("input");
var reset = d3.select("#reset");
var count = d3.select("#count");
var value = input.node().value;
var letter = d3.select("#letters");



d3.select("#sub").on("click", ()=>{
  
    letter = d3.select("#letters");
    d3.event.stopPropagation();
    d3.event.preventDefault();
    value = input.node().value;
    d3.select("#phrase")
        .text(`Analysis of: ${value}`)

    let strArr = value.split("").sort()
    var counts = {};
    strArr.forEach(function(x) {
        counts[x] = (counts[x] || 0) + 1;
    });
    var numArr = Object.values(counts)
    var keyArr = Object.keys(counts)
    console.log(numArr);
    console.log(keyArr);

    newCarracters(numArr);
    createChart(letter, numArr, keyArr);
    nameOfChartElements(letter, keyArr);

    input.node().value=""
})

reset.on("click", ()=>{
    count.text("");
    input.node().value="";
    d3.select("#phrase").text("");
    d3.select("#letters").selectAll("div").remove();
})






function newCarracters (numArr){
    var countNum = numArr.reduce((acc, next)=>{
        return acc + next;
    })
    count.text(`New carracters added: ${countNum}`)
}

function createChart(letter, numArr, keyArr){
    let genUpdate = letter
                    .selectAll("div")
                    .data(numArr, ()=>keyArr)
    genUpdate
        .exit()
        .remove();

    genUpdate
        .enter()
        .append("div")
        .classed("letter", true)
            .merge(genUpdate)
                .style("width", "20px")
                .style("height", d=>d*20 + "px" )
                .style("line-height", "20px")
                .style("margin-right", "5px")
        
    letter.select("div")
            .style("height", d=>d*20 + "px" );
}
function nameOfChartElements(letter, keyArr){
    let genUpdate = letter
                        .selectAll("div")
                        .data(keyArr)
    genUpdate
        .exit()
        .remove();
    genUpdate
        .append("div")
        .text(d=>d);
}