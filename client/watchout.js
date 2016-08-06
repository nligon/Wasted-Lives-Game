// svg baseprofile property?
// set to fullscreen?
// // render svg through d3
// pick mode easy / hard
// make collisions blink fast
// make current score disappear


var tracks = [new Audio('mp3/spaceJourney.mp3'), new Audio('mp3/frozenCaves.mp3')];
tracks[1].volume = .6;
tracks[Math.floor(Math.random() * tracks.length)].play();

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const add = num => { gameOptions.n += num || 1; };
const rem = num => { gameOptions.n -= num || 1; };
let gameOptions = {
  width: screen.width * 3 / 4,
  height: screen.height * 3 / 4,
  n: 10
};

let highScore = 0;
var currentScore = 0;
let collisionCount = 0;
var collisionTimeout = false;

const svg = d3.select('.mouse').append('svg')

.attr('baseProfile', 'full')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .style('background-image', 'url("img/starscapeHD.gif")')
  .style('background-size', 'cover');

d3.select('.scoreboard')
  .style('font-size', '1.7rem')
  .style('font-family', 'VT323, monospace')
  .style('color', 'black');

let asteroidData = [];



const populateAsteroidData = () => {
  for (var i = 0; i < gameOptions.n; i++) {
    asteroidData.push({
      x: randInt(gameOptions.width * .10, gameOptions.width - gameOptions.width * .10),
      y: randInt(gameOptions.height * .10, gameOptions.height - gameOptions.height * .10)
    });
  }
};

populateAsteroidData(gameOptions.n);

const update = (data) => {
  gameOptions.n = gameOptions.n || 3;

  //  connect data points to DOM without writing anything and define shortcut to asteroid collection
  var asteroids = d3.select('svg')
    .selectAll('image.asteroid')
    .data(data);

  // write asteroids to DOM
  asteroids.enter()
    .append('svg:image')
    .attr('class', 'asteroid')
    .attr('xlink:href', 'img/spinningAsteroid.gif')
    .attr('width', '40')
    .attr('height', '40')
    .attr('x', () => randInt(gameOptions.width * .10, gameOptions.width - gameOptions.width * .10))
    .attr('y', () => randInt(gameOptions.height * .10, gameOptions.height - gameOptions.height * .10));

  // modify elemental attributes
  asteroids.transition()
    .duration(1500)
    .ease('linear') // move should be <= frequency
    .attr('x', () => randInt(gameOptions.width * .10, gameOptions.width - gameOptions.width * .10))
    .attr('y', () => randInt(gameOptions.height * .10, gameOptions.height - gameOptions.height * .10));

  // remove elements
  asteroids
    .exit().remove();

};

svg.selectAll('image.player')
  .data([1])
  .enter()
  .append('svg:image')
  .attr('xlink:href', 'img/UFOHD.png')
  .attr('class', 'player')
  .attr('width', '40')
  .attr('height', '40')
  .attr('x', 350)
  .attr('y', 250);

svg.on('mousemove', function() {
  var coordinates = d3.mouse(this);
  svg.selectAll('.player')
    .data([coordinates])
    .attr('class', 'player')
    .attr('x', (d) => d[0])
    .attr('y', (d) => d[1])
    .style('cursor', 'none');

});

var asteroids = svg.selectAll('image.asteroid')
  .data(asteroidData);


// var playery = svg.selectAll('image.player').data([1]).attr('y');
var playery = null;

// initiate and set interval

update(asteroidData);
setInterval(() => update(asteroidData), 1500); // frequency should be higher than duration
setInterval(() => checkCollision(), 10);

setInterval(() => {
  if (!collisionTimeout) {
    currentScore++;
  }
  if (currentScore > highScore) {
    highScore = currentScore;
  }
}, 1000);


var checkCollision = function() {


  var asteroids = svg.selectAll('image.asteroid').data(asteroidData);
  var playerx = svg.select('image.player').data([1])[0][0].attributes.x.value;
  var playery = svg.select('image.player').data([1])[0][0].attributes.y.value;
  for (var i = 0; i < asteroidData.length; i++) {
    var asteroidx = asteroids[0][i].attributes.x.value;
    var asteroidy = asteroids[0][i].attributes.y.value;
    var horizontalDistance = Math.abs(asteroidx - playerx);
    var verticalDistance = Math.abs(asteroidy - playery);
    var totalDistance = Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2));
    // if collision:
    if (totalDistance < 40 && !collisionTimeout) {

      collisionCount++;
      collisionTimeout = true;
      setTimeout(function() {
        collisionTimeout = false;
      }, 3000);

      setTimeout(function() {
        collisionTimeout = false;
        currentScore = 0;
        console.log('done with score reset');
      }, 1000);

      //fade the current
      d3.select('body').selectAll('div.current')
        .transition().duration(1000)
        // .selectAll('span')
        .style('opacity', 0)
        .transition().duration(1000)
        .style('opacity', 1)
        .transition().duration(1000);
        console.log ('done with style transitions');

        // currentScore = 0;

      // .selectAll('span')
      // .text('0');
      // .transition().duration(500)
      // .style('opacity', 1);

      console.log('done', collisionCount);
    }
  }

  d3.select('body').selectAll('div.collisions')
    .selectAll('span')
    .text(collisionCount);

  d3.select('body').selectAll('div.current')
    .selectAll('span')
    .text(currentScore);

  d3.select('body').selectAll('div.highscore')
    .selectAll('span')
    .text(highScore);

};
