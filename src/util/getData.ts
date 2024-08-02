/*  2024-07-30 05:28:42


*/

const ITEMS = Array.from({ length: 10 }, (_, i) => i + 1);

export function getData(cutoff: number): Promise<number[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (cutoff < 1 || cutoff > ITEMS.length) {
        return reject("Invalid cutoff");
      }

      resolve(ITEMS.slice(0, cutoff));
    }, 1000);
  });
}
