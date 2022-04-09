type classNameType = string | boolean;

export const getClasses = (...args: classNameType[]) => {
  const classes = args.filter(Boolean).join(" ");
  return classes;
};
