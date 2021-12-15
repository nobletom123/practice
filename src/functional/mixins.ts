const flying = (o = {}) => {
  let isFlying = false;
  return Object.assign({}, o, {
    fly() {
      isFlying = true;
      return this;
    },
    isFlying: () => isFlying,
    land() {
      isFlying = false;
      return this;
    },
  });
};

const bird = flying();
console.log(bird.isFlying()); // false
console.log(bird.fly().isFlying()); // true
