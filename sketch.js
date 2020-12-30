console.log("regular log");
setTimeout(() => {
  console.log("set timeout log");
}, 0);
Promise.resolve(console.log("promise log"));
