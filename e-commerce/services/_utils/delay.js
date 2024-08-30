export function delay(ms = 150) {
  return new Promise((resolve) => setTimeout(resolve, ms * Math.random() * 2));
}
