import Random from './Random';

class Bet {
  static idCount: number = 1000;

  id: number;
  numbers: number[];
  name: string;
  cpf: string;

  constructor(name: string, cpf: string, numbers: number[] = []) {
    this.id = Bet.idCount;
    this.numbers = numbers;
    this.name = name;
    this.cpf = cpf;

    Bet.idCount++;
  }

  littleSuprise() {
    this.numbers = [];

    if (this.numbers.length > 0) {
      return;
    }

    for (let i = 0; i < 5; i++) {
      const number = Random.getRandomNumber(1, 50, this.numbers);

      this.numbers.push(number);
    }
  }
}

export default Bet;
