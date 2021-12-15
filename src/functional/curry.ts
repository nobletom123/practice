const curriedFunction = (initialValue) => (value) => {
  return initialValue + value;
};

const firstValue = curriedFunction(5);

firstValue(10);
