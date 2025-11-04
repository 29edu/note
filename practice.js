let arr = [1, 2, 3, 9, 5, 6, 8];

const answer = arr.reduce((acc, curr) => {
  if (acc < curr) {
    acc = curr;
  }
  return acc;
}, 0);

console.log(answer);

// getting even number

console.log("Even Numbers are");
arr.map((num) => {
  if (num % 2 == 0) {
    console.log(num + " ");
  }
});

// second largest Number
let arr2 = [10, 5, 8, 20, 15];
let first = -Infinity,
  second = -Infinity;
for (let num of arr2) {
  if (num > first) {
    second = first;
    first = num;
  } else if (num > second && num < first) {
    second = num;
  }
}
console.log(second);
