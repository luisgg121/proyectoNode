function makePromise(x) { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 1000);
    });
  }
  
  async function asyncFunc() {
    var x = await makePromise(1); // the function is paused here until the promise is fulfilled
    console.log(x); // logs 1
    return x;
  }
  
  const returnedProm = asyncFunc(); // the async func returns a promise


  returnedProm.then((x) => console.log(x));
  // This promise is fulfilled with the return value from the async func, so this logs 1
