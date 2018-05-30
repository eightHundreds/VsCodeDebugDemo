function asyncWork() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
export function sum(a: number, b: number): number {
  const result: number = a + b;
  return result;
}
export async function sumAsync(a, b) {
  const result = sum(a, b);
  await asyncWork();
  return result;
}
