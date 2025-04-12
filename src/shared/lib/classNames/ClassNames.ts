type Mode = Record<string, boolean | string>;
export const ClassNames = (
  cls: string,
  mods?: Mode,
  additional?: string[]
): string => {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([classNames, value]) => Boolean(value))
      .map(([classNames, index]) => classNames),
  ].join(" ");
};
