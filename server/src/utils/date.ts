export function getCurrentDate(): string {
  const date = new Date();
  const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return today;
}
