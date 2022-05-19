let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise-one'), 500);
});

let promise2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Promise-two'), 501);
});

Promise.race([promise1, promise2]).then((value) => {
console.log(value);
// Both resolve, but promise2 is faster than promise 1
});
