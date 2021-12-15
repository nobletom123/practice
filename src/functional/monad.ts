namespace mondads {
  // Identity monad
  const Id = (value) => ({
    // Functor mapping
    // Preserve the wrapping for .map() by
    // passing the mapped value into the type
    // lift:
    map: (f) => Id.of(f(value)),
    // Monad chaining
    // Discard one level of wrapping
    // by omitting the .of() type lift:
    chain: (f) => f(value),
    // Just a convenient way to inspect
    // the values:
    toString: () => `Id(${value})`,
  });
  // The type lift for this monad is just
  // a reference to the factory.
  Id.of = Id;

  const output = Id(5)
    .map((x) => x + 1)
    .chain((x) => x + 1);

  console.log("output", output);

  const compose =
    (...fns) =>
    (x) =>
      fns.reduceRight((y, f) => f(y), x);
  const trace = (label) => (value) => {
    console.log(`${label}: ${value}`);
    return value;
  };

  // const composeM2 = (...ms) => ms.reduce((f, g) => (x) => g(x).map(f));

  // const testvar = [10];

  // const func1 = (x) => x * 2;
  // const func2 = (x) => x + 2;

  // const h = composeM2(func2, func1);
  // const output2 = h(testvar);
  // console.log("compose2", output2);

  {
    const composePromises = (...ms) => ms.reduce((f, g) => (x) => g(x).then(f));
    const label = "Promise composition";
    const g = (n) => Promise.resolve(n + 1);
    const f = (n) => Promise.resolve(n * 2);
    const h = composePromises(f, g);
    h(20).then(trace(label));
    // Promise composition: 42
  }
}

// {
//   const composeM =
//     (chainMethod) =>
//     (...ms) =>
//       ms.reduce((f, g) => (x) => g(x)[chainMethod](f));
//   const composePromises = composeM("then");
//   const label = "API call composition";
//   // a => Promise(b)
//   const getUserById = (id) =>
//     id === 3 ? Promise.resolve({ name: "Kurt", role: "Author" }) : undefined;
//   // b => Promise(c)
//   const hasPermission = ({ role }) => Promise.resolve(role === "Author");
//   // Compose the functions (this works!)
//   const authUser = composePromises(hasPermission, getUserById);
//   authUser(3).then(trace(label)); // true
// }

// {
//   const composePromises = (...ms) => ms.reduce((f, g) => (x) => g(x).then(f));
//   const label = "Promise composition";
//   const g = (n) => Promise.resolve(n + 1);
//   const f = (n) => Promise.resolve(n * 2);
//   const h = composePromises(f, g);
//   h(20).then(trace(label));
//   // Promise composition: 42
// }

{
  // The algebraic definition of function composition:
  // (f ∘ g)(x) = f(g(x))
  const compose = (f, g) => (x) => {
    return f(g(x));
  };

  // 1. f - null

  // const compose2 = (func2, func1) => (x) => {
  //   console.log("func2", func2, "func1", func1);
  //   console.log("x", x);

  //   return func1(x).map(func2);
  // };

  const x = 20; // The value
  const arr = [x]; // The container
  // Some functions to compose
  const g = (n) => n + 1;
  const f = (n) => n * 2;
  const h = (n) => n + 3;
  // Proof that .map() accomplishes function composition.
  // Chaining calls to map is function composition.
  // trace("map composes")([arr.map(g).map(f), arr.map(compose(f, g))]);
  // => [42], [42]

  // const functionX = compose2(f, g);

  // console.log("functionX", functionX(x));

  // const compose3 = (...ms) => ms.reduce(compose2);

  // console.log("compose3", compose3([x]));

  const composeMap = (...ms) => ms.reduce((f, g) => (x) => g(x).map(f));
  const i = composeMap(f, g);

  console.log(
    "composeMap",
    i(x).map((x) => console.log("x", x))
  );
}
