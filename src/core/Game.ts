import Bet from './Bet';
import Draw from './Draw';

type ICreateBetParams = {
  name: string;
  cpf: string;
  isLittleSurprise: boolean;
  numbers: number[];
};

export interface ICountingResult {
  status: string;
  winners: Bet[];
  numberOfWinners: number;
  allNumbersBet: { number: number; occurences: number }[];
  numbersDrawn: number[];
  drawingRounds: number;
  prize: number;
}

export enum Status {
  INITIAL = 'INITIAL',
  BETTING_PHASE = 'BETTING_PHASE',
  DRAW_PHASE = 'DRAW_PHASE',
  COUNTING_PHASE = 'COUNTING_PHASE',
  END = 'END',
}

class Game {
  prize: number = 1000000.0;
  status: Status = Status.INITIAL;
  bets: Bet[] = [];
  numbersDrawn: number[] = [];
  winners: Bet[] = [];
  drawingRounds: number = 0;

  addNewBet(bet: ICreateBetParams) {
    if (this.status !== Status.BETTING_PHASE) {
      return;
    }

    const { cpf, isLittleSurprise, name, numbers } = bet;

    const newBet = new Bet(name, cpf, numbers);

    if (isLittleSurprise) {
      newBet.littleSuprise();
    }

    this.bets.push(newBet);
  }

  result(): ICountingResult | null {
    if (this.status !== Status.END) return null;

    const winnersOrderByName = this.getWinnersOrderByname();
    const allNumbersBet = this.getAllNumbersBet();

    return {
      status: this.status,
      winners: winnersOrderByName,
      numberOfWinners: this.winners.length,
      allNumbersBet: allNumbersBet,
      numbersDrawn: this.numbersDrawn,
      drawingRounds: this.drawingRounds,
      prize: this.prize / this.winners.length,
    };
  }

  draw(quantity: number) {
    return new Promise((resolve) => {
      if (this.status === Status.END) {
        resolve(Status.END);
      }

      this.status = Status.DRAW_PHASE;
      setTimeout(() => {
        this.numbersDrawn = Draw.drawNumbers(quantity, this.numbersDrawn);
        this.drawingRounds++;

        resolve(this.status);
      }, 200);
    });
  }

  counting() {
    return new Promise<Status>((resolve) => {
      setTimeout(() => {
        this.status = Status.COUNTING_PHASE;

        this.bets.forEach((bet) => {
          const isWinner = bet.numbers.every((n) =>
            this.numbersDrawn.includes(n)
          );

          if (isWinner) {
            this.winners.push(bet);
          }
        });

        if (this.winners.length > 0 || this.drawingRounds === 26) {
          this.status = Status.END;
          resolve(Status.END);
        } else {
          this.status = Status.DRAW_PHASE;
        }

        resolve(Status.DRAW_PHASE);
      }, 500);
    });
  }

  private getWinnersOrderByname() {
    const winnersOrderByName = this.winners.sort((a, b) => {
      if (a.name < b.name) return -1;

      if (a.name > b.name) return 1;

      return 0;
    });

    return winnersOrderByName;
  }

  private getAllNumbersBet() {
    const allNumbers: number[] = this.bets.reduce<number[]>(
      (accumulator, currentValue) => [...accumulator, ...currentValue.numbers],
      []
    );

    const allNumbersBet: { number: number; occurences: number }[] = [
      ...new Set(allNumbers),
    ]
      .reduce<{ number: number; occurences: number }[]>((acc, current) => {
        return [
          ...acc,
          {
            number: current,
            occurences: allNumbers.filter((x) => x === current).length,
          },
        ];
      }, [])
      .sort((a, b) => {
        if (a.occurences > b.occurences) return -1;

        if (a.occurences < b.occurences) return 1;

        return 0;
      });

    return allNumbersBet;
  }
}

export default Game;
