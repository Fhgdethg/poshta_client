export const getRandomId: (name?: string) => string = (name = 'id') => {
  return `${name}-${Math.random().toString(36).substr(2, 10)}`;
};
