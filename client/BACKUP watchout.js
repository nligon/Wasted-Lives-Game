// start slingin' some d3 here.

// var test = d3.select('.highscore');

// var items = [{ name: 'harry', val: 'smith' }, { name: 'sally', val: 'johnson' }];

// svg baseprofile property?
// set to fullscreen?

// render svg

// render elements inside svg
// render circles
// give them random starting coordinates
// // render svg through d3

d3.select('body').append('svg').attr('baseProfile', 'full').attr('width', 700).attr('height', '450');

//baseProfile="full" width="700" height="450"
// var svg = d3.select('body').append('svg');
numOfAsteroids = 0;
var add = function(num) {
  console.log('clicked');
  num = num || 1;
  numOfAsteroids++;
};

var rem = function(num) {
  console.log('clicked');
  num = num || 1;
  numOfAsteroids--;
};

var asteroids = [];
for (var i = 0; i < numOfAsteroids; i++) {
  asteroids.push({
    name: 'ast' + i,
    height: '40 px',
    width: '50 px'
  });
}

// Math.random(max -(2 * min) + 1 - min)

var generateCollection = function(productName, number, attributes) {
  // create('asteroid', 5, 'svg', 'width: 50 px', 'height: 60 px', 'whatever I want: cool')

  var collection = [];

  for (var i = 0; i < number; i++) {
    var item = { name: productName + i };
    // for all attribute properties
    for (var key in attributes) {
      item[key] = attributes[key];
    }
    collection.push(item);
  }
  console.log(collection.length, 'collection length')
  return collection;
};

var create = function(items) {
  // console.log(items);
  // console.log('update is running.');
  var selection = d3.select('svg')
    .selectAll('circle')
    .data(items);

  selection
    .enter()
    .append('circle')
    .attr('cx', function() {
      return Math.floor(Math.random() * (599) + 50);
    })
    .attr('cy', function() {
      return Math.floor(Math.random() * (349) + 50);
    })
    .attr('r', '30')
    .attr('fill', 'red');

  selection
    .exit().remove();
};

var update = function(items) {
  // console.log('update is running.');
  var selection = d3.select('svg')
    .selectAll('circle')
    .data(items);

  selection
    .transition().attr('cx', function() {
      return Math.floor(Math.random() * (599) + 50);
    })
    .attr('cy', function() {
      return Math.floor(Math.random() * (349) + 50);
    }).duration(1000);
};

// console.log(asteroids);
// update(asteroids);
// create(generateCollection('asteroid', numOfAsteroids));
setInterval(function() {
  create(generateCollection('asteroid', numOfAsteroids));
  update(generateCollection('asteroid', numOfAsteroids));
  console.log(numOfAsteroids);
}, 1000);

// update(generateCollection('asteroid', 3, { fill: 'green' }));
// update(generateCollection('asteroid', 10, { fill: 'green' }));
// update(generateCollection('asteroid', 10, { fill: 'green' }));
// update(generateCollection('asteroid', 10, { fill: 'green' }));

// cx: 100, cy: 100, r: 30,
// int random number between max and min: Math.floor(Math.random() * (max - min + 1) + min)
// testMake();
// testMake();
// testUpdate();
