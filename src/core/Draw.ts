import Random from './Random';

class Draw {
  static drawNumbers(quantity: number = 1, numbersDrawn?: number[]) {
    const numbers = numbersDrawn || [];

    for (let i = 0; i < quantity; i++) {
      const number = Random.getRandomNumber(1, 50, numbers);

      numbers.push(number);
    }

    return numbers;
  }
}

export default Draw;
