import Draw from './Draw';

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
    if (this.numbers.length > 0) {
      return;
    }

    this.numbers = Draw.drawNumbers(5);
  }
}

export default Bet;
