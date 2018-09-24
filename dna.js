function newChar() {
  let c = floor(random(63, 122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;
  
  return String.fromCharCode(c);
}


class DNA {
    // el DNA para un mono tipeador será la cadena(string) que escribe
  constructor(num) {
    this.genes = []; // contendrá N elementos
    this.fitness = 0;
    for (let i = 0; i < num; i++) {
      this.genes[i] = newChar(); // Pick from range of chars
    }
  }
  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == target[i]) {
        score++;
      }
    }

    this.fitness = score/target.length;
  }
  crossover(partner) {
      var child = new DNA(this.genes.length);

      const midpoint = floor(random(this.genes.length));

      for (let i = 0; i < this.genes.length; i++) {
        if (i > midpoint) child.genes[i] = this.genes[i];
        else child.genes[i] = partner.genes[i];
      }

      return child;
  }
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = newChar();
      }
    }
  }
  getPhrase() {
    return this.genes.join('');
  }
}