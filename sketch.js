var target = "vamo a calmarno";

const mutationRate = 0.01;
var population = Array(200);
var matingPool = [];
var noLoopCondition = false;

function setup() {
  bestPhrase = createP("Best phrase:");
  bestPhrase.class("best");

  for (var i = 0; i < population.length; i++) {
    population[i] = new DNA(target.length);
  }
  for (let i = 0; i < this.population.length; i++) {
    population[i].calcFitness(target);
  }
}

function draw() {
  matingPool = [];
  for (var i = 0; i < population.length; i++) {
    let maxFitness = 0;
    for (let i = 0; i < population.length; i++) {
      if (population[i].fitness > maxFitness) {
        maxFitness = population[i].fitness;
      }
    }

    // let fitness = map(population[i].fitness, 0, maxFitness, 0, 1);
    var n = floor(population[i].fitness * 100);
    for (var j = 0; j < n; j++) {
      matingPool.push(population[i]);
    }
  }

  for (let i = 0; i < population.length; i++) {
    var a = floor(random(matingPool.length));
    var b = floor(random(matingPool.length));

    var parentA = matingPool[a];
    var parentB = matingPool[b];

    var child = parentA.crossover(parentB);
    child.mutate(mutationRate);
    population[i] = child;
  }

  for (var i = 0; i < population.length; i++) {
    population[i].calcFitness(target);
  }

  let worldrecord = 0.0;
  let index = 0;
  for (let i = 0; i < population.length; i++) {
    if (population[i].fitness > worldrecord) {
      index = i;
      worldrecord = population[i].fitness;
    }
  }
  if (worldrecord === 1) {
    noLoopCondition = true;
  }

  var best = population[index].getPhrase();
  bestPhrase.html("Best phrase:<br>" + best);
  // console.log(best);

  if (noLoopCondition) {
    noLoop(); 
  }
  // console.log(matingPool);
}