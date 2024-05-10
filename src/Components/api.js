function selectRandomArray(answers, difference) {
  const randomIndex = Math.random() < 0.5 ? 0 : 1;
  return randomIndex === 0 ? answers : difference;
}
const randomArray = selectRandomArray(answers, difference);
console.log(randomArray);
const answers = [];
    const flagCount = countries.length;

    console.log('flagcount',flagCount);
    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * flagCount);
        const randomFlag = countries[randomIndex];
        answers.push(randomFlag);
    }
    //console.log(answers);
    
    function setDifference(countries, answers) {
      return countries.filter(item => !answers.includes(item));
    }
    const difference = setDifference(countries, answers);
    console.log(difference);