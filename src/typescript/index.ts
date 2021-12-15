const variableOne: number = 1;

type TypeOne = { fieldOne: string; fieldTwo: number; fieldThree: TypeTwo };
type TypeTwo = { name: string; fieldTwo: number };
type TypeThree = { test: string; test2: number };

type RequestFunction = <ReturnType>(x: ReturnType) => ReturnType;

const requestFunction: RequestFunction = (x) => {
  return x;
};

const typeOne = requestFunction<TypeOne>({
  fieldOne: "a",
  fieldTwo: 1,
  fieldThree: { name: "a", fieldTwo: 1 },
});

const typeTwo = requestFunction<TypeTwo>({
  name: "a",
  fieldTwo: 1,
});

const typeThree = requestFunction<TypeThree>({
  test: "a",
  test2: 1,
});
