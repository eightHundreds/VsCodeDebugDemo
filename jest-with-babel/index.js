function asyncWork() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
export function sum(a, b) {
  const result = a + b;
  return result;
}
export async function sumAsync(a, b) {
  const result = sum(a, b);
  await asyncWork();
  return result;
}
