// svg baseprofile property?
// set to fullscreen?
// // render svg through d3
// pick mode easy / hard
// levels with music from tyrian ost. 'camanise'
// make lives blink fast
// make current score disappear
// fade in and out transitions for the numbers
// lives needs to stop blinking
// blinkies need to stop when reset is occuring


var tracks = [new Audio('mp3/spaceJourney.mp3'), new Audio('mp3/frozenCaves.mp3')];
tracks[1].volume = .6;
// tracks[Math.floor(Math.random() * tracks.length)].play();

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const add = num => { gameOptions.n += num || 1; };
const rem = num => { gameOptions.n -= num || 1; };
let highScore = 0;
let currentScore = 0;
let lifeCount = 0;
let lifeTimeout = false;
let life = false;
let gameOptions = {
  width: screen.width * .6,
  height: screen.height * .6,
  n: 0
};

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

var asteroidData = [];

const makeAsteroidData = () => {
let difference = gameOptions.n - asteroidData.length
  // if asteroidData is too small or equal
  if (difference >= 0) {
    for (var i = 0; i < difference; i++) {
      asteroidData.push({
        x: randInt(gameOptions.width * .10, gameOptions.width - gameOptions.width * .10),
        y: randInt(gameOptions.height * .10, gameOptions.height - gameOptions.height * .10)
      });
    }
    return asteroidData;
  }
  // if asteroidData is too big
  else {
    return asteroidData = asteroidData.slice(0, asteroidData.length + difference)
  }
  return asteroidData;
};

// const makeAsteroidData = () => {

//   // if asteroidData is too small
//   if (asteroidData.length < gameOptions.n) {
//     for (var i = 0; i < asteroidData.length - gameOptions.n; i++) {
//       asteroidData.push({
//         x: randInt(gameOptions.width * .10, gameOptions.width - gameOptions.width * .10),
//         y: randInt(gameOptions.height * .10, gameOptions.height - gameOptions.height * .10)
//       });
//     }
//   } else {
//     asteroidData.splice(asteroidData.length - gameOptions.n, asteroidData.length);
//   }
// };

// makeAsteroidData(gameOptions.n);
const update = (data) => {
  console.log('3 update: just received n of', gameOptions.n, ' with data.length', data.length)
    // gameOptions.n = Math.floor(currentScore / 2) + 3
  data = makeAsteroidData(gameOptions.n);
  console.log('4 update: made asteroid data again with', gameOptions.n, '. it has with data.length', data.length)
    // console.log('3: corrected to n of', gameOptions.n, ' with data.length', data.length)
    // data = makeAsteroidData(gameOptions.n);

  // console.log('data', data);
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
  .attr('width', '80')
  .attr('height', '80')
  .attr('x', gameOptions.width / 2)
  .attr('y', gameOptions.height / 2);

svg.on('mousemove', function() {
  var coordinates = d3.mouse(this);
  svg.selectAll('.player')
    .data([coordinates])
    .attr('class', 'player')
    .attr('x', (d) => d[0] - 40)
    .attr('y', (d) => d[1] - 40)
    .style('cursor', 'none');

});

var asteroids = svg.selectAll('image.asteroid')
  .data(asteroidData);

// initiate and set interval

update(makeAsteroidData());
setInterval(() => update(makeAsteroidData()), 1500); // frequency should be higher than duration
setTimeout(function() { setInterval(() => checkForCollision(), 10); }, 1000)

// setInterval(() => {
//   if (lifeTimeout === false) {
//     currentScore++;
//   }

// }, 1000);

// COLLISION DETECTION

var checkForCollision = function() {

  // Check for life
  var asteroids = svg.selectAll('image.asteroid').data(asteroidData);
  var playerx = svg.select('image.player').data([1])[0][0].attributes.x.value;
  var playery = svg.select('image.player').data([1])[0][0].attributes.y.value;
  // for every asteroid...
  for (var i = 0; i < asteroidData.length; i++) {
    var asteroidx = asteroids[0][i].attributes.x.value;
    var asteroidy = asteroids[0][i].attributes.y.value;
    var verticalDistance = Math.abs(asteroidy - playery);
    var horizontalDistance = Math.abs(asteroidx - playerx);
    var totalDistance = Math.sqrt(Math.pow(horizontalDistance, 2) + Math.pow(verticalDistance, 2));
    // if life, flag a life timeout and launch handleCollision:
    if (totalDistance < 40 && !lifeTimeout) {
      console.log('life detected...');
      lifeTimeout = true;
      handleCollision();
    }
  }

}

// HANDLE DETECTED COLLISION 

// Increment lifeCount, reset currentScore, begin 2200 timeout count
var handleCollision = function() {
  lifeTimeout = true;

  // lifeScore, increment and blink
  lifeCount++;

  // // lifeScore, blink
  // d3.select('body').selectAll('div.lives')
  //   .selectAll('span').transition().duration(125) // fade out
  //   .style('opacity', 0)
  //   .text(lifeCount)
  //   .transition().duration(125) // fade in
  //   .style('opacity', 1)

  // reset currentScore
  setTimeout(function() {
    currentScore = 0;
  }, 2000);

  // turn off lifeTimeout
  setTimeout(function() {
    lifeTimeout = false;
  }, 2000);

  // currentScore, Fade out and in
  d3.select('body').selectAll('.scoreboard')
    .transition().duration(2000) // fade out
    .style('opacity', 0)
    .transition().duration(200) // fade in
    .style('opacity', 1)

  // lifeCount, alter text during fade
  setTimeout(function() {
    d3.select('body').selectAll('div.lives')
      .selectAll('span')
      .text(lifeCount)
  }, 2000);

  // currentScore, alter text during fade
  setTimeout(function() {
    d3.select('body').selectAll('div.current')
      .selectAll('span')
      .text(currentScore)
  }, 2000);

}

// NON-COLLISION TIMEOUT:

// If no-life, run every second:


setInterval(function() {

  if (!lifeTimeout) {

    // currentScore, increment
    currentScore++;

    // highScore, increment
    if (currentScore > highScore) {
      highScore = currentScore;

      // highScore, blink
      d3.select('body').selectAll('div.highscore')
        .selectAll('span')
        .transition().duration(125) // snap back
        .style('opacity', 0)
        .text(highScore)
        .transition().duration(125) // snap back
        .style('opacity', 1)
    }

    // current score, blink
    d3.select('body').selectAll('div.current')
      .selectAll('span')
      .transition().duration(125) // snap back
      .style('opacity', 0)
      .text(currentScore)
      .transition().duration(125) // snap back
      .style('opacity', 1)
  }

  // turnThing();
}, 1000);

// function turnThing() {

// var arrow = svg.selectAll('.player')
//   .data([1, 2, 3])
//   .attr('class', 'player')
//   // .attr('x', (d) => d[0])
//   // .attr('y', (d) => d[1])
//   .style('cursor', 'none');

// arrow
//   .transition()
//   .duration(2000)
//   .attrTween("transform", tween);

// function tween(d, i, a) {
//   return d3.interpolateString("rotate(-60, 150, 130)", "rotate(60, 150, 130)");
// }

// }

// To select div content only:
// .selectAll('span')
// TO DO RENDER COLLISIONS AFTER
// TO DO FREEZE, FADE ALL
