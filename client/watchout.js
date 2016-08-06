// start slingin' some d3 here.

// var test = d3.select('.highscore');

// var items = [{ name: 'harry', val: 'smith' }, { name: 'sally', val: 'johnson' }];


// render svg

// render elements inside svg
// render circles
// give them random starting coordinates
// // render svg through d3

var asteroids = [];
for (var i = 0; i < 30; i++) {
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
  return collection;
};

// <circle cx="150" cy="100" r="80" fill="Orange" />


// var testMake = function(items) {
//   var selection = d3.select('body')
//     .selectAll('div')
//     .data([10, 20, 30])
//     .text(function(d) {
//       return d;
//     });

//   selection
//     .enter()
//     .append('div')
//     .text(function(d) {
//       return d.name + 'HI';
//     });

// };

// var testUpdate = function(items) {
//   var selection = d3.select('body')
//     .selectAll('div')
//     .data([100, 200, 300])
//     .text(function(d) {
//       return d;
//     });
// };


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
create(generateCollection('asteroid', 3));
// update(generateCollection('asteroid', 3, { fill: 'green' }));
// update(generateCollection('asteroid', 10, { fill: 'green' }));
// update(generateCollection('asteroid', 10, { fill: 'green' }));
// update(generateCollection('asteroid', 10, { fill: 'green' }));

// cx: 100, cy: 100, r: 30,
// int random number between max and min: Math.floor(Math.random() * (max - min + 1) + min)
// testMake();
// testMake();
// testUpdate();
