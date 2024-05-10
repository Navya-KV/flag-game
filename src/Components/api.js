function selectRandomArray(answers, difference) {
  const randomIndex = Math.random() < 0.5 ? 0 : 1;
  return randomIndex === 0 ? answers : difference;
}
const randomArray = selectRandomArray(answers, difference);
console.log(randomArray);