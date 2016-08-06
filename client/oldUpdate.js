var update = function(items) {
  console.log('update is running.');
  var selection = d3.select('svg')
    .selectAll('div')
    .data(items, function(d) {
      return d.name;
    })

  selection
    .enter()
    .append('circle')
    .attr('cx', function() {
      return Math.floor(Math.random() * (599) + 50); })
    .attr('cy', function() {
      return Math.floor(Math.random() * (349) + 50); })
    .attr('r', '30')
    .attr('fill', 'red')

  selection
    .exit()
    .text(function(d) {
      return 'bye bye ' + d.name;
    })
    .transition().duration(250)
    .remove();
};