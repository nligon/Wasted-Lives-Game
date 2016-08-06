// svg baseprofile property?
// set to fullscreen?
// // render svg through d3

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const add = num => numOfAsteroids += num || 1;
const rem = num => numOfAsteroids -= num || 1;
let scrWidth = screen.width * 2 / 3;
let scrHeight = screen.height * 2 / 3;
let numOfAsteroids = 10;

const svg = d3.select('.mouse').append('svg')

.attr('baseProfile', 'full')
  .attr('width', scrWidth)
  .attr('height', scrHeight)
  .style('background-image', 'url("img/starscapeHD.gif")')
  .style('background-size', 'cover');

d3.select('.scoreboard')
  .style('font-size', '1.7rem')
  .style('font-family', 'VT323, monospace')
  .style('color', 'black');

// let imgArr = [1, 2, 3]

const makeSet = function(item, number, attributes) {

  var arr = [];

  for (var i = 0; i < number; i++) {
    var item = { name: item };
    arr.push(item);
  }
  return arr;
};

const update = (items) => {
  // numOfAsteroids = numOfAsteroids || 3;

  //  connect data points to DOM without writing anything
  var selection = svg
    .selectAll('image.asteroid')
    .data(items);

  // write asteroids to DOM method 1
  selection
    .enter()
    .append('svg:image')
    .attr('class', 'asteroid')
    .attr('xlink:href', 'img/spinningAsteroid.gif')
    .attr('width', '40')
    .attr('height', '40')
    .attr('x', () => randInt(scrWidth * .10, scrWidth - scrWidth * .10))
    .attr('y', () => randInt(scrHeight * .10, scrHeight - scrHeight * .10));

  // modify elemental attributes
  selection
    .transition().duration(1500).ease('linear') // move should be <= frequency
    .attr('x', () => randInt(scrWidth * .10, scrWidth - scrWidth * .10))
    .attr('y', () => randInt(scrHeight * .10, scrHeight - scrHeight * .10));

  // remove elements
  selection
    .exit().remove();
};

svg.selectAll('image.player')
  .data([1])
  .enter()
  .append('svg:image')
  .attr('xlink:href', 'img/UFO.png')
  .attr('class', 'player')
  // .attr('fill', 'blue')
      .attr('width', '40')
    .attr('height', '40')
  .attr('x', 350)
  .attr('y', 250);
// .attr('r', 10);

svg.on('mousemove', function() {
  var coordinates = d3.mouse(this);
  svg.selectAll('.player')
    .data([coordinates])
    .attr('class', 'player')
    .attr('x', (d) => d[0])
    .attr('y', (d) => d[1])
    .style('cursor', 'none');

  // svg.selectAll(null)
  //   .data([null])
  //   .enter()
  //   .append('player:image')
  //   .attr('null:href', 'img/UFO.png')
  //   // .attr('fill', 'blue')
  //   // .attr('r', 20);

  // svg.on('mousemove', function() {
  //   var coordinates = d3.mouse(this);
  //   // console.log('coordinates', coordinates)
  //   svg.selectAll('circle')
  //     .data([coordinates])
  //     .attr('x', (d) => d[0])
  //     .attr('y', (d) => d[1])
  //     .style('cursor', 'none');
  // });

})

// Test asteroids:
update(makeSet('asteroid', numOfAsteroids), 10);
setInterval(() => update(makeSet('asteroid', numOfAsteroids)), 1500); // frequency should be higher than duration

// Test circles:
// update(makeSet('asteroid', numOfAsteroids));
// setInterval(() => updateCircle(makeSet('asteroid', numOfAsteroids)), 1000);
