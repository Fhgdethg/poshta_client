export const getRandomId: (name?: string) => string = (name = 'id') => {
  return `${name}-${Math.random().toString(36).substr(2, 10)}`;
};

export const objectCleanerByFields = (
  obj: { [keys: string]: any },
  fields: string[],
) => {
  fields.forEach((field) => {
    delete obj[field];
  });

  return obj;
};
