export const convertArrToDict = <T>(
  arr: T[],
  keyExtractor: (item: T) => string,
): Record<string, T> => {
  return arr.reduce((acc, cur) => {
    acc[keyExtractor(cur)] = cur;
    return acc;
  }, {} as Record<string, T>);
};
