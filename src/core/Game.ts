import Bet from './Bet';

type ICreateBetParams = {
  name: string;
  cpf: string;
  isLittleSurprise: boolean;
  numbers: number[];
};

enum Status {
  BETTING_PHASE = 'BETTING_PHASE',
  DRAW_PHASE = 'DRAW_PHASE',
  COUNTING_PHASE = 'COUNTING_PHASE',
  END = 'END',
}

class Game {
  status: Status = Status.BETTING_PHASE;
  bets: Bet[] = [];

  constructor() {}

  addNewBet(bet: ICreateBetParams) {
    const { cpf, isLittleSurprise, name, numbers } = bet;

    const newBet = new Bet(name, cpf, numbers);

    if (isLittleSurprise) {
      newBet.littleSuprise();
    }

    this.bets.push(newBet);
  }
}

export default Game;
