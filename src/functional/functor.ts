const double = (a: number) => a * 2;

const Identity = (value) => ({
  map: (fn) => Identity(fn(value)),
});

const trace = (x) => {
  console.log(x);
  return x;
};

const u = Identity(2);

// Identity law

u.map(trace);
u.map((x) => x).map(trace);

const f = (n) => n + 1;
const g = (n) => n * 2;

// Composition law

const r1 = u.map((x) => f(g(x)));
const r2 = u.map(g).map(f);

r1.map(trace);
r2.map(trace);

const Identity2 = (value) => ({
  map: (fn) => Identity2(fn(value)),
  toString: () => `Identity2(${value})`,
  [Symbol.iterator]: function* () {
    yield value;
  },
  valueOf: () => value,
  constructor: () => Identity2,
});

console.log(Identity2.constructor.valueOf());

Object.assign(Identity2, {
  toString: () => "Identity",
  is: (x) => typeof x.map === "function",
});

const output = Identity2(1)
  .map((x) => x + 1)
  .map((x) => x * 50);

const test = (output as any) + 5;

console.log(test);
