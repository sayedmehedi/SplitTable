export const numberTransformer = {
  input: (value: number) =>
    isNaN(value) || value === 0 ? "" : value.toString(),
  output: (value: string) => {
    const output = parseInt(value, 10);
    return isNaN(output) ? 0 : output;
  },
};
