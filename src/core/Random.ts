class Random {
  static getRandomNumber(min: number, max: number, excludedNumbers?: number[]) {
    if (excludedNumbers) {
      let randomNumber;

      do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      } while (excludedNumbers.includes(randomNumber));

      return randomNumber;
    }

    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNumber;
  }
}

export default Random;
