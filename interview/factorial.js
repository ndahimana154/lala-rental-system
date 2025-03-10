const factorialFinder = (num) => {
    let factorial = 1;
    for (i = 1; i <= num; i++) {
        factorial *= i
    }
    return factorial
}


const num = 5;

console.log('Factorial of number= ', factorialFinder(num));